import express from "express";
import {
    getTimeline,
    createTimelineItem,
    updateTimelineItem,
    deleteTimelineItem,
} from "../controller/timelineController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getTimeline).post(protect, restrictTo("super_admin", "admin", "editor"), createTimelineItem);
router
    .route("/:id")
    .put(protect, restrictTo("super_admin", "admin", "editor"), updateTimelineItem)
    .delete(protect, restrictTo("super_admin", "admin", "editor"), deleteTimelineItem);

export default router;
