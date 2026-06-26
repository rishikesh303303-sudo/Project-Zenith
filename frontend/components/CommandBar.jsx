// components/CommandBar.jsx
"use client";
import React, { useState, useRef, useEffect } from "react";

const COOLDOWN_MS = 3000;

export default function CommandBar({ onSearch, userName, userAvatarUrl, hasNotifications, locationName }) {
  const [query, setQuery] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const timeoutRef = useRef(null);

  // Jab parent se naya location name aaye (auto-detect ya search se), input box update karo
  useEffect(() => {
    if (locationName) setQuery(locationName);
  }, [locationName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || cooldown) return;

    onSearch?.(query.trim());

    setCooldown(true);
    timeoutRef.current = setTimeout(() => setCooldown(false), COOLDOWN_MS);
  };

  return (
    <header style={styles.bar}>
      <div style={styles.brand}>
        <CompassMark />
        <div style={styles.brandText}>
          <span style={styles.brandTitle}>ZENITH</span>
          <span style={styles.brandSubtitle}>MISSION CONTROL</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.searchShell}>
        <CompassMark size={14} />
        <span style={styles.searchLabel}>ZENITH COMMAND</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={cooldown ? "Searching... please wait" : "Search satellite, location, mission..."}
          style={styles.searchInput}
          aria-label="Search satellite, location, mission"
          disabled={cooldown}
        />
        <kbd style={styles.kbd}>⌘</kbd>
        <kbd style={styles.kbd}>K</kbd>
        <button
          type="submit"
          style={{ ...styles.searchBtn, opacity: cooldown ? 0.4 : 1, cursor: cooldown ? "not-allowed" : "pointer" }}
          aria-label="Search"
          disabled={cooldown}
        >
          <SearchIcon />
        </button>
      </form>

      <div style={styles.actions}>
        <button style={styles.iconBtn} aria-label="Notifications">
          <BellIcon />
          {hasNotifications && <span style={styles.dot} />}
        </button>
        <button style={styles.iconBtn} aria-label="Display settings">
          <ScreenIcon />
        </button>
        <button style={styles.avatarBtn} aria-label="Account menu">
          {userAvatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={userAvatarUrl} alt={userName || "Account"} style={styles.avatarImg} />
          ) : (
            <div style={styles.avatarFallback}>{(userName || "?")[0]}</div>
          )}
          <ChevronIcon />
        </button>
      </div>
    </header>
  );
}

function CompassMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z" fill="var(--cyan)" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.8">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
function ScreenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

const styles = {
  bar: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: "16px 24px",
    borderBottom: "1px solid var(--border-subtle)",
  },
  brand: { display: "flex", alignItems: "center", gap: 10, flexShrink: 0 },
  brandText: { display: "flex", flexDirection: "column", lineHeight: 1.1 },
  brandTitle: { fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, letterSpacing: "0.12em", color: "var(--text-primary)" },
  brandSubtitle: { fontSize: 9, letterSpacing: "0.14em", color: "var(--text-muted)" },
  searchShell: {
    flex: 1,
    maxWidth: 560,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    background: "var(--bg-panel)",
    border: "1px solid var(--border-strong)",
    borderRadius: 10,
    boxShadow: "0 0 16px var(--cyan-glow)",
  },
  searchLabel: { fontSize: 11, letterSpacing: "0.08em", color: "var(--cyan)", whiteSpace: "nowrap", fontWeight: 600 },
  searchInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "var(--text-secondary)",
    fontSize: 13,
  },
  kbd: {
    fontSize: 10,
    color: "var(--text-muted)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 4,
    padding: "2px 5px",
  },
  searchBtn: { background: "none", border: "none", display: "flex", padding: 0 },
  actions: { display: "flex", alignItems: "center", gap: 12, marginLeft: "auto", flexShrink: 0 },
  iconBtn: {
    position: "relative",
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "1px solid var(--border-subtle)",
    background: "var(--bg-panel)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 7,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "var(--cyan-bright)",
    boxShadow: "0 0 6px var(--cyan-bright)",
  },
  avatarBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "none",
    border: "none",
    padding: 0,
  },
  avatarImg: { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--border-subtle)" },
  avatarFallback: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: "var(--bg-panel-raised)",
    border: "1px solid var(--border-subtle)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    color: "var(--text-secondary)",
  },
};