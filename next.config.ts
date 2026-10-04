import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

/* ------------------------------ ehutoauto.hu -------------------------------- */

/**
 * ehutoauto.hu (the electric refrigerated vehicle site) is served by this same
 * app from the app/(eco)/eco/[lang] route tree. Host-matched rewrites map its
 * clean paths onto that tree - Hungarian unprefixed ("/technologia" →
 * /eco/hu/technologia), the other languages prefixed ("/en/technology" →
 * /eco/en/technology). eco.localhost does the same in dev (browsers resolve
 * *.localhost to this machine). Done here rather than in a proxy so it runs in
 * the Cloudflare routing layer.
 *
 * `has` host values are matched as anchored regexes against the hostname.
 */
// ehutoauto.vastagkoppany.workers.dev is the eco Worker (wrangler env "eco"),
// which previews the eco site online before the ehutoauto.hu DNS moves.
// halottszallito.vastagkoppany.workers.dev (env "hearse") does the same for
// halottszallito.hu.
const ECO_HOST =
  "(?:(?:www\\.)?ehutoauto\\.hu|eco\\.localhost|ehutoauto\\.vastagkoppany\\.workers\\.dev)";
const MAIN_HOST = "(?:www\\.)?(?:hutoautok|autotherm)\\.hu";
const onEco = [{ type: "host" as const, value: ECO_HOST }];
/** Prefixed eco languages; Hungarian is the default and has no prefix. */
const ECO_PREFIXED = "en|de|ro";

/* ---------------------------- halottszallito.hu --------------------------- */

/**
 * halottszallito.hu (the hearse / funeral-vehicle site) is served by this
 * same app from the app/(hearse)/hearse/[lang] route tree - the exact same
 * pattern as ehutoauto.hu. Host-matched rewrites map its clean paths onto
 * that tree. hearse.localhost does the same in dev.
 */
// halottszallito.vastagkoppany.workers.dev is the third Worker (wrangler env
// "hearse"), which previews the hearse site online before the DNS moves.
const HEARSE_HOST =
  "(?:(?:www\\.)?halottszallito\\.hu|hearse\\.localhost|halottszallito\\.vastagkoppany\\.workers\\.dev)";
const onHearse = [{ type: "host" as const, value: HEARSE_HOST }];

async function ecoRedirects() {
  return [
    // One canonical host, as on the main site.
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: "www\\.ehutoauto\\.hu" }],
      destination: "https://ehutoauto.hu/:path*",
      permanent: true,
    },
    // Hungarian is unprefixed, so a /hu prefix just drops off.
    { source: "/hu", has: onEco, destination: "/", permanent: true },
    { source: "/hu/:path*", has: onEco, destination: "/:path*", permanent: true },
    // The internal tree is never a public URL on either domain.
    { source: "/eco/hu", has: onEco, destination: "/", permanent: true },
    { source: "/eco/hu/:path*", has: onEco, destination: "/:path*", permanent: true },
    { source: "/eco", has: onEco, destination: "/", permanent: true },
    { source: "/eco/:path*", has: onEco, destination: "/:path*", permanent: true },
    {
      source: "/eco/hu/:path*",
      has: [{ type: "host" as const, value: MAIN_HOST }],
      destination: "https://ehutoauto.hu/:path*",
      permanent: true,
    },
    {
      source: "/eco/:path*",
      has: [{ type: "host" as const, value: MAIN_HOST }],
      destination: "https://ehutoauto.hu/:path*",
      permanent: true,
    },
    // Leftover WordPress sample page on the old ehutoauto.hu.
    { source: "/ez-egy-minta-oldal", has: onEco, destination: "/", permanent: true },
    // The hearse tree is never a public URL on the eco domain.
    { source: "/hearse", has: onEco, destination: "/", permanent: true },
    { source: "/hearse/:path*", has: onEco, destination: "/", permanent: true },
  ];
}

