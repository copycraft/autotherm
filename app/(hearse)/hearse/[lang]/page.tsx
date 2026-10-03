import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HearseHomePage from "@/app/components/hearse/pages/HearseHomePage";
import { isLang } from "@/app/lib/constants";
import { hearseMetadata } from "@/app/lib/hearse";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return isLang(lang) ? hearseMetadata("home", lang) : {};
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <HearseHomePage lang={lang} />;
}
