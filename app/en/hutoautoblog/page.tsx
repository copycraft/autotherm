import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import { getPublishedPosts } from "@/app/lib/db";
import { marked } from "marked";
import AnimateOnScroll from "@/app/components/AnimateOnScroll";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("en", "/en/hutoautoblog").title,
    description: getPageMeta("en", "/en/hutoautoblog").description,
    keywords: getPageMeta("en", "/en/hutoautoblog").keywords,
  };
}

export default async function Page() {
  const rawPosts = await getPublishedPosts();
  const posts = await Promise.all(rawPosts.map(async (post) => ({
    ...post,
    html: await marked.parse(post.en_content || ""),
  })));
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
            {posts.length === 0 && <p className="text-[#666]">No posts yet.</p>}
            {posts.map((post) => (
              <article key={post.id} className="blog-post border-b border-[#e0e0e0] pb-8 mb-8">
                <h2><span className="text-[#262626]">{post.en_title}</span></h2>
                <p className="post-meta">{new Date(post.created_at).toLocaleDateString("en-GB")}</p>
                <div className="text-[#666] prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              </article>
            ))}
          </div>
        </div>
      </section>
      </AnimateOnScroll>
    </div>
  );
}
