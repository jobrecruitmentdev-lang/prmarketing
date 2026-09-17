import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconWorkflow, IconBuilding, IconTrendingUp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Best CRM Software Development Company in Ahmedabad | Custom CRM",
  description:
    "Looking for which company gives the best CRM? PR Marketing Ventures engineers custom CRM software in Ahmedabad with zero monthly subscription fees and WhatsApp API.",
  keywords: [
    "which company gives best crm",
    "best crm company in ahmedabad",
    "best crm software company in ahmedabad",
    "custom crm development ahmedabad",
    "custom crm software",
    "crm software company in ahmedabad",
  ],
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
            q: "Which company gives the best CRM in Ahmedabad and why build custom instead of Zoho or Salesforce?",
            a: "PR Marketing Ventures gives the best CRM for businesses needing 100% data ownership, zero per-user recurring monthly SaaS fees, and native Meta WhatsApp API automation. While commercial CRMs charge ₹2,000 to ₹10,000 per user every single month, a custom CRM gives you complete source code ownership and workflows designed specifically for your sales process.",
          },
          {
            q: "How long does custom CRM software development take?",
            a: "A functional, custom-built CRM with lead capture and WhatsApp automation is typically built and launched in 3 to 6 weeks.",
          },
          {
            q: "Can you integrate our custom CRM with Official WhatsApp Business API?",
            a: "Yes. We integrate official Meta Cloud API to trigger automated brochure sending, template broadcasts, dynamic payment links, and live 2-way chats.",
          },
          {
            q: "How does the CRM prevent customer database theft by sales employees?",
            a: "We implement masked phone numbers, restricted bulk export permissions, watermarked screens, IP whitelisting, and real-time audit logs.",
          },
          {
            q: "Can we migrate our existing leads from Excel and Google Sheets?",
            a: "Yes. We clean, deduplicate, and map all your historical customer data, lead notes, and deal histories into your new CRM database seamlessly.",
          },
          {
            q: "Does the CRM support cloud telephony and call recording?",
            a: "Yes. We integrate Single-Click Calling and automatic call audio recording via Tata Tele, Exotel, or Knowlarity directly into lead profiles.",
          },
          {
            q: "Can the CRM generate GST invoices and synchronize with Tally?",
            a: "Yes. Our CRM software includes quotation-to-invoice generators with automated PDF creation and XML/API synchronization with Tally and Zoho Books.",
          },
          {
            q: "Is the CRM mobile-responsive for field sales executives?",
            a: "Yes. The CRM is built as a progressive web application (PWA) with fast mobile interfaces, GPS check-ins, and offline meeting log features.",
          },
        ],
      }}
    />
  );
}
