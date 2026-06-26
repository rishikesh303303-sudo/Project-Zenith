const axios = require('axios');

exports.searchLocation = async (req, res) => {
    const { city } = req.body;

    if (!city || !city.trim()) {
        return res.status(400).json({ message: "City name required" });
    }

    console.log("Received city:", city);

    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
                params: { q: city, format: "json", limit: 1 },
                timeout: 8000,
                headers: {
                    "User-Agent": "ZenithDashboard/1.0",
                    "Referer": "http://localhost:3000",
                },
            }
        );

        console.log("Nominatim returned", response.data.length, "results");

        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ message: "City not found" });
        }

        res.json({
            lat: response.data[0].lat,
            lng: response.data[0].lon,
            name: response.data[0].display_name?.split(",")[0] || city,
        });
    } catch (error) {
        console.error("Nominatim error:", error.message);
        if (error.response?.status === 403) {
            return res.status(503).json({ message: "Location service busy, try again in a minute" });
        }
        res.status(404).json({ message: "City not found" });
    }
};

// Lat/lng se city naam nikalna (browser auto-detect location ke liye)
exports.reverseLocation = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ message: "lat/lng required" });
    }

    console.log("Reverse lookup for:", lat, lng);

    try {
        const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse`,
            {
                params: { lat, lon: lng, format: "json" },
                timeout: 8000,
                headers: {
                    "User-Agent": "ZenithDashboard/1.0",
                    "Referer": "http://localhost:3000",
                },
            }
        );

        const addr = response.data.address || {};
        const name =
            addr.city || addr.town || addr.village || addr.county || response.data.display_name?.split(",")[0] || "Unknown location";

        res.json({ name });
    } catch (error) {
        console.error("Reverse geocode error:", error.message);
        res.status(200).json({ name: "Current location" }); // fail-soft, kuch na kuch dikhna chahiye
    }
};