import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Profile from "./model/Profile.js";

dotenv.config();

connectDB();

const importProfile = async () => {
    try {
        const profileCount = await Profile.countDocuments();
        if (profileCount === 0) {
            await Profile.create({
                aboutTitle: "Passionate about building the future",
                aboutBio: [
                    "I am a dedicated full-stack developer with a deep passion for creating intuitive and dynamic user experiences. My journey in tech is driven by a curiosity to understand how things work and a desire to build solutions that make a difference.",
                    "With expertise in modern web technologies, I specialize in transforming complex problems into elegant, efficient code. I believe in the power of clean design and robust engineering working in harmony."
                ],
                resumeUrl: "/resume.pdf",
                stats: { projects: 6, yearsExperience: 1, clients: 3 }
            });
            console.log("Profile Imported!");
        } else {
            console.log("Profile already exists.");
        }
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importProfile();
