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
