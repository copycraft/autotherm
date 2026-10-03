import NotFoundView from "@/app/components/site/NotFoundView";
import RootShell from "@/app/components/site/RootShell";
import { rootViewport } from "@/app/lib/root-metadata";

/** 404 for URLs that match no route (outside any language layout). */
export const metadata = { title: "404 | Autotherm", robots: { index: false } };
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootShell lang="hu" jsonLd={false}>
      <NotFoundView />
    </RootShell>
  );
}
