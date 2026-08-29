import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconWorkflow, IconTrendingUp, IconBot, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "Lead Generation Agency in Ahmedabad | B2B & B2C Inbound Inquiries | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top lead generation company in Ahmedabad. High-intent B2B and B2C lead pipelines, Google search ads, Meta funnels, and sub-30-second WhatsApp lead capture.",
  alternates: { canonical: "/lead-generation-agency-ahmedabad/" },
};

export default function LeadGenerationAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "lead-generation-agency-ahmedabad",
        badge: "Lead Generation Agency Ahmedabad",
        h1: "High-Intent Lead Generation Agency in Ahmedabad for B2B & B2C Growth",
        tldr: "PR Marketing Ventures builds predictable, high-converting customer acquisition and lead generation engines in Ahmedabad. We capture high-intent buyers through Google Search, Meta ads, LinkedIn outreach, and instant WhatsApp qualification funnels.",
        heroSubtitle: "Fill your sales pipeline with verified decision-makers and ready-to-buy prospects. We engineer full-funnel lead generation systems that consistently deliver qualified inbound inquiries.",
        serviceType: "Lead Generation Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "High-Commercial Intent Search Leads",
            desc: "Capturing prospects actively searching for your solutions on Google with tailored ad copy, negative keyword filters, and high-converting landing pages.",
          },
          {
            icon: IconWorkflow,
            title: "Sub-30-Second WhatsApp Lead Response",
            desc: "Instantly engaging new leads on WhatsApp with product catalogs, qualifying buyer budgets, and assigning verified leads to sales reps.",
          },
          {
            icon: IconBuilding,
            title: "B2B Account-Based Marketing (ABM)",
            desc: "Targeting verified C-level executives, procurement managers, and business owners in Ahmedabad and Gujarat via LinkedIn and cold email.",
          },
          {
            icon: IconBot,
            title: "AI Lead Qualification & Screening",
            desc: "Autonomous AI bots that filter out unqualified inquiries, spam submissions, and tyre-kickers before your sales team spends valuable time.",
          },
        ],
        faqs: [
          {
            q: "How do you ensure lead quality and prevent fake inquiries in Ahmedabad?",
            a: "We implement OTP verification on forms, spam-filtering captcha, strict negative keyword exclusion lists, and conversational AI qualification to filter out irrelevant leads.",
          },
          {
            q: "How many qualified leads can my business expect per month?",
            a: "Depending on your industry and ad spend, our lead generation systems typically generate 50 to 500+ verified customer inquiries every month.",
          },
          {
            q: "Do leads get delivered directly to our sales team's WhatsApp or CRM?",
            a: "Yes. Inquiries are instantly routed to your team's WhatsApp, email, and sales CRM within 5 seconds of form submission.",
          },
        ],
      }}
    />
  );
}
