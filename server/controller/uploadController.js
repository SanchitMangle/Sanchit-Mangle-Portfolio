import path from 'path';

// @desc    Upload file
// @route   POST /api/upload
// @access  Private/Admin/Editor
export const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Return correct path format for frontend usage
        const filePath = `/uploads/${req.file.filename}`;

        res.status(200).json({
            message: "File uploaded successfully",
            filePath: filePath,
            fileName: req.file.filename,
            fileSize: req.file.size
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error during upload" });
    }
};
