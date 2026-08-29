import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconWorkflow, IconTarget, IconBot, IconTrendingUp } from "@/components/icons";

export const metadata: Metadata = {
  title: "CRM Automation Company in Ahmedabad | Lead Pipeline Automation | PR Marketing Ventures",
  description:
    "Automate your sales CRM in Ahmedabad. PR Marketing Ventures builds instant lead capture, WhatsApp follow-ups, deal stage triggers, and automated sales notifications.",
  alternates: { canonical: "/crm-automation-ahmedabad/" },
};

export default function CrmAutomationAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "crm-automation-ahmedabad",
        badge: "CRM Automation Ahmedabad",
        h1: "Sales CRM Automation & Lead Pipeline Engineering in Ahmedabad",
        tldr: "PR Marketing Ventures connects your marketing campaigns, WhatsApp Business API, and sales CRM into a frictionless automated machine that contacts leads in under 30 seconds and follows up automatically.",
        heroSubtitle: "Stop letting hot leads turn cold. We automate lead assignment, WhatsApp nurture sequences, quotation reminders, and executive task alerts to double your sales closing speed.",
        serviceType: "CRM Automation Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconWorkflow,
            title: "Sub-30-Second Lead Response Workflows",
            desc: "Trigger instant automated WhatsApp messages with product brochures the millisecond a prospect submits an inquiry form.",
          },
          {
            icon: IconTarget,
            title: "Automated Round-Robin Sales Assignment",
            desc: "Fairly distribute incoming buyer leads among active sales reps with instant mobile push notifications.",
          },
          {
            icon: IconBot,
            title: "AI-Powered Follow-Up Triggers",
            desc: "Re-engage dormant leads with contextual WhatsApp check-ins and special seasonal promotional offers.",
          },
          {
            icon: IconTrendingUp,
            title: "Stalled Deal & Escalation Alerts",
            desc: "Automatically notify sales managers when high-value opportunities remain untouched for more than 24 hours.",
          },
        ],
        faqs: [
          {
            q: "What is CRM automation?",
            a: "CRM automation handles routine sales tasks—such as sending follow-up messages, scheduling reminders, assigning leads, and updating deal stages—automatically.",
          },
          {
            q: "Can you automate our existing CRM (e.g. LeadSquared, Zoho, Bitrix24)?",
            a: "Yes. We integrate and automate existing CRMs via custom APIs, webhooks, and n8n middleware.",
          },
        ],
      }}
    />
  );
}
