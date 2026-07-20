import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt =
  "PR Marketing Ventures — AI-Powered Growth, SEO & Digital Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1C1C1E",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark — compass ring + rising phoenix + growth coin */}
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="27" stroke="#D4AF37" strokeWidth="1.75" opacity={0.55} />
          <path
            d="M32 12 C27 20 20 22 14 20 C19 26 24 28 29 27 L20 40 C26 37 30 33 32 28 C34 33 38 37 44 40 L35 27 C40 28 45 26 50 20 C44 22 37 20 32 12 Z"
            fill="#D4AF37"
          />
          <path d="M32 28 L32 50" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
          <circle cx="47" cy="47" r="10.5" fill="#1C1C1E" stroke="#D4AF37" strokeWidth="1.75" />
        </svg>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#E7C568" }}>PR</span>
          <span style={{ marginLeft: 18 }}>Marketing Ventures</span>
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#94A3B8",
          }}
        >
          AI-Powered Growth, SEO &amp; Digital Engineering · Ahmedabad
        </div>
        <div
          style={{
            marginTop: 48,
            width: 220,
            height: 8,
            borderRadius: 4,
            background: "#D4AF37",
          }}
        />
      </div>
    ),
    size,
  );
}
