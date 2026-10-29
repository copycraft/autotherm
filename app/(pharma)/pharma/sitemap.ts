import type { MetadataRoute } from "next";
import { BCP47, LANGS } from "@/app/lib/constants";
import { PHARMA_DEFAULT_LANG, PHARMA_PAGES, PHARMA_SITE_URL, pharmaPath } from "@/app/lib/pharma";

/**
 * Pharmacontrol sitemap - served at /sitemap.xml on the pharma host
 * (next.config.ts). Every page in every language, each listing its
 * translations as hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${PHARMA_SITE_URL}${path === "/" ? "" : path}`;

  return PHARMA_PAGES.flatMap((page) =>
    LANGS.map((lang) => {
      const languages: Record<string, string> = Object.fromEntries(
        LANGS.map((l) => [BCP47[l], url(pharmaPath(page, l))]),
      );
      languages["x-default"] = url(pharmaPath(page, PHARMA_DEFAULT_LANG));
      return {
        url: url(pharmaPath(page, lang)),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: page === "home" ? 1 : page === "quote" ? 0.9 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
