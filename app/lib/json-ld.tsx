import { COMPANY, FOUNDED_YEAR } from "./constants";
import { absoluteUrl, siteUrl } from "./seo";

/**
 * JSON-LD structured data. Rendered as inline <script type="application/ld+json">
 * tags - parsed by search engines without blocking the main render thread.
 */

function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Autotherm Kft.",
        alternateName: [
          "Autotherm",
          COMPANY.legalName,
          "Autotherm Ltd.",
          "Autotherm GmbH",
          "Autotherm SRL",
        ],
        url: siteUrl,
        logo: absoluteUrl("/images/autotherm-logo.png"),
        foundingDate: String(FOUNDED_YEAR),
        founders: COMPANY.founders.map((name) => ({ "@type": "Person", name })),
        numberOfEmployees: {
          "@type": "QuantitativeValue",
          value: 33,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street,
          addressLocality: COMPANY.address.city,
          postalCode: COMPANY.address.postalCode,
          addressCountry: COMPANY.address.country,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+36-20-910-2050",
            email: COMPANY.email,
            contactType: "sales",
            areaServed: ["HU", "AT", "DE", "RO", "EU"],
            availableLanguage: ["Hungarian", "English", "German", "Romanian"],
          },
        ],
        sameAs: [COMPANY.facebook],
        description:
          "Manufacturer of refrigerated vehicles, cooled vans, deceased transport vehicles, and commercial vehicle bodies since 1992. Carrier Transicold partner.",
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        name: "Autotherm Kft.",
        image: absoluteUrl("/images/autotherm-logo.png"),
        url: siteUrl,
        telephone: "+36-20-910-2050",
        email: COMPANY.email,
        priceRange: "€€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.address.street,
          addressLocality: COMPANY.address.city,
          postalCode: COMPANY.address.postalCode,
          addressCountry: COMPANY.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: COMPANY.geo.lat,
          longitude: COMPANY.geo.lng,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "16:30",
          },
        ],
        areaServed: ["Hungary", "Austria", "Germany", "Romania", "European Union"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Refrigerated Vehicle Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Refrigerated Van Conversion",
                description:
                  "Van isolation and cooling unit installation for temperature-controlled transport.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Commercial Vehicle Body Manufacturing",
                description:
                  "Custom box bodies, aluminium bodies, flatbed with tarpaulin for 3.5T chassis.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Carrier Cooling Unit Service",
                description:
                  "Sales, installation and service of Carrier Transicold cooling units.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Deceased Transport Vehicle Manufacturing",
                description:
                  "Specialized funeral transport vehicles with temperature control.",
              },
            },
          ],
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Autotherm",
        alternateName: ["Autotherm Kft.", "autotherm.hu"],
        url: siteUrl,
        inLanguage: ["hu", "en", "de", "ro"],
        description:
          "Autotherm: manufacturer of refrigerated vehicles since 1992.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/hu/?s={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ProductJsonLd() {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Autotherm Insulated Refrigerated Vehicles",
        description:
          "Custom refrigerated vehicles and van isolations. Available with Carrier or Daikin cooling units.",
        image: absoluteUrl("/images/autotherm-logo.png"),
        brand: { "@type": "Brand", name: "Autotherm" },
        manufacturer: { "@type": "Organization", name: "Autotherm Kft." },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "HUF",
          lowPrice: 1500000,
          highPrice: 16000000,
          availability: "https://schema.org/InStock",
          areaServed: ["HU", "AT", "DE", "RO", "EU"],
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  return (
    <JsonLd
      schema={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
