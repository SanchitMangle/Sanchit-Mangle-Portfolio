import Timeline from "../model/Timeline.js";
import { logAudit } from "../utils/auditLogger.js";

// @desc    Get all timeline items
// @route   GET /api/timeline
// @access  Public
export const getTimeline = async (req, res) => {
    try {
        const timeline = await Timeline.find({ isDeleted: { $ne: true } }).sort({ displayOrder: 1, createdAt: -1 });
        res.json(timeline);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a timeline item
// @route   POST /api/timeline
// @access  Private/Admin
export const createTimelineItem = async (req, res) => {
    try {
        const { type, title, organization, period, location, description, displayOrder } = req.body;

        const timelineItem = new Timeline({
            type, // 'experience' or 'education'
            title,
            organization,
            period,
            location,
            description,
            displayOrder,
        });

        const createdItem = await timelineItem.save();

        await logAudit({
            userId: req.user._id,
            action: "CREATE",
            resource: "Timeline",
            resourceId: createdItem._id,
            details: { title: createdItem.title },
            req
        });

        res.status(201).json(createdItem);
    } catch (error) {
        res.status(400).json({ message: "Invalid timeline data", error: error.message });
    }
};

// @desc    Update a timeline item
// @route   PUT /api/timeline/:id
// @access  Private/Admin
export const updateTimelineItem = async (req, res) => {
    const { type, title, organization, period, location, description, displayOrder } = req.body;

    try {
        const timelineItem = await Timeline.findOne({ _id: req.params.id, isDeleted: { $ne: true } });

        if (timelineItem) {
            timelineItem.type = type || timelineItem.type;
            timelineItem.title = title || timelineItem.title;
            timelineItem.organization = organization || timelineItem.organization;
            timelineItem.period = period || timelineItem.period;
            timelineItem.location = location || timelineItem.location;
            timelineItem.description = description || timelineItem.description;
            timelineItem.displayOrder = displayOrder !== undefined ? displayOrder : timelineItem.displayOrder;

            const updatedItem = await timelineItem.save();

            await logAudit({
                userId: req.user._id,
                action: "UPDATE",
                resource: "Timeline",
                resourceId: updatedItem._id,
                details: { title: updatedItem.title, changes: req.body },
                req
            });

            res.json(updatedItem);
        } else {
            res.status(404).json({ message: "Timeline item not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid timeline data" });
    }
};

// @desc    Delete a timeline item (Soft Delete)
// @route   DELETE /api/timeline/:id
// @access  Private/Admin
export const deleteTimelineItem = async (req, res) => {
    try {
        const timelineItem = await Timeline.findById(req.params.id);

        if (timelineItem) {
            // Soft Delete Implementation
            timelineItem.isDeleted = true;
            timelineItem.deletedAt = new Date();
            await timelineItem.save();

            await logAudit({
                userId: req.user._id,
                action: "SOFT_DELETE",
                resource: "Timeline",
                resourceId: timelineItem._id,
                details: { title: timelineItem.title },
                req
            });

            res.json({ message: "Timeline item removed" });
        } else {
            res.status(404).json({ message: "Timeline item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
