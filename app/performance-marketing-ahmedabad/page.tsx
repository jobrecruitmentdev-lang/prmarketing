import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconTrendingUp, IconGauge, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Performance Marketing Agency in Ahmedabad | High-ROAS Paid Ads | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top performance marketing company in Ahmedabad. Data-driven Google Ads, Meta Ads, full-funnel CRO, and lead generation campaigns that maximize ROI.",
  alternates: { canonical: "/performance-marketing-ahmedabad/" },
};

export default function PerformanceMarketingAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "performance-marketing-ahmedabad",
        badge: "Performance Marketing Ahmedabad",
        h1: "ROI-Driven Performance Marketing Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's data-driven performance marketing agency. We engineer paid advertising campaigns on Google, Meta, and LinkedIn with sub-second landing pages and server-side tracking to maximize return on ad spend (ROAS).",
        heroSubtitle: "Stop burning ad budgets on vanity metrics. We tie every single rupee spent directly to verified sales, qualified leads, and profitable customer acquisition for Ahmedabad businesses.",
        serviceType: "Performance Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "Precision Google Ads & PMax Scaling",
            desc: "Intent-based search bidding, shopping feed optimization, and smart negative keyword structures to capture ready-to-buy customers.",
          },
          {
            icon: IconTrendingUp,
            title: "Meta Direct-Response Ad Funnels",
            desc: "High-converting video and carousel creatives engineered for Instagram and Facebook to scale customer acquisition.",
          },
          {
            icon: IconGauge,
            title: "Conversion Rate Optimization (CRO)",
            desc: "Dedicated sub-second Next.js landing pages that double your ad conversion rates and slash your cost per lead.",
          },
          {
            icon: IconWorkflow,
            title: "Server-Side CAPI & Offline Conversion Tracking",
            desc: "Meta Conversions API and Google Enhanced Conversions to ensure 100% accurate data attribution despite ad blockers.",
          },
        ],
        faqs: [
          {
            q: "What is Performance Marketing and how does it help my business in Ahmedabad?",
            a: "Performance marketing is 100% measurable advertising where marketing budget is tied directly to results (sales, leads, calls), ensuring positive return on ad spend (ROAS).",
          },
          {
            q: "What monthly ad budget is recommended to start performance marketing?",
            a: "We work with scaling businesses spending from ₹30,000/month up to enterprise accounts spending ₹10,00,000+/month across Gujarat and pan-India.",
          },
        ],
      }}
    />
  );
}
