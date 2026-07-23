"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Viewport-triggered stat counter. Animates a number from 0 to `value`
 * with an exponential ease-out once at least 50% visible.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1.8,
  className,
  locale = "hu-HU",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  locale?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {new Intl.NumberFormat(locale).format(display)}
      {suffix}
    </span>
  );
}
