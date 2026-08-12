"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { PEAK_VELOCITY, useScrollMetrics } from "./SmoothScroll";

/**
 * Live velocity distortion for large media.
 *
 * Unlike the reveals — which sample the scroll once and play — this reacts
 * continuously: the plate stretches along the scroll axis and leans very
 * slightly while the page is moving, then springs back to true the moment you
 * stop. It is the effect that makes the page feel physically connected to the
 * wheel rather than merely triggered by it.
 *
 * Kept deliberately small (max ~5% stretch, ~1.6° lean); past that it reads as
 * a gimmick on product photography.
 */
export default function VelocityStretch({
  children,
  className,
  strength = 1,
}: {
  children: ReactNode;
  className?: string;
  /** Scales the whole effect. 0 disables it. */
  strength?: number;
}) {
  const { velocity } = useScrollMetrics();

  const normalised = useTransform(
    velocity,
    [-PEAK_VELOCITY, 0, PEAK_VELOCITY],
    [-1, 0, 1],
    { clamp: true },
  );
  const eased = useSpring(normalised, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });

  const scaleY = useTransform(eased, (v) => 1 + Math.abs(v) * 0.05 * strength);
  const skewY = useTransform(eased, (v) => v * 1.6 * strength);

  return (
    <motion.div
      className={className}
      style={{ scaleY, skewY }}
      // The distortion is decorative; it must never introduce a scrollbar.
      aria-hidden={false}
    >
      {children}
    </motion.div>
  );
}
