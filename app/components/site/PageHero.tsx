"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Fragment, useRef, type ReactNode } from "react";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import { textWord } from "@/app/components/motion/RevealText";
import Eyebrow from "@/app/components/ui/Eyebrow";
import { heroImagePosition } from "@/app/lib/hero-images";

/**
 * Shared photographic page header.
 *
 * Same visual language as the homepage hero — full-bleed plate, layered scrim,
 * slow parallax, hard cut into the next section — at roughly half the height,
 * so a subpage never masquerades as a landing page.
 *
 * Falls back to the flat ink surface when no plate is supplied (the legal
 * pages, where photography would be noise).
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  /** Defaults to the plate's registered focal point (hero-images.ts), else a
      slight upward bias: several older plates carry a bottom watermark. */
  imagePosition,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: string;
  imagePosition?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const words = title.split(" ");

  return (
    <section
      ref={ref}
      /* Every subpage header resolves to the SAME height at a given viewport.
         Page-to-page variation (a two-line title here, a CTA there) used to
         swing this by 70–130px, which reads as the layout lurching underneath
         the cross-dissolve. The floor is set above the tallest measured
         content across all four languages, so content never pushes past it —
         while `svh` keeps the proportions sane on very tall screens. */
      className="relative flex min-h-[max(36rem,50svh)] items-end overflow-hidden bg-ink-950 lg:min-h-[max(38rem,58svh)]"
    >
      {image && (
        <motion.div style={{ y: plateY }} className="absolute inset-0" aria-hidden="true">
          <Image
            src={image}
            alt=""
            fill
            preload
            quality={90}
            sizes="100vw"
            className="scale-105 object-cover"
            style={{
              objectPosition:
                imagePosition ?? (image && heroImagePosition[image]) ?? "center 40%",
            }}
          />
        </motion.div>
      )}

      <div className="absolute inset-0 bg-ink-950/50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/15 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/75 lg:to-ink-950/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-36 lg:pb-20">
        <motion.div style={{ y: contentY }} className="max-w-3xl">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_CINEMATIC, delay: 0.1 }}
            >
              <Eyebrow label={eyebrow} />
            </motion.div>
          )}

          <motion.h1
            className="mt-5 text-4xl font-black tracking-tighter text-balance text-white sm:text-5xl xl:text-6xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
            }}
            aria-label={title}
          >
            {/* The word sits in an overflow-hidden mask so it can slide up from
                nothing. The separating space must live *outside* that mask —
                a trailing space inside an inline-block is trimmed by CSS, which
                silently welds the words together once a title wraps. */}
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="-mx-[0.1em] inline-block overflow-hidden px-[0.1em] align-bottom pb-1">
                  <motion.span variants={textWord} className="inline-block will-change-transform">
                    {w}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </motion.h1>

          {lead && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.5 }}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-200"
            >
              {lead}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_CINEMATIC, delay: 0.65 }}
              className="mt-7 flex flex-wrap gap-4"
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
