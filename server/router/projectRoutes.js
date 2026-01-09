import express from "express";
import {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../controller/projectController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProjects).post(protect, restrictTo("super_admin", "admin", "editor"), createProject);
router
    .route("/:id")
    .get(getProjectById)
    .put(protect, restrictTo("super_admin", "admin", "editor"), updateProject)
    .delete(protect, restrictTo("super_admin", "admin", "editor"), deleteProject);

export default router;
