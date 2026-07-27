import { site } from "./site";

/* BreadcrumbList JSON-LD for subpages (Home > Page). */
export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
    ],
  };
}

/* LocalBusiness Schema */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    image: `${site.url}/logo-mark.png`,
    "@id": site.url,
    url: site.url,
    telephone: site.phoneDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-910, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road)",
      addressLocality: "Ahmedabad",
      postalCode: "380009",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.036,
      longitude: 72.561,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

/* FAQPage Schema */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/* Service Schema */
export function serviceSchema(services: { title: string; desc: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((srv, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: srv.title,
        description: srv.desc,
        provider: {
          "@type": "Organization",
          name: site.name,
        },
        ...(srv.url ? { url: `${site.url}${srv.url}` } : {}),
      },
    })),
  };
}

/* WebPage Schema (About, Contact) */
export function webPageSchema(type: "AboutPage" | "ContactPage", name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: `${site.url}${path}`,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
  };
}