async function hearseRedirects() {
  return [
    // One canonical host, as on the main site.
    {
      source: "/:path*",
      has: [{ type: "host" as const, value: "www\\.halottszallito\\.hu" }],
      destination: "https://halottszallito.hu/:path*",
      permanent: true,
    },
    // Old WordPress pages that don't map 1:1 onto a new slug (the others keep
    // their slug and just lose the /hu prefix below).
    ...[
      ["/hu/halottszallito-auto-gyartasa", "/"],
      ["/hu/portfolio/halottszallito-auto", "/termekunk"],
      ["/hu/portfolio/:path*", "/halottas-auto-atalakitasaink"],
      ["/hu/kik-vagyunk", "/miert-mi"],
      ["/hu/kapcsolat", "/halottasauto-arak"],
      ["/3d-hutoauto-ford-custom", "/halottas-auto-atalakitasaink"],
      ["/ro/masini-funerare", "/ro"],
    ].map(([source, destination]) => ({ source, has: onHearse, destination, permanent: true })),
    // "/?portfolio=…" was WordPress's own link to the product page.
    {
      source: "/",
      has: [...onHearse, { type: "query" as const, key: "portfolio" }],
      destination: "/termekunk",
      permanent: true,
    },
    // Hungarian is unprefixed, so a /hu prefix just drops off.
    { source: "/hu", has: onHearse, destination: "/", permanent: true },
    { source: "/hu/:path*", has: onHearse, destination: "/:path*", permanent: true },
    // The internal trees are never public URLs on the hearse domain.
    { source: "/hearse/hu", has: onHearse, destination: "/", permanent: true },
    { source: "/hearse/hu/:path*", has: onHearse, destination: "/:path*", permanent: true },
    { source: "/hearse", has: onHearse, destination: "/", permanent: true },
    { source: "/hearse/:path*", has: onHearse, destination: "/:path*", permanent: true },
    { source: "/eco", has: onHearse, destination: "/", permanent: true },
    { source: "/eco/:path*", has: onHearse, destination: "/", permanent: true },
    {
      source: "/hearse/hu/:path*",
      has: [{ type: "host" as const, value: MAIN_HOST }],
      destination: "https://halottszallito.hu/:path*",
      permanent: true,
    },
    {
      source: "/hearse/:path*",
      has: [{ type: "host" as const, value: MAIN_HOST }],
      destination: "https://halottszallito.hu/:path*",
      permanent: true,
    },
  ];
}

async function ecoRewrites() {
  return [
    { source: "/", has: onEco, destination: "/eco/hu" },
    { source: "/sitemap.xml", has: onEco, destination: "/eco/sitemap.xml" },
    { source: "/robots.txt", has: onEco, destination: "/eco/robots.txt" },
    // The eco site's own icon (app/favicon.ico is the main site's).
    { source: "/favicon.ico", has: onEco, destination: "/images/eco/favicon-32.png" },
    // English, German and Romanian: "/en", "/en/technology". Deeper paths go
    // to the eco tree too (and 404 there) so they never reach main-site pages.
    { source: `/:lang(${ECO_PREFIXED})`, has: onEco, destination: "/eco/:lang" },
    { source: `/:lang(${ECO_PREFIXED})/:path+`, has: onEco, destination: "/eco/:lang/:path+" },
    // Every other page path is Hungarian; framework files, the API and anything
    // with a file extension (images, fonts, logos) are served as they are.
    {
      source: `/:path((?!_next/|api/|eco(?:/|$)|hearse(?:/|$)|(?:hu|${ECO_PREFIXED})(?:/|$))(?!.*\\.[A-Za-z0-9]+$).+)`,
      has: onEco,
      destination: "/eco/hu/:path",
    },
  ];
}

async function hearseRewrites() {
  return [
    { source: "/", has: onHearse, destination: "/hearse/hu" },
    { source: "/sitemap.xml", has: onHearse, destination: "/hearse/sitemap.xml" },
    { source: "/robots.txt", has: onHearse, destination: "/hearse/robots.txt" },
    // The hearse site's own icon (app/favicon.ico is the main site's).
    { source: "/favicon.ico", has: onHearse, destination: "/images/hearse/favicon-32.png" },
    // English, German and Romanian: "/en", "/en/why-us". Deeper paths go
    // to the hearse tree too (and 404 there) so they never reach main-site pages.
    { source: `/:lang(${ECO_PREFIXED})`, has: onHearse, destination: "/hearse/:lang" },
    { source: `/:lang(${ECO_PREFIXED})/:path+`, has: onHearse, destination: "/hearse/:lang/:path+" },
    // Every other page path is Hungarian; framework files, the API and anything
    // with a file extension (images, fonts, logos) are served as they are.
    {
      source: `/:path((?!_next/|api/|hearse(?:/|$)|eco(?:/|$)|(?:hu|${ECO_PREFIXED})(?:/|$))(?!.*\\.[A-Za-z0-9]+$).+)`,
      has: onHearse,
      destination: "/hearse/hu/:path",
    },
  ];
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.72", "eco.localhost", "hearse.localhost"],
  redirects: async () => [...(await ecoRedirects()), ...(await hearseRedirects())],
  // The workers.dev addresses are previews; keep them out of search results
  // so they never compete with hutoautok.hu / ehutoauto.hu.
  headers: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: ".*\\.workers\\.dev" }],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    },
  ],
  rewrites: async () => ({ beforeFiles: [...(await ecoRewrites()), ...(await hearseRewrites())], afterFiles: [], fallback: [] }),
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
