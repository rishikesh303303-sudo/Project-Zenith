const express = require('express');
const router = express.Router();
const { getCelestialData } = require('../controllers/celestialController');
const { searchLocation, reverseLocation } = require('../controllers/locationController');

router.get('/sky/visible', getCelestialData);
router.post('/location/search', searchLocation);
router.get('/location/reverse', reverseLocation);

module.exports = router;