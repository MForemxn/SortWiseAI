const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
require('dotenv').config();


// Middleware to handle JSON and form-data
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Routes
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;
        // Replace `your_image_processing_api` with your actual API endpoint
        const description = await getImageDescription(imagePath);
        const location = req.body.location;  // Assume location is sent in the body
        const recyclingInfo = await getRecyclingInfo(description, location);
        res.json({ message: recyclingInfo });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Function to get image description
async function getImageDescription(imagePath) {
    // This should call your AI image recognition API
    // For example, using axios to POST image data
    const response = await axios.post('your_image_processing_api', {
        image: imagePath
    });
    return response.data.description;
}

// Function to get recycling information
async function getRecyclingInfo(description, location) {
    const prompt = `I will give you a description of an image and a general location. I need you to go and find out if the following item can be recycled in the following area. The order should be short and distilled, and if there is any preparation necessary to prepare it for recycling, please give that to me as well ${description} ${location}`;
    const response = await axios.post('your_recycling_info_api', {
        prompt: prompt
    });
    return response.data.result;
}
