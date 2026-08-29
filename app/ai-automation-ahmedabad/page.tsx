import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconWorkflow, IconBot, IconServer, IconSparkles } from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Automation Agency in Ahmedabad | Intelligent Workflow Systems | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a leading AI automation agency in Ahmedabad. We automate repetitive business operations, customer support, data extraction, and CRM updates with intelligent LLMs.",
  alternates: { canonical: "/ai-automation-ahmedabad/" },
};

export default function AiAutomationAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ai-automation-ahmedabad",
        badge: "AI Automation Ahmedabad",
        h1: "AI Automation Agency in Ahmedabad for Business Efficiency",
        tldr: "PR Marketing Ventures helps Ahmedabad companies eliminate manual administrative busywork with AI automation pipelines, optical character recognition (OCR), intelligent document parsers, and automated lead routing.",
        heroSubtitle: "Save hundreds of hours every month. We integrate AI into your daily business operations to automate customer inquiries, document processing, quotation generation, and data synchronization.",
        serviceType: "AI Automation Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconWorkflow,
            title: "Automated Document & Invoice Extraction",
            desc: "AI models that read incoming vendor bills, purchase orders, and PDF contracts, extracting structured data directly into your ERP.",
          },
          {
            icon: IconBot,
            title: "Automated Customer Support Workflows",
            desc: "Instant AI resolution for order tracking, refund queries, and appointment rescheduling across email and WhatsApp.",
          },
          {
            icon: IconSparkles,
            title: "Intelligent Lead Scoring & Enrichment",
            desc: "Enrich incoming leads with company size, verified LinkedIn profiles, and buyer intent scores before passing to sales reps.",
          },
          {
            icon: IconServer,
            title: "Cross-Platform API & n8n Integration",
            desc: "Connecting disparate business software (Zoho, WhatsApp, Tally, Google Sheets, Slack) into one unified automated machine.",
          },
        ],
        faqs: [
          {
            q: "What business processes can AI automation handle in Ahmedabad?",
            a: "Lead qualification, customer support, PDF data extraction, automated invoicing, order status updates, and automated sales reporting.",
          },
          {
            q: "How does AI automation save costs for mid-sized companies?",
            a: "By automating repetitive data entry and qualification, businesses reduce manual human errors, cut response time from hours to seconds, and scale operations without expanding headcount.",
          },
        ],
      }}
    />
  );
}
