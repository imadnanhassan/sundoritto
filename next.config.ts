import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**", // সব host allow হবে
      },
      {
        protocol: "http",
        hostname: "**", // http হলেও allow হবে
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
