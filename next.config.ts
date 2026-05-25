import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to optimise Part 1 photographs stored on Vercel Blob.
    // Vercel automatically serves WebP/AVIF + responsive sizes; cuts the
    // ~1.5 MB JPEGs gpt-image-1 generated down to ~200-400 KB for mobile.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
