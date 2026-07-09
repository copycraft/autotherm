import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.autotherm.hu",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "autotherm.hu",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
