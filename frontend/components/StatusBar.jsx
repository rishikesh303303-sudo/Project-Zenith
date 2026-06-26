// components/StatusBar.jsx
"use client";
import React from "react";

export default function StatusBar({ satellites = [], loading, error, locationName }) {
  if (loading) {
    return (
      <div style={styles.bar}>
        <span style={styles.statusText}>Loading fleet summary...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.bar}>
        <span style={{ ...styles.statusText, color: "var(--status-warn)" }}>
          Fleet summary unavailable — {error}
        </span>
      </div>
    );
  }

  const activeCount = satellites.length;

  return (
    <div style={styles.bar}>
      <div style={styles.stat}>
        <SignalIcon />
        <div>
          <div style={styles.label}>
            VISIBLE SATELLITES {locationName ? `· ${locationName.toUpperCase()}` : ""}
          </div>
          <div style={styles.value}>{activeCount}</div>
        </div>
      </div>

      <div style={styles.divider} />

      <div style={styles.stat}>
        <div>
          <div style={styles.label}>SYSTEM STATUS</div>
          <div style={{ ...styles.value, color: "var(--status-good)" }}>
            NOMINAL
            <span style={{ ...styles.statusDot, background: "var(--status-good)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" />
      <path d="M8.5 8.5a5 5 0 017 0M5.5 5.5a9 9 0 0113 0" opacity="0.7" />
      <path d="M12 14v7M9 21h6" />
    </svg>
  );
}

const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 28,
    padding: "16px 24px",
    borderTop: "1px solid var(--border-subtle)",
    background: "var(--bg-panel)",
    minHeight: 64,
  },
  statusText: { fontSize: 13, color: "var(--text-secondary)" },
  stat: { display: "flex", alignItems: "center", gap: 12 },
  divider: { width: 1, height: 32, background: "var(--border-subtle)" },
  label: { fontSize: 10, letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 4 },
  value: { fontSize: 20, fontFamily: "var(--font-display)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: "50%", marginLeft: 4 },
};