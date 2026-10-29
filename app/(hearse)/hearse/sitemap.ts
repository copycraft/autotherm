import type { MetadataRoute } from "next";
import { BCP47, LANGS } from "@/app/lib/constants";
import { HEARSE_DEFAULT_LANG, HEARSE_PAGES, HEARSE_SITE_URL, hearsePath } from "@/app/lib/hearse";

/**
 * halottszallito.hu sitemap - served at /sitemap.xml on the hearse host
 * (next.config.ts). Every page in every language, each listing its
 * translations as hreflang alternates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => `${HEARSE_SITE_URL}${path === "/" ? "" : path}`;

  return HEARSE_PAGES.flatMap((page) =>
    LANGS.map((lang) => {
      const languages: Record<string, string> = Object.fromEntries(
        LANGS.map((l) => [BCP47[l], url(hearsePath(page, l))]),
      );
      languages["x-default"] = url(hearsePath(page, HEARSE_DEFAULT_LANG));
      return {
        url: url(hearsePath(page, lang)),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: page === "home" ? 1 : page === "quote" ? 0.9 : 0.7,
        alternates: { languages },
      };
    }),
  );
}
