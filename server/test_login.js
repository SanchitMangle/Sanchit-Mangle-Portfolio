import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const testLogin = async () => {
    try {
        const email = "sanchitmangle12345@gmail.com";
        const password = "Sanchit@1712";

        console.log(`Testing login for: ${email}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log("User not found in DB!");
            process.exit(1);
        }

        console.log("User found:", user.email, user.role);
        console.log("Stored Hash:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log("SUCCESS: Password matches!");
        } else {
            console.log("FAILURE: Password does NOT match!");
        }

        process.exit();
    } catch (error) {
        console.error("Error testing login:", error);
        process.exit(1);
    }
};

testLogin();
