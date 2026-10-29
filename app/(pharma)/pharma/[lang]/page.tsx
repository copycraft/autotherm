import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PharmaHomePage from "@/app/components/pharma/pages/PharmaHomePage";
import { isLang } from "@/app/lib/constants";
import { pharmaMetadata } from "@/app/lib/pharma";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? pharmaMetadata("home", lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <PharmaHomePage lang={lang} />;
}
