import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 90, 95, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "district25.nambiarbuilders.com",
      },
    ],
  },
};

export default nextConfig;
