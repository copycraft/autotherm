"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal, EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import type { Dict } from "@/app/lib/dictionaries";
import type { GalleryImage } from "@/app/lib/page-content";

/**
 * Gallery - filterable masonry-ish grid with a keyboard-accessible lightbox.
 * Layout animations use FLIP transforms via <motion layout>; the lightbox is
 * a proper dialog (aria-modal, Esc to close, arrow-key navigation).
 */
export default function GalleryPage({
  dict,
  images,
}: {
  dict: Dict;
  images: GalleryImage[];
}) {
  const g = dict.gallery;
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const filtered =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      setLightbox((current) =>
        current === null
          ? null
          : (current + dir + filtered.length) % filtered.length,
      );
    },
    [filtered.length],
  );

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
      <section className="mesh-hero relative overflow-hidden pt-40 pb-24">
        <div className="grid-overlay absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-brand-500/25 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal direction="up" distance={16}>
            <div className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 animate-shimmer rounded-full bg-frost-300" aria-hidden="true" />
              <p className="text-[11px] font-bold tracking-[0.18em] text-frost-200 uppercase">
                {g.eyebrow}
              </p>
            </div>
          </Reveal>
          <RevealText
            as="h1"
            text={g.title}
            delay={0.1}
            className="mt-5 block max-w-3xl text-4xl font-black tracking-tighter text-balance text-white sm:text-6xl"
          />
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">{g.lead}</p>
          </Reveal>
        </div>
      </section>

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
                className={`rounded-full px-5 py-2.5 text-sm font-bold tracking-tight transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none ${
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
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: EASE_CINEMATIC }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`${g.imageAlt} ${i + 1}`}
                  className="group relative aspect-square overflow-hidden rounded-3xl focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Image
                    src={img.src}
                    alt={g.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-300 group-hover:bg-ink-950/25" aria-hidden="true" />
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-xl sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={g.imageAlt}
            onClick={close}
          >
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
              className="absolute left-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none sm:flex"
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
              className="absolute right-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <motion.div
              key={filtered[lightbox].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
              className="relative max-h-full w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightbox].src}
                alt={g.imageAlt}
                width={1600}
                height={1200}
                sizes="90vw"
                className="max-h-[82vh] w-full rounded-3xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
