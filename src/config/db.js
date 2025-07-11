const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB connected')
    } catch (err) {
        console.log('MongoDB connection failed:', error)
        process.exit(1);
    }
}

module.exports = dbConnection