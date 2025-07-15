// exports.uploadImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         return res.status(200).json({
//             message: 'Image uploaded successfully',
//             filePath: `/uploads/${req.file.filename}`
//         });
//     } catch (err) {
//         return res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


const Image = require('../models/image.model.js'); // make sure to rename from demo.js
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

// const classifyVegetable = async (imagePath) => {
//     const imageBuffer = fs.readFileSync(imagePath);
//     const base64 = imageBuffer.toString('base64');

//     try {
//         const response = await axios({
//             method: 'POST',
//             url: 'https://detect.roboflow.com/image_veg/1', // 🔁 Replace with actual
//             params: {
//                 api_key: process.env.ROBOFLOW_API_KEY,
//             },
//             data: base64,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });

//         const predictions = response.data?.predictions;
//         return predictions?.length > 0 ? predictions[0].class : 'Unknown';

//     } catch (error) {
//         console.error("AI classification failed:", error.message);
//         return 'Unknown';
//     }
// };


// const classifyVegetable = async (imagePath) => {
//     const form = new FormData();
//     form.append('image', fs.createReadStream(imagePath));

//     try {
//         const response = await axios.post('http://127.0.0.1:8000/classify', form, {
//             headers: form.getHeaders(),
//         });

//         return response.data.predicted;
//     } catch (error) {
//         console.error('Vegetable detection failed:', error.message);
//         return 'Unknown';
//     }
// };

// const classifyVegetable = async (imagePath) => {
//     console.log("🔍 Sending to AI:", imagePath);

//     const form = new FormData();
//     form.append('image', fs.createReadStream(imagePath));

//     try {
//         const response = await axios.post('http://127.0.0.1:8000/classify', form, {
//             headers: form.getHeaders(),
//             timeout: 10000,
//         });

//         console.log("🎯 AI response:", response.data);
//         return response.data.predicted || 'Unknown';

//     } catch (error) {
//         console.error("❌ AI call failed:", error.message);
//         if (error.response) {
//             console.error("💥 AI error response:", error.response.data);
//         }
//         return 'Unknown';
//     }
// };



// exports.uploadImage = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const { mealType, taste, cookingTime } = req.body;

//         const imagePath = `/uploads/${req.file.filename}`;
//         const absolutePath = path.join(__dirname, '..', '..', imagePath);

//         // 👉 Call AI to classify vegetable
//         const vegetableName = await classifyVegetable(absolutePath);

//         const newImage = new Image({
//             mealType,
//             taste,
//             cookingTime,
//             imagePath,
//             vegetableName
//         });

//         await newImage.save();

//         res.status(200).json({
//             message: 'Saved successfully',
//             data: newImage,
//             isSuceess: true
//         });

//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

const classifyVegetable = async (filePath) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath)); // KEY MUST BE 'file'

    try {
        const response = await axios.post('http://127.0.0.1:8000/classify', form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        console.log('AI Prediction:', response.data);
        return response.data.vegetableName;

    } catch (error) {
        console.error('AI classification failed:', error.message);
        if (error.response) console.error(error.response.data);
        return "Unknown";
    }
};


exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            console.log("No file uploaded.");
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log("Uploaded file:", req.file.filename);
        const { mealType, taste, cookingTime } = req.body;

        const imagePath = `/uploads/${req.file.filename}`;
        const absolutePath = path.join(__dirname, '..', '..', imagePath);
        console.log("Absolute path:", absolutePath);

        if (!fs.existsSync(absolutePath)) {
            console.log("Image file missing:", absolutePath);
            return res.status(500).json({ message: 'Image file not found' });
        }

        const vegetableName = await classifyVegetable(absolutePath);
        console.log("AI detected:", vegetableName);

        const newImage = new Image({
            mealType,
            taste,
            cookingTime,
            imagePath,
            vegetableName
        });

        await newImage.save();
        console.log("Saved to DB");

        res.status(200).json({
            message: 'Saved successfully',
            data: newImage,
            isSuceess: true
        });

    } catch (err) {
        console.error("Upload error:", err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

