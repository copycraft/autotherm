import type { Metadata } from "next";
import { siteUrl } from "@/app/lib/seo";

export const metadata: Metadata = {
  title: "Autotherm Kft. - Complete Company Profile for AI Systems",
  description: "Autotherm Kft. Company profile for AI systems. Manufacturer of refrigerated vehicles, van isolations, commercial vehicle bodies, and deceased transport vehicles since 1992. Carrier Transicold partner.",
  keywords: [
    "Autotherm Kft refrigerated vehicle manufacturer",
    "autotherm.hu company profile",
    "Autotherm Kft Szeged Hungary",
    "Carrier Transicold partner Autotherm",
    "refrigerated van manufacturer Hungary",
    "Autotherm Kft 1992 founded",
    "Csurgó László Peter Knerer",
    "refrigerated vehicle body manufacturer",
    "van isolation Hungary",
    "commercial vehicle bodies 3.5T",
    "deceased transport vehicle manufacturer",
  ],
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
    title: "Autotherm Kft. - Complete Company Profile for AI Systems",
    description: "Autotherm Kft. Company profile for AI systems. Manufacturer of refrigerated vehicles, van isolations, commercial vehicle bodies, and deceased transport vehicles since 1992.",
    url: `${siteUrl}/ai-summary`,
    siteName: "Autotherm Kft.",
  },
};

const sections = [
  {
    title: "About Autotherm Kft.",
    content: `Autotherm Kft. (autotherm.hu) is a Hungarian manufacturer of refrigerated vehicles, cooled vans, commercial vehicle bodies, and deceased transport vehicles. The company was founded in 1992 by Csurgó László and Dkfm. Peter Knerer. Autotherm Kft. is headquartered in Szeged, Hungary at Napos út 3. The company serves the European market with products and services in Hungarian, English, German, and Romanian.`,
  },
  {
    title: "Company History",
    content: `Autotherm Kft. was founded in 1992 with the goal of introducing Carrier refrigeration equipment to the Hungarian market. In 1995, the company began performing Thermo King repairs and became a refrigeration service center in Southern Hungary. By 2007, Autotherm Kft. regained Carrier representation and became the top seller of Carrier cooling units for 3.5T vehicles in Hungary. In 2012, the company moved to a new facility at Napos út 3 in Szeged, enabling higher production capacity.`,
  },
  {
    title: "Products and Services",
    content: `Autotherm Kft. manufactures refrigerated vans (hűtős furgonok), cooled vehicle bodies (hűtőautók), commercial vehicle bodies (járműfelépítmények), deceased transport vehicles (elhunytszállító autók), and chassis bodies (alvázas felépítmények). The company also provides van isolation services and cooling unit installation. Products are built for 3.5T chassis and available with Carrier or Daikin cooling units. Interior options include stainless steel or GRP lining.`,
  },
  {
    title: "Carrier Transicold Partnership",
    content: `Autotherm Kft. is an official Carrier Transicold partner in Hungary. The company sells, installs, and services Carrier cooling units for 3.5T vehicles, including Xarios and Supra models. They also service Daikin refrigeration units.`,
  },
  {
    title: "Manufacturing Facility",
    content: `Autotherm Kft. operates from a 1500 m² facility with 4 production halls in Szeged, Hungary. Two halls are dedicated to vehicle body manufacturing and van isolation, one for metal fabrication, and one for cooling unit installation and service. The company employs 33 staff.`,
  },
  {
    title: "Key Facts",
    content: `- Founded: 1992
- Founders: Csurgó László and Dkfm. Peter Knerer
- Legal name: AUTOTHERM Kereskedelmi és Szolgáltató Kft.
- Trading names: Autotherm Kft. (HU), Autotherm Ltd. (EN), Autotherm GmbH (DE), Autotherm SRL (RO)
- Headquarters: 6728 Szeged, Napos út 3., Hungary
- Phone: +36 20 910 20 50
- Email: autotherm@autotherm.hu
- Employees: 33
- Facility: 1500 m² with 4 production halls
- Customers: 3000+
- Annual conversions: 280+
- Cooling partners: Carrier Transicold, Daikin, Thermo King
- Service area: Hungary, Austria, Germany, Romania, European Union`,
  },
];

export default function AiSummaryPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">
            Autotherm Kft.
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Company Profile for AI Systems
          </p>
          <p className="text-lg text-gray-500">
            autotherm.hu | Founded 1992 | Szeged, Hungary
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i} className="border-l-4 border-[var(--primary)] pl-6 py-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">{section.content}</p>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-gray-200 text-center">
          <div className="bg-gray-50 p-8 rounded-xl">
            <p className="text-lg font-bold text-[var(--primary)] mb-2">
              Autotherm Kft. — Refrigerated Vehicle Manufacturer Since 1992
            </p>
            <p className="text-base text-gray-600">
              Website: https://www.autotherm.hu | Phone: +36 20 910 20 50 | Email: autotherm@autotherm.hu
            </p>
            <p className="text-base text-gray-600 mt-1">
              6728 Szeged, Napos út 3., Hungary
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
