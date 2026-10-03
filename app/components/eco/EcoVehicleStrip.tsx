import Image from "next/image";
import { PinnedHorizontalScroll } from "@/app/components/motion/HorizontalGallery";
import type { Lang } from "@/app/lib/constants";
import { ECO_VEHICLES, ecoPath, getEcoDict } from "@/app/lib/eco";

/**
 * The convertible electric vans, scrolled through sideways: each studio shot
 * on its own white card (the photos are white-background cut-outs) with the
 * make and model under the car.
 */
export default function EcoVehicleStrip({ lang }: { lang: Lang }) {
  const { strip } = getEcoDict(lang);

  return (
    <PinnedHorizontalScroll
      tone="light"
      eyebrow={strip.eyebrow}
      title={strip.title}
      cta={{ href: ecoPath("vehicles", lang), label: strip.cta }}
    >
      {ECO_VEHICLES.map((v, i) => (
        <figure
          key={v.model}
          className="panel-ring flex w-[min(80vw,24rem)] shrink-0 flex-col rounded-3xl bg-white p-6 shadow-soft"
        >
          <span className="text-xs font-black text-brand-600 tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <Image
            src={v.image}
            alt={`${v.make} ${v.model}`}
            width={521}
            height={365}
            // Loaded up front: browser lazy-loading doesn't reliably fire for
            // items inside the pinned, transformed track, and these files are
            // ~15 KB each. Already sized for this card, so served as-is.
            loading="eager"
            unoptimized
            className="mt-2 aspect-[521/365] h-auto w-full object-contain"
          />
          <figcaption className="mt-4 border-t border-ink-100 pt-4">
            <span className="block text-sm font-semibold text-ink-500">{v.make}</span>
            <span className="block text-2xl font-black tracking-tighter text-ink-900">{v.model}</span>
          </figcaption>
        </figure>
      ))}
    </PinnedHorizontalScroll>
  );
}
