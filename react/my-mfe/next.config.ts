import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // Disable specific features
    experimental: {
      clientRouterFilter: false,
      // optimizePackageImports: ['package'],
    }
};

export default nextConfig;
