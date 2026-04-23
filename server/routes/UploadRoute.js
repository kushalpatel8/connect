import express from 'express';
import multer from 'multer';

const router = express.Router();

// storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        // safer filename
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// route
router.post('/', upload.single("file"), (req, res) => {
    try {
        res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Upload failed");
    }
});

export default router;