const express = require('express');
const cors = require('cors');
const imageRoutes = require('./routes/image.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', imageRoutes);

module.exports = app;