"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import PageHero from "@/app/components/site/PageHero";
import type { Dict } from "@/app/lib/dictionaries";

/** A photo in the grid; `alt` (e.g. the vehicle's name) defaults to the generic label. */
export interface GalleryItem {
  src: string;
  category: string;
  alt?: string;
}

/** Shared-element move between a thumbnail and the lightbox. */
const SHARED = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;

/** Lightbox chrome (backdrop, buttons): in with the photo, out ahead of it. */
const FADE = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
} as const;

/**
 * Gallery - filterable masonry-ish grid with a keyboard-accessible lightbox.
 * Layout animations use FLIP transforms via <motion layout>; the lightbox is
 * a proper dialog (aria-modal, Esc to close, arrow-key navigation).
 */
export default function GalleryPage({
  dict,
  images,
  heroImage,
}: {
  /** Only the gallery copy is used, so the microsites can pass their own. */
  dict: { gallery: Dict["gallery"] };
  images: GalleryItem[];
  heroImage?: string;
}) {
  const g = dict.gallery;
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  /**
   * The thumbnail the lightbox was opened from, with its aspect ratio. While
   * set, the open photo shares a layoutId with that thumbnail so it grows out
   * of the grid and shrinks back into it. Stepping to another photo clears it:
   * that photo has no honest origin on screen, so it simply crossfades.
   */
  const [origin, setOrigin] = useState<{ src: string; ratio: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  const open = useCallback((index: number, thumb: HTMLElement) => {
    const img = thumb.querySelector("img");
    const ratio = img && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 4 / 3;
    setOrigin({ src: filtered[index].src, ratio });
    setLightbox(index);
  }, [filtered]);
  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setOrigin(null);
      setLightbox((current) =>
        current === null
          ? null
          : (current + dir + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

  const current = lightbox !== null ? filtered[lightbox] : undefined;
  const shared = current && origin?.src === current.src ? origin : null;

  useEffect(() => {
    if (lightbox === null) return;
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const categories = [{ id: "all", label: g.all }, ...g.categories];

  return (
    <>
      <PageHero eyebrow={g.eyebrow} title={g.title} lead={g.lead} image={heroImage} />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label={g.eyebrow}>
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                aria-pressed={filter === cat.id}
                className={`rounded-lg px-5 py-2.5 text-sm font-bold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
                  filter === cat.id
                    ? "bg-brand-600 text-white shadow-glow"
                    : "bg-ink-50 text-ink-600 ring-1 ring-ink-200 hover:bg-ink-100"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <motion.div layout className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.button
                  key={img.src}
                  layout
                  type="button"
                  onClick={(e) => open(i, e.currentTarget)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={img.alt ?? `${g.imageAlt} ${i + 1}`}
                  /* No overflow-hidden here: the shared photo must be free to
                     travel outside its cell when it flies back from the lightbox.
                     The origin cell is lifted so it lands above its neighbours. */
                  className={`group relative aspect-square rounded-3xl focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    origin?.src === img.src ? "z-10" : ""
                  }`}
                >
                  <motion.div
                    layoutId={`gallery-${img.src}`}
                    className="absolute inset-0 overflow-hidden"
                    style={{ borderRadius: 18 }}
                    transition={SHARED}
                  >
                    {/* Counter-scaled layer: keeps the photo undistorted while
                        its frame morphs between square and true proportions. */}
                    <motion.div layout className="absolute inset-0" transition={SHARED}>
                      <Image
                        src={img.src}
                        alt={img.alt ?? g.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/25" aria-hidden="true" />
                  </motion.div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={current.alt ?? g.imageAlt}
            onClick={close}
          >
            {/* Backdrop and controls fade on their own layer; the photo does
                not, so it stays solid while it travels to and from the grid.
                AnimatePresence waits for these nested exits before unmounting.
                The exit is quick so the photo shrinking home isn't hidden. */}
            <motion.div
              className="absolute inset-0 bg-ink-950/90 backdrop-blur-xl"
              aria-hidden="true"
              {...FADE}
            />
            <motion.div className="pointer-events-none absolute inset-0 z-10 [&>button]:pointer-events-auto" {...FADE}>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label={g.close}
              className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label={g.prev}
              className="absolute top-1/2 left-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label={g.nextImg}
              className="absolute top-1/2 right-4 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            </motion.div>

            {shared ? (
              <motion.div
                key={current.src}
                layoutId={`gallery-${current.src}`}
                transition={SHARED}
                className="relative overflow-hidden"
                style={{
                  borderRadius: 18,
                  aspectRatio: shared.ratio,
                  // Largest box of the photo's own proportions that fits.
                  width: `min(64rem, 100%, calc(82vh * ${shared.ratio}))`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div layout className="absolute inset-0" transition={SHARED}>
                  <Image
                    src={current.src}
                    alt={current.alt ?? g.imageAlt}
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
                className="relative max-h-full w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={current.src}
                  alt={current.alt ?? g.imageAlt}
                  width={1600}
                  height={1200}
                  sizes="90vw"
                  className="max-h-[82vh] w-full rounded-3xl object-contain"
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
