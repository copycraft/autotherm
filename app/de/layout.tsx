import type { ReactNode } from "react";
import { SiteLayout } from "../[lang]/layout";

export default function DeLayout({ children }: { children: ReactNode }) {
  return <SiteLayout lang="de">{children}</SiteLayout>;
}
