import type { Metadata } from "next";
import EcoContactCard from "@/app/components/eco/EcoContactCard";
import ContactForm from "@/app/components/forms/ContactForm";
import { Reveal } from "@/app/components/motion/Reveal";
import PageHero from "@/app/components/site/PageHero";
import Icon from "@/app/components/ui/Icon";
import { getDict } from "@/app/lib/dictionaries";
import { ECO_PATHS, ECO_SEO } from "@/app/lib/eco";

export const metadata: Metadata = {
  title: ECO_SEO.quote.title,
  description: ECO_SEO.quote.description,
  alternates: { canonical: ECO_PATHS.quote },
};

export default function EcoQuotePage() {
  const dict = getDict("hu");
  // Same form and pipeline as the main site; the page value tags the lead as
  // coming from ehutoauto.hu, and the vehicle hint points at electric vans.
  const form = { ...dict.form, vehiclePlaceholder: "Pl. Citroën e-Berlingo, Nissan e-NV200" };

  return (
    <>
      <PageHero
        eyebrow="Árajánlatkérés"
        title="Kérje árajánlatunkat most!"
        lead="Elektromos hűtőautó önellátó hűtőegységgel! Az egyedi igények egyedi megoldásokat igényelnek – írja meg, milyen járműre és milyen hűtött áruhoz keres megoldást."
      />

      <section className="mesh-light py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <Reveal>
            <div className="panel-ring rounded-4xl bg-ink-50 p-8 shadow-soft sm:p-10">
              <h2 className="mb-8 text-2xl font-extrabold tracking-tight text-ink-900">
                Ajánlatkérő űrlap
              </h2>
              <ContactForm dict={form} lang="hu" page="ehutoauto.hu/arajanlatkeres" quotation />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-4">
            <EcoContactCard intro="Ha inkább telefonon szeretne árajánlatot kérni, keresse kollégánkat." />
            <div className="panel-ring rounded-3xl bg-white p-8 shadow-soft">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                <Icon name="truck" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-extrabold tracking-tight text-ink-900">
                Átvétel és visszaküldés
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                Vegye igénybe járművének átvételi és visszaküldési ajánlatunkat egy átfogó és
                gondtalan szolgáltatáshoz!
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
