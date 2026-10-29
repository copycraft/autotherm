import { PHARMA_SITE_URL } from "@/app/lib/pharma";

/** Pharmacontrol robots.txt - served at /robots.txt on the pharma host (next.config.ts). */
export const dynamic = "force-static";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${PHARMA_SITE_URL}/sitemap.xml\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
