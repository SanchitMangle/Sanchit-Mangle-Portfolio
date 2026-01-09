import AuditLog from "../model/AuditLog.js";

/**
 * Logs an activity to the database
 * 
 * @param {Object} params - Log parameters
 * @param {string} params.userId - The ID of the user performing the action
 * @param {string} params.action - The action type (LOGIN, CREATE, UPDATE, DELETE, etc.)
 * @param {string} params.resource - The resource type (Project, Skill, etc.)
 * @param {string} [params.resourceId] - The ID of the resource
 * @param {Object} [params.details] - Additional details (e.g., diff, snapshot)
 * @param {Object} [params.req] - Express request object (to extract IP and UserAgent)
 */
export const logAudit = async ({ userId, action, resource, resourceId, details, req }) => {
    try {
        const ipAddress = req?.headers['x-forwarded-for'] || req?.socket.remoteAddress || '';
        const userAgent = req?.headers['user-agent'] || '';

        await AuditLog.create({
            user: userId,
            action,
            resource,
            resourceId,
            details,
            ipAddress,
            userAgent
        });
    } catch (error) {
        // We do not want audit logging failure to break the main application flow
        // so we just log the error to the console
        console.error("Audit Logging Failed:", error);
    }
};
