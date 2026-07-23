import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import Configurator from "@/app/components/configurator/Configurator";
import { Reveal } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import BlogPage from "@/app/components/templates/BlogPage";
import ContactPage from "@/app/components/templates/ContactPage";
import GalleryPage from "@/app/components/templates/GalleryPage";
import InfoPage from "@/app/components/templates/InfoPage";
import LegalPage from "@/app/components/templates/LegalPage";
import QuotationPage from "@/app/components/templates/QuotationPage";
import CtaBand from "@/app/components/site/CtaBand";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import { LANGS, isLang, type Lang } from "@/app/lib/constants";
import { getPublishedPosts } from "@/app/lib/db";
import { getDict } from "@/app/lib/dictionaries";
import { BreadcrumbJsonLd } from "@/app/lib/json-ld";
import { galleryImages, infoPages, legalPages } from "@/app/lib/page-content";
import { ROUTES, keyForSlug, pathFor, slugsFor } from "@/app/lib/routes";
import { absoluteUrl, buildPageMetadata, getSeoEntry } from "@/app/lib/seo";

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
          <GalleryPage dict={dict} images={galleryImages} />
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
          <ContactPage lang={lang} dict={dict} page={path} />
        </>
      );

    case "quotation":
      return (
        <>
          {breadcrumb}
          <QuotationPage lang={lang} dict={dict} page={path} />
        </>
      );

    case "configurator":
      return (
        <>
          {breadcrumb}
          <ConfiguratorScreen lang={lang} page={path} />
        </>
      );

    case "blog": {
      // Force request-time rendering - posts come live from D1.
      await connection();
      const posts = await getPublishedPosts();
      return (
        <>
          {breadcrumb}
          <BlogPage dict={dict} lang={lang} posts={posts} />
        </>
      );
    }

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

    default: {
      const content = infoPages[key]?.[lang];
      if (!content) notFound();
      return (
        <>
          {breadcrumb}
          <InfoPage content={content} lang={lang} dict={dict} />
        </>
      );
    }
  }
}

/* ------------------------- Configurator page shell ------------------------- */

async function ConfiguratorScreen({ lang, page }: { lang: Lang; page: string }) {
  const dict = getDict(lang);
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;
  return (
    <>
      <section className="mesh-hero relative overflow-hidden pt-40 pb-20">
        <div className="grid-overlay absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" distance={16}>
            <p className="text-xs font-bold tracking-[0.22em] text-frost-300 uppercase">
              {dict.configurator.stepOf.toUpperCase()} 1–5
            </p>
          </Reveal>
          <RevealText
            as="h1"
            text={dict.configurator.title}
            delay={0.1}
            className="mt-5 block max-w-3xl text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">
              {dict.configurator.subtitle}
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mesh-light py-16 sm:py-24">
        <Configurator dict={dict} lang={lang} page={page} />
      </section>
      <StatsBand lang={lang} dict={dict} />
      <PartnersMarquee dict={dict} />
      <CtaBand
        title={dict.home.ctaBand.title}
        body={dict.home.ctaBand.body}
        primaryLabel={dict.home.ctaBand.primary}
        quoteHref={quoteHref}
      />
    </>
  );
}
