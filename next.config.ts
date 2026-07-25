import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.72"],
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

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
