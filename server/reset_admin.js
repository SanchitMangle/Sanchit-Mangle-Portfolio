import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const resetAdmin = async () => {
    try {
        const email = "sanchitmangle12345@gmail.com";
        const password = "Sanchit@1712";

        // Remove existing admin(s) to ensure clean slate for the single admin
        await User.deleteMany({ role: "admin" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            email,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin user reset successfully:");
        console.log("Email:", email);
        console.log("Password:", password);

        process.exit();
    } catch (error) {
        console.error("Error resetting admin:", error);
        process.exit(1);
    }
};

resetAdmin();
