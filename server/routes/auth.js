import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login); // at login end point the corresponding function runs (login) 

export default router;