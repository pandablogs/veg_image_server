const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Use absolute path for the uploads directory
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Automatically create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        cb(null, true);
    } else {
        cb(new Error('Only JPG/PNG images allowed'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
