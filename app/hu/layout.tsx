import type { ReactNode } from "react";
import { SiteLayout } from "../[lang]/layout";

export default function HuLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="hu">{children}</SiteLayout>;
}
