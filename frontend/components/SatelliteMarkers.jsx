// components/SatelliteMarkers.jsx
"use client";
import React, { useMemo } from "react";
import { Html } from "@react-three/drei";
import { latLngToVector3 } from "./GlobeEngine";

const MARKER_RADIUS = 1.0;

export default function SatelliteMarkers({ satellites, selectedId, onSelect }) {
  const list = satellites || [];

  return (
    <>
      {list.map((sat) => (
        <SatelliteMarker
          key={sat.id}
          sat={sat}
          isSelected={sat.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

function SatelliteMarker({ sat, isSelected, onSelect }) {
  const position = useMemo(
    () => latLngToVector3(sat.lat, sat.lng, MARKER_RADIUS),
    [sat.lat, sat.lng]
  );

  const labelPosition = useMemo(
    () => latLngToVector3(sat.lat, sat.lng, MARKER_RADIUS + 0.06),
    [sat.lat, sat.lng]
  );

  const isActive = sat.status?.toLowerCase() === "active" || sat.status?.toLowerCase() === "orbital";
  const color = isActive ? "#2dd9f4" : "#50616f";

  return (
    <group>
      <mesh position={position} onClick={() => onSelect?.(sat.id)}>
        <sphereGeometry args={[isSelected ? 0.02 : 0.012, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      
      {isSelected && (
        <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.025, 0.032, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} side={2} />
        </mesh>
      )}

      
      {isSelected && (
        <Html position={labelPosition} center distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div style={labelStyles.wrap}>
            <div style={labelStyles.name}>{sat.name}</div>
            <div style={labelStyles.status}>{sat.status}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

const labelStyles = {
  wrap: { textAlign: "center", whiteSpace: "nowrap" },
  name: { fontSize: 11, fontWeight: 600, color: "#eaf2f7", letterSpacing: "0.04em" },
  status: { fontSize: 9, color: "#7e92a3", letterSpacing: "0.08em" },
};