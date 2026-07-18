import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // folder/index.html URLs — friendly to Hostinger static hosting
  images: { unoptimized: true }, // static export has no image optimizer server
};

export default nextConfig;
