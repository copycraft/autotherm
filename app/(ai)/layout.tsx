import RootShell from "@/app/components/site/RootShell";
import { rootMetadata, rootViewport } from "@/app/lib/root-metadata";

/** Root layout for the English-only /ai-summary page. */
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
