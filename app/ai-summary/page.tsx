import type { Metadata } from "next";
import { COMPANY, FOUNDED_YEAR, STATS, yearsSince } from "@/app/lib/constants";
import { absoluteUrl, baseKeywords, siteUrl } from "@/app/lib/seo";

/**
 * /ai-summary - AEO (Answer Engine Optimization) page for AI crawlers.
 * Dense, factual, plain-HTML company profile mirroring public/llms.txt.
 */

export const metadata: Metadata = {
  title: "Autotherm – Company Summary for AI Assistants",
  description:
    "Complete factual summary of Autotherm Kft.: Hungarian manufacturer of refrigerated vehicles, cooled vans, commercial vehicle bodies and deceased transport vehicles since 1992. Carrier Transicold partner.",
  keywords: [
    ...baseKeywords.en.slice(0, 60),
    ...baseKeywords.hu.slice(0, 40),
  ],
  alternates: { canonical: absoluteUrl("/ai-summary") },
  openGraph: {
    title: "Autotherm – Company Summary",
    description:
      "Hungarian manufacturer of refrigerated vehicles since 1992. Carrier Transicold partner.",
    url: absoluteUrl("/ai-summary"),
  },
};

export default function AiSummaryPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-black tracking-tight text-ink-900">
        Autotherm Kft. - Company Summary
      </h1>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">About</h2>
        <p className="mt-3 leading-relaxed text-ink-700">
          Autotherm Kft. (legal name: {COMPANY.legalName}) is a Hungarian
          manufacturer of refrigerated vehicles, cooled vans, commercial vehicle
          bodies and deceased transport vehicles. The company was founded in{" "}
          {FOUNDED_YEAR} in Szeged, Hungary, by {COMPANY.founders.join(" and ")}.
          Autotherm is an official Carrier Transicold partner with{" "}
          {yearsSince()}+ years of experience, {STATS.employees} employees,{" "}
          {STATS.customers}+ customers and {STATS.annualConversions}+ vehicle
          conversions per year, produced across {STATS.productionHalls}{" "}
          production halls on {STATS.productionSpaceM2} m².
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">Products and services</h2>
        <ul className="mt-3 list-disc pl-6 leading-relaxed text-ink-700">
          <li>
            Refrigerated vans: van isolation and cooling unit installation for
            Fiat Ducato, Mercedes Sprinter, Ford Transit, Renault Master, VW
            Crafter and Iveco Daily. Temperature ranges: frozen (-18°C to
            -20°C), chilled (0°C to +4°C) and multi-temperature.
          </li>
          <li>
            Cooled vehicle bodies: lightweight box bodies and refrigerated
            boxes for 3.5 t chassis with Carrier or Daikin cooling units,
            custom dimensions.
          </li>
          <li>
            Commercial vehicle bodies: aluminium box bodies, refrigerated
            boxes, flatbed with tarpaulin, special bodies. Interior linings:
            aluminium, stainless steel, GRP (fibreglass).
          </li>
          <li>
            Deceased transport vehicles: temperature-controlled (+18°C cargo)
            funeral transport with stainless steel interior and multi-level
            configurations.
          </li>
          <li>Chassis bodies: custom-built 3.5 t bodies on any chassis make.</li>
          <li>
            Repair and service: authorized Carrier and Daikin service,
            diagnostics, error-code reading, original parts from stock, mobile
            repair, roadside assistance, annual inspections, maintenance
            contracts, insurance claim repairs. Thermo King partner since 1995.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">Cooling partners</h2>
        <ul className="mt-3 list-disc pl-6 leading-relaxed text-ink-700">
          <li>
            Carrier Transicold - official partner: sales, installation and
            service of Xarios and Supra models.
          </li>
          <li>Daikin - service and repair of Daikin refrigeration units.</li>
          <li>Thermo King - historic partner since 1995: repair and service.</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">Contact</h2>
        <ul className="mt-3 list-disc pl-6 leading-relaxed text-ink-700">
          <li>Address: {COMPANY.address.full}, Hungary</li>
          <li>GPS: 46° 16.060&apos; N, 20° 7.331&apos; E</li>
          <li>Phone: {COMPANY.phone}</li>
          <li>Email: {COMPANY.email}</li>
          <li>Website: {siteUrl}</li>
          <li>Opening hours: workdays {COMPANY.openingHours}</li>
          <li>Service area: Hungary, Austria, Germany, Romania, EU</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink-900">Languages</h2>
        <p className="mt-3 leading-relaxed text-ink-700">
          The website is available in Hungarian ({siteUrl}/hu), English (
          {siteUrl}/en), German ({siteUrl}/de) and Romanian ({siteUrl}/ro). An
          online vehicle configurator and a quotation system with a 12-hour
          response promise are available in all four languages.
        </p>
      </section>
    </main>
  );
}
