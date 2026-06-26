// components/GlobeControls.jsx
"use client";
import React from "react";

export default function GlobeControls({ onRecenter, onZoomIn, onZoomOut, onToggleGlobeMode }) {
  return (
    <div style={styles.pill}>
      <button style={{ ...styles.btn, ...styles.btnActive }} onClick={onToggleGlobeMode} aria-label="Globe view">
        <GlobeIcon />
      </button>
      <button style={styles.btn} onClick={onRecenter} aria-label="Recenter">
        <TargetIcon />
      </button>
      <button style={styles.btn} onClick={onZoomIn} aria-label="Zoom in">
        <PlusIcon />
      </button>
      <button style={styles.btn} onClick={onZoomOut} aria-label="Zoom out">
        <MinusIcon />
      </button>
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="7" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14" />
    </svg>
  );
}

const styles = {
  pill: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 6,
    padding: 6,
    borderRadius: 24,
    background: "var(--bg-panel)",
    border: "1px solid var(--border-subtle)",
  },
  btn: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "1px solid transparent",
    background: "transparent",
    color: "var(--text-secondary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnActive: {
    background: "var(--cyan-glow)",
    border: "1px solid var(--border-strong)",
    color: "var(--cyan)",
  },
};