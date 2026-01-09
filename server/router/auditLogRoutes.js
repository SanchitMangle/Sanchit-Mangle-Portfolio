import express from 'express';
import { getAuditLogs } from '../controller/auditLogController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, restrictTo('super_admin', 'admin'), getAuditLogs);

export default router;
