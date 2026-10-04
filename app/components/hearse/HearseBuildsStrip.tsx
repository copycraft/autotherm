import Image from "next/image";
import { PinnedHorizontalScroll } from "@/app/components/motion/HorizontalGallery";
import type { Lang } from "@/app/lib/constants";
import { HEARSE_BUILDS, buildPhoto, buildSpec, getHearseDict, hearsePath } from "@/app/lib/hearse";

/** How many of the newest builds the home page strip shows. */
const SHOWN = 8;

/**
 * The newest conversions, scrolled through sideways: each build's first photo
 * on its own card, with the vehicle and its spec under it.
 */
export default function HearseBuildsStrip({ lang }: { lang: Lang }) {
  const { strip } = getHearseDict(lang);

  return (
    <PinnedHorizontalScroll
      tone="light"
      eyebrow={strip.eyebrow}
      title={strip.title}
      cta={{ href: hearsePath("builds", lang), label: strip.cta }}
    >
      {HEARSE_BUILDS.slice(0, SHOWN).map((b, i) => {
        const spec = buildSpec(b, lang);
        return (
          <figure
            key={i}
            className="panel-ring flex w-[min(80vw,24rem)] shrink-0 flex-col rounded-3xl bg-white p-6 shadow-soft"
          >
            <span className="text-xs font-black text-brand-600 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Image
              src={buildPhoto(i)}
              alt={`${b.make} ${b.model}`}
              width={640}
              height={480}
              // Loaded up front: browser lazy-loading doesn't reliably fire for
              // items inside the pinned, transformed track.
              loading="eager"
              sizes="24rem"
              className="mt-2 aspect-[4/3] h-auto w-full rounded-2xl object-cover"
            />
            <figcaption className="mt-4 border-t border-ink-100 pt-4">
              <span className="block text-sm font-semibold text-ink-500">{b.make}</span>
              <span className="block text-2xl font-black tracking-tighter text-ink-900">{b.model}</span>
              {spec && <span className="mt-1 block text-sm font-semibold text-brand-600">{spec}</span>}
            </figcaption>
          </figure>
        );
      })}
    </PinnedHorizontalScroll>
  );
}
