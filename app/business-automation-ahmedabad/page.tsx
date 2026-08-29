import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconWorkflow, IconServer, IconTarget, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Business Automation Company in Ahmedabad | Workflow & Process Automation | PR Marketing Ventures",
  description:
    "PR Marketing Ventures builds end-to-end business automation systems in Ahmedabad. Connect CRMs, WhatsApp, accounting, and marketing into frictionless automated workflows.",
  alternates: { canonical: "/business-automation-ahmedabad/" },
};

export default function BusinessAutomationAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "business-automation-ahmedabad",
        badge: "Business Automation Ahmedabad",
        h1: "Business Process & Workflow Automation in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's specialized business process automation agency. We design and implement automated pipelines connecting sales, operations, billing, and customer service.",
        heroSubtitle: "Eliminate operational bottlenecks. We automate repetitive manual workflows so your business runs smoothly, efficiently, and profitably 24/7.",
        serviceType: "Business Automation Company",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconWorkflow,
            title: "Multi-App Workflow Orchestration",
            desc: "Custom n8n and webhook architectures integrating websites, payment gateways, WhatsApp, and inventory databases.",
          },
          {
            icon: IconTarget,
            title: "Automated Lead & Sales Operations",
            desc: "Zero-latency lead routing, automated WhatsApp proposals, and automated customer follow-ups that increase deal closing rates.",
          },
          {
            icon: IconServer,
            title: "Billing & Accounting Synchronization",
            desc: "Automated generation of GST invoices, payment receipt notifications, and ledger updates into accounting software.",
          },
          {
            icon: IconCheck,
            title: "Operational Dashboards & Alerts",
            desc: "Real-time daily KPI executive summaries delivered to management via Telegram or WhatsApp every morning.",
          },
        ],
        faqs: [
          {
            q: "What is business automation?",
            a: "Business automation uses software workflows and webhooks to execute repetitive multi-step tasks without human intervention.",
          },
          {
            q: "How does business automation integrate with existing software?",
            a: "We connect your existing tools (CRMs, Google Sheets, WhatsApp, payment gateways) using secure API integrations and custom automated middleware.",
          },
        ],
      }}
    />
  );
}
