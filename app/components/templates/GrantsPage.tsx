import Image from "next/image";
import { Reveal } from "@/app/components/motion/Reveal";
import PageHero from "@/app/components/site/PageHero";
import Eyebrow from "@/app/components/ui/Eyebrow";
import {
  GRANT_APPLICANT,
  grants,
  type Grant,
  type GrantBlock,
  type GrantDocument,
} from "@/app/lib/grants";

/**
 * GINOP / Széchenyi 2020 project publicity page. Hidden from navigation and
 * the sitemap; reached from the fixed corner infoblokk. Hungarian only.
 */
export default function GrantsPage({ heroImage }: { heroImage?: string }) {
  return (
    <>
      <PageHero
        eyebrow="Széchenyi 2020"
        title="GINOP pályázatok"
        lead="Az Autotherm Kft. európai uniós támogatással megvalósított fejlesztései."
        image={heroImage}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow label="Támogatott projektek" tone="light" />
            <h2 className="mt-4 text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
              Európai uniós támogatással megvalósult fejlesztéseink
            </h2>
            <p className="mt-4 text-base text-ink-600">
              Pályázó: <span className="font-semibold text-ink-900">{GRANT_APPLICANT}</span>
            </p>
            <ol className="mt-8 divide-y divide-ink-100 border-y border-ink-100">
              {grants.map((g, i) => (
                <li key={g.slug}>
                  <a
                    href={`#${g.slug}`}
                    className="group flex items-baseline gap-5 py-4 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none"
                  >
                    <span className="text-sm font-black text-brand-600 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-bold text-ink-900 group-hover:text-brand-600">
                        {g.title}
                      </span>
                      <span className="mt-1 block text-xs font-semibold tracking-wide text-ink-400">
                        {g.projectId}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <Image
              src="/images/szechenyi-2020-infoblokk.webp"
              alt="Széchenyi 2020 – Magyarország Kormánya, Európai Unió, Európai Regionális Fejlesztési Alap – Befektetés a jövőbe"
              width={700}
              height={484}
              sizes="(min-width: 1024px) 30rem, 100vw"
              className="ml-auto h-auto w-full max-w-md"
            />
          </Reveal>
        </div>
      </section>

      {grants.map((grant, i) => (
        <GrantSection key={grant.slug} grant={grant} index={i} />
      ))}
    </>
  );
}

function GrantSection({ grant, index }: { grant: Grant; index: number }) {
  const facts = [
    { label: "Pályázó neve", value: GRANT_APPLICANT, wide: true },
    { label: "Projekt azonosító száma", value: grant.projectId },
    { label: "Támogatási összeg", value: grant.amount },
    { label: "Támogatás mértéke", value: grant.rate },
    { label: "Projekt befejezési dátum", value: grant.completed },
  ];
  const hasAside = Boolean(grant.publication || grant.talk || grant.documents?.length);

  return (
    <section
      id={grant.slug}
      className={`scroll-mt-24 py-20 sm:py-28 ${index % 2 === 0 ? "mesh-light" : "bg-white"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">
            <span className="text-2xl font-black tracking-tighter text-brand-200 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {grant.projectId}
          </p>
          <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-4xl">
            {grant.title}
          </h2>
        </Reveal>

        <dl className="panel-ring mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ink-100 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className={`bg-white p-5 ${f.wide ? "sm:col-span-2" : ""}`}>
              <dt className="text-[11px] font-bold tracking-[0.15em] text-ink-400 uppercase">
                {f.label}
              </dt>
              <dd className="mt-1.5 text-base font-bold text-ink-900">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className={hasAside ? "lg:col-span-8" : "lg:col-span-12"}>
            <h3 className="text-xs font-bold tracking-[0.2em] text-ink-500 uppercase">
              Rövid összefoglalás
            </h3>
            <div className="mt-5 max-w-3xl">
              {grant.summary.map((block, i) => (
                <SummaryBlock key={i} block={block} />
              ))}
            </div>
          </div>

          {hasAside && (
            <aside className="flex flex-col gap-4 lg:col-span-4">
              {grant.publication && <DocumentLink doc={grant.publication} featured />}
              {grant.talk && (
                <div className="rounded-2xl bg-ink-950 p-6">
                  <p className="text-[11px] font-bold tracking-[0.2em] text-frost-300 uppercase">
                    Előadás
                  </p>
                  <h4 className="mt-2 text-lg font-extrabold tracking-tight text-white">
                    {grant.talk.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{grant.talk.body}</p>
                </div>
              )}
              {grant.documents?.map((doc) => <DocumentLink key={doc.href} doc={doc} />)}
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

function SummaryBlock({ block }: { block: GrantBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h4 className="mt-10 text-xl font-extrabold tracking-tight text-ink-900 first:mt-0">
          {block.text}
        </h4>
      );
    case "subheading":
      return <h5 className="mt-7 text-base font-bold text-ink-900">{block.text}</h5>;
    case "p":
      return <p className="mt-4 text-base leading-relaxed text-ink-600 first:mt-0">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-4 flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-600">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
              <span>
                {typeof item === "string" ? (
                  item
                ) : (
                  <>
                    <span className="font-semibold text-ink-900">{item.lead}</span>
                    {" – "}
                    {item.text}
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      );
  }
}

function DocumentLink({ doc, featured = false }: { doc: GrantDocument; featured?: boolean }) {
  return (
    <a
      href={doc.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-start gap-4 rounded-2xl p-5 transition-colors focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none ${
        featured
          ? "bg-brand-600 text-white hover:bg-brand-500"
          : "panel-ring bg-white text-ink-900 hover:bg-ink-50"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-black ${
          featured ? "bg-white/15 text-white" : "bg-brand-600/10 text-brand-600"
        }`}
        aria-hidden="true"
      >
        PDF
      </span>
      <span className="flex-1">
        {featured && (
          <span className="block text-[11px] font-bold tracking-[0.15em] text-brand-100 uppercase">
            Tanulmány
          </span>
        )}
        <span className="block text-sm leading-snug font-bold">{doc.label}</span>
      </span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${featured ? "text-white/70" : "text-ink-400"}`} aria-hidden="true">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
      <span className="sr-only">(PDF, új lapon nyílik meg)</span>
    </a>
  );
}
