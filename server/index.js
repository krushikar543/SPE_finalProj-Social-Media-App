import express from"express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import {createPost} from "./controllers/posts.js";
import { verifytoken } from "./middleware/auth.js";
import fs from 'fs';
import User from "./models/User.js";
import Post from "./models/Post.js";
// import {users, posts} from "./data/index.js";

// CONFIGURATIONS

//Invoking all modules
const __filename = fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
dotenv.config();
const app = express();

const logFile=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

morgan.token('data', request => {
	if (request.body.password)
		request.body.password = ''
	return JSON.stringify(request.body)
})


app.use(express.json()); //Middleware to parse JSON in request body
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit : "30mb", extended : true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(morgan(':date[web] :method :url :status :res[content-length] - :response-time ms :data',{stream: logFile}))

// FILE STORAGE

// setting up the file storage location
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// ROUTES WITH FILES

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifytoken, upload.single("picture"), createPost);

// ROUTES

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOSE SETUP

const PORT  = process.env.PORT || 6001; // connection with MongoDb on this port.
mongoose.connect(process.env.MONGO_URL, {
    ssl : true,
    tls : true,
})
.then(() =>{
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`)); // Implies if connection is successful

    // Initial Data

    // User.insertMany(users);
    // Post.insertmany(posts);
}).catch((error) => console.log(`${error} \n Did not connect`)); // catches for any error

export default app;