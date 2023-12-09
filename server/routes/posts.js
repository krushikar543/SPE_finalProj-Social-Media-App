import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost, 
} from "../controllers/posts.js";

import { verifytoken } from "../middleware/auth.js";

// End points for all posts

const router = express.Router();

router.get("/", verifytoken, getFeedPosts);
router.get("/:userId/posts", verifytoken, getUserPosts);

router.patch("/:id/like", verifytoken, likePost);
export default router;