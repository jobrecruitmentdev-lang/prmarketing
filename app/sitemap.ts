import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/services/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/portfolio/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
