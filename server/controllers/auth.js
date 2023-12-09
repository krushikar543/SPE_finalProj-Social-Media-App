import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER USER 

export const register = async(req, res) => {
    try{
        const{
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body; // takes in these parameter from the front end body
        const salt = await bcrypt.genSalt(); // generete a salt for encyption / Hashing.
        const passHash = await bcrypt.hash(password, salt); // Hashed / Encrypted Password. 
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : passHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        }); // create a user with these details
        const savedUser = await newUser.save(); 
        res.status(201).json(savedUser); // respose to the front end in json format (required format) 
    }catch(err){
        res.staus(500).json({error: err.message}); 
    }
};  

// LOGGING IN 

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        // find for user
        const user = await User.findOne({email : email});
        if(!user) return res.status(400).json({msg : "User Doesn't Exist"});
        // check for password match
        const Match = await bcrypt.compare(password, user.password);
        if(!Match) return req.status(400).json({ msg : "Invalid Credentials"});

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        // deleting the password so that it wont go as respose to the font end
        delete user.password;
        res.status(200).json({token, user}); // returning token and the user after authentication
    }catch(err){
        res.status(500).json({error : err.message});
    }
}