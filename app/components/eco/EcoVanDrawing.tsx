"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_CINEMATIC } from "@/app/components/motion/Reveal";

/**
 * Line drawing of an electric refrigerated van on charge that traces itself in
 * as it scrolls into view. Strokes are light, so it belongs on a dark surface.
 */
export default function EcoVanDrawing({ className = "" }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: {
      pathLength: { duration: reduced ? 0 : 1.6, ease: EASE_CINEMATIC, delay: reduced ? 0 : delay },
      opacity: { duration: 0.01, delay: reduced ? 0 : delay },
    },
  });

  return (
    <svg viewBox="0 0 520 340" className={className} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <motion.path {...draw(1.8)} d="M468 70h32v70h-32zM476 86h16M480 102l-6 10h10l-6 9" className="stroke-white/80" strokeWidth="3" />
    </svg>
  );
}
