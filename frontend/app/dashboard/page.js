// app/dashboard/page.js
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import CommandBar from "../../components/CommandBar";
import SideRail from "../../components/SideRail";
import GlobeControl from "../../components/GlobeControl";
import StatusBar from "../../components/StatusBar";
import SatelliteDetailPanel from "../../components/SatelliteDetailPanel";
import { useCelestialData } from "../../hooks/useCelestialData";
import { searchLocationByCity, reverseGeocode } from "../../lib/api";

const GlobeEngine = dynamic(() => import("../../components/GlobeEngine"), {
  ssr: false,
  loading: () => <div style={{ color: "var(--text-muted)", padding: 40 }}>Loading globe…</div>,
});

const DEFAULT_LOCATION = { lat: 23.2599, lng: 77.4126 }; // Bhopal fallback

export default function DashboardPage() {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [locationName, setLocationName] = useState("Bhopal");
  const { satellites, loading, error } = useCelestialData(location);
  const [selectedId, setSelectedId] = useState(null);
  const [activeNav, setActiveNav] = useState("target");
  const [searchError, setSearchError] = useState(null);

  // Page load pe browser se location maango, phir uska naam reverse-lookup karo
  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocation({ lat, lng });
        try {
          const { name } = await reverseGeocode(lat, lng);
          setLocationName(name);
        } catch {
          setLocationName("Current location");
        }
      },
      () => {
        // Permission deny — Bhopal default rahega
      },
      { timeout: 8000 }
    );
  }, []);

  const handleSearch = async (city) => {
    setSearchError(null);
    try {
      const { lat, lng, name } = await searchLocationByCity(city);
      setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
      setLocationName(name || city);
      setSelectedId(null);
    } catch (err) {
      setSearchError(err.message || "City nahi mila, dusra naam try karo");
    }
  };

  return (
    <div style={styles.shell}>
      <CommandBar
        onSearch={handleSearch}
        userName="Mission Operator"
        hasNotifications
        locationName={locationName}
      />

      <div style={styles.body}>
        <SideRail active={activeNav} onSelect={setActiveNav} />

        <main style={styles.main}>
          {loading && (
            <div style={styles.centerMsg}>Acquiring fleet position data…</div>
          )}

          {!loading && error && (
            <div style={styles.centerMsg}>
              Couldn't reach the fleet feed — {error}
            </div>
          )}

          {searchError && (
            <div style={styles.searchErrorBanner}>{searchError}</div>
          )}

          {!loading && !error && (
            <>
              <GlobeEngine
                satellites={satellites}
                selectedId={selectedId}
                onSelectSatellite={setSelectedId}
                focusLat={location.lat}
                focusLng={location.lng}
              />
              <GlobeControl />
            </>
          )}
        </main>

        <SatelliteDetailPanel
          satelliteId={selectedId}
          satellites={satellites}
          onClose={() => setSelectedId(null)}
        />
      </div>

      <StatusBar satellites={satellites} loading={loading} error={error} locationName={locationName} />
    </div>
  );
}

const styles = {
  shell: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "var(--bg-void)",
    overflow: "hidden",
  },
  body: {
    display: "flex",
    flex: 1,
    minHeight: 0,
  },
  main: {
    flex: 1,
    position: "relative",
    minWidth: 0,
  },
  centerMsg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "var(--text-secondary)",
    fontSize: 14,
  },
  searchErrorBanner: {
    position: "absolute",
    top: 16,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(240, 185, 77, 0.15)",
    border: "1px solid var(--status-warn)",
    color: "var(--status-warn)",
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 12,
    zIndex: 10,
  },
};