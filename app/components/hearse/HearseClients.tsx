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
          <div className="mx-auto mt-12 max-w-5xl rounded-3xl bg-ink-950 p-10 text-center shadow-lifted ring-1 ring-frost-300/25 sm:p-14">
            <span
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-frost-300/15 text-frost-300"
              aria-hidden="true"
            >
              <Icon name="medal" className="h-8 w-8" />
            </span>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed font-extrabold tracking-tight text-balance text-white sm:text-2xl">
              {clients.membership}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
