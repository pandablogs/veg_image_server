const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    mealType: String,
    taste: String,
    cookingTime: String,
    imagePath: String,
    vegetableName: String,
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Image', ImageSchema);
