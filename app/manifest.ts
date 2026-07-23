import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Autotherm – Hűtőautó gyártás 1992 óta",
    short_name: "Autotherm",
    description:
      "Refrigerated vehicles, cooled vans and commercial vehicle bodies since 1992. Carrier Transicold partner.",
    start_url: "/hu",
    display: "standalone",
    background_color: "#050b18",
    theme_color: "#050b18",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
