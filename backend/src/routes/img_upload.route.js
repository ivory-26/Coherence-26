import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage, limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            cb(new Error("Only image files are allowed"))
        }
        cb(null, true);
    },
});

router.post("/", upload.single("image"), async (req, res) => {
    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "hackathon_networking" },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }

                res.json({ imageUrl: result.secure_url });
            }
        );

        uploadStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;