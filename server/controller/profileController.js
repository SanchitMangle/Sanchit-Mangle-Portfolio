import Profile from "../model/Profile.js";

// @desc    Get profile data
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ message: "Profile not found" });
        }
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
};

// @desc    Update profile (Resume URL mainly)
// @route   PUT /api/profile
// @access  Private/Admin
export const updateProfile = async (req, res) => {
    try {
        const { resumeUrl, aboutTitle, aboutBio } = req.body;
        let profile = await Profile.findOne();

        if (profile) {
            profile.resumeUrl = resumeUrl || profile.resumeUrl;
            // Allow updating bio if admin wants, but UI might enforce read-only
            if (aboutTitle) profile.aboutTitle = aboutTitle;
            if (aboutBio) profile.aboutBio = aboutBio;

            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            // Create if doesn't exist (failsafe)
            profile = new Profile({
                resumeUrl,
                aboutTitle,
                aboutBio
            });
            const createdProfile = await profile.save();
            res.json(createdProfile);
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid profile data" });
    }
};
