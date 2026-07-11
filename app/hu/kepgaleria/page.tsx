import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/kepgaleria").title,
    description: getPageMeta("hu", "/hu/kepgaleria").description,
    keywords: getPageMeta("hu", "/hu/kepgaleria").keywords,
  };
}

const categories = [
  {
    title: "Hűtős furgonok",
    images: ["/images/4c7a44122714.jpg", "/images/a404687637b3.jpg", "/images/ae97125a0c4f.jpg", "/images/785d3105c7c6.jpg", "/images/0e90d9793302.jpg", "/images/3cc963ec4181.jpg"],
  },
  {
    title: "Alvázas felépítmények",
    images: ["/images/688500d4a01a.jpg", "/images/b2c54816a378.jpg", "/images/05b85e04c8d3.jpg", "/images/32b4cd177558.jpg", "/images/310373572c3b.jpg", "/images/82308068d05b.jpg"],
  },
  {
    title: "Speciális járművek",
    images: ["/images/e7f13b6c4bc5.jpg", "/images/79539d1d7438.jpg", "/images/db347b9ebd92.jpg", "/images/be3495baa194.jpg", "/images/45196215f76f.jpg", "/images/15f4103a8265.jpg"],
  },
  {
    title: "Raktérszigetelés",
    images: ["/images/6be9f7162b3b.jpg", "/images/103f979650e6.jpg", "/images/b05d04ca1183.jpg", "/images/a68af7b4ba26.jpg", "/images/e4566315cd28.jpg", "/images/2948dab7dd9a.jpg"],
  },
  {
    title: "Flották és nagy projektek",
    images: ["/images/d029c0586d66.jpg", "/images/300aebed8e8e.jpg", "/images/a51e2c833b3a.jpg", "/images/be8bb6a35e77.jpg", "/images/fca243146ad0.jpg", "/images/8bd1648f42cf.jpg"],
  },
];

export default async function Page() {
  return (
    <div>
      <section
        className="page-hero"
        style={{ backgroundImage: `url(${categories[0].images[0]})` }}
      >
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Galéria</h1></div>
        </div>
      </section>

      {categories.map((cat, ci) => (
        <AnimateOnScroll key={cat.title} delay={ci * 100}>
          <section className={`content-section ${ci % 2 === 0 ? 'white-bg' : 'gray-bg'}`}>
            <div className="wrap-column">
              <div className="content-section-heading">
                <h2 className="content-section-subtitle">Munkáink</h2>
                <h1>{cat.title}</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cat.images.map((src) => (
                  <a key={src} className="gallery-card block">
                    <img src={src} alt={cat.title} className="h-[240px] w-full object-cover" loading="lazy" />
                    <div className="gallery-card-overlay"><h3>{cat.title}</h3></div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </AnimateOnScroll>
      ))}
    </div>
  );
}
