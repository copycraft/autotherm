import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import EcoQuotePage from "@/app/components/eco/pages/EcoQuotePage";
import EcoTechnologyPage from "@/app/components/eco/pages/EcoTechnologyPage";
import EcoVehiclesPage from "@/app/components/eco/pages/EcoVehiclesPage";
import EcoWhyPage from "@/app/components/eco/pages/EcoWhyPage";
import { LANGS, isLang, type Lang } from "@/app/lib/constants";
import { ECO_PAGES, ECO_SLUGS, ecoMetadata, ecoPageForSlug, type EcoPage } from "@/app/lib/eco";

/**
 * Every eco sub-page, in every language: the slug is the page's name in that
 * language ("technologia", "technology", "technologie", "tehnologie").
 */
const PAGES: Record<Exclude<EcoPage, "home">, ComponentType<{ lang: Lang }>> = {
  why: EcoWhyPage,
  technology: EcoTechnologyPage,
  vehicles: EcoVehiclesPage,
  quote: EcoQuotePage,
};

type Params = Promise<{ lang: string; slug: string }>;

export const dynamicParams = false;

export function generateStaticParams(): { lang: string; slug: string }[] {
  return LANGS.flatMap((lang) =>
    ECO_PAGES.filter((p) => p !== "home").map((p) => ({ lang, slug: ECO_SLUGS[lang][p] })),
  );
}

function resolve(lang: string, slug: string) {
  if (!isLang(lang)) return null;
  const page = ecoPageForSlug(lang, slug);
  return page && page !== "home" ? { lang, page } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params;
  const found = resolve(lang, slug);
  return found ? ecoMetadata(found.page, found.lang) : {};
}

export default async function Page({ params }: { params: Params }) {
  const { lang, slug } = await params;
  const found = resolve(lang, slug);
  if (!found) notFound();
  const Body = PAGES[found.page];
  return <Body lang={found.lang} />;
}
