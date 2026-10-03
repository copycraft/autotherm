import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EcoHomePage from "@/app/components/eco/pages/EcoHomePage";
import { isLang } from "@/app/lib/constants";
import { ecoMetadata } from "@/app/lib/eco";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? ecoMetadata("home", lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <EcoHomePage lang={lang} />;
}
