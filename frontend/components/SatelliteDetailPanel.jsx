// components/SatelliteDetailPanel.jsx
"use client";
import React from "react";

export default function SatelliteDetailPanel({ satelliteId, satellites = [], onClose }) {
  if (!satelliteId) return null;

  const detail = satellites.find((s) => s.id === satelliteId);

  return (
    <aside style={styles.panel}>
      <button style={styles.closeBtn} onClick={onClose} aria-label="Close panel">
        ✕
      </button>

      <div style={styles.kicker}>
        <SatIcon />
        <span>SATELLITE</span>
      </div>

      {!detail && (
        <div style={styles.errorBlock}>
          <p style={styles.errorText}>This Satellite is not in the Visible List.</p>
        </div>
      )}

      {detail && (
        <>
          <div style={styles.headerRow}>
            <div>
              <h2 style={styles.title}>{detail.name}</h2>
              <div style={styles.statusRow}>
                <span style={{ color: "var(--cyan)", fontWeight: 600 }}>{detail.status}</span>
                <span style={styles.dotSep}>•</span>
                <span style={styles.statusMuted}>ORBITAL</span>
              </div>
            </div>
            
            <img
              src="/images/satellite-placeholder.png"
              alt={detail.name}
              style={styles.satImg}
            />
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>POSITION</div>
            <Field label="ID" value={detail.id} />
            <Field label="LATITUDE" value={`${detail.lat}° N`} />
            <Field label="LONGITUDE" value={`${detail.lng}° E`} />
          </div>
        </>
      )}
    </aside>
  );
}

function Field({ label, value }) {
  return (
    <div style={styles.field}>
      <div style={styles.fieldLabel}>{label}</div>
      <div style={styles.fieldValue}>{value}</div>
    </div>
  );
}

function SatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.8">
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M4 4l3 3M20 4l-3 3M4 20l3-3M20 20l-3-3" />
    </svg>
  );
}

const styles = {
  panel: {
    width: 380,
    background: "var(--bg-panel)",
    borderLeft: "1px solid var(--border-subtle)",
    padding: 20,
    overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    fontSize: 16,
  },
  kicker: { display: "flex", alignItems: "center", gap: 6, fontSize: 11, letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 16 },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  title: { fontFamily: "var(--font-display)", fontSize: 22, margin: 0, marginBottom: 6 },
  statusRow: { fontSize: 12, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 6 },
  statusMuted: { color: "var(--text-muted)" },
  dotSep: { color: "var(--text-muted)" },
  satImg: { width: 90, height: "auto", objectFit: "contain" },
  card: {
    background: "var(--bg-panel-raised)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardTitle: { fontSize: 10, letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 12 },
  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em", marginBottom: 3 },
  fieldValue: { fontSize: 16, fontFamily: "var(--font-display)" },
  placeholderText: { fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 },
  errorBlock: { padding: "24px 0" },
  errorText: { color: "var(--status-warn)", fontSize: 13 },
};