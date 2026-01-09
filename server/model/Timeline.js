import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["experience", "education"],
    },
    title: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: "",
    },
    description: [{
        type: String,
    }],
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

const Timeline = mongoose.model("Timeline", timelineSchema);
export default Timeline;
