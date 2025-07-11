// const path = require('path');
// const fs = require('fs');

const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req?.file?.filename}`;

    res.status(200).json({
        message: "Image uploaded successfully",
        file: req?.file,
        imageUrl
    });
};

module.exports = { uploadImage };