import jwt from "jsonwebtoken"

// middleware function used for verification (here). Authorization done. Only Authorized user will 
// be able to perform certain actions such as list out friends list, add new friends, post images etc...

export const verifytoken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if(!token){
            return res.status(403).send("Access Denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({ error : err.message});
    }
}