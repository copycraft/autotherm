import Image from "next/image";
import {
  DollyImage,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/app/components/motion/Reveal";
import type { Dict } from "@/app/lib/dictionaries";

const clientLogos = [
  { src: "/images/pick-logo.jpg", alt: "Pick" },
  { src: "/images/hovany-logo.jpg", alt: "Hovány" },
  { src: "/images/elite-logo.png", alt: "Elite" },
  { src: "/images/monster-logo.png", alt: "Monster" },
  { src: "/images/garancia-logo.png", alt: "Garancia" },
  { src: "/images/carrier-logo.png", alt: "Carrier Transicold" },
];

export default function PartnersMarquee({ dict }: { dict: Dict }) {
  const partners = [
    { name: "Carrier Transicold", body: dict.home.partners.carrier, logo: "/images/carrier-logo.png" },
    { name: "Daikin", body: dict.home.partners.daikin, logo: null },
    { name: "Thermo King", body: dict.home.partners.thermoking, logo: null },
  ];
  return (
    <section className="mesh-light py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" distance={16}>
          <p className="text-xs font-bold tracking-[0.22em] text-brand-600 uppercase">
            {dict.home.partners.eyebrow}
          </p>
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
                <Image src={p.logo} alt={p.name} width={140} height={40} className="h-9 w-auto" />
              ) : (
                <p className="text-2xl font-black tracking-tighter text-ink-900">{p.name}</p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-16 overflow-hidden" delay={0.1}>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-50 to-transparent" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-50 to-transparent" aria-hidden="true" />
            <div className="flex w-max animate-marquee items-center gap-16 py-4">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <Image
                  key={`${logo.alt}-${i}`}
                  src={logo.src}
                  alt={i < clientLogos.length ? logo.alt : ""}
                  aria-hidden={i >= clientLogos.length ? true : undefined}
                  width={120}
                  height={48}
                  className="h-10 w-auto opacity-50 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
