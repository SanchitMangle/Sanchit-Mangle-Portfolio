import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["super_admin", "admin", "editor", "viewer"], // Added 'admin' for backward compatibility if needed
        default: "editor",
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
