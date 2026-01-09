import Skill from "../model/Skill.js";
import { logAudit } from "../utils/auditLogger.js";

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ isDeleted: { $ne: true } }).sort({ displayOrder: 1, level: -1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res) => {
    try {
        const { name, level, category, icon, displayOrder } = req.body;

        const skill = new Skill({
            name,
            level,
            category,
            icon,
            displayOrder,
        });

        const createdSkill = await skill.save();

        await logAudit({
            userId: req.user._id,
            action: "CREATE",
            resource: "Skill",
            resourceId: createdSkill._id,
            details: { name: createdSkill.name },
            req
        });

        res.status(201).json(createdSkill);
    } catch (error) {
        res.status(400).json({ message: "Invalid skill data" });
    }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private/Admin
export const updateSkill = async (req, res) => {
    try {
        const { name, level, category, icon, displayOrder } = req.body;
        const skill = await Skill.findOne({ _id: req.params.id, isDeleted: { $ne: true } });

        if (skill) {
            skill.name = name || skill.name;
            skill.level = level || skill.level;
            skill.category = category || skill.category;
            skill.icon = icon || skill.icon;
            skill.displayOrder = displayOrder !== undefined ? displayOrder : skill.displayOrder;

            const updatedSkill = await skill.save();

            await logAudit({
                userId: req.user._id,
                action: "UPDATE",
                resource: "Skill",
                resourceId: updatedSkill._id,
                details: { name: updatedSkill.name, changes: req.body },
                req
            });

            res.json(updatedSkill);
        } else {
            res.status(404).json({ message: "Skill not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid skill data" });
    }
};

// @desc    Delete a skill (Soft Delete)
// @route   DELETE /api/skills/:id
// @access  Private/Admin
export const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            skill.isDeleted = true;
            skill.deletedAt = new Date();
            await skill.save();

            await logAudit({
                userId: req.user._id,
                action: "SOFT_DELETE",
                resource: "Skill",
                resourceId: skill._id,
                details: { name: skill.name },
                req
            });

            res.json({ message: "Skill removed" });
        } else {
            res.status(404).json({ message: "Skill not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
