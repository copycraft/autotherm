import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import HearseFooter from "@/app/components/hearse/HearseFooter";
import HearseHeader from "@/app/components/hearse/HearseHeader";
import SmoothScroll from "@/app/components/motion/SmoothScroll";
import Analytics from "@/app/components/site/Analytics";
import Infoblokk from "@/app/components/site/Infoblokk";
import RootShell from "@/app/components/site/RootShell";
import { LANGS, LOCALES, isLang } from "@/app/lib/constants";
import { dictionaries, getDict } from "@/app/lib/dictionaries";
import {
  HEARSE_NAME,
  HEARSE_SITE_URL,
  MAIN_SITE_URL,
  getHearseDict,
  hearseMetadata,
  hearsePath,
} from "@/app/lib/hearse";
import { rootViewport } from "@/app/lib/root-metadata";

const CookieConsent = dynamic(() => import("@/app/components/site/CookieConsent"));
const StickyQuoteCTA = dynamic(() => import("@/app/components/site/StickyQuoteCTA"));

export const viewport = rootViewport;

export function generateStaticParams(): { lang: string }[] {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * Root layout for halottszallito.hu, one per language (served here via host
 * rewrites in next.config.ts: "/" is Hungarian, "/en", "/de", "/ro" the
 * others). Charcoal-and-gold palette via data-theme="hearse".
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const home = hearseMetadata("home", lang);

  return {
    ...home,
    metadataBase: new URL(HEARSE_SITE_URL),
    title: { default: String(home.title), template: "%s" },
    applicationName: HEARSE_NAME,
    authors: [{ name: "Autotherm" }],
    publisher: "Autotherm",
    robots: { index: true, follow: true },
    // The halottszallito.hu site icon (gold "A"). /favicon.ico on the hearse
    // host is rewritten to the same file in next.config.ts, since browsers also
    // request that path on their own.
    icons: {
      icon: [
        { url: "/images/hearse/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/hearse/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: { url: "/images/hearse/apple-touch-icon.png", sizes: "180x180" },
    },
    openGraph: {
      type: "website",
      locale: LOCALES[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => LOCALES[l]),
      siteName: HEARSE_NAME,
      url: hearsePath("home", lang),
      images: [
        {
          url: `${MAIN_SITE_URL}/images/og-banner.jpg`,
          width: 1200,
          height: 630,
          alt: "Halottszállító – Autotherm",
        },
      ],
    },
  };
}

export default async function HearseLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDict(lang);
  const hearse = getHearseDict(lang);
  const langNames = Object.fromEntries(LANGS.map((l) => [l, dictionaries[l].langName]));

  return (
    <RootShell lang={lang} theme="hearse" jsonLd={false}>
      <SmoothScroll>
        <HearseHeader lang={lang} langNames={langNames} />
        <main className="flex-1">{children}</main>
        <HearseFooter lang={lang} />
        {/* The GINOP grants are the company's; their page lives on the main site. */}
        <Infoblokk href={`${MAIN_SITE_URL}/hu/ginop-palyazat`} closeLabel={hearse.common.close} />
        <StickyQuoteCTA href={hearsePath("quote", lang)} label={hearse.common.getQuote} />
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
