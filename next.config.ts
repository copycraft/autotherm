import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.72"],
  experimental: {
    globalNotFound: true,
    // Enables React's <ViewTransition> during route navigation, so pages
    // cross-dissolve instead of hard-swapping. Browsers without the View
    // Transitions API simply render the swap instantly — no fallback needed.
    viewTransition: true,
  },
};

/* ----------------------------- Client logo strip ---------------------------- */

/**
 * Drop a logo into public/clients/ and it joins the client strip.
 *
 * The site runs on Cloudflare Workers, which cannot read the filesystem at
 * request time, so the folder is scanned here instead - on every build and
 * dev-server start, and on every change while `next dev` runs - into
 * app/lib/client-logos.json, which the strip imports.
 *
 * The file name is the client's display name: "SPAR.png" → "SPAR",
 * "magyar-posta.svg" → "Magyar posta". A leading number sets the order and is
 * dropped ("01-Pick.webp" → "Pick"), as is a trailing "-logo".
 */
const CLIENTS_DIR = path.join(process.cwd(), "public", "clients");
const CLIENTS_MANIFEST = path.join(process.cwd(), "app", "lib", "client-logos.json");
const LOGO_FILE = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

function displayName(file: string) {
  const words = file
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[\s._-]*/, "")
    .replace(/[\s._-]*logo$/i, "")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .join(" ");
  return words.charAt(0).toLocaleUpperCase("hu") + words.slice(1);
}

function writeClientManifest() {
  const files = fs.existsSync(CLIENTS_DIR)
    ? fs
        .readdirSync(CLIENTS_DIR)
        .filter((f) => LOGO_FILE.test(f) && !f.startsWith("."))
        .sort((a, b) => a.localeCompare(b, "hu", { numeric: true }))
    : [];
  const logos = files.map((file) => ({
    src: `/clients/${encodeURIComponent(file)}`,
    name: displayName(file),
  }));
  const json = `${JSON.stringify(logos, null, 2)}\n`;
  const current = fs.existsSync(CLIENTS_MANIFEST)
    ? fs.readFileSync(CLIENTS_MANIFEST, "utf8")
    : "";
  // Only write on a real change, so the dev server doesn't hot-reload for nothing.
  if (json !== current) fs.writeFileSync(CLIENTS_MANIFEST, json);
}

function watchClientLogos() {
  const flag = "__autothermClientLogosWatch";
  const g = globalThis as Record<string, unknown>;
  if (g[flag]) return;
  g[flag] = true;
  // Create it rather than skip it, so a folder added later is still watched.
  fs.mkdirSync(CLIENTS_DIR, { recursive: true });
  let timer: ReturnType<typeof setTimeout> | undefined;
  fs.watch(CLIENTS_DIR, () => {
    clearTimeout(timer);
    timer = setTimeout(writeClientManifest, 150);
  });
}

export default function config(phase: string): NextConfig {
  writeClientManifest();
  if (phase === PHASE_DEVELOPMENT_SERVER) watchClientLogos();
  return nextConfig;
}

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
