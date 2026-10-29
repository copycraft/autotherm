import { COMPANY, FOUNDED_YEAR } from "./constants";
import { HEARSE_SITE_URL } from "./hearse";
import { ECO_SITE_URL } from "./eco";
import { PHARMA_SITE_URL } from "./pharma";
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
        logo: absoluteUrl("/images/autotherm-logo.webp"),
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
        image: absoluteUrl("/images/autotherm-logo.webp"),
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
        image: absoluteUrl("/images/autotherm-logo.webp"),
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

/* -------------------------------------------------------------------------- */
/*  halottszallito.hu - same company, its own domain and product.             */
/* -------------------------------------------------------------------------- */

const HEARSE_URL = HEARSE_SITE_URL;

export function HearseJsonLd() {
  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Halottszállító – Autotherm",
          alternateName: ["Mortecontrol", "Autotherm Kft.", COMPANY.legalName],
          url: HEARSE_URL,
          logo: `${HEARSE_URL}/images/hearse/favicon-192.png`,
          foundingDate: String(FOUNDED_YEAR),
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
              telephone: "+36-20-223-1316",
              email: COMPANY.email,
              contactType: "sales",
              areaServed: ["HU", "AT", "DE", "RO", "EU"],
              availableLanguage: ["Hungarian", "English", "German", "Romanian"],
            },
          ],
          sameAs: [COMPANY.facebook, siteUrl],
          description:
            "Manufacturer of funeral vehicles, removal vans and hearses since 1992: 3.5-tonne van conversions with concealed +18 °C cargo cooling and all paperwork handled.",
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${HEARSE_URL}/#localbusiness`,
          name: "Halottszállító – Autotherm",
          image: `${HEARSE_URL}/images/hearse/hero.webp`,
          url: HEARSE_URL,
          telephone: "+36-20-223-1316",
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
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Halottszállító autó – funeral vehicle conversion",
          description:
            "3.5-tonne van converted for transporting the deceased: thermal-bridge-free insulation, washable polyester or stainless-steel lining, concealed +18 °C cooling, multi-level versions.",
          image: `${HEARSE_URL}/images/hearse/hero.webp`,
          brand: { "@type": "Brand", name: "Autotherm" },
          manufacturer: { "@type": "Organization", name: "Autotherm Kft." },
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Halottszállító – Autotherm",
          alternateName: ["Mortecontrol", "halottszallito.hu"],
          url: HEARSE_URL,
          inLanguage: ["hu", "en", "de", "ro"],
          description:
            "Funeral vehicle manufacturing since 1992: removal vans, hearses and mortuary conversions.",
        }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  ehutoauto.hu - same company, its own domain and product.                   */
/* -------------------------------------------------------------------------- */

const ECO_URL = ECO_SITE_URL;

export function EcoJsonLd() {
  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "eHűtőautó – Autotherm",
          alternateName: ["Zero Emission", "Autotherm Kft.", COMPANY.legalName],
          url: ECO_URL,
          logo: `${ECO_URL}/images/eco/favicon-32.png`,
          foundingDate: String(FOUNDED_YEAR),
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
              telephone: "+36-20-223-1316",
              email: COMPANY.email,
              contactType: "sales",
              areaServed: ["HU", "AT", "DE", "RO", "EU"],
              availableLanguage: ["Hungarian", "English", "German", "Romanian"],
            },
          ],
          sameAs: [COMPANY.facebook, siteUrl],
          description:
            "Electric refrigerated van conversions with a self-contained refrigeration unit on its own battery pack: unchanged range, zero-emission chilled transport.",
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${ECO_URL}/#localbusiness`,
          name: "eHűtőautó – Autotherm",
          image: `${ECO_URL}/images/eco/builds/covers/ecitan.webp`,
          url: ECO_URL,
          telephone: "+36-20-223-1316",
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
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Elektromos hűtőautó – electric refrigerated van conversion",
          description:
            "Electric van converted into a refrigerated vehicle with a self-contained, cyclically charged battery-pack cooling unit. Cooling never draws on the traction battery.",
          image: `${ECO_URL}/images/eco/builds/covers/ecitan.webp`,
          brand: { "@type": "Brand", name: "Autotherm" },
          manufacturer: { "@type": "Organization", name: "Autotherm Kft." },
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "eHűtőautó – Autotherm",
          alternateName: ["Zero Emission", "ehutoauto.hu"],
          url: ECO_URL,
          inLanguage: ["hu", "en", "de", "ro"],
          description:
            "Electric refrigerated vehicles with a self-contained cooling unit: unchanged range, zero-emission transport.",
        }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pharmacontrol - pharmaceutical transport vehicles, its own domain.         */
/* -------------------------------------------------------------------------- */

const PHARMA_URL = PHARMA_SITE_URL;

export function PharmaJsonLd() {
  const image = `${PHARMA_URL}/images/master-reefer-doors-open.webp`;
  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Pharmacontrol – Autotherm",
          alternateName: ["Autotherm Kft.", COMPANY.legalName],
          url: PHARMA_URL,
          logo: `${PHARMA_URL}/images/pharma/favicon-192.png`,
          foundingDate: String(FOUNDED_YEAR),
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
              telephone: COMPANY.phone,
              email: COMPANY.email,
              contactType: "sales",
              areaServed: ["HU", "AT", "DE", "RO", "EU"],
              availableLanguage: ["Hungarian", "English", "German", "Romanian"],
            },
          ],
          sameAs: [COMPANY.facebook, siteUrl],
          description:
            "Refrigerated and temperature-controlled vehicles for pharmaceutical transport, built by Autotherm in Szeged.",
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": `${PHARMA_URL}/#localbusiness`,
          name: "Pharmacontrol – Autotherm",
          image,
          url: PHARMA_URL,
          telephone: COMPANY.phone,
          email: COMPANY.email,
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
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Pharmacontrol – Autotherm",
          alternateName: ["Pharmacontrol"],
          url: PHARMA_URL,
          inLanguage: ["hu", "en", "de", "ro"],
          description:
            "Temperature-controlled vehicles for pharmaceutical transport: chilled (2–8 °C) and controlled room-temperature (15–25 °C) versions.",
        }}
      />
    </>
  );
}
