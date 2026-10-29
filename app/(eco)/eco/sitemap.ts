import type { MetadataRoute } from "next";
import { BCP47, LANGS } from "@/app/lib/constants";
import { ECO_DEFAULT_LANG, ECO_PAGES, ECO_SITE_URL, ecoPath } from "@/app/lib/eco";

/**
 * ehutoauto.hu sitemap - served at /sitemap.xml on the eco host
 * (next.config.ts). Every page in every language, each listing its
 * translations as hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${ECO_SITE_URL}${path === "/" ? "" : path}`;

  return ECO_PAGES.flatMap((page) =>
    LANGS.map((lang) => {
      const languages: Record<string, string> = Object.fromEntries(
        LANGS.map((l) => [BCP47[l], url(ecoPath(page, l))]),
      );
      languages["x-default"] = url(ecoPath(page, ECO_DEFAULT_LANG));
      return {
        url: url(ecoPath(page, lang)),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: page === "home" ? 1 : page === "quote" ? 0.9 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
