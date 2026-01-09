import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    category: {
        type: String,
        required: true,
        enum: ["frontend", "backend", "tools", "other"],
    },
    icon: {
        type: String, // Storing lucide-react icon name as string
        required: false,
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

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;
