const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/image.controller.js');
const upload = require('../middlewares/upload.middleware.js');

router.post('/upload', upload?.single('image'), uploadImage);

module.exports = router;