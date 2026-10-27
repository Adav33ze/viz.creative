import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  experimental: { inlineCss: true },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
