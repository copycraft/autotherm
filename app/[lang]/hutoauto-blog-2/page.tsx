import { blogMetadata, renderBlogRoute } from "@/app/lib/blog-route";

// Live D1 content: always rendered at request time.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ lang: string }> };

export const generateMetadata = ({ params }: Props) => blogMetadata(params, "hutoauto-blog-2");

export default function BlogRoute({ params }: Props) {
  return renderBlogRoute(params, "hutoauto-blog-2");
}
