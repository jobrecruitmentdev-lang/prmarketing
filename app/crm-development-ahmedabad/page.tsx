import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconWorkflow, IconBuilding, IconTrendingUp } from "@/components/icons";

export const metadata: Metadata = {
  title: "CRM Development Company in Ahmedabad | Custom CRM Software | PR Marketing Ventures",
  description:
    "PR Marketing Ventures develops custom CRM software in Ahmedabad. Scalable lead management, WhatsApp integration, pipeline tracking, and zero recurring user license fees.",
  alternates: { canonical: "/crm-development-ahmedabad/" },
};

export default function CrmDevelopmentAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "crm-development-ahmedabad",
        badge: "CRM Development Ahmedabad",
        h1: "Custom CRM Software Development Company in Ahmedabad",
        tldr: "PR Marketing Ventures builds bespoke CRM software systems for Ahmedabad businesses with 100% source code ownership, zero per-user monthly subscription fees, and direct WhatsApp/telephony integration.",
        heroSubtitle: "Stop paying expensive recurring SaaS fees for rigid CRM software. We engineer custom CRM platforms tailored exactly to your sales pipeline, team structure, and reporting requirements.",
        serviceType: "CRM Software Development Company",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "Custom Sales Pipeline & Kanban Boards",
            desc: "Visual deal tracking tailored to your exact sales stages, quotation milestones, and commission structures.",
          },
          {
            icon: IconWorkflow,
            title: "Integrated WhatsApp & Telephony Suite",
            desc: "Send WhatsApp brochures, make single-click calls, and log customer conversations directly inside the lead profile.",
          },
          {
            icon: IconBuilding,
            title: "Role-Based Permissions & Data Protection",
            desc: "Ensure sales executives only see assigned leads, preventing database theft with strict export restrictions.",
          },
          {
            icon: IconTrendingUp,
            title: "Executive Analytics & Revenue Forecasts",
            desc: "Instant visibility into rep conversion rates, average deal cycle time, and expected monthly cash flow.",
          },
        ],
        faqs: [
          {
            q: "Why build a custom CRM instead of using Zoho, HubSpot, or Salesforce in Ahmedabad?",
            a: "Commercial CRMs charge ₹2,000 to ₹10,000 per user every single month and impose strict limitations. A custom CRM gives you 100% data ownership, zero recurring user fees, and custom workflows designed specifically for your business.",
          },
          {
            q: "How long does custom CRM software development take?",
            a: "A functional, custom-built CRM with lead capture and WhatsApp automation is typically built and launched in 3 to 6 weeks.",
          },
        ],
      }}
    />
  );
}
