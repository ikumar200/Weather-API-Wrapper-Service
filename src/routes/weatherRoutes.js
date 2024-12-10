const express = require('express');
const { getWeather } = require('../controllers/weatherController');

const router = express.Router();

// GET /api/weather/:city
router.get('/weather/:city', getWeather);

module.exports = router;
