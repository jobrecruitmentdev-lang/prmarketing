import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSearch, IconGauge, IconSparkles, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "SEO Agency in Ahmedabad | Top SEO Company & Services | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is the leading SEO agency in Ahmedabad. We specialize in Technical SEO, on-page optimization, topical authority clusters, and enterprise Google rankings across Gujarat.",
  alternates: { canonical: "/seo-agency-ahmedabad/" },
};

export default function SeoAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "seo-agency-ahmedabad",
        badge: "SEO Agency Ahmedabad",
        h1: "Top SEO Company in Ahmedabad for First-Page Google Rankings",
        tldr: "PR Marketing Ventures is Ahmedabad's technical SEO agency. We help businesses rank #1 on Google through structured data schema, high-speed Core Web Vitals optimization, topical clusters, and revenue-driven keyword strategies.",
        heroSubtitle: "Stop wasting money on empty keyword rankings that don't bring sales. We build sustainable organic search systems that drive consistent inbound phone calls and high-ticket customer inquiries.",
        serviceType: "SEO Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "Technical & On-Page SEO Architecture",
            desc: "Flawless site architecture, internal linking silos, canonical management, and JSON-LD schema to make your site 100% crawlable by Google.",
          },
          {
            icon: IconGauge,
            title: "Core Web Vitals & Sub-Second Speed",
            desc: "Next.js and technical web optimization to score 90+ on Google PageSpeed Insights, giving your site an immediate ranking advantage.",
          },
          {
            icon: IconSparkles,
            title: "Topical Authority & Content Hubs",
            desc: "Comprehensive pillar and cluster content strategies that establish your brand as the undisputed market leader in Ahmedabad.",
          },
          {
            icon: IconWorkflow,
            title: "Local & High-Authority Backlink Acquisition",
            desc: "Zero-spam, contextual outreach and local Gujarat business citations that pass authentic domain authority and trust signals.",
          },
        ],
        faqs: [
          {
            q: "How long does it take to rank on Google in Ahmedabad?",
            a: "For low-to-medium competition local queries, results start showing in 30 to 45 days. For highly competitive head keywords (like 'Real Estate Ahmedabad' or 'SEO Company Ahmedabad'), it typically takes 90 to 180 days of compounding topical authority.",
          },
          {
            q: "How much do SEO services cost per month in Ahmedabad?",
            a: "Our monthly SEO retainer packages range from ₹15,000/month for local business SEO up to ₹60,000+/month for enterprise, ecommerce, and multi-location technical SEO.",
          },
          {
            q: "Do you guarantee #1 rankings on Google?",
            a: "No ethical agency can guarantee a specific position because Google updates its algorithm daily. However, we guarantee strict adherence to white-hat Google guidelines, technical health, and demonstrable organic traffic growth month-over-month.",
          },
          {
            q: "What is the difference between Local SEO and National/Enterprise SEO?",
            a: "Local SEO focuses on Google Maps (Local 3-Pack) and 'near me' searches in Ahmedabad. Enterprise SEO targets broad nationwide and global keywords without geographic boundaries.",
          },
          {
            q: "Do you provide transparent monthly SEO reporting?",
            a: "Yes. Every client receives a live Google Search Console and GA4 dashboard tracking keyword movements, organic impressions, clicks, and conversion events.",
          },
        ],
      }}
    />
  );
}
