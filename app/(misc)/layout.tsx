import RootShell from "@/app/components/site/RootShell";
import { rootMetadata, rootViewport } from "@/app/lib/root-metadata";

/** Root layout for the non-localized routes (root redirect, admin). */
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function MiscLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="hu">{children}</RootShell>;
}
