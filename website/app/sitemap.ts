import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${site.url}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    // Dedicated Ahmedabad Money Pages (Tier 1 to Tier 17)
    { url: `${site.url}/marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/digital-marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/seo-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${site.url}/local-seo-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/google-business-profile-management-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/performance-marketing-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/performance-marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/lead-generation-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/social-media-marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/social-media-marketing-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/google-ads-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/marketing-automation-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ai-marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/b2b-marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/branding-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/pharma-marketing-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/geo-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/aeo-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ai-search-optimization-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ai-agency-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ai-agents-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ai-automation-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/business-automation-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/crm-development-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/crm-automation-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/software-development-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/web-development-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/website-design-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/website-development-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ecommerce-development-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/ecommerce-website-development-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/conversion-rate-optimization-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/website-performance-optimization-ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/locations/ahmedabad/`, lastModified, changeFrequency: "weekly", priority: 0.9 },

    // Core Service Hubs
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

    // Startup Stories & Authority Hub
    { url: `${site.url}/startup-stories/instaastro-raises-12-mn-series-a-to-scale-ai-led-astrology-and-spiritual-commerce/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/startup-stories/from-4000-in-facebook-ads-to-a-14790-crore-ipo-the-urban-company-story/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/startup-stories/shadowfax-success-story-how-four-iit-delhi-alumni-built-indias-largest-crowdsourced-logistics-network/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/startup-stories/pee-safe-the-brand-that-started-with-a-uti-and-is-now-rewriting-indias-hygiene-story/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/startup-stories/genoconnect-how-this-kerala-startup-is-bringing-dna-testing-out-of-the-lab-and-into-everyday-life/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/startup-stories/how-sekar-vembu-is-taking-on-global-data-protection-giants-without-external-funding/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/startup-stories/`, lastModified, changeFrequency: "weekly", priority: 0.9 },

    // Industry Commercial Silos
    { url: `${site.url}/industries/real-estate/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/healthcare/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/manufacturing/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/education/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/hospitality/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/finance-ca/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/legal/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/ecommerce/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/industries/saas/`, lastModified, changeFrequency: "weekly", priority: 0.85 },

    // Free Growth Tools Suite
    { url: `${site.url}/tools/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/tools/domain-authority-checker/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/tools/google-review-qr-generator/`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${site.url}/tools/whatsapp-link-generator/`, lastModified, changeFrequency: "weekly", priority: 0.95 },

    // Company & Conversion Core
    { url: `${site.url}/about/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/pricing/`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/portfolio/`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/contact/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/html-sitemap/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
