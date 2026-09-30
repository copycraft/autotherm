import Image from "next/image";
import { Reveal } from "@/app/components/motion/Reveal";
import clientLogos from "@/app/lib/client-logos.json";

/**
 * Infinite marquee of client logos, fed by public/clients/.
 *
 * To add a client, drop its logo into that folder - the file name becomes the
 * client's name. The list is generated from the folder by next.config.ts
 * (app/lib/client-logos.json), so nothing here needs editing. Renders nothing
 * when the folder is empty.
 */
export default function ClientLogoStrip() {
  if (clientLogos.length === 0) return null;

  // The list runs twice so the -50% marquee loop is seamless; the second copy
  // is decorative and hidden from assistive tech.
  const loop = [...clientLogos, ...clientLogos];

  return (
    <Reveal className="mt-16 overflow-hidden" delay={0.1}>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-50 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-50 to-transparent"
          aria-hidden="true"
        />
        {/* ~7s per logo keeps the scroll speed the same however many there are
            (the stock 38s loop suited five). */}
        <div
          className="flex w-max animate-marquee items-center gap-16 py-4"
          style={{ animationDuration: `${Math.max(30, clientLogos.length * 7)}s` }}
        >
          {loop.map((logo, i) => {
            const decorative = i >= clientLogos.length;
            return (
              <Image
                key={`${logo.src}-${i}`}
                src={logo.src}
                alt={decorative ? "" : logo.name}
                aria-hidden={decorative ? true : undefined}
                // Sizing is done in CSS (fixed height, natural width); these
                // only seed the aspect ratio until the file loads.
                width={160}
                height={64}
                // Logos are served untouched: the optimiser re-encodes at
                // quality 75, which softens their hard edges, and it doesn't
                // process SVG at all.
                unoptimized
                className="h-10 w-auto max-w-[240px] object-contain opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              />
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
