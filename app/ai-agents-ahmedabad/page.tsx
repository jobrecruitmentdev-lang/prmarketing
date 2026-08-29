import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBot, IconSparkles, IconWorkflow, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Agents in Ahmedabad | Autonomous AI Agent Development | PR Marketing Ventures",
  description:
    "Deploy autonomous AI agents in Ahmedabad. PR Marketing Ventures builds custom WhatsApp AI agents, 24/7 lead qualification bots, and intelligent sales assistants for Gujarat businesses.",
  alternates: { canonical: "/ai-agents-ahmedabad/" },
};

export default function AiAgentsAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ai-agents-ahmedabad",
        badge: "AI Agents Ahmedabad",
        h1: "Autonomous AI Agents & Intelligent Chatbots in Ahmedabad",
        tldr: "PR Marketing Ventures builds autonomous conversational AI agents for Ahmedabad businesses. Our agents qualify buyer leads on WhatsApp, answer product queries in English/Hindi/Gujarati, and book calendar appointments 24/7.",
        heroSubtitle: "Transform customer acquisition with AI sales agents that engage visitors instantly, understand conversational intent, and automatically close appointments while your team sleeps.",
        serviceType: "AI Agent Development Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconBot,
            title: "24/7 WhatsApp & Web Sales Agents",
            desc: "Conversational AI agents that engage inbound leads in under 5 seconds, qualify budgets, and collect verified contact details.",
          },
          {
            icon: IconSparkles,
            title: "Multilingual Intelligence (English, Hindi, Gujarati)",
            desc: "Natural language processing capable of handling local dialect variations and customer queries with human-level accuracy.",
          },
          {
            icon: IconWorkflow,
            title: "Direct Calendar & CRM Scheduling",
            desc: "Qualified prospects are instantly guided to choose a meeting slot synced directly with Google Calendar or Calendly.",
          },
          {
            icon: IconTarget,
            title: "CRM Lead Enrichment & Tagging",
            desc: "Every conversation transcript and customer preference is logged into your CRM with intent scores and automated alerts.",
          },
        ],
        faqs: [
          {
            q: "What can an AI agent do that a regular chatbot cannot?",
            a: "Regular chatbots only follow button menus. AI agents understand natural conversation, consult private product databases via RAG, answer unpredictable questions, and take multi-step actions autonomously.",
          },
          {
            q: "How long does it take to deploy an AI agent for my business in Ahmedabad?",
            a: "A customized AI agent trained on your business documents and integrated with WhatsApp is typically built, tested, and deployed within 7 to 14 days.",
          },
        ],
      }}
    />
  );
}
