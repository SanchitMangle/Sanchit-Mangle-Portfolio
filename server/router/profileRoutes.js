import express from "express";
import { getProfile, updateProfile } from "../controller/profileController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProfile).put(protect, admin, updateProfile);

export default router;
