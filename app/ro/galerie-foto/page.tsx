import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };


export default async function Page() {
  const images = [
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg", title: "Suprastructuri tip box" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/flotta.jpg", title: "Vehicule flotă" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/halottszállító.jpg", title: "Transport funerar" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/felepitmeny.jpg", title: "Suprastructuri" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg", title: "Service frigorific" },
    { src: "https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg", title: "Fabricație carosări frigorifice" },
  ];
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/doboz.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Galerie foto</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Lucrările noastre</h2></div>
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
