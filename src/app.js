const express = require('express');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(express.json());

// API routes
app.use('/api', weatherRoutes);

module.exports = app;
