import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPage from "@/app/components/templates/BlogPage";
import { isLang } from "@/app/lib/constants";
import { getPublishedPosts } from "@/app/lib/db";
import { getDict } from "@/app/lib/dictionaries";
import { HERO_IMAGE_FALLBACK, heroImageFor } from "@/app/lib/hero-images";
import { BreadcrumbJsonLd } from "@/app/lib/json-ld";
import { keyForSlug, pathFor } from "@/app/lib/routes";
import { absoluteUrl, buildPageMetadata, getSeoEntry } from "@/app/lib/seo";

/**
 * Shared implementation of the blog page. The blog needs live D1 content, so
 * it cannot share the statically generated `[lang]/[slug]` route: each
 * localized blog slug gets its own `force-dynamic` route folder that calls
 * into this module (mixing request-time data into the on-demand-ISR
 * `[slug]` route fails with DYNAMIC_SERVER_USAGE).
 */

type Params = Promise<{ lang: string }>;

async function resolve(params: Params, slug: string) {
  const { lang } = await params;
  if (!isLang(lang) || keyForSlug(lang, slug) !== "blog") return null;
  return lang;
}

export async function blogMetadata(params: Params, slug: string): Promise<Metadata> {
  const lang = await resolve(params, slug);
  return lang ? buildPageMetadata("blog", lang) : {};
}

export async function renderBlogRoute(params: Params, slug: string) {
  const lang = await resolve(params, slug);
  if (!lang) notFound();

  const dict = getDict(lang);
  const path = pathFor("blog", lang) ?? `/${lang}`;
  const seo = getSeoEntry("blog", lang);
  const posts = await getPublishedPosts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Autotherm", url: absoluteUrl(`/${lang}`) },
          { name: seo.title, url: absoluteUrl(path) },
        ]}
      />
      <BlogPage
        dict={dict}
        lang={lang}
        posts={posts}
        heroImage={heroImageFor.blog ?? HERO_IMAGE_FALLBACK}
      />
    </>
  );
}
