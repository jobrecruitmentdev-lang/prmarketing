import { describe, it, expect } from "vitest";
import {
  breadcrumbSchema,
  multiBreadcrumbSchema,
  singleServiceSchema,
  localBusinessSchema,
} from "@/lib/seo";
import { site, nav, industries } from "@/lib/site";

describe("breadcrumbSchema", () => {
  it("builds a valid two-level BreadcrumbList", () => {
    const schema = breadcrumbSchema("About", "/about/");
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0]).toMatchObject({
      position: 1,
      name: "Home",
      item: `${site.url}/`,
    });
    expect(schema.itemListElement[1]).toMatchObject({
      position: 2,
      name: "About",
      item: `${site.url}/about/`,
    });
  });

  it("always uses site.url as the item origin (no hardcoded domain drift)", () => {
    const schema = breadcrumbSchema("Contact", "/contact/");
    for (const entry of schema.itemListElement) {
      expect(entry.item.startsWith(site.url)).toBe(true);
    }
  });

  it("handles an empty path without throwing", () => {
    expect(() => breadcrumbSchema("Home", "")).not.toThrow();
    const schema = breadcrumbSchema("Home", "");
    expect(schema.itemListElement[1].item).toBe(site.url);
  });
});

describe("multiBreadcrumbSchema", () => {
  it("builds a valid three-level BreadcrumbList", () => {
    const schema = multiBreadcrumbSchema([
      { name: "Services", path: "/services/" },
      { name: "SEO Services", path: "/services/seo/" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].name).toBe("Home");
    expect(schema.itemListElement[1].name).toBe("Services");
    expect(schema.itemListElement[1].item).toBe(`${site.url}/services/`);
    expect(schema.itemListElement[2].name).toBe("SEO Services");
    expect(schema.itemListElement[2].item).toBe(`${site.url}/services/seo/`);
  });
});

describe("singleServiceSchema", () => {
  it("builds a valid Service schema with ProfessionalService provider", () => {
    const schema = singleServiceSchema({
      name: "SEO Services",
      description: "Data-driven SEO services in Ahmedabad",
      url: "/services/seo/",
      serviceType: "Search Engine Optimization",
    });
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("SEO Services");
    expect(schema.url).toBe(`${site.url}/services/seo/`);
    expect(schema.provider["@type"]).toBe("ProfessionalService");
    expect(schema.provider.name).toBe(site.name);
  });
});

describe("localBusinessSchema", () => {
  it("includes MarketingAgency and ProfessionalService entity types with OfferCatalog", () => {
    const schema = localBusinessSchema();
    expect(schema["@type"]).toContain("MarketingAgency");
    expect(schema["@type"]).toContain("ProfessionalService");
    expect(schema.hasOfferCatalog).toBeDefined();
    expect(schema.hasOfferCatalog.name).toBe("Marketing & Digital Services");
  });
});

describe("site config", () => {
  it("url has no trailing slash (routes assume this when concatenating)", () => {
    expect(site.url.endsWith("/")).toBe(false);
  });

  it("email looks like an email", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });
});

describe("nav", () => {
  it("every entry has a trailing-slash href except home", () => {
    for (const item of nav) {
      if (item.href === "/") continue;
      expect(item.href.endsWith("/")).toBe(true);
    }
  });

  it("has no duplicate hrefs", () => {
    const hrefs = nav.map((n) => n.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe("industries", () => {
  it("is a non-empty list of unique, non-blank strings", () => {
    expect(industries.length).toBeGreaterThan(0);
    expect(new Set(industries).size).toBe(industries.length);
    for (const i of industries) expect(i.trim().length).toBeGreaterThan(0);
  });
});
