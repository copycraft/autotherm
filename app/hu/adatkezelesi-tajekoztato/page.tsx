import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/adatkezelesi-tajekoztato").title,
    description: getPageMeta("hu", "/hu/adatkezelesi-tajekoztato").description,
    keywords: getPageMeta("hu", "/hu/adatkezelesi-tajekoztato").keywords,
  };
}

export default async function Page() {
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Adatkezelési tájékoztató</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-column1">
            <p className="text-base leading-7 text-[#666] mb-6">Az Autotherm Kft. (székhely: 6728 Szeged, Napos út 3., adószám: ...) ezúton tájékoztatja ügyfeleit a személyes adatok kezeléséről.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">1. Az adatkezelő adatai</h3>
            <p className="text-base leading-7 text-[#666] mb-4">Cégnév: Autotherm Korlátolt Felelősségű Társaság<br/>Székhely: 6728 Szeged, Napos út 3.<br/>Telefon: +36 20 910 2050<br/>E-mail: autotherm@autotherm.hu</p>
            <h3 className="text-xl font-bold mt-8 mb-4">2. Kezelt adatok köre</h3>
            <p className="text-base leading-7 text-[#666] mb-4">Név, e-mail cím, telefonszám, üzenet tartalma. Az adatokat az önkéntes hozzájárulás alapján kezeljük.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">3. Az adatkezelés célja</h3>
            <p className="text-base leading-7 text-[#666] mb-4">Kapcsolatfelvétel, árajánlat készítés, ügyfélszolgálati tevékenység.</p>
            <h3 className="text-xl font-bold mt-8 mb-4">4. Adatmegőrzési idő</h3>
            <p className="text-base leading-7 text-[#666] mb-4">A személyes adatokat a kapcsolatfelvételtől számított 5 évig őrizzük meg.</p>
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
