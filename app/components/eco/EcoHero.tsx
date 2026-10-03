"use client";

import { motion, useReducedMotion } from "framer-motion";
import MagneticButton from "@/app/components/motion/MagneticButton";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";
import Eyebrow from "@/app/components/ui/Eyebrow";
import type { EcoDict } from "@/app/lib/eco-i18n";

/**
 * ehutoauto.hu home hero. No photography yet (there are no electric-van
 * shots in the library), so the plate is a line drawing of an electric
 * refrigerated van on charge that traces itself in.
 */
export default function EcoHero({
  copy,
  quoteLabel,
  quoteHref,
  technologyHref,
}: {
  copy: EcoDict["hero"];
  quoteLabel: string;
  quoteHref: string;
  technologyHref: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      pathLength: { duration: reduced ? 0 : 1.6, ease: EASE_CINEMATIC, delay: reduced ? 0 : delay },
      opacity: { duration: 0.01, delay: reduced ? 0 : delay },
    },
  });
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE_CINEMATIC, delay },
  });

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-32 pb-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-32">
        <div className="lg:col-span-6">
          <motion.div {...fade(0.1)}>
            <Eyebrow label={copy.eyebrow} />
          </motion.div>
          <motion.h1
            {...fade(0.2)}
            className="mt-8 text-5xl font-black tracking-tighter text-balance text-white sm:text-6xl xl:text-7xl"
          >
            {copy.title}
          </motion.h1>
          <motion.p
            {...fade(0.35)}
            className="mt-4 text-2xl font-extrabold tracking-tight text-frost-300 sm:text-3xl"
          >
            {copy.tagline}
          </motion.p>
          <motion.p {...fade(0.5)} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-200">
            {copy.lead}
          </motion.p>
          <motion.div {...fade(0.65)} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href={quoteHref} variant="primary">
              {quoteLabel}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton href={technologyHref} variant="ghost">
              {copy.howItWorks}
            </MagneticButton>
          </motion.div>
          <motion.ul {...fade(0.8)} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6">
            {copy.points.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-semibold text-ink-200">
                <span className="h-1.5 w-1.5 rounded-full bg-frost-300" aria-hidden="true" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Electric refrigerated van on charge. */}
        <div className="lg:col-span-6">
          <svg viewBox="0 0 520 340" className="mx-auto w-full max-w-xl" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {/* ground */}
            <motion.path {...draw(0.2)} d="M20 286h480" className="stroke-white/15" strokeWidth="2" />
            {/* insulated cargo box */}
            <motion.path {...draw(0.3)} d="M40 92h262v170H40z" className="stroke-frost-300" strokeWidth="4" />
            {/* cab */}
            <motion.path {...draw(0.5)} d="M302 262V132h70l52 58v72z" className="stroke-frost-300" strokeWidth="4" />
            <motion.path {...draw(0.7)} d="M318 148h46l38 42h-84z" className="stroke-frost-300/60" strokeWidth="3" />
            {/* wheels */}
            <motion.circle {...draw(0.8)} cx="110" cy="268" r="24" className="stroke-white" strokeWidth="4" />
            <motion.circle {...draw(0.9)} cx="370" cy="268" r="24" className="stroke-white" strokeWidth="4" />
            {/* snowflake on the box */}
            <motion.path
              {...draw(1.1)}
              d="M171 135v84M134 156l74 42M208 156l-74 42M163 140l8 8 8-8M163 214l8-8 8 8"
              className="stroke-white"
              strokeWidth="3.5"
            />
            {/* self-contained battery pack under the box */}
            <motion.path {...draw(1.3)} d="M200 236h66v26h-66zM212 236v-6M254 236v-6" className="stroke-brand-400" strokeWidth="3" />
            <motion.path {...draw(1.5)} d="M236 241l-8 11h10l-6 9" className="stroke-frost-300" strokeWidth="3" />
            {/* charging cable to the post */}
            <motion.path {...draw(1.6)} d="M424 220c30 0 34 40 60 40v-120" className="stroke-brand-400" strokeWidth="3" />
            <motion.path {...draw(1.8)} d="M468 70h32v70h-32zM476 86h16M480 102l-6 10h10l-6 10" className="stroke-white/80" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
