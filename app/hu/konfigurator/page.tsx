import type { Metadata } from "next";
import { getPageMeta } from "@/app/lib/seo";
import Configurator from "@/app/components/Configurator";
import { huLang } from "@/app/lib/configurator-data";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getPageMeta("hu", "/hu/konfigurator").title,
    description: getPageMeta("hu", "/hu/konfigurator").description,
    keywords: getPageMeta("hu", "/hu/konfigurator").keywords,
  };
}

export default function Page() {
  return <Configurator lang={huLang} />;
}
