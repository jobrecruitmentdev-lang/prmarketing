import { site } from "./site";

/* BreadcrumbList JSON-LD for simple subpages (Home > Page). */
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

/* Multi-level BreadcrumbList JSON-LD (e.g. Home > Services > SEO Services). */
export function multiBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.name,
        item: `${site.url}${item.path}`,
      })),
    ],
  };
}

/* LocalBusiness & Marketing Agency Schema */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "MarketingAgency"],
    name: site.name,
    image: `${site.url}/logo-mark.png`,
    "@id": site.url,
    url: site.url,
    telephone: site.phoneDisplay,
    priceRange: "$$",
    description: site.description,
    serviceArea: {
      "@type": "AdministrativeArea",
      name: "Ahmedabad, Gujarat, India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing & Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing & Performance Ads",
            description: "Full-funnel digital marketing, Meta ads, Google ads, and lead generation campaigns.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Search Engine Optimization (SEO)",
            description: "Technical SEO, on-page optimization, topical clusters, and revenue-focused rankings.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Local SEO & Google Business Profile",
            description: "Dominating local map pack, Google reviews, and local search rankings in Ahmedabad.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI SEO (GEO / AEO)",
            description: "Generative engine optimization for visibility in ChatGPT, Gemini, and Google AI Overviews.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website & Ecommerce Development",
            description: "High-performance Next.js and custom web development engineered for conversion.",
          },
        },
      ],
    },
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
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
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

/* Single Service Schema for Individual Landing Pages */
export function singleServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${site.url}${service.url}`,
    serviceType: service.serviceType || service.name,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      telephone: site.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: "B-910, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road)",
        addressLocality: "Ahmedabad",
        postalCode: "380009",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: service.areaServed || "Ahmedabad, Gujarat, India",
    },
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
