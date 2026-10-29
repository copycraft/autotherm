import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import PharmaQuotePage from "@/app/components/pharma/pages/PharmaQuotePage";
import PharmaSolutionsPage from "@/app/components/pharma/pages/PharmaSolutionsPage";
import PharmaWhyPage from "@/app/components/pharma/pages/PharmaWhyPage";
import { LANGS, isLang, type Lang } from "@/app/lib/constants";
import {
  PHARMA_PAGES,
  PHARMA_SLUGS,
  pharmaMetadata,
  pharmaPageForSlug,
  type PharmaPage,
} from "@/app/lib/pharma";

/**
 * Every Pharmacontrol sub-page, in every language: the slug is the page's
 * name in that language ("megoldasok", "solutions", "loesungen", "solutii").
 */
const PAGES: Record<Exclude<PharmaPage, "home">, ComponentType<{ lang: Lang }>> = {
  why: PharmaWhyPage,
  solutions: PharmaSolutionsPage,
  quote: PharmaQuotePage,
};

type Params = Promise<{ lang: string; slug: string }>;

// No `dynamicParams = false`: on Cloudflare, OpenNext checks that against the
// public (pre-rewrite) path, so every page 404'd; unknown slugs 404 below.

export function generateStaticParams(): { lang: string; slug: string }[] {
  return LANGS.flatMap((lang) =>
    PHARMA_PAGES.filter((p) => p !== "home").map((p) => ({ lang, slug: PHARMA_SLUGS[lang][p] })),
  );
}

function resolve(lang: string, slug: string) {
  if (!isLang(lang)) return null;
  const page = pharmaPageForSlug(lang, slug);
  return page && page !== "home" ? { lang, page } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = resolve(lang, slug);
  return found ? pharmaMetadata(found.page, found.lang) : {};
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const found = resolve(lang, slug);
  if (!found) notFound();
  const Body = PAGES[found.page];
  return <Body lang={found.lang} />;
}
