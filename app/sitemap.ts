import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/services/digital-marketing/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/services/software-development/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/crm-solutions/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/ai-agents/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/google-business-profile/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/performance-optimization/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/performance-marketing/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/international-seo/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/services/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services/seo/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services/local-seo/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services/web-development/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/services/ecommerce/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/services/ai-seo/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/services/marketing-automation/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/guides/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/guides/generative-engine-optimization/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/industries/real-estate/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/ecommerce/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/saas/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/about/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/pricing/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/portfolio/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
