import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/User.js";
import Project from "./model/Project.js";
import Skill from "./model/Skill.js";
import Timeline from "./model/Timeline.js";
import Profile from "./model/Profile.js";
import bcrypt from "bcryptjs";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Check if data exists
        const userCount = await User.countDocuments();
        const projectCount = await Project.countDocuments();

        if (userCount > 0 && projectCount > 0) {
            console.log("Data already exists. Skipping seed.");
            process.exit();
        }

        // Projects Data
        const projects = [
            {
                title: "QuickGpt AI-Chatbot",
                description: "An AI Chatbot using MERN-Stack where we can generate images and ask questions to the AI assistant.",
                image: "/projects/project1.png",
                tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
                demoUrl: "https://ai-chat-bot-omega-beige.vercel.app/",
                githubUrl: "https://github.com/SanchitMangle/AI-ChatBot",
                displayOrder: 1
            },
            {
                title: "QuickBlog - AI Powered Blogging Platform",
                description: "A full-stack Blogging Platform built using MERN Stack. QuickBlog allows users to explore, read, and interact with blogs, while Admins can publish and manage content with AI-powered generation.",
                image: "/projects/project2.png",
                tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
                demoUrl: "https://quick-blog-frontend-three.vercel.app/",
                githubUrl: "https://github.com/SanchitMangle/QuickBlog",
                displayOrder: 2
            },
            {
                title: "Full-Stack Job Portal App",
                description: "Full-featured job application app where users can apply to various jobs and recruiters can post jobs and manage applications.",
                image: "/projects/project3.png",
                tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
                demoUrl: "https://job-portal-web-application-client-two.vercel.app/",
                githubUrl: "https://github.com/SanchitMangle/Job-Portal-Web-Application",
                displayOrder: 3
            },
            {
                title: "Full-Stack LMS Website",
                description: "Full-featured Learning Management System where students can enroll using payment gateways and educators can add courses from dashboard.",
                image: "/projects/project4.png",
                tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
                demoUrl: "https://lms-web-frontend.vercel.app/",
                githubUrl: "https://github.com/SanchitMangle/LMS_Web",
                displayOrder: 4
            },
            {
                title: "Real-time Chat Application",
                description: "A real-time chat application built with MERN stack and Socket.IO for instant messaging. Messages delivered instantly without page reloads.",
                image: "/projects/project5.png",
                tags: ["React", "TailwindCSS", "Node.js", "Express", "Socket.IO"],
                demoUrl: "https://chat-app-weld-six-85.vercel.app/",
                githubUrl: "https://github.com/SanchitMangle/Chat-App",
                displayOrder: 5
            },
            {
                title: "Full-Stack E-Commerce Website",
                description: "An end-to-end online shopping platform with authentication, cart functionality, payment integration, and order tracking.",
                image: "/projects/project6.png",
                tags: ["React", "TailwindCSS", "Node.js", "Express", "MongoDB"],
                demoUrl: "https://e-commerce-web-frontend-rdej.onrender.com/",
                githubUrl: "https://github.com/SanchitMangle/E-Commerce-Web",
                displayOrder: 6
            },
        ];

        // Skills Data
        const skills = [
            // Frontend
            { name: "HTML/CSS", level: 95, category: "frontend", icon: "Layout", displayOrder: 1 },
            { name: "JavaScript", level: 90, category: "frontend", icon: "Code", displayOrder: 2 },
            { name: "React", level: 90, category: "frontend", icon: "Globe", displayOrder: 3 },
            { name: "TypeScript", level: 85, category: "frontend", icon: "Code", displayOrder: 4 },
            { name: "Tailwind CSS", level: 80, category: "frontend", icon: "Layout", displayOrder: 5 },
            { name: "Next.js", level: 70, category: "frontend", icon: "Globe", displayOrder: 6 },
            // Backend
            { name: "Node.js", level: 80, category: "backend", icon: "Server", displayOrder: 7 },
            { name: "Express", level: 90, category: "backend", icon: "Server", displayOrder: 8 },
            { name: "MongoDB", level: 85, category: "backend", icon: "Database", displayOrder: 9 },
            { name: "SQL", level: 70, category: "backend", icon: "Database", displayOrder: 10 },
            { name: "MySQL", level: 70, category: "backend", icon: "Database", displayOrder: 11 },
            { name: "PostgreSQL", level: 85, category: "backend", icon: "Database", displayOrder: 12 },
            // Tools
            { name: "Git/GitHub", level: 90, category: "tools", icon: "Terminal", displayOrder: 13 },
            { name: "Docker", level: 70, category: "tools", icon: "Cpu", displayOrder: 14 },
            { name: "Figma", level: 85, category: "tools", icon: "PenTool", displayOrder: 15 },
            { name: "VS Code", level: 95, category: "tools", icon: "Code", displayOrder: 16 },
            { name: "Postman", level: 95, category: "tools", icon: "Terminal", displayOrder: 17 },
        ];

        // Timeline Data
        const timeline = [
            {
                type: "experience",
                title: "Full Stack Developer Intern",
                organization: "Axiomen Tech Solution",
                period: "Sep. 2025 - Present",
                location: "Chhatrapati Sambhajinagar, India",
                description: [
                    "Developed and deployed scalable web applications using MERN stack (MongoDB, Express.js, React.js, Node.js)",
                    "Engineered responsive front-end components with React.js and optimized back-end services with Node.js and Express.js",
                    "Designed and integrated RESTful APIs and managed database systems including MongoDB",
                    "Collaborated with development team to enhance UI/UX performance and API integration",
                    "Practiced Agile methodologies and used Git/GitHub for version control in collaborative environment",
                ],
                displayOrder: 1
            },
            {
                type: "education",
                title: "Full Stack Web Development Certificate",
                organization: "Certification",
                period: "August 2025",
                location: "",
                description: [],
                displayOrder: 2
            },
            {
                type: "education",
                title: "Bachelor of Technology in Electronics and Telecommunication Engineering",
                organization: "Government College of Engineering",
                period: "Dec. 2021 - Jun. 2025",
                location: "Yavatmal, India",
                description: [
                    "CGPA: 6.56/10.00",
                ],
                displayOrder: 3
            },
        ];

        // Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("Sanchit@1712", salt);

        const adminUser = {
            email: "sanchitmangle12345@gmail.com",
            password: hashedPassword,
            role: "admin"
        };

        if (userCount === 0) {
            await User.create(adminUser);
            console.log("Admin user created");
        }

        if (projectCount === 0) {
            await Project.insertMany(projects);
            await Skill.insertMany(skills);
            await Timeline.insertMany(timeline);
            console.log("Projects/Skills/Timeline Imported!");
        }

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
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
