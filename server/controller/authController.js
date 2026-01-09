import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// @desc    Register a new admin (Initial setup mainly)
// @route   POST /api/auth/register
// @access  Public (Should be disabled or protected in production after first admin)
export const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        email,
        password: hashedPassword,
        role: "admin",
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
import { logAudit } from "../utils/auditLogger.js";

// ... (previous imports)

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    const { password } = req.body;
    const email = req.body.email?.toLowerCase();

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        // Log the successful login action
        await logAudit({
            userId: user._id,
            action: "LOGIN",
            resource: "User",
            resourceId: user._id,
            details: { email: user.email },
            req
        });

        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
