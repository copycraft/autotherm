import { siteUrl } from "./seo";

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Autotherm Kft.",
    alternateName: ["Autotherm", "Autotherm Kereskedelmi és Szolgáltató Kft."],
    url: siteUrl,
    logo: `${siteUrl}/images/autotherm-logo.png`,
    foundingDate: "1992",
    founders: [
      { "@type": "Person", name: "Csurgó László" },
      { "@type": "Person", name: "Dkfm. Peter Knerer" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Napos út 3.",
      addressLocality: "Szeged",
      postalCode: "6728",
      addressCountry: "HU",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+36-20-910-2050",
        contactType: "sales",
        areaServed: ["HU", "AT", "DE", "RO", "EU"],
        availableLanguage: ["Hungarian", "English", "German", "Romanian"],
      },
    ],
    sameAs: ["https://www.facebook.com/rakterhutes/"],
    description:
      "Manufacturer of refrigerated vehicles, cooled vans, deceased transport vehicles, and commercial vehicle bodies since 1992. Carrier Transicold partner.",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Autotherm Kft.",
    image: `${siteUrl}/images/autotherm-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Napos út 3.",
      addressLocality: "Szeged",
      postalCode: "6728",
      addressCountry: "HU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.2677,
      longitude: 20.1222,
    },
    telephone: "+36-20-910-2050",
    email: "autotherm@autotherm.hu",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:30",
      },
    ],
    priceRange: "€€€",
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
            description: "Van isolation and cooling unit installation for temperature-controlled transport.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Vehicle Body Manufacturing",
            description: "Custom box bodies, aluminium bodies, flatbed with tarpaulin for 3.5T chassis.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Carrier Cooling Unit Service",
            description: "Sales, installation and service of Carrier Transicold cooling units.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deceased Transport Vehicle Manufacturing",
            description: "Specialized funeral transport vehicles with temperature control.",
          },
        },
      ],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Autotherm",
    alternateName: ["Autotherm Kft.", "autotherm.hu"],
    url: siteUrl,
    description: "Autotherm: manufacturer of refrigerated vehicles since 1992.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/hu/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function ProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Autotherm Insulated Refrigerated Vehicles",
    description:
      "Custom refrigerated vehicles and van isolations. Available with Carrier or Daikin cooling units.",
    brand: {
      "@type": "Brand",
      name: "Autotherm",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Autotherm Kft.",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HUF",
      lowPrice: 1500000,
      highPrice: 16000000,
      availability: "https://schema.org/InStock",
      areaServed: ["HU", "AT", "DE", "RO", "EU"],
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
