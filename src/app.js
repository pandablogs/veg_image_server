const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRoutes = require('./routes/image.routes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/images', imageRoutes);


module.exports = app;