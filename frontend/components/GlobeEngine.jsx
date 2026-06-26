// components/GlobeEngine.jsx
"use client";
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import SatelliteMarkers from "./SatelliteMarkers";

// Lat/lng (degrees) -> position on a sphere of given radius.
export function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

function Earth() {
  const [dayMap] = useTexture(["/textures/earth-night-lights.jpg"]);
  

  return (
    <group>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial map={dayMap} metalness={0.1} roughness={0.7} />
      </Sphere>
      <Sphere args={[1.03, 64, 64]}>
        <meshBasicMaterial color="#2dd9f4" transparent opacity={0.06} side={2} />
      </Sphere>
    </group>
  );
}

function EarthFallback() {
  return (
    <Sphere args={[1, 64, 64]}>
      <meshStandardMaterial color="#0d2540" />
    </Sphere>
  );
}

function CameraFocus({ focusLat, focusLng, controlsRef }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const isAnimating = useRef(false);

  useEffect(() => {
    if (focusLat == null || focusLng == null) return;
    const distance = camera.position.length(); // current zoom level maintain karo
    const [x, y, z] = latLngToVector3(focusLat, focusLng, distance);
    targetPos.current.set(x, y, z);
    isAnimating.current = true;
  }, [focusLat, focusLng, camera]);

  useFrame(() => {
    if (!isAnimating.current) return;
    camera.position.lerp(targetPos.current, 0.06);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) controlsRef.current.update();

    if (camera.position.distanceTo(targetPos.current) < 0.01) {
      isAnimating.current = false;
    }
  });

  return null;
}

export default function GlobeEngine({ satellites, selectedId, onSelectSatellite, focusLat, focusLng }) {
  const controlsRef = useRef();

  return (
    <div style={{ width: "100%", height: "100%", background: "transparent" }}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1.4} />

        <Stars radius={300} depth={50} count={3000} factor={3} fade speed={0.5} />

        <Suspense fallback={<EarthFallback />}>
          <Earth />
        </Suspense>

        <Suspense fallback={null}>
          <SatelliteMarkers
            satellites={satellites}
            selectedId={selectedId}
            onSelect={onSelectSatellite}
          />
        </Suspense>

        <CameraFocus focusLat={focusLat} focusLng={focusLng} controlsRef={controlsRef} />

        <OrbitControls
          ref={controlsRef}
          enableZoom
          enablePan={false}
          minDistance={1.4}
          maxDistance={6}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}