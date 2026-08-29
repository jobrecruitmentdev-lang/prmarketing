import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconTrendingUp, IconGauge, IconWorkflow, IconSearch } from "@/components/icons";

export const metadata: Metadata = {
  title: "Performance Marketing Agency in Ahmedabad | High-ROAS Paid Ads | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top performance marketing agency in Ahmedabad. Data-driven Google Ads, Meta Ads, full-funnel CRO, and lead generation campaigns that maximize ROI.",
  alternates: { canonical: "/performance-marketing-agency-ahmedabad/" },
};

export default function PerformanceMarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "performance-marketing-agency-ahmedabad",
        badge: "Performance Marketing Agency Ahmedabad",
        h1: "ROI-Driven Performance Marketing Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's premier data-driven performance marketing agency. We engineer high-ROAS paid advertising funnels across Google Search, Performance Max, Instagram, and LinkedIn with server-side attribution and sub-second landing pages.",
        heroSubtitle: "Stop burning ad budgets on vanity metrics. We tie every rupee spent directly to verified sales, qualified leads, and profitable customer acquisition for Ahmedabad businesses.",
        serviceType: "Performance Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "Precision Google Ads & PMax Scaling",
            desc: "Intent-based search bidding, negative keyword pruning, and shopping feed optimization to capture ready-to-buy customers in Ahmedabad.",
          },
          {
            icon: IconTrendingUp,
            title: "Meta Direct-Response Ad Funnels",
            desc: "High-converting video and carousel creatives engineered for Instagram and Facebook to scale cold audience acquisition profitably.",
          },
          {
            icon: IconGauge,
            title: "Conversion Rate Optimization (CRO)",
            desc: "Dedicated sub-second Next.js landing pages that eliminate bounce rates and double your paid traffic conversion rate.",
          },
          {
            icon: IconWorkflow,
            title: "Server-Side CAPI & Offline Conversion Tracking",
            desc: "Meta Conversions API and Google Enhanced Conversions ensuring 100% accurate data attribution despite browser ad blockers.",
          },
        ],
        faqs: [
          {
            q: "What makes performance marketing different from regular digital marketing in Ahmedabad?",
            a: "Performance marketing is 100% accountable. You only pay for measurable business outcomes (qualified leads, phone calls, sales) rather than vague impressions or social media likes.",
          },
          {
            q: "What minimum ad budget is recommended for performance marketing campaigns?",
            a: "We work with scaling businesses starting from ₹30,000/month up to enterprise accounts spending ₹10,00,000+/month across Gujarat and pan-India.",
          },
          {
            q: "How do you achieve high ROAS on Google and Meta ads?",
            a: "By combining tightly targeted exact-match keywords, high-converting video creatives, sub-second landing page speed, and automated WhatsApp lead nurturing.",
          },
        ],
      }}
    />
  );
}
