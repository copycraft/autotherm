import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import HearseBuildsPage from "@/app/components/hearse/pages/HearseBuildsPage";
import HearseProductPage from "@/app/components/hearse/pages/HearseProductPage";
import HearseQuotePage from "@/app/components/hearse/pages/HearseQuotePage";
import HearseWhyPage from "@/app/components/hearse/pages/HearseWhyPage";
import { LANGS, isLang, type Lang } from "@/app/lib/constants";
import { HEARSE_PAGES, HEARSE_SLUGS, hearseMetadata, hearsePageForSlug, type HearsePage } from "@/app/lib/hearse";

/**
 * Every hearse sub-page, in every language: the slug is the page's name in
 * that language ("termekunk", "product", "produkt", "produs").
 */
const PAGES: Record<Exclude<HearsePage, "home">, ComponentType<{ lang: Lang }>> = {
  why: HearseWhyPage,
  product: HearseProductPage,
  builds: HearseBuildsPage,
  quote: HearseQuotePage,
};

type Params = Promise<{ lang: string; slug: string }>;

// No `dynamicParams = false`: on Cloudflare, OpenNext checks that against the
// public (pre-rewrite) path, so every page 404'd; unknown slugs 404 below.

export function generateStaticParams(): { lang: string; slug: string }[] {
  return LANGS.flatMap((lang) =>
    HEARSE_PAGES.filter((p) => p !== "home").map((p) => ({ lang, slug: HEARSE_SLUGS[lang][p] })),
  );
}

function resolve(lang: string, slug: string) {
  if (!isLang(lang)) return null;
  const page = hearsePageForSlug(lang, slug);
  return page && page !== "home" ? { lang, page } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = resolve(lang, slug);
  return found ? hearseMetadata(found.page, found.lang) : {};
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const found = resolve(lang, slug);
  if (!found) notFound();
  const Body = PAGES[found.page];
  return <Body lang={found.lang} />;
}
