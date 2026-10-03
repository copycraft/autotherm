import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/* ------------------------------ ehutoauto.hu -------------------------------- */

/**
 * ehutoauto.hu (the electric refrigerated vehicle site) is served by this same
 * app from the app/(eco)/eco route tree. Host-matched rewrites map its clean
 * paths ("/technologia") onto that tree; eco.localhost does the same in dev
 * (browsers resolve *.localhost to this machine). Done here rather than in a
 * proxy so it runs in the Cloudflare routing layer.
 *
 * `has` host values are matched as anchored regexes against the hostname.
 */
// ehutoauto.vastagkoppany.workers.dev is the second Worker (wrangler env "eco"),
// which previews the eco site online before the ehutoauto.hu DNS moves.
const ECO_HOST =
  "(?:(?:www\\.)?ehutoauto\\.hu|eco\\.localhost|ehutoauto\\.vastagkoppany\\.workers\\.dev)";
const MAIN_HOST = "(?:www\\.)?(?:hutoautok|autotherm)\\.hu";
const onEco = [{ type: "host" as const, value: ECO_HOST }];

async function ecoRedirects() {
  return [
    // One canonical host, as on the main site.
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: "www\\.ehutoauto\\.hu" }],
      destination: "https://ehutoauto.hu/:path*",
      permanent: true,
    },
    // The internal tree is never a public URL on either domain.
    { source: "/eco", has: onEco, destination: "/", permanent: true },
    { source: "/eco/:path*", has: onEco, destination: "/:path*", permanent: true },
    {
      source: "/eco/:path*",
      has: [{ type: "host" as const, value: MAIN_HOST }],
      destination: "https://ehutoauto.hu/:path*",
      permanent: true,
    },
    // Leftover WordPress sample page on the old ehutoauto.hu.
    { source: "/ez-egy-minta-oldal", has: onEco, destination: "/", permanent: true },
  ];
}

async function ecoRewrites() {
  return [
    { source: "/", has: onEco, destination: "/eco" },
    { source: "/sitemap.xml", has: onEco, destination: "/eco/sitemap.xml" },
    { source: "/robots.txt", has: onEco, destination: "/eco/robots.txt" },
    // The eco site's own icon (app/favicon.ico is the main site's).
    { source: "/favicon.ico", has: onEco, destination: "/images/eco/favicon-32.png" },
    // Every other page path; framework files, the API and anything with a file
    // extension (images, fonts, logos) are served as they are.
    {
      source: "/:path((?!_next/|api/|eco(?:/|$))(?!.*\\.[A-Za-z0-9]+$).+)",
      has: onEco,
      destination: "/eco/:path",
    },
  ];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.72", "eco.localhost"],
  redirects: ecoRedirects,
  // The workers.dev addresses are previews; keep them out of search results
  // so they never compete with hutoautok.hu / ehutoauto.hu.
  headers: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: ".*\\.workers\\.dev" }],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
  ],
  rewrites: async () => ({ beforeFiles: await ecoRewrites(), afterFiles: [], fallback: [] }),
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
