import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
    }],
    demoUrl: {
        type: String,
    },
    githubUrl: {
        type: String,
    },
    displayOrder: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    }
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;
