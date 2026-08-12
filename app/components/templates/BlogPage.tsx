import { marked } from "marked";
import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import CtaBand from "@/app/components/site/CtaBand";
import PageHero from "@/app/components/site/PageHero";
import PartnersMarquee from "@/app/components/site/PartnersMarquee";
import StatsBand from "@/app/components/site/StatsBand";
import type { Lang } from "@/app/lib/constants";
import type { BlogPost } from "@/app/lib/db";
import type { Dict } from "@/app/lib/dictionaries";
import { pathFor } from "@/app/lib/routes";

export default async function BlogPage({
  dict,
  lang,
  posts,
  heroImage,
}: {
  dict: Dict;
  lang: Lang;
  posts: BlogPost[];
  heroImage?: string;
}) {
  const b = dict.blogPage;
  const quoteHref = pathFor("quotation", lang) ?? `/${lang}`;

  const localized = posts
    .map((post) => ({
      id: post.id,
      title: post[`${lang}_title`] || post.hu_title,
      content: post[`${lang}_content`] || post.hu_content,
      image: post.image,
      createdAt: post.created_at,
    }))
    .filter((post) => post.title);

  return (
    <>
      <PageHero eyebrow={b.eyebrow} title={b.title} lead={b.lead} image={heroImage} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {localized.length === 0 ? (
            <Reveal>
              <div className="panel-ring rounded-4xl bg-ink-50 p-14 text-center">
                <p className="text-lg font-semibold text-ink-600">{b.empty}</p>
              </div>
            </Reveal>
          ) : (
            <RevealGroup className="flex flex-col gap-10">
              {localized.map((post) => (
                <RevealItem key={post.id}>
                  <article className="panel-ring overflow-hidden rounded-4xl bg-white shadow-soft transition-shadow duration-300 hover:shadow-lifted">
                    {post.image && (
                      <div className="relative h-64 w-full sm:h-80">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(min-width: 640px) 56rem, 100vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/20 to-transparent" aria-hidden="true" />
                      </div>
                    )}
                    <div className="p-8 sm:p-12">
                      <p className="text-xs font-bold tracking-[0.15em] text-brand-600 uppercase">
                        {b.published} · {post.createdAt?.slice(0, 10)}
                      </p>
                      <h2 className="mt-3 text-3xl font-extrabold tracking-tighter text-ink-900">
                        {post.title}
                      </h2>
                      <div
                        className="prose-autotherm mt-6"
                        dangerouslySetInnerHTML={{
                          __html: marked.parse(post.content ?? "", { async: false }),
                        }}
                      />
                    </div>
                  </article>
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </div>
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
