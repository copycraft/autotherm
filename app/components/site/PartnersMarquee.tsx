import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import ClientLogoStrip from "@/app/components/site/ClientLogoStrip";
import type { Dict } from "@/app/lib/dictionaries";

export default function PartnersMarquee({ dict }: { dict: Dict }) {
  const partners = [
    {
      name: "Carrier Transicold",
      body: dict.home.partners.carrier,
      // Just the oval; "Transicold" is set in the site face beside it so the
      // lockup reads horizontally at the same weight as the other two marks.
      logo: "/images/carrier-oval.webp",
      w: 420,
      h: 167,
      wordmark: "Transicold",
    },
    {
      name: "Daikin",
      body: dict.home.partners.daikin,
      logo: "/images/daikin-logo.webp",
      w: 440,
      h: 95,
    },
    {
      name: "Autoclima",
      body: dict.home.partners.autoclima,
      logo: "/images/autoclima-logo.webp",
      w: 440,
      h: 64,
    },
  ];
  return (
    <section className="mesh-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={16}>
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-brand-500" aria-hidden="true" />
            <p className="text-xs font-bold tracking-[0.28em] text-brand-600 uppercase">
              {dict.home.partners.eyebrow}
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" distance={20} delay={0.1}>
          <h2 className="mt-4 block text-4xl font-extrabold tracking-tighter text-balance text-ink-900 sm:text-5xl">
            {dict.home.partners.title}
          </h2>
        </Reveal>
        <Reveal direction="up" distance={20} delay={0.25}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
            {dict.home.partners.lead}
          </p>
        </Reveal>
        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {partners.map((p) => (
            <RevealItem
              key={p.name}
              className="panel-ring rounded-3xl bg-white p-8 shadow-soft"
            >
              {p.logo ? (
                /* Marks are bounded by height *and* width so the round Carrier
                   badge and the wide Daikin/Autoclima wordmarks land at a
                   comparable optical weight. */
                <div className="flex h-10 items-center gap-2.5">
                  <Image
                    src={p.logo}
                    alt={p.wordmark ? "Carrier" : p.name}
                    width={p.w}
                    height={p.h}
                    className="max-h-10 w-auto max-w-[170px] object-contain"
                  />
                  {p.wordmark && (
                    <span className="text-xl font-extrabold tracking-tight text-ink-900 uppercase">
                      {p.wordmark}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-2xl font-black tracking-tighter text-ink-900">
                  {p.name}
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-ink-600">
                {p.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
        <ClientLogoStrip />
      </div>
    </section>
  );
}
