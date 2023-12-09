import express from "express";
import {
    getUser, 
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import {verifytoken} from "../middleware/auth.js";

// endpoints for users

const router = express.Router();

// READ
router.get("/:id", verifytoken, getUser);
router.get("/:id/friends", verifytoken, getUserFriends);

// UPDATE

router.patch("/:id/:friendId", verifytoken, addRemoveFriend);

export default router;