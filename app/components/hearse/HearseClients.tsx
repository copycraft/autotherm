import { Reveal, RevealGroup, RevealItem } from "@/app/components/motion/Reveal";
import RevealText from "@/app/components/motion/RevealText";
import Eyebrow from "@/app/components/ui/Eyebrow";
import Icon from "@/app/components/ui/Icon";
import type { Lang } from "@/app/lib/constants";
import { getHearseDict } from "@/app/lib/hearse";

/** Reference clients and the industry associations we belong to. */
export default function HearseClients({ lang }: { lang: Lang }) {
  const { clients } = getHearseDict(lang);

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Eyebrow label={clients.eyebrow} tone="light" />
          <RevealText
            as="h2"
            text={clients.title}
            className="mt-4 block max-w-3xl text-3xl font-black tracking-tighter text-balance text-ink-900 sm:text-5xl"
          />
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {clients.items.map((c) => (
            <RevealItem key={c} className="panel-ring rounded-3xl bg-ink-50 p-8 text-center">
              <p className="text-xl font-extrabold tracking-tight text-balance text-ink-900">{c}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 flex max-w-3xl items-start justify-center gap-3 text-center text-sm leading-relaxed text-ink-500">
            <Icon name="medal" className="h-5 w-5 shrink-0 text-brand-600" />
            <span>{clients.membership}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
