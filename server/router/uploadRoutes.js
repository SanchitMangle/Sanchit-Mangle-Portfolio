import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadFile } from "../controller/uploadController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only Admins and Editors can upload files
router.post("/", protect, restrictTo("super_admin", "admin", "editor"), upload.single("file"), uploadFile);

export default router;
