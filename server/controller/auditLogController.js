import AuditLog from "../model/AuditLog.js";

// @desc    Get all audit logs
// @route   GET /api/audit-logs
// @access  Private (Admin/SuperAdmin)
export const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate('user', 'email role') // Get user details
            .sort({ createdAt: -1 }) // Newest first
            .limit(100); // Limit to last 100 logs for performance

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
