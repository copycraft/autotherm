import type { MetadataRoute } from "next";
import { siteUrl } from "./lib/seo";

const paths: Record<string, string[]> = {
  hu: [
    "", "/szerviz", "/rakterhuto-szerviz", "/kik-vagyunk", "/termekeink",
    "/kepgaleria", "/kapcsolat", "/arajanlatkeres", "/miert-mi",
    "/hutoauto-blog", "/haszonjarmu-felepitmenyek", "/jarmufelepitmeny-javitas",
    "/szervizunk", "/konfigurator", "/altalanos-szerzodesi-feltetelek",
    "/adatkezelesi-tajekoztato",
  ],
  en: [
    "", "/our-products", "/who-are-we", "/commercial-vehicle-bodies",
    "/van-isolations", "/why-us", "/galeries", "/contact", "/quotation",
    "/hutoautoblog", "/deceased-transport", "/cooled-refrigerated-vehicle-bodies",
  ],
  de: [
    "", "/wer-sind-wir-3", "/kuehlfahrzeug", "/warum-gerade-wir",
    "/aufbauten-galerie", "/kontakt", "/anfrage", "/hutoauto-blog-2",
  ],
  ro: [
    "", "/cine-suntem-noi", "/carosari-furgoane-frigorifice",
    "/galerie-foto", "/contact-2", "/cerere-oferta", "/blog",
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const [lang, slugs] of Object.entries(paths)) {
    for (const slug of slugs) {
      entries.push({
        url: `${siteUrl}/${lang}${slug}`,
        lastModified: new Date(),
        changeFrequency: slug === "" ? "weekly" : "monthly",
        priority: slug === "" ? 1.0 : 0.7,
        alternates: slug === "" ? undefined : {
          languages: Object.fromEntries(
            Object.keys(paths).map((l) => [l, `${siteUrl}/${l}${slug}`])
          ),
        },
      });
    }
  }

  entries.push({
    url: `${siteUrl}/ai-summary`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  });

  return entries;
}
