import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, LocalBusinessJsonLd, ProductJsonLd, WebSiteJsonLd } from "@/app/lib/json-ld";
import { siteUrl } from "@/app/lib/seo";

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

const baseKeywords = [
  "refrigerated van", "cooled vehicle", "van isolation", "refrigerated vehicle body",
  "cooling unit installation", "Carrier service", "Carrier Transicold",
  "Kühlfahrzeug", "Kühltransporter", "Kühlkoffer",
  "hűtőautó", "hűtős furgon", "fagyasztós autó", "raktérhűtő", "raktérszigetelés",
  "járműfelépítmény", "alvázas felépítmény", "hűtőberendezés",
  "vehicul frigorific", "furgon frigorific", "carosare frigorifice",
  "Kühlaggregat", "Nutzfahrzeugaufbauten",
  "cold logistics", "cold chain",
  "temperature controlled transport", "hűtött logisztika", "Kühllogistik",
  "logistică frigorifică", "autotherm", "autotherm.hu",
  "commercial vehicle bodies", "refrigerated truck", "cooler truck",
  "deceased transport vehicle", "Bestattungswagen", "elhunytszállító",
  "vehicul funerar", "refrigerated conversion", "Kühlumbau",
  "3.5T refrigerated van", "3,5T hűtőautó", "3,5T Kühlfahrzeug",
  "box body", "aluminium box", "Kofferaufbau", "dobozos felépítmény",
  "carosabil frigorific", "furgon izoterm", "fahrzeugaufbauten",
  "Carrier Xarios", "Carrier Supra", "Daikin cooling",
  "freezer van", "insulated box body", "hőszigetelt doboz",
  "cold storage vehicle", "frozen transport", "reefer van",
  "pritschenaufbau", "platós felépítmény", "suprastructuri comerciale",
  "hűtőgépjármű", "hűtőkapacitás", "raktérhőmérséklet", "hőmérséklet szabályozás",
  "hűtőegység", "hűtőakkumulátor", "hűtött áru", "mélyhűtött áru",
  "frissáru szállítás", "hús szállítás", "tej szállítás",
  "halászati termék szállítás", "gyógyszer logisztika", "vaccine transport",
  "hűtőház", "hidegraktár", "hűtőkamra", "raktérhűtő gép",
  "hűtő szerviz", "hűtőgép szerelő", "hűtőberendezés javítás",
  "Carrier raktérhűtő", "Daikin raktérhűtő", "Thermo King szerviz",
  "hűtő rendszer tisztítás", "hűtőközeg töltés", "hűtőközeg csere",
  "hűtő rendszer diagnosztika", "elektronikus hibafeltárás",
  "jármű felépítmény javítás", "szendvics panel javítás", "alumínium javítás",
  "rozsdamentes acél javítás", "üvegszál javítás", "speciális járműátalakítás",
  "kisbusz átalakítás", "teherautó átalakítás", "furgon átalakítás hűtősre",
  "utólagos szigetelés", "utólagos hűtő beépítés", "egyedi felépítmény",
  "hőszigetelt panel", "szendvicspanel",
  "poliuretán hab szigetelés", "hőhídmentes kivitel",
  "rozsdamentes belső burkolat", "üvegszálas belső burkolat",
  "alumínium belső burkolat", "rétegelt lemez burkolat",
  "PVC burkolat", "élelmiszeripari burkolat", "HACCP burkolat",
  "hűtő autó budapest", "hűtő autó szeged", "hűtő autó debrecen",
  "hűtő autó győr", "hűtő autó pécs", "hűtő autó miskolc",
  "Kühlfahrzeug Budapest", "Kühlfahrzeug Wien", "Kühlfahrzeug München",
  "Kühlfahrzeug Berlin", "camion frigorific București",
  "refrigerated van for sale", "használt hűtőautó eladó",
  "gebrauchter Kühltransporter", "New refrigerated van",
  "flottakezelés", "flotta üzemeltetés", "jármű flotta menedzsment",
  "hűtőautó flotta", "hűtőautó finanszírozás",
  "refrigerated fleet management",
  "higiéniai tanúsítvány", "HACCP tanúsítvány", "GMP tanúsítvány",
  "ISO 9001", "ISO 22000", "ATP tanúsítvány", "ATP megfelelőség",
  "CE marking", "TÜV minősítés",
  "jármű minősítés", "hűtőkapacitás mérés",
  "hűtési próba", "hőmérséklet térkép", "temperature mapping",
  "járműfelépítmény engedélyeztetés", "forgalomba helyezés",
  "műszaki vizsga", "átalakítás műszaki vizsga",
  "Carrier Transicold", "Thermo King", "Daikin",
  "Zanotti", "frigoblock",
  "autotherm.hu", "autotherm", "hűtős jármű gyártó",
  "refrigerated vehicle manufacturer Hungary",
  "Kühlfahrzeughersteller Ungarn",
  "producător carosări frigorifice Ungaria",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Autotherm",
    default: "Autotherm - Hűtőautó gyártás, refrigerated vehicles, Kühlfahrzeug, carosări frigorifice",
  },
  description: "Autotherm: manufacturer of refrigerated vehicles, cooled vans, deceased transport and commercial vehicle bodies since 1992. Carrier Transicold partner.",
  keywords: baseKeywords,
  authors: [{ name: "Autotherm" }],
  creator: "Autotherm",
  publisher: "Autotherm",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "hu_HU",
    alternateLocale: ["en_US", "de_DE", "ro_RO"],
    siteName: "Autotherm",
    title: "Autotherm - Hűtőautó gyártás, refrigerated vehicle & Kühlfahrzeug manufacturer",
    description: "Autotherm: manufacturer of refrigerated vehicles since 1992. Carrier Transicold partner.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/images/autotherm-logo.png`,
        width: 800,
        height: 600,
        alt: "Autotherm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@autotherm",
    creator: "@autotherm",
    title: "Autotherm - Hűtőautó, refrigerated vehicle & Kühlfahrzeug manufacturer",
    description: "Autotherm: manufacturer of refrigerated vehicles since 1992. Carrier Transicold partner.",
    images: [`${siteUrl}/images/autotherm-logo.png`],
  },
  verification: {
    google: "G-DDQGPSF5SD",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      hu: `${siteUrl}/hu`,
      en: `${siteUrl}/en`,
      de: `${siteUrl}/de`,
      ro: `${siteUrl}/ro`,
    },
  },
  category: "automotive",
  classification: "Refrigerated vehicle manufacturing and service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={`${raleway.variable} h-full`}>
      <head>
        <link rel="preload" href="https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg" as="image" />
        <link rel="preload" href="https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg" as="image" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="alternate" hrefLang="hu" href={`${siteUrl}/hu`} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en`} />
        <link rel="alternate" hrefLang="de" href={`${siteUrl}/de`} />
        <link rel="alternate" hrefLang="ro" href={`${siteUrl}/ro`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/hu`} />
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <ProductJsonLd />
        <WebSiteJsonLd />
        <meta name="google-site-verification" content="G-DDQGPSF5SD" />
        <meta name="facebook-domain-verification" content="rakterhutes" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="theme-color" content="#4a68a9" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
