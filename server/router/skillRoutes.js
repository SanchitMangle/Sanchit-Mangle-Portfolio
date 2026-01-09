import express from "express";
import {
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
} from "../controller/skillController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getSkills).post(protect, restrictTo("super_admin", "admin", "editor"), createSkill);
router
    .route("/:id")
    .put(protect, restrictTo("super_admin", "admin", "editor"), updateSkill)
    .delete(protect, restrictTo("super_admin", "admin", "editor"), deleteSkill);

export default router;
