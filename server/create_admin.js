import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/User.js";
import bcrypt from "bcryptjs";

dotenv.config();

const createAdmin = async () => {
    try {
        await connectDB();

        const email = "sanchitmangle12345@gmail.com";
        const password = "Sanchit@1712";

        console.log(`Attempting to create/reset admin: ${email}`);

        // check if user exists
        const existingUser = await User.findOne({ email });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (existingUser) {
            existingUser.password = hashedPassword;
            existingUser.role = "admin";
            await existingUser.save();
            console.log("Existing admin user updated successfully.");
        } else {
            await User.create({
                email,
                password: hashedPassword,
                role: "admin"
            });
            console.log("New admin user created successfully.");
        }

        // Verify it exists now
        const count = await User.countDocuments();
        console.log(`Total users in database: ${count}`);

        process.exit();
    } catch (error) {
        console.error("FATAL ERROR creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
