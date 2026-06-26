const axios = require("axios");
const fs = require("fs");
const path = require("path");
const satellite = require("satellite.js");
const NodeCache = require("node-cache");

const tleCache = new NodeCache({ stdTTL: 6 * 60 * 60 });
const positionCache = new NodeCache({ stdTTL: 60 });

const CELESTRAK_URL =
  "https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=tle";


const TLE_FILE_PATH = path.join(__dirname, "..", "tle-cache.json");
const TLE_FILE_MAX_AGE_MS = 2 * 60 * 60 * 1000; 

function readTleFromDisk() {
  try {
    if (!fs.existsSync(TLE_FILE_PATH)) return null;
    const stat = fs.statSync(TLE_FILE_PATH);
    const age = Date.now() - stat.mtimeMs;
    if (age > TLE_FILE_MAX_AGE_MS) return null; 
    const raw = fs.readFileSync(TLE_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeTleToDisk(satellites) {
  try {
    fs.writeFileSync(TLE_FILE_PATH, JSON.stringify(satellites));
  } catch (err) {
    console.error("Could not write TLE cache to disk:", err.message);
  }
}

async function getTleList() {
  const memCached = tleCache.get("tle-list");
  if (memCached) return memCached;

  const diskCached = readTleFromDisk();
  if (diskCached) {
    console.log("Using TLE data from disk cache (avoiding CelesTrak re-fetch)");
    tleCache.set("tle-list", diskCached);
    return diskCached;
  }

  console.log("Fetching fresh TLE list from CelesTrak...");
  try {
    const response = await axios.get(CELESTRAK_URL, {
      timeout: 10000,
      headers: { "User-Agent": "ZenithDashboard/1.0" },
    });
    const lines = response.data.trim().split("\n");

    const satellites = [];
    for (let i = 0; i < lines.length; i += 3) {
      const name = lines[i]?.trim();
      const line1 = lines[i + 1]?.trim();
      const line2 = lines[i + 2]?.trim();
      if (name && line1 && line2) {
        satellites.push({ name, line1, line2 });
      }
    }

    console.log("CelesTrak gave", satellites.length, "satellites");
    tleCache.set("tle-list", satellites);
    writeTleToDisk(satellites);
    return satellites;
  } catch (err) {
    console.error("CelesTrak fetch failed:", err.message);

    
    try {
      if (fs.existsSync(TLE_FILE_PATH)) {
        const raw = fs.readFileSync(TLE_FILE_PATH, "utf-8");
        console.log("CelesTrak unreachable — falling back to stale disk cache");
        return JSON.parse(raw);
      }
    } catch {}

    throw err;
  }
}

async function fetchSatelliteData(lat, lng) {
  const cacheKey = `sat-${lat}-${lng}`;
  const cachedPositions = positionCache.get(cacheKey);
  if (cachedPositions) {
    console.log("Fetching from cache...");
    return cachedPositions;
  }

  const tleList = await getTleList();
  const subset = tleList.slice(0, 200);

  const observerGd = {
    longitude: satellite.degreesToRadians(parseFloat(lng)),
    latitude: satellite.degreesToRadians(parseFloat(lat)),
    height: 0.37,
  };

  const now = new Date();
  const gmst = satellite.gstime(now);
  const visible = [];

  for (const sat of subset) {
    try {
      const satrec = satellite.twoline2satrec(sat.line1, sat.line2);
      const posVel = satellite.propagate(satrec, now);
      if (!posVel.position) continue;

      const positionEci = posVel.position;
      const positionEcf = satellite.eciToEcf(positionEci, gmst);
      const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);
      const elevationDeg = satellite.radiansToDegrees(lookAngles.elevation);

      if (elevationDeg > 0) {
        const geo = satellite.eciToGeodetic(positionEci, gmst);
        visible.push({
          id: satrec.satnum,
          name: sat.name,
          lat: satellite.radiansToDegrees(geo.latitude),
          lng: satellite.radiansToDegrees(geo.longitude),
          elevation: elevationDeg,
        });
      }
    } catch {
      continue;
    }
  }

  console.log("Computed", visible.length, "visible satellites");
  positionCache.set(cacheKey, visible);
  return visible;
}

module.exports = { fetchSatelliteData };