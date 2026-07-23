import type { MetadataRoute } from "next";
import { LANGS } from "./lib/constants";
import { ROUTES, alternatesFor, pathFor, type PageKey } from "./lib/routes";
import { siteUrl } from "./lib/seo";

/**
 * Sitemap generated from the central page registry - every localized route,
 * with correct cross-language alternates (localized slugs, not mirrored ones).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  for (const key of Object.keys(ROUTES) as PageKey[]) {
    const alternates = alternatesFor(key);
    const languageMap = Object.fromEntries(
      Object.entries(alternates).map(([l, p]) => [l, `${siteUrl}${p}`]),
    );

    for (const lang of LANGS) {
      const path = pathFor(key, lang);
      if (path === null) continue;
      const isHome = key === "home";
      entries.push({
        url: `${siteUrl}${path}`,
        lastModified,
        changeFrequency: isHome || key === "blog" ? "weekly" : "monthly",
        priority: isHome
          ? 1.0
          : key === "quotation" || key === "products" || key === "configurator"
            ? 0.9
            : 0.7,
        alternates: { languages: languageMap },
      });
    }
  }

  entries.push({
    url: `${siteUrl}/ai-summary`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  return entries;
}
