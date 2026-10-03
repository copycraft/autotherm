import Image from "next/image";
import { PinnedHorizontalScroll } from "@/app/components/motion/HorizontalGallery";
import type { Lang } from "@/app/lib/constants";
import { HEARSE_BUILDS, getHearseDict, hearsePath } from "@/app/lib/hearse";

/**
 * The finished hearse conversions, scrolled through sideways: each build's
 * cover shot on its own card with the build number under the photo.
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
      {HEARSE_BUILDS.map((b, i) => (
        <figure
          key={b.id}
          className="panel-ring flex w-[min(80vw,24rem)] shrink-0 flex-col rounded-3xl bg-white p-6 shadow-soft"
        >
          <span className="text-xs font-black text-brand-600 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <Image
            src={b.image}
            alt={`Halottszállító ${b.no}`}
            width={640}
            height={480}
            // Loaded up front: browser lazy-loading doesn't reliably fire for
            // items inside the pinned, transformed track.
            loading="eager"
            unoptimized
            className="mt-2 aspect-[4/3] h-auto w-full rounded-2xl object-cover"
          />
          <figcaption className="mt-4 border-t border-ink-100 pt-4">
            <span className="block text-sm font-semibold text-ink-500">Autotherm</span>
            <span className="block text-2xl font-black tracking-tighter text-ink-900">
              Halottszállító {b.no}
            </span>
          </figcaption>
        </figure>
      ))}
    </PinnedHorizontalScroll>
  );
}
