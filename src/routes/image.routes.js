const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.middleware');
const { uploadImage } = require('../controllers/image.controller');

// Route

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;
