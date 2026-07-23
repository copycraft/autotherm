"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked parallax container - translates children on the Y axis
 * relative to viewport progress. Transform-only, fully composited.
 */
export default function Parallax({
  children,
  className,
  speed = 0.2,
}: {
  children: ReactNode;
  className?: string;
  /** Positive = moves slower than scroll (background feel). */
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
