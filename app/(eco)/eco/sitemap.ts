import type { MetadataRoute } from "next";
import { ECO_PATHS, ECO_SITE_URL } from "@/app/lib/eco";

/** ehutoauto.hu sitemap - served at /sitemap.xml on the eco host (next.config.ts). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(ECO_PATHS).map((path) => ({
    url: `${ECO_SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path === ECO_PATHS.quote ? 0.9 : 0.7,
  }));
}
