import type { Metadata, Viewport } from "next";
import { baseKeywords, siteUrl } from "@/app/lib/seo";

const rootKeywords = [
  ...baseKeywords.hu.slice(0, 40),
  ...baseKeywords.en.slice(0, 30),
  ...baseKeywords.de.slice(0, 30),
  ...baseKeywords.ro.slice(0, 30),
];

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Autotherm",
    default:
      "Autotherm – Hűtőautó gyártás, refrigerated vehicles, Kühlfahrzeug, carosări frigorifice",
  },
  description:
    "Autotherm: manufacturer of refrigerated vehicles, cooled vans, deceased transport and commercial vehicle bodies since 1992. Carrier Transicold partner.",
  keywords: rootKeywords,
  authors: [{ name: "Autotherm" }],
  creator: "Autotherm",
  publisher: "Autotherm",
  category: "automotive",
  classification: "Refrigerated vehicle manufacturing and service",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    alternateLocale: ["en_US", "de_DE", "ro_RO"],
    siteName: "Autotherm",
    title:
      "Autotherm – Hűtőautó gyártás, refrigerated vehicle & Kühlfahrzeug manufacturer",
    description:
      "Autotherm: manufacturer of refrigerated vehicles since 1992. Carrier Transicold partner.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/autotherm-logo.webp`,
        width: 800,
        height: 600,
        alt: "Autotherm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autotherm – Refrigerated vehicle manufacturer since 1992",
    description:
      "Autotherm: manufacturer of refrigerated vehicles since 1992. Carrier Transicold partner.",
    images: [`${siteUrl}/images/autotherm-logo.webp`],
  },
  verification: {
    google: "G-DDQGPSF5SD",
  },
  other: {
    "facebook-domain-verification": "rakterhutes",
    "format-detection": "telephone=yes",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "hu-HU": `${siteUrl}/hu`,
      "en-US": `${siteUrl}/en`,
      "de-DE": `${siteUrl}/de`,
      "ro-RO": `${siteUrl}/ro`,
      "x-default": `${siteUrl}/hu`,
    },
  },
};

export const rootViewport: Viewport = {
  themeColor: "#050b18",
  width: "device-width",
  initialScale: 1,
};
