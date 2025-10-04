import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.statsroyale.com"
      },
      {
        protocol: "https",
        hostname: "api-assets.clashroyale.com"
      },
    ],
  },
};

export default nextConfig;
