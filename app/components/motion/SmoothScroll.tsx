"use client";

import {
  MotionConfig,
  motionValue,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { ReactLenis, useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

/**
 * Smooth-scroll runtime + the scroll metrics the motion primitives read.
 *
 * Lenis drives an inertial scroll (the wheel sets a target, the page eases
 * toward it) and, because everything downstream is scroll-*reactive*, it also
 * becomes the single source of truth for how fast and which way the user is
 * moving. `Reveal`, `DollyImage` and `VelocityStretch` all sample these values
 * at the moment they matter rather than animating on a fixed timeline.
 *
 * Lenis honours `prefers-reduced-motion` itself (lerp is forced to 1, so scroll
 * tracks the input device exactly); the consumers below additionally collapse
 * their own effects, so the reduced-motion experience is a plain page.
 */

/** Lenis velocity magnitude treated as "full speed" when normalising. */
export const PEAK_VELOCITY = 45;

export type ScrollMetrics = {
  /** Signed scroll velocity, Lenis units. Negative = scrolling up. */
  velocity: MotionValue<number>;
  /** Absolute speed normalised to 0→1, clamped at PEAK_VELOCITY. */
  intensity: MotionValue<number>;
  /** Latest travel direction: 1 = down, -1 = up. Sampled when a reveal fires. */
  direction: MotionValue<1 | -1>;
};

/**
 * Inert fallback so motion primitives still render outside the provider
 * (the admin area and the 404 page are not wrapped).
 */
const STATIC_METRICS: ScrollMetrics = {
  velocity: motionValue(0),
  intensity: motionValue(0),
  direction: motionValue<1 | -1>(1),
};

const ScrollContext = createContext<ScrollMetrics | null>(null);

export function useScrollMetrics(): ScrollMetrics {
  return useContext(ScrollContext) ?? STATIC_METRICS;
}

/** Publishes Lenis' per-frame state into motion values. Renders nothing. */
function ScrollBridge({ metrics }: { metrics: ScrollMetrics }) {
  const pathname = usePathname();

  const lenis = useLenis((instance) => {
    const v = instance.velocity;
    metrics.velocity.set(v);
    metrics.intensity.set(Math.min(Math.abs(v) / PEAK_VELOCITY, 1));
    // Ignore sub-pixel jitter so the direction does not flip while settling.
    if (v > 0.05) metrics.direction.set(1);
    else if (v < -0.05) metrics.direction.set(-1);
  });

  // Route changes must land at the top instantly; without this Lenis keeps
  // easing toward the previous page's scroll target.
  useEffect(() => {
    if (!lenis) return;
    if (window.location.hash) return; // let anchor handling do its thing
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const velocity = useMotionValue(0);
  const intensity = useMotionValue(0);
  const direction = useMotionValue<1 | -1>(1);

  const metrics = useMemo<ScrollMetrics>(
    () => ({ velocity, intensity, direction }),
    [velocity, intensity, direction],
  );

  return (
    <ScrollContext.Provider value={metrics}>
      {/* Framer does not honour prefers-reduced-motion by itself, and the CSS
          override in globals.css only reaches CSS animations — not the JS
          transforms these primitives use. `reducedMotion="user"` disables
          transform/layout animation while leaving opacity, so reveals become
          plain cross-fades instead of disappearing entirely. */}
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{
            // Weight of the easing: low lerp = long, heavy glide. 0.11 reads
            // as "engineered" rather than floaty on a business site.
            lerp: 0.11,
            wheelMultiplier: 1,
            // Native inertia on touch already feels right; syncing it fights
            // the OS and makes phones feel laggy.
            syncTouch: false,
            anchors: true,
            stopInertiaOnNavigate: true,
          }}
        >
          <ScrollBridge metrics={metrics} />
          {children}
        </ReactLenis>
      </MotionConfig>
    </ScrollContext.Provider>
  );
}
