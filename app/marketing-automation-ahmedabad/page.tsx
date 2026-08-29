import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconWorkflow, IconBot, IconTarget, IconServer, IconSparkles } from "@/components/icons";

export const metadata: Metadata = {
  title: "Marketing Automation Agency in Ahmedabad | Automated Lead Nurturing | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a leading marketing automation company in Ahmedabad. Automate WhatsApp responders, lead scoring, CRM triggers, and email drip sequences.",
  alternates: { canonical: "/marketing-automation-ahmedabad/" },
};

export default function MarketingAutomationAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "marketing-automation-ahmedabad",
        badge: "Marketing Automation Ahmedabad",
        h1: "Marketing Automation Agency in Ahmedabad for Scalable Growth",
        tldr: "PR Marketing Ventures connects your digital advertising, WhatsApp Business API, CRM pipelines, and email marketing into an automated lead nurturing machine that engages prospects in under 30 seconds and saves 15+ hours of manual work every week.",
        heroSubtitle: "Stop losing hot leads to delayed manual follow-ups. We design automated workflows that capture inbound inquiries, qualify budgets, and close sales appointments automatically 24/7.",
        serviceType: "Marketing Automation Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconWorkflow,
            title: "Sub-30-Second WhatsApp Lead Auto-Responders",
            desc: "Trigger instant personalized WhatsApp messages with product brochures and dynamic meeting links the millisecond a prospect submits a lead form.",
          },
          {
            icon: IconTarget,
            title: "Automated Lead Scoring & Pipeline Routing",
            desc: "Classify high-priority buyer leads and route them instantly to active sales executives with mobile push and SMS notifications.",
          },
          {
            icon: IconBot,
            title: "AI-Powered WhatsApp & Web Chatbots",
            desc: "Intelligent conversational bots that answer customer queries, qualify buying requirements, and capture verified phone numbers around the clock.",
          },
          {
            icon: IconServer,
            title: "Multi-App CRM & n8n Workflow Integration",
            desc: "Connecting your website, Meta Ads, Google Ads, Zoho/Custom CRM, Tally, and Google Sheets into one synchronized data ecosystem.",
          },
        ],
        faqs: [
          {
            q: "What is marketing automation and how does it help Ahmedabad businesses?",
            a: "Marketing automation uses software and webhooks to execute repetitive lead nurturing tasks—such as sending follow-up WhatsApp messages, scheduling reminders, and updating CRM deal stages—without human delay.",
          },
          {
            q: "How fast does marketing automation respond to a new lead?",
            a: "Our automated systems engage prospects within 5 to 30 seconds of form submission, when customer buying intent is at its absolute peak.",
          },
          {
            q: "Can you automate our existing WhatsApp Business and CRM setup?",
            a: "Yes. We integrate official WhatsApp Meta Cloud APIs with your existing CRM, website forms, and Facebook/Google lead ads.",
          },
        ],
      }}
    />
  );
}
