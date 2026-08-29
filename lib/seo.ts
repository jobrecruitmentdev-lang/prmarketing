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
    "@type": ["ProfessionalService", "MarketingAgency", "Organization"],
    name: site.name,
    image: `${site.url}/logo-mark.png`,
    "@id": site.url,
    url: site.url,
    telephone: site.phoneDisplay,
    priceRange: "$$",
    description: site.description,
    knowsAbout: [
      "Search Engine Optimization (SEO)",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Performance Marketing & PPC Management",
      "Marketing Automation & CRM Pipelines",
      "Next.js Full-Stack Web Development",
      "Conversion Rate Optimization (CRO)",
      "E-commerce Growth Engineering",
    ],
    areaServed: [
      { "@type": "Country", name: "Worldwide" },
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Australia" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Marketing, Software & AI Growth Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Marketing & Performance Ads",
            description: "Full-funnel digital marketing, Meta ads, Google ads, and lead generation campaigns in Ahmedabad.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Development",
            description: "Enterprise SaaS, custom web applications, Node.js, and Python backend engineering in Ahmedabad.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom CRM & Sales Pipeline Automation",
            description: "Custom CRM development, WhatsApp automation, and sales pipeline management for Ahmedabad businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Agents & AI Chatbots",
            description: "Autonomous LLM AI agents, WhatsApp lead qualification bots, and RAG document search systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Business Profile & Map Pack SEO",
            description: "Dominating Google Maps 3-Pack, local citations, and review generation in Ahmedabad.",
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
            name: "Performance Optimization & Core Web Vitals",
            description: "PageSpeed 90+ optimization, LCP/INP fixes, sub-second caching, and database query tuning.",
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

/* Article / Technical Guide Schema for GEO & AEO */
export function articleSchema(article: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: `${site.url}${article.path}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization",
      name: article.authorName || site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/logo-mark.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}${article.path}`,
    },
  };
}
