import CtaBand from "@/app/components/site/CtaBand";
import GalleryPage, { type GalleryItem } from "@/app/components/templates/GalleryPage";
import type { Lang } from "@/app/lib/constants";
import { HEARSE_BUILDS, HEARSE_CONTACT, buildPhoto, buildSpec, getHearseDict, hearsePath } from "@/app/lib/hearse";

/**
 * Every photo of every build, filterable by make, in the main site's gallery
 * (lightbox, arrow keys). Each photo is captioned with its vehicle and spec.
 */
export default function HearseBuildsPage({ lang }: { lang: Lang }) {
  const dict = getHearseDict(lang);
  const t = dict.builds;

  const makes = [...new Set(HEARSE_BUILDS.map((b) => b.make))];
  const images: GalleryItem[] = HEARSE_BUILDS.flatMap((b, i) => {
    const spec = buildSpec(b, lang);
    const alt = spec ? `${b.make} ${b.model} – ${spec}` : `${b.make} ${b.model}`;
    return Array.from({ length: b.photos }, (_, k) => ({
      src: buildPhoto(i, k + 1),
      category: b.make,
      alt,
    }));
  });

  const gallery = {
    eyebrow: t.eyebrow,
    title: t.title,
    lead: t.lead,
    all: t.all,
    categories: makes.map((m) => ({ id: m, label: m })),
    close: dict.common.close,
    prev: t.prev,
    nextImg: t.next,
    imageAlt: t.imageAlt,
  };

  return (
    <>
      <GalleryPage dict={{ gallery }} images={images} heroImage="/images/hearse/hero.webp" />
      <CtaBand
        title={t.cta.title}
        body={t.cta.body}
        primaryLabel={dict.common.getQuote}
        quoteHref={hearsePath("quote", lang)}
        phone={HEARSE_CONTACT.phone}
        phoneHref={HEARSE_CONTACT.phoneHref}
      />
    </>
  );
}
