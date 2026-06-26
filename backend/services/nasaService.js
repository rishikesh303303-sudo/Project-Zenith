const axios = require('axios');
require('dotenv').config();

const nasaApi = axios.create({ baseURL: 'https://api.nasa.gov' });

exports.getApod = async () => {
    const res = await nasaApi.get(`/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
    return res.data;
};