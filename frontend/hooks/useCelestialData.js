// hooks/useCelestialData.js
"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchSatellites, ApiError } from "../lib/api";

export function useCelestialData({ lat, lng, pollMs = 15000 }) {
  const [satellites, setSatellites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const load = useCallback(async (isInitial = false) => {
    if (lat == null || lng == null) return;
    if (isInitial) setLoading(true);
    try {
      const data = await fetchSatellites({ lat, lng });
      setSatellites(data);
      setError(null);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Fleet data load problem");
    } finally {
      if (isInitial) setLoading(false);
    }
  }, [lat, lng]);

  useEffect(() => {
    load(true);
    intervalRef.current = setInterval(() => load(false), pollMs);
    return () => clearInterval(intervalRef.current);
  }, [load, pollMs]);

  return { satellites, loading, error, refetch: () => load(false) };
}