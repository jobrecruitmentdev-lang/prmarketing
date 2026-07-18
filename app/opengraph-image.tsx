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
          background: "#0F172A",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
          <rect x="2" y="2" width="60" height="60" rx="16" fill="#4F46E5" />
          <rect x="16" y="36" width="7" height="12" rx="3.5" fill="#FFFFFF" fillOpacity="0.55" />
          <rect x="28.5" y="28" width="7" height="20" rx="3.5" fill="#FFFFFF" fillOpacity="0.8" />
          <rect x="41" y="18" width="7" height="30" rx="3.5" fill="#FFFFFF" />
          <path
            d="M15 33 L28 26 L37 31 L49 16"
            stroke="#34D399"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M43 15.5 L50 14.5 L49 21.5"
            stroke="#34D399"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
          <span style={{ color: "#A5B4FC" }}>PR</span>
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
            background: "#34D399",
          }}
        />
      </div>
    ),
    size,
  );
}
