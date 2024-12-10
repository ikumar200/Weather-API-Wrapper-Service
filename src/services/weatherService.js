const axios = require('axios');
const redisClient = require('../utils/redisClient');

const fetchWeatherData = async (city) => {
  try {
    // Check if the data is cached in Redis
    const cachedData = await redisClient.get(city);
    if (cachedData) {
      return JSON.parse(cachedData);  // Return cached data if available
    }

    // Fetch weather data from the new WeatherAPI
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    const response = await axios.get(apiUrl);

    // Cache the data for 12 hours
    await redisClient.set(city, JSON.stringify(response.data), {
      EX: 12 * 60 * 60, // Cache expires after 12 hours
    });

    return response.data;  // Return the fetched data
  } catch (err) {
    throw new Error('Error fetching weather data');
  }
};

module.exports = { fetchWeatherData };
