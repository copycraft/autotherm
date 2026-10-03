import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import EcoFooter from "@/app/components/eco/EcoFooter";
import EcoHeader from "@/app/components/eco/EcoHeader";
import SmoothScroll from "@/app/components/motion/SmoothScroll";
import Analytics from "@/app/components/site/Analytics";
import Infoblokk from "@/app/components/site/Infoblokk";
import RootShell from "@/app/components/site/RootShell";
import { LANGS, LOCALES, isLang } from "@/app/lib/constants";
import { dictionaries, getDict } from "@/app/lib/dictionaries";
import {
  ECO_NAME,
  ECO_SITE_URL,
  MAIN_SITE_URL,
  ecoMetadata,
  ecoPath,
  getEcoDict,
} from "@/app/lib/eco";
import { rootViewport } from "@/app/lib/root-metadata";

const CookieConsent = dynamic(() => import("@/app/components/site/CookieConsent"));
const StickyQuoteCTA = dynamic(() => import("@/app/components/site/StickyQuoteCTA"));

export const viewport = rootViewport;

export function generateStaticParams(): { lang: string }[] {
  return LANGS.map((lang) => ({ lang }));
}

/**
 * Root layout for ehutoauto.hu, one per language (served here via host
 * rewrites in next.config.ts: "/" is Hungarian, "/en", "/de", "/ro" the
 * others). Green palette via data-theme="eco".
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const home = ecoMetadata("home", lang);

  return {
    ...home,
    metadataBase: new URL(ECO_SITE_URL),
    title: { default: String(home.title), template: "%s" },
    applicationName: ECO_NAME,
    authors: [{ name: "Autotherm" }],
    publisher: "Autotherm",
    robots: { index: true, follow: true },
    // The original ehutoauto.hu site icon (green "A"). /favicon.ico on the eco
    // host is rewritten to the same file in next.config.ts, since browsers also
    // request that path on their own.
    icons: {
      icon: [
        { url: "/images/eco/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/eco/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: { url: "/images/eco/apple-touch-icon.png", sizes: "180x180" },
    },
    openGraph: {
      type: "website",
      locale: LOCALES[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => LOCALES[l]),
      siteName: ECO_NAME,
      url: ecoPath("home", lang),
      images: [
        {
          url: `${MAIN_SITE_URL}/images/og-banner.jpg`,
          width: 1200,
          height: 630,
          alt: "eHűtőautó – Autotherm",
        },
      ],
    },
  };
}

export default async function EcoLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const dict = getDict(lang);
  const eco = getEcoDict(lang);
  const langNames = Object.fromEntries(LANGS.map((l) => [l, dictionaries[l].langName]));

  return (
    <RootShell lang={lang} theme="eco" jsonLd={false}>
      <SmoothScroll>
        <EcoHeader lang={lang} langNames={langNames} />
        <main className="flex-1">{children}</main>
        <EcoFooter lang={lang} />
        {/* The GINOP grants are the company's; their page lives on the main site. */}
        <Infoblokk href={`${MAIN_SITE_URL}/hu/ginop-palyazat`} closeLabel={eco.common.close} />
        <StickyQuoteCTA href={ecoPath("quote", lang)} label={eco.common.getQuote} />
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
