"use client";

import { useRouter } from "next/navigation";

const BACKGROUND_IMAGE_URL = "space.png";


function ImagePlaceholder({ src, alt = "", size = 60, label = "image", round = true }) {
  if (src) {
    
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ objectFit: "contain", display: "block" }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: round ? "50%" : "8px",
        border: "1.5px dashed rgba(150,195,255,0.45)",
        background: "rgba(20,40,70,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: Math.max(9, size * 0.11),
        lineHeight: 1.3,
        color: "rgba(190,220,255,0.75)",
        padding: "4px",
      }}
    >
      {label}
    </div>
  );
}

const steps = [
  {
    num: "01",
    label: "Scan icon",
    title: "SCAN",
    body: "Our advanced sensors scan deep space in real-time, collecting cosmic signals across the universe.",
    src: "scan.png"
  },
  {
    num: "02",
    label: "Analyze icon",
    title: "ANALYZE",
    body: "Powerful algorithms analyze vast datasets to detect patterns, anomalies, and celestial phenomena.",
    src: "analyze.png"
  },
  {
    num: "03",
    label: "Reveal icon",
    title: "REVEAL",
    body: "We transform data into meaningful insights, revealing the unseen and expanding human knowledge.",
    src: "eye.png"
  },
];

const headingFont = "var(--font-oswald), 'Arial Narrow', sans-serif";
const bodyFont = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export default function ProjectZenithLanding() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        fontFamily: bodyFont,
        color: "#eaf3ff",
        overflowX: "hidden",
      }}
    >
        
     <img
  src={BACKGROUND_IMAGE_URL}
  alt="Background"
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    objectPosition: "center",
    zIndex: 0,
    pointerEvents: "none",
  }}
/>
      
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(180deg, rgba(2,5,12,0.55) 0%, rgba(2,5,12,0.15) 22%, rgba(2,5,12,0.3) 55%, rgba(2,5,12,0.9) 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ============= NAV ============= */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "28px 6vw",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: headingFont,
              fontWeight: 600,
              letterSpacing: "0.12em",
              fontSize: "15px",
            }}
          >
            <ImagePlaceholder src="eye.png" size={28} label="" round={true} />
            PROJECT ZENITH
          </div>
          <div
            style={{
              display: "flex",
              gap: "36px",
              fontSize: "13px",
              letterSpacing: "0.08em",
              color: "#cdd9ea",
            }}
          >
            <a href="#overview" style={{ color: "inherit", textDecoration: "none" }}>
              OVERVIEW
            </a>
            <a href="#how-it-works" style={{ color: "inherit", textDecoration: "none" }}>
              HOW IT WORKS
            </a>
            <a href="#technology" style={{ color: "inherit", textDecoration: "none" }}>
              TECHNOLOGY
            </a>
            <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>
              ABOUT
            </a>
          </div>
        </nav>

        {/* ============= HERO ============= */}
        <section
          id="overview"
          style={{
            textAlign: "center",
            padding: "40px 6vw 60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImagePlaceholder src="eye.png" size={70} label="Eye logo" />

          <p
            style={{
              marginTop: "28px",
              letterSpacing: "0.25em",
              fontSize: "13px",
              color: "#7fb4ec",
              fontWeight: 600,
              fontFamily: headingFont,
            }}
          >
            PROJECT ZENITH:
          </p>

          <h1
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(40px, 8vw, 84px)",
              fontWeight: 700,
              letterSpacing: "0.02em",
              margin: "8px 0 0",
              lineHeight: 1.05,
              textTransform: "uppercase",
            }}
          >
            The Celestial Eye
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "26px 0",
              color: "#5b87bd",
            }}
          >
            <span style={{ width: 60, height: 1, background: "currentColor", opacity: 0.5 }} />
            <span style={{ fontSize: 14 }}>✦</span>
            <span style={{ width: 60, height: 1, background: "currentColor", opacity: 0.5 }} />
          </div>

          <p
            style={{
              color: "#cdd9ea",
              fontSize: "16px",
              lineHeight: 1.7,
              maxWidth: 440,
              margin: 0,
            }}
          >
            Scanning the cosmos. Tracking the unknown.
            <br />
            Revealing what lies beyond.
          </p>

          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            style={{
              marginTop: "36px",
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 34px",
              fontSize: "14px",
              fontFamily: headingFont,
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "#eaf3ff",
              background: "rgba(50,90,140,0.18)",
              border: "1px solid #6fa8de",
              borderRadius: "6px",
              cursor: "pointer",
              boxShadow: "0 0 22px rgba(90,150,220,0.25)",
              transition: "background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(70,120,180,0.3)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(90,150,220,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(50,90,140,0.18)";
              e.currentTarget.style.boxShadow = "0 0 22px rgba(90,150,220,0.25)";
            }}
          >
            <ImagePlaceholder src="launch.png" size={20} label="" round={false} />
            LAUNCH RADAR
          </button>

          <p style={{ marginTop: "18px", fontSize: "13px", color: "#7fa6d6" }}>
            Navigate to the mission hub →{" "}
            <span style={{ color: "#eaf3ff", fontWeight: 600 }}>/radar</span>
          </p>
        </section>

        
        <div style={{ height: "18vh" }} />

        {/* ============= HOW IT WORKS ============= */}
        <section
          id="how-it-works"
          style={{
            padding: "40px 6vw 100px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: headingFont,
              fontSize: "clamp(26px, 4vw, 34px)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            HOW IT WORKS
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              margin: "18px 0 56px",
              color: "#5b87bd",
            }}
          >
            <span style={{ width: 60, height: 1, background: "currentColor", opacity: 0.5 }} />
            <span style={{ fontSize: 14 }}>✦</span>
            <span style={{ width: 60, height: 1, background: "currentColor", opacity: 0.5 }} />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "48px",
              maxWidth: 1000,
              margin: "0 auto",
            }}
          >
            {steps.map(({ num, label, title, body, src}) => (
              <div
                key={num}
                style={{
                  width: 260,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "#1c3b63",
                    color: "#eaf3ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: headingFont,
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: "18px",
                  }}
                >
                  {num}
                </div>

                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: "50%",
                    border: "1px solid rgba(125,180,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "22px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 14,
                      borderRadius: "50%",
                      border: "1px dashed rgba(125,180,255,0.2)",
                    }}
                  />
                  <ImagePlaceholder size={48} label={label} src={src} />
                </div>

                <h3
                  style={{
                    fontFamily: headingFont,
                    fontSize: "18px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    margin: "0 0 12px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#b9c8e0",
                    margin: 0,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              margin: "64px 0 24px",
              color: "#5b87bd",
            }}
          >
            <span style={{ width: 40, height: 1, background: "currentColor", opacity: 0.5 }} />
            <span style={{ fontSize: 14 }}>✦</span>
            <span style={{ width: 40, height: 1, background: "currentColor", opacity: 0.5 }} />
          </div>

          <p
            style={{
              fontFamily: headingFont,
              fontSize: "14px",
              letterSpacing: "0.1em",
              color: "#9fbfe8",
              fontWeight: 600,
              margin: 0,
            }}
          >
            THE UNIVERSE IS WATCHING.
            <br />
            AND NOW, SO ARE WE.
          </p>
        </section>
      </div>
    </div>
  );
}