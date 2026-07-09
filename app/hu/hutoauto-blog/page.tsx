import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };


export default async function Page() {
  const posts = [
    { title: "Bestattungsmesse AirsalmExpo 2022", date: "2022.09.28", slug: "#", excerpt: "Bestattungsmesse AirsalmExpo 2022 - Wir danken den Besuchern aus Rumänien, Ungarn, Bulgarien..." },
    { title: "Fahrzeugausbauten für Frischdienst-, Tiefkühl-, Thermo- und Hygienefahrzeuge", date: "2021.04.28", slug: "#", excerpt: "Fahrzeugausbauten für Frischdienst-, Tiefkühl-, Thermo- und Hygienefahrzeuge von Autotherm..." },
    { title: "Umbau zum Kühlfahrzeug", date: "2021.03.04", slug: "#", excerpt: "Wenn es um den Transport von bestimmten Medikamenten, von chemischen Produkten..." },
  ];
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content">
          <div className="max-w-7xl mx-auto px-4"><h1>Blog</h1></div>
        </div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Hűtőautós szakcikkek</h2></div>
          <div className="max-w-4xl mx-auto">
            {posts.map((post) => (
              <article key={post.title} className="blog-post border-b border-[#e0e0e0] pb-8 mb-8">
                <h2><Link href={post.slug} className="text-[#262626] hover:text-[#4a68a9]">{post.title}</Link></h2>
                <p className="post-meta">{post.date}</p>
                <p className="text-[#666]">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
