import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    aboutTitle: {
        type: String,
        default: "Passionate about building the future",
    },
    aboutBio: [{
        type: String, // Description paragraphs
    }],
    resumeUrl: {
        type: String,
        default: "/resume.pdf",
    },
    stats: {
        projects: Number,
        yearsExperience: Number,
        clients: Number
    }
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
