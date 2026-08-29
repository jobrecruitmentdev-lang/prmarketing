import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconSearch, IconTrendingUp, IconWorkflow, IconSparkles, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "Marketing Agency in Ahmedabad | Top Marketing Company & Growth Services | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is the leading full-service marketing agency in Ahmedabad, Gujarat. We engineer revenue-driven growth through digital marketing, SEO, PPC, brand strategy, AI agents, and CRM automation.",
  alternates: { canonical: "/marketing-agency-ahmedabad/" },
};

export default function MarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "marketing-agency-ahmedabad",
        badge: "Marketing Agency Ahmedabad",
        h1: "Top Marketing Agency in Ahmedabad for Business Growth & Lead Generation",
        tldr: "PR Marketing Ventures is Ahmedabad's premier full-service marketing company located on C.G. Road. We combine data-driven digital advertising, technical SEO, conversion-focused web engineering, and sales automation to help startups, SMEs, and enterprise brands scale profitably.",
        heroSubtitle: "Stop spending budget on vanity impressions. We build integrated marketing systems that capture high-intent buyer interest across Ahmedabad and convert traffic into verified customer revenue.",
        serviceType: "Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "Integrated Performance Marketing",
            desc: "High-ROAS paid acquisition campaigns across Google Search, Performance Max, Meta (Instagram/Facebook), and LinkedIn tailored for B2B and B2C brands.",
          },
          {
            icon: IconSearch,
            title: "Organic SEO & Google Maps Dominance",
            desc: "Technical SEO audits, topical content clusters, and Local 3-Pack optimization that place your brand at the very top of Google searches.",
          },
          {
            icon: IconTrendingUp,
            title: "Conversion Rate Optimization (CRO)",
            desc: "Sub-second Next.js landing pages, persuasive copywriting, and frictionless inquiry funnels designed to 2x your lead conversion rates.",
          },
          {
            icon: IconWorkflow,
            title: "Sales Pipeline & WhatsApp CRM Automation",
            desc: "Automated instant lead response systems that engage inbound prospects in under 30 seconds and nurture them into paying clients.",
          },
          {
            icon: IconSparkles,
            title: "Generative AI Search Optimization (GEO/AEO)",
            desc: "Engineering your brand data and digital footprint so ChatGPT, Perplexity, Claude, and Google AI Overviews cite you as the leading market authority.",
          },
          {
            icon: IconBuilding,
            title: "Brand Strategy & Corporate Positioning",
            desc: "Comprehensive brand identity, messaging frameworks, and visual design systems that elevate your market presence above competitors.",
          },
        ],
        table: {
          title: "PR Marketing Ventures vs Traditional Ahmedabad Marketing Companies",
          headers: ["Strategy Dimension", "PR Marketing Ventures", "Traditional Marketing Agencies"],
          rows: [
            { col1: "Core Objective", col2: "Direct Revenue & Verified Customer Acquisition", col3: "Vanity Likes, Impressions & Follower Counts" },
            { col1: "Lead Response Time", col2: "< 30 Seconds via WhatsApp CRM Automation", col3: "24 to 48 Hours via Delayed Email" },
            { col1: "Website Infrastructure", col2: "Sub-Second Next.js & React 19 Architectures", col3: "Slow, Bloated Template Themes" },
            { col1: "AI Search Readiness", col2: "Full GEO/AEO Entity Schema & LLM Citation", col3: "Zero AI Search Optimization" },
            { col1: "Local Proximity", col2: "Fairdeal House, C.G. Road, Ahmedabad", col3: "Outsourced / Remote Freelancers" },
          ],
        },
        faqs: [
          {
            q: "What does a full-service marketing agency in Ahmedabad do?",
            a: "A full-service marketing agency like PR Marketing Ventures handles end-to-end business growth: market research, Google & Meta paid ads, technical SEO, high-speed website development, brand positioning, WhatsApp automation, and CRM lead pipeline management.",
          },
          {
            q: "How much does hiring a marketing agency in Ahmedabad cost in 2026?",
            a: "Monthly marketing retainers in Ahmedabad range from ₹15,000/month for local business SEO up to ₹1,50,000+/month for enterprise multi-channel performance marketing, paid ad scaling, and custom web application engineering.",
          },
          {
            q: "How is PR Marketing Ventures different from other marketing companies in Ahmedabad?",
            a: "We are growth engineers. We do not just run ads or post on social media; we build complete automated revenue engines with sub-second Next.js landing pages, instant WhatsApp responders, and transparent live Google Analytics/Search Console dashboards.",
          },
          {
            q: "Do you work with startups, SMEs, and B2B manufacturers in Gujarat?",
            a: "Yes. We have proven client track records across startups, real estate developers, healthcare clinics, manufacturing exporters in GIDC industrial estates, and D2C ecommerce brands across Ahmedabad and Gujarat.",
          },
          {
            q: "How long does it take to see measurable results from marketing campaigns?",
            a: "Paid advertising campaigns on Google and Meta deliver verified inquiries within 48 to 72 hours. Organic SEO and Google Maps rankings typically compound into dominant market positions within 30 to 90 days.",
          },
          {
            q: "Do you offer in-person marketing strategy meetings in Ahmedabad?",
            a: "Yes. Our office is centrally located at Fairdeal House, C.G. Road, Navrangpura, Ahmedabad. We also conduct on-site strategy consultations across SG Highway, Prahladnagar, and GIFT City.",
          },
          {
            q: "How do you measure and report marketing return on investment (ROI)?",
            a: "We track Cost Per Lead (CPL), Customer Acquisition Cost (CAC), and Return On Ad Spend (ROAS) using live dashboards syncing GA4, Meta CAPI, and CRM deal values.",
          },
          {
            q: "Can you handle our complete marketing department on a turnkey retainer?",
            a: "Yes. Our turnkey retainers cover creative design, copywriting, paid ads management, SEO optimization, website maintenance, and weekly executive performance reviews.",
          },
        ],
      }}
    />
  );
}
