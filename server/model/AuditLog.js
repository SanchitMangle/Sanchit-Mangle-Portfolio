import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
        required: true,
        enum: ["LOGIN", "LOGOUT", "CREATE", "UPDATE", "DELETE", "SOFT_DELETE"],
    },
    resource: {
        type: String,
        required: true, // e.g., "Project", "Skill", "User"
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId, // The ID of the item being affected
    },
    details: {
        type: Object, // Flexible field to store diffs or snapshots
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    }
}, { timestamps: true });

// Index for faster querying of logs by resource or user
auditLogSchema.index({ resource: 1, createdAt: -1 });
auditLogSchema.index({ user: 1, createdAt: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);
export default AuditLog;
