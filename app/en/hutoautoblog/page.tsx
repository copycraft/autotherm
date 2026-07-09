import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return { title: "Blog - Autotherm Ltd." };
}

export default async function Page() {
  const posts = [
    { title: "Contribute to destruction of the environment", date: "2021.12.07", excerpt: "How insufficient service of cooling units contributes to environmental destruction..." },
    { title: "Cooling capacity often undersized", date: "2021.03.04", excerpt: "Why the cooling capacity of refrigerated vehicles is often undersized..." },
    { title: "Difference in behaviour of different refrigerants", date: "2021.02.21", excerpt: "Understanding the differences between various refrigerant types..." },
  ];
  return (
    <div>
      <AnimateOnScroll>
      <section className="page-hero" style={{ backgroundImage: 'url(https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg)' }}>
        <div className="hero-content"><div className="max-w-7xl mx-auto px-4"><h1>Blog</h1></div></div>
      </section>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
      <section className="content-section black-text white-bg top-spacing-big bottom-spacing-big">
        <div className="wrap-column">
          <div className="content-section-heading"><h2>Refrigerated Vehicle Articles</h2></div>
          <div className="max-w-4xl mx-auto">
            {posts.map((post) => (
              <article key={post.title} className="blog-post border-b border-[#e0e0e0] pb-8 mb-8">
                <h2><span className="text-[#262626]">{post.title}</span></h2>
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
