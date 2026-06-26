// components/SideRail.jsx
"use client";
import React from "react";

const ITEMS = [
  { id: "target", label: "Tracking" },
  { id: "satellite", label: "Fleet" },
  { id: "chart", label: "Analytics" },
  { id: "list", label: "Logs" },
  { id: "settings", label: "Settings" },
  { id: "exit", label: "Sign out" },
];

export default function SideRail({ active = "target", onSelect }) {
  return (
    <nav style={styles.rail} aria-label="Primary">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect?.(item.id)}
          aria-label={item.label}
          aria-current={active === item.id}
          style={{
            ...styles.btn,
            ...(active === item.id ? styles.btnActive : {}),
          }}
        >
          <Icon name={item.id} active={active === item.id} />
        </button>
      ))}
    </nav>
  );
}

function Icon({ name, active }) {
  const stroke = active ? "var(--cyan)" : "var(--text-secondary)";
  const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 1.8 };
  switch (name) {
    case "target":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "satellite":
      return (
        <svg {...props}>
          <rect x="9" y="9" width="6" height="6" rx="1" />
          <path d="M4 4l3 3M20 4l-3 3M4 20l3-3M20 20l-3-3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M3 17l5-5 4 4 8-8" />
        </svg>
      );
    case "list":
      return (
        <svg {...props}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    case "exit":
      return (
        <svg {...props}>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <path d="M16 17l5-5-5-5M21 12H9" />
        </svg>
      );
    default:
      return null;
  }
}

const styles = {
  rail: {
    width: 64,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: "20px 0",
    borderRight: "1px solid var(--border-subtle)",
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    border: "1px solid transparent",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnActive: {
    background: "var(--cyan-glow)",
    border: "1px solid var(--border-strong)",
    boxShadow: "0 0 12px var(--cyan-glow)",
  },
};