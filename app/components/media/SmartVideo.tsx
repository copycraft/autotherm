"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Heavy Video Protocol implementation.
 *
 * - `preload="none" playsInline muted loop` - zero bytes until needed
 * - Viewport lifecycle: plays when ≥20% visible, pauses the instant it leaves
 * - Poster-first: a compressed poster image renders immediately; the video
 *   fades in over it once actual frames are available
 * - `hoverToPlay` mode for grid thumbnails: poster by default, playback on
 *   mouseenter, pause + reset to frame 0 on mouseleave
 * - Missing/unuploaded sources degrade gracefully to the poster (no black box)
 */
export default function SmartVideo({
  src,
  poster,
  className = "",
  hoverToPlay = false,
  rounded = "rounded-3xl",
  label,
}: {
  src: string;
  poster: string;
  className?: string;
  hoverToPlay?: boolean;
  rounded?: string;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v || failed) return;
    v.play().catch(() => {
      /* Autoplay rejection or missing source - poster remains visible. */
    });
  }, [failed]);

  const pause = useCallback(
    (reset = false) => {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      if (reset) v.currentTime = 0;
    },
    [],
  );

  useEffect(() => {
    if (hoverToPlay) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play();
          } else {
            // Pause instantly off-screen - frees GPU memory and battery.
            pause();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hoverToPlay, play, pause]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${rounded} ${className}`}
      onMouseEnter={hoverToPlay ? () => play() : undefined}
      onMouseLeave={hoverToPlay ? () => pause(true) : undefined}
    >
      {/* Poster fallback - always painted first, never a blank black box. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!failed && (
        <video
          ref={videoRef}
          playsInline
          muted
          loop
          preload="none"
          poster={poster}
          aria-hidden={label ? undefined : true}
          aria-label={label}
          onCanPlay={() => setCanPlay(true)}
          onError={() => setFailed(true)}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${canPlay ? "opacity-100" : "opacity-0"}`}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
