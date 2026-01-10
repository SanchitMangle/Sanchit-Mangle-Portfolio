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

// Security Configuration (Headers, Sanitization)
configureSecurity(app);

// Rate Limiting
app.use('/api', apiLimiter); // Apply global limiter to all API routes
app.use('/api/auth/login', authLimiter); // Apply strict limiter to login

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        process.env.CLIENT_URL, // Add your production frontend URL here
    ].filter(Boolean), // Filter out undefined values
    credentials: true
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/audit-logs", auditLogRoutes);

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Only run the server if we aren't in a serverless environment (Vercel exports the app)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => console.log(`Server running on port ${port}`));
}

export default app;
