const { fetchSatelliteData } = require('../services/SatelliteService');

exports.getCelestialData = async (req, res) => {
    const { lat, lng } = req.query;
    try {
        const rawData = await fetchSatelliteData(lat, lng);
        
        const zenithObjects = rawData.filter(obj => obj.elevation > 20);
        
        res.json({ success: true, count: zenithObjects.length, data: zenithObjects });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching sky data" });
    }
};