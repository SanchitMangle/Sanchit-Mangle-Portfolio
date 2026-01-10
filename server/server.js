import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./router/authRoutes.js";
import projectRoutes from "./router/projectRoutes.js";
import skillRoutes from "./router/skillRoutes.js";
import timelineRoutes from "./router/timelineRoutes.js";
import profileRoutes from "./router/profileRoutes.js";
import uploadRoutes from "./router/uploadRoutes.js";
import auditLogRoutes from "./router/auditLogRoutes.js";
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

import { configureSecurity, apiLimiter, authLimiter } from './middleware/security.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Configuration - MUST be first
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://127.0.0.1:5173",
            "https://sanchit-mangle-portfolio.vercel.app",
            "https://sanchit-mangle-portfolio-git-main-sanchitmangles-projects.vercel.app",
            process.env.CLIENT_URL
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin) || origin.match(/^https:\/\/sanchit-mangle-portfolio.*\.vercel\.app$/)) {
            return callback(null, true);
        } else {
            console.log("Blocked by CORS. Origin:", origin);
            console.log("Allowed Origins:", allowedOrigins);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

import { cacheMiddleware } from "./middleware/cacheMiddleware.js";

// API Routes
app.use("/api/auth", authRoutes); // Auth should NOT be cached
app.use("/api/projects", cacheMiddleware(300), projectRoutes); // Cache for 5 minutes
app.use("/api/skills", cacheMiddleware(300), skillRoutes); // Cache for 5 minutes
app.use("/api/timeline", cacheMiddleware(300), timelineRoutes); // Cache for 5 minutes
app.use("/api/profile", cacheMiddleware(300), profileRoutes); // Cache for 5 minutes
app.use("/api/upload", uploadRoutes);
app.use("/api/audit-logs", auditLogRoutes); // Admin only, do not cache

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

// Only run the server if we aren't in a serverless environment (Vercel exports the app)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
