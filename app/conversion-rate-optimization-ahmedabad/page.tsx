import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconGauge, IconTarget, IconLayout, IconTrendingUp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Conversion Rate Optimization (CRO) Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "Double your website conversions in Ahmedabad. PR Marketing Ventures provides A/B split testing, landing page optimization, UX heatmaps, and frictionless checkout engineering.",
  alternates: { canonical: "/conversion-rate-optimization-ahmedabad/" },
};

export default function CroAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "conversion-rate-optimization-ahmedabad",
        badge: "CRO Agency Ahmedabad",
        h1: "Conversion Rate Optimization (CRO) Agency in Ahmedabad",
        tldr: "PR Marketing Ventures helps Ahmedabad businesses extract 2x to 3x more leads and sales from their existing website traffic through A/B testing, user journey audits, and sub-second landing page optimization.",
        heroSubtitle: "Stop spending more on ads when your website is leaking traffic. We optimize user friction points, form layouts, and value propositions to turn more visitors into paying customers.",
        serviceType: "Conversion Rate Optimization Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconLayout,
            title: "Landing Page Wireframing & Redesign",
            desc: "Custom high-speed landing pages built on Next.js designed specifically around user intent and conversion psychology.",
          },
          {
            icon: IconGauge,
            title: "Heatmap & User Session Analysis",
            desc: "Tracking exact scroll depth, drop-off points, and click patterns to identify where potential buyers get stuck.",
          },
          {
            icon: IconTarget,
            title: "A/B Split Testing & Headline Experimentation",
            desc: "Iterative testing of headlines, offers, CTAs, and form fields to statistically validate what drives higher closing rates.",
          },
          {
            icon: IconTrendingUp,
            title: "Checkout & Form Friction Reduction",
            desc: "Streamlining multi-step forms into 1-click WhatsApp or instant OTP verifications to eliminate checkout abandonment.",
          },
        ],
        faqs: [
          {
            q: "What is Conversion Rate Optimization (CRO)?",
            a: "CRO is the systematic process of improving your website's layout, copy, and speed so a higher percentage of visitors convert into leads or customers.",
          },
          {
            q: "How much can CRO improve our lead generation in Ahmedabad?",
            a: "Typical CRO optimizations increase conversion rates by 50% to 200%, effectively cutting your cost per acquisition in half without spending extra on ads.",
          },
        ],
      }}
    />
  );
}
