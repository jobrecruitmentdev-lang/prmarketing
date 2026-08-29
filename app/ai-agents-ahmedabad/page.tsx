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
            a: "Regular chatbots only follow rigid button menus. AI agents understand natural human language, consult private company knowledge bases via RAG, answer complex product queries, and take multi-step actions like booking calendar appointments autonomously.",
          },
          {
            q: "Can the AI agent understand and respond in Gujarati, Hindi, and English?",
            a: "Yes. Our AI agents are fine-tuned with multilingual LLMs that seamlessly detect language switches and converse naturally in Gujarati, Hindi, and English.",
          },
          {
            q: "How long does it take to deploy an AI agent for my business in Ahmedabad?",
            a: "A customized AI agent trained on your business catalogs and integrated with WhatsApp is typically built, tested, and deployed within 7 to 14 days.",
          },
          {
            q: "How do you prevent the AI agent from hallucinating or giving incorrect info?",
            a: "We enforce strict Retrieval-Augmented Generation (RAG) guardrails and system prompt boundaries that prevent the AI from fabricating pricing or details outside your verified company knowledge base.",
          },
          {
            q: "Can the AI agent collect payments via UPI and send Razorpay links on WhatsApp?",
            a: "Yes. The AI agent can dynamically generate UPI payment links, invoice PDFs, and confirm booking deposits right inside the WhatsApp chat.",
          },
          {
            q: "Can a human sales agent take over the live chat from the AI bot?",
            a: "Yes. If a customer requests a human representative or meets high-priority VIP criteria, the bot immediately alerts your team and hands over the chat with full history.",
          },
          {
            q: "What industries in Ahmedabad benefit most from AI agents?",
            a: "Real estate developers, clinics and hospitals, coaching institutes, D2C retail brands, B2B manufacturers, and financial consultancies.",
          },
          {
            q: "How much does a custom AI WhatsApp agent cost in Ahmedabad?",
            a: "Initial development and document embedding typically range from ₹35,000 to ₹95,000, with nominal monthly LLM token and server hosting fees.",
          },
        ],
      }}
    />
  );
}
