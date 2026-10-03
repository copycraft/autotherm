import { ECO_SITE_URL } from "@/app/lib/eco";

/** ehutoauto.hu robots.txt - served at /robots.txt on the eco host (next.config.ts). */
export const dynamic = "force-static";

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${ECO_SITE_URL}/sitemap.xml\n`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
