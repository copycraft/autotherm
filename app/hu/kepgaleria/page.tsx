import type { Metadata } from "next";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Képgaléria - Autotherm Kft." };
}

export default async function Page() {
  const images = [
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Dobozos felépítmények" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Flotta járművek" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Elhunytszállító autók" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg", title: "Járműfelépítmények" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg", title: "Raktérhűtő szerviz" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg", title: "Hűtőautó gyártás" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs03.jpg", title: "Speciális járművek" },
  ];
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Galéria</h1></div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Képek a munkáinkról</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.map((img) => (
              <a key={img.title} className="gallery-card block">
                <div className="h-[250px] bg-cover bg-center" style={{ backgroundImage: `url(${img.src})` }} />
                <div className="gallery-card-overlay"><h3>{img.title}</h3></div>
              </a>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
