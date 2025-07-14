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

exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { mealType, taste, cookingTime } = req.body;

        const newImage = new Image({
            mealType,
            taste,
            cookingTime,
            imagePath: `/uploads/${req.file.filename}`
        });

        await newImage.save();

        res.status(200).json({
            message: 'saved successfully',
            data: newImage
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }

};
