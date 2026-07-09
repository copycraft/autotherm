import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "autotherm.hu",
  description:
    "Autotherm: Manufacturer of cooled and refrigerated vehicle bodies, van isolations, deceased transport vehicles, and commercial vehicle bodies since 1992.",
  keywords: [
    "cooled vehicle",
    "refrigerated van",
    "vehicle bodies",
    "Autotherm",
    "Kühlfahrzeug",
    "hűtőautó",
    "carosari frigorifice",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} h-full`}>
      <head>
        <link rel="preload" href="https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs02.jpg" as="image" />
        <link rel="preload" href="https://www.autotherm.hu/wp-content/uploads/2018/04/kapcs01.jpg" as="image" />
        <link rel="preconnect" href="https://www.youtube.com" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
