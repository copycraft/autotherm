import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.72"],
  experimental: {
    // Enables React's <ViewTransition> during route navigation, so pages
    // cross-dissolve instead of hard-swapping. Browsers without the View
    // Transitions API simply render the swap instantly — no fallback needed.
    viewTransition: true,
  },
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
