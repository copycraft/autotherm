import type { ReactNode } from "react";
import { SiteLayout } from "../[lang]/layout";

export default function EnLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="en">{children}</SiteLayout>;
}
