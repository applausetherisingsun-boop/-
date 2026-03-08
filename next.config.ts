import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',   // Static HTML export for Netlify
  trailingSlash: true, // /diagnosis/ instead of /diagnosis
};

export default nextConfig;
