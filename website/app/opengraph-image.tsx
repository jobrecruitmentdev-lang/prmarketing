import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export const alt =
  "PR Marketing Ventures — AI-Powered Growth, SEO & Digital Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Official logo mark, base64-inlined at build time — satori (next/og) can't
// read local file paths, only remote URLs or data URIs.
const markBase64 = readFileSync(
  path.join(process.cwd(), "public", "logo-mark.png"),
).toString("base64");
const markSrc = `data:image/png;base64,${markBase64}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={120} height={132} alt="" />
        <div
          style={{
            display: "flex",
            marginTop: 40,
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
