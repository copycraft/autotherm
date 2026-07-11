import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/galeries").title,
    description: getPageMeta("en", "/en/galeries").description,
    keywords: getPageMeta("en", "/en/galeries").keywords,
  };
}

export default async function Page() {
  const images = [
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Box Bodies" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Fleet Vehicles" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Deceased Transport" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg", title: "Vehicle Bodies" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg", title: "Refrigeration Service" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg", title: "Cooled Vehicle Manufacturing" },
  ];
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Gallery</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section white-bg">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Our Work</h2></div>
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
