import type { ReactNode } from "react";
import { SiteLayout } from "../[lang]/layout";

export default function RoLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="ro">{children}</SiteLayout>;
}
