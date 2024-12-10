const { fetchWeatherData } = require('../services/weatherService');

const getWeather = async (req, res) => {
  const { city } = req.params;
  try {
    const data = await fetchWeatherData(city);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getWeather };
