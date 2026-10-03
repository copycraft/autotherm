import { Raleway } from "next/font/google";
import "@/app/globals.css";
import {
  LocalBusinessJsonLd,
  OrganizationJsonLd,
  ProductJsonLd,
  WebSiteJsonLd,
} from "@/app/lib/json-ld";

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-raleway",
  display: "swap",
});

/**
 * The <html>/<body> shell shared by every root layout. The site has several
 * root layouts (one per language, plus admin / AI-summary groups), so the
 * document language is set per layout instead of being hard-coded.
 */
export default function RootShell({
  lang,
  jsonLd = true,
  children,
}: {
  lang: string;
  jsonLd?: boolean;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      className={`${raleway.variable} h-full overflow-x-hidden supports-[overflow:clip]:overflow-x-clip`}
    >
      {jsonLd && (
        <head>
          <OrganizationJsonLd />
          <LocalBusinessJsonLd />
          <ProductJsonLd />
          <WebSiteJsonLd />
        </head>
      )}
      {/* overflow-x: clip, not hidden - `hidden` turns <body> into its own
          scroll container, which silently breaks every position:sticky element.
          `hidden` stays as the fallback for browsers without `clip`. */}
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans antialiased supports-[overflow:clip]:overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
