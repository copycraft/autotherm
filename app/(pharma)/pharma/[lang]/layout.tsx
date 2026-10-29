import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import PharmaFooter from "@/app/components/pharma/PharmaFooter";
import PharmaHeader from "@/app/components/pharma/PharmaHeader";
import SmoothScroll from "@/app/components/motion/SmoothScroll";
import Analytics from "@/app/components/site/Analytics";
import Infoblokk from "@/app/components/site/Infoblokk";
import RootShell from "@/app/components/site/RootShell";
import { LANGS, LOCALES, isLang } from "@/app/lib/constants";
import { dictionaries, getDict } from "@/app/lib/dictionaries";
import { PharmaJsonLd } from "@/app/lib/json-ld";
import {
  MAIN_SITE_URL,
  PHARMA_NAME,
  PHARMA_SITE_URL,
  getPharmaDict,
  pharmaMetadata,
  pharmaPath,
} from "@/app/lib/pharma";
import { rootViewport } from "@/app/lib/root-metadata";

const CookieConsent = dynamic(() => import("@/app/components/site/CookieConsent"));
const StickyQuoteCTA = dynamic(() => import("@/app/components/site/StickyQuoteCTA"));

export const viewport = rootViewport;

export function generateStaticParams(): { lang: string }[] {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * Root layout for Pharmacontrol, one per language (served here via host
 * rewrites in next.config.ts: "/" is Hungarian, "/en", "/de", "/ro" the
 * others). Lime palette via data-theme="pharma".
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const home = pharmaMetadata("home", lang);

  return {
    ...home,
    metadataBase: new URL(PHARMA_SITE_URL),
    title: { default: String(home.title), template: "%s" },
    applicationName: PHARMA_NAME,
    authors: [{ name: "Autotherm" }],
    publisher: "Autotherm",
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
    // The Pharmacontrol capsule mark. /favicon.ico on the pharma host is
    // rewritten to the same file in next.config.ts, since browsers also
    // request that path on their own.
    icons: {
      icon: [
        { url: "/images/pharma/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/pharma/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: { url: "/images/pharma/apple-touch-icon.png", sizes: "180x180" },
    },
    openGraph: {
      type: "website",
      locale: LOCALES[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => LOCALES[l]),
      siteName: PHARMA_NAME,
      url: pharmaPath("home", lang),
      images: [
        {
          url: `${MAIN_SITE_URL}/images/og-banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${PHARMA_NAME} – Autotherm`,
        },
      ],
    },
  };
}

export default async function PharmaLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDict(lang);
  const pharma = getPharmaDict(lang);
  const langNames = Object.fromEntries(LANGS.map((l) => [l, dictionaries[l].langName]));

  return (
    <RootShell lang={lang} theme="pharma" jsonLd={false}>
      <PharmaJsonLd />
      <SmoothScroll>
        <PharmaHeader lang={lang} langNames={langNames} />
        <main className="flex-1">{children}</main>
        <PharmaFooter lang={lang} />
        {/* The GINOP grants are the company's; their page lives on the main site. */}
        <Infoblokk href={`${MAIN_SITE_URL}/hu/ginop-palyazat`} closeLabel={pharma.common.close} />
        <StickyQuoteCTA href={pharmaPath("quote", lang)} label={pharma.common.getQuote} />
        <CookieConsent
          text={dict.cookie.text}
          accept={dict.cookie.accept}
          decline={dict.cookie.decline}
        />
        <Analytics />
      </SmoothScroll>
    </RootShell>
  );
}
