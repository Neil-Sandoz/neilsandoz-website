import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN
      { protocol: "https", hostname: "cdn.sanity.io" },
      // YouTube auto-thumbnails
      { protocol: "https", hostname: "img.youtube.com" },
      // Vimeo auto-thumbnails (via vumbnail proxy)
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
};

export default nextConfig;
