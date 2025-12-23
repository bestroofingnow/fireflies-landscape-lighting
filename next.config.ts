import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fireflieslandscapelighting.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  // Allow larger request bodies for image uploads
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
