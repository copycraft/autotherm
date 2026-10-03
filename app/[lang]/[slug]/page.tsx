import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/app/components/templates/AboutPage";
import ContactPage from "@/app/components/templates/ContactPage";
import GalleryPage from "@/app/components/templates/GalleryPage";
import GrantsPage from "@/app/components/templates/GrantsPage";
import LegalPage from "@/app/components/templates/LegalPage";
import ProductsPage from "@/app/components/templates/ProductsPage";
import QuotationPage from "@/app/components/templates/QuotationPage";
import ServicePage from "@/app/components/templates/ServicePage";
import SolutionPage from "@/app/components/templates/SolutionPage";
import WhyUsPage from "@/app/components/templates/WhyUsPage";
import CtaBand from "@/app/components/site/CtaBand";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import { LANGS, isLang, type Lang } from "@/app/lib/constants";
import { getDict } from "@/app/lib/dictionaries";
import { HERO_IMAGE_FALLBACK, heroImageFor } from "@/app/lib/hero-images";
import { BreadcrumbJsonLd } from "@/app/lib/json-ld";
import { galleryImages, infoPages, legalPages } from "@/app/lib/page-content";
import { ROUTES, keyForSlug, pathFor, slugsFor, type PageKey } from "@/app/lib/routes";
import { absoluteUrl, buildPageMetadata, getSeoEntry } from "@/app/lib/seo";

/**
 * Each informational page gets a layout suited to what it is - story,
 * catalogue, workshop, manifesto - below the shared photographic header.
 * Single-product pages (bodies, isolations, …) fall back to SolutionPage.
 */
const INFO_TEMPLATES: Partial<Record<PageKey, typeof SolutionPage>> = {
  about: AboutPage,
  products: ProductsPage,
  whyUs: WhyUsPage,
  service: ServicePage,
  ourService: ServicePage,
  carrierService: ServicePage,
  bodyRepair: ServicePage,
};

/**
 * Universal localized subpage router.
 * Every slug is resolved against the page registry (routes.ts) and rendered
 * with the matching template. Blog pages are excluded from prerendering so
 * fresh posts from D1 appear immediately; everything else is fully static.
 */

export const dynamicParams = true;

export function generateStaticParams(): { lang: string; slug: string }[] {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LANGS) {
    for (const slug of slugsFor(lang)) {
      // Blog renders at request time (live D1 content).
      if (slug === ROUTES.blog[lang]) continue;
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const key = keyForSlug(lang, slug);
  if (!key) return {};
  return buildPageMetadata(key, lang);
}

export default async function SubPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const key = keyForSlug(lang, slug);
  if (!key || key === "home") notFound();

  const dict = getDict(lang);
  const path = pathFor(key, lang) ?? `/${lang}`;
  const seo = getSeoEntry(key, lang);
  const heroImage = heroImageFor[key] ?? HERO_IMAGE_FALLBACK;

  const breadcrumb = (
    <BreadcrumbJsonLd
      items={[
        { name: "Autotherm", url: absoluteUrl(`/${lang}`) },
        { name: seo.title, url: absoluteUrl(path) },
      ]}
    />
  );

  switch (key) {
    case "gallery":
      return (
        <>
          {breadcrumb}
          <GalleryPage dict={dict} images={galleryImages} heroImage={heroImage} />
          <StatsBand lang={lang} dict={dict} />
          <PartnersMarquee dict={dict} />
          <CtaBand
            title={dict.home.ctaBand.title}
            body={dict.home.ctaBand.body}
            primaryLabel={dict.home.ctaBand.primary}
            quoteHref={pathFor("quotation", lang) ?? `/${lang}`}
          />
        </>
      );

    case "contact":
      return (
        <>
          {breadcrumb}
          <ContactPage lang={lang} dict={dict} page={path} heroImage={heroImage} />
        </>
      );

    case "quotation":
      return (
        <>
          {breadcrumb}
          <QuotationPage lang={lang} dict={dict} page={path} heroImage={heroImage} />
        </>
      );

    case "terms":
      return (
        <>
          {breadcrumb}
          <LegalPage content={legalPages.terms} lang={lang} dict={dict} />
        </>
      );

    case "privacy":
      return (
        <>
          {breadcrumb}
          <LegalPage content={legalPages.privacy} lang={lang} dict={dict} />
        </>
      );

    case "grants":
      return (
        <>
          {breadcrumb}
          <GrantsPage heroImage={heroImage} />
        </>
      );

    default: {
      const content = infoPages[key]?.[lang];
      if (!content) notFound();
      const Template = INFO_TEMPLATES[key] ?? SolutionPage;
      return (
        <>
          {breadcrumb}
          <Template content={content} lang={lang} dict={dict} heroImage={heroImage} />
        </>
      );
    }
  }
}
