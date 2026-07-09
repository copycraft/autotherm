import type { Metadata } from "next";
import Configurator from "@/app/components/Configurator";
import { huLang } from "@/app/lib/configurator-data";

export const metadata: Metadata = {
  title: "Járműkonfigurátor - Autotherm Kft.",
  description: "Állítsa össze saját hűtőautóját a Tesla-stílusú konfigurátorunkkal. Válasszon alapjárművet, felépítményt, hűtőberendezést és belső burkolatot.",
};

export default function Page() {
  return <Configurator lang={huLang} />;
}
