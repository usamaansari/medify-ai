import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle pdf-parse for server-side rendering
      config.externals = [...(config.externals || []), 'pdf-parse'];
    }
    
    // Handle canvas for Tesseract.js
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
    };
    
    return config;
  },
  /*
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'tesseract.js'],
  },
  */
  serverExternalPackages: ['pdf-parse', 'tesseract.js'],
};

export default nextConfig;
