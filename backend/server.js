// server.js
const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

app.post('/upload', parser.single('file'), (req, res) => {
    if (req.file) {
        res.json({ url: req.file.path });
    } else {
        res.status(500).json("No file uploaded.");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
