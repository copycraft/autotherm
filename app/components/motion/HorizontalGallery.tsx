"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/app/components/ui/Eyebrow";

/**
 * Scroll-driven horizontal photo strip.
 *
 * The section is exactly as tall as the strip is wide (plus one viewport), so
 * vertical scroll maps 1:1 onto horizontal travel - nothing is hijacked, the
 * page simply pins while the strip slides past. Distance is measured, not
 * guessed, so it holds at every viewport and image count.
 *
 * Reduced motion is handled in CSS (motion-reduce:) rather than a hook, so the
 * server and client markup can never disagree: the pin collapses and the strip
 * becomes an ordinary swipeable row.
 */
export default function HorizontalGallery({
  images,
  alt,
  eyebrow,
  title,
  cta,
}: {
  images: string[];
  alt: string;
  eyebrow: string;
  title: string;
  cta?: { href: string; label: string };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const travel = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(d);
      travel.set(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [travel]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * travel.get());

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink-950 motion-reduce:!h-auto"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-16 motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <div>
            <Eyebrow label={eyebrow} />
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-white sm:text-5xl">
              {title}
            </h2>
          </div>
          {cta && (
            <Link
              href={cta.href}
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-frost-300 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-frost-400 focus-visible:outline-none"
            >
              {cta.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          )}
        </div>

        <div className="mt-12 motion-reduce:overflow-x-auto">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-4 px-4 sm:gap-5 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] motion-reduce:!transform-none"
          >
            {images.map((src, i) => (
              <figure
                key={src}
                className="relative aspect-[4/3] h-[clamp(14rem,44svh,26rem)] shrink-0 overflow-hidden rounded-3xl"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 640px) 36rem, 80vw"
                  className="object-cover"
                />
                <figcaption className="absolute top-4 left-4 rounded-md bg-ink-950/70 px-2 py-1 text-xs font-black text-frost-300 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
