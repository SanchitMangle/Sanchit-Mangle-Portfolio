import Project from "../model/Project.js";
import { logAudit } from "../utils/auditLogger.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
    try {
        // Filter out soft-deleted projects
        const projects = await Project.find({ isDeleted: { $ne: true } }).sort({ displayOrder: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error("Project Fetch Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({ _id: req.params.id, isDeleted: { $ne: true } });
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
export const createProject = async (req, res) => {
    try {
        const { title, description, image, tags, demoUrl, githubUrl, displayOrder } = req.body;

        const project = new Project({
            title,
            description,
            image,
            tags,
            demoUrl,
            githubUrl,
            displayOrder,
        });

        const createdProject = await project.save();

        await logAudit({
            userId: req.user._id,
            action: "CREATE",
            resource: "Project",
            resourceId: createdProject._id,
            details: { title: createdProject.title },
            req
        });

        res.status(201).json(createdProject);
    } catch (error) {
        res.status(400).json({ message: "Invalid project data", error: error.message });
    }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
export const updateProject = async (req, res) => {
    try {
        const { title, description, image, tags, demoUrl, githubUrl, displayOrder } = req.body;

        const project = await Project.findOne({ _id: req.params.id, isDeleted: { $ne: true } });

        if (project) {
            project.title = title || project.title;
            project.description = description || project.description;
            project.image = image || project.image;
            project.tags = tags || project.tags;
            project.demoUrl = demoUrl || project.demoUrl;
            project.githubUrl = githubUrl || project.githubUrl;
            project.displayOrder = displayOrder !== undefined ? displayOrder : project.displayOrder;

            const updatedProject = await project.save();

            await logAudit({
                userId: req.user._id,
                action: "UPDATE",
                resource: "Project",
                resourceId: updatedProject._id,
                details: { title: updatedProject.title, changes: req.body },
                req
            });

            res.json(updatedProject);
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid project data" });
    }
};

// @desc    Delete a project (Soft Delete)
// @route   DELETE /api/projects/:id
// @access  Private/Admin
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            // Soft Delete Implementation
            project.isDeleted = true;
            project.deletedAt = new Date();
            await project.save();

            await logAudit({
                userId: req.user._id,
                action: "SOFT_DELETE",
                resource: "Project",
                resourceId: project._id,
                details: { title: project.title },
                req
            });

            res.json({ message: "Project removed" });
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
