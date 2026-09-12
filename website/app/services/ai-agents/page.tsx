import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import AeoDefinitionCard from "@/components/AeoDefinitionCard";
import { generateConnectedGraphSchema } from "@/lib/seo";
import {
  IconBot,
  IconSparkles,
  IconWorkflow,
  IconCheck,
  IconArrowRight,
  IconServer,
  IconTarget,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Agents & Chatbot Development | PR Marketing Ventures",
  description:
    "Deploy autonomous AI agents and smart chatbots with PR Marketing Ventures in Ahmedabad. Automate customer support, lead qualification, and daily operations.",
  alternates: { canonical: "/services/ai-agents/" },
};

const faqs = [
  {
    q: "What is an AI Agent and how does it differ from a basic chatbot?",
    a: "Basic chatbots follow rigid, scripted button menus. An AI Agent powered by Large Language Models (LLMs) understands natural conversational language in English, Hindi, and Gujarati, connects to your CRM database, checks live inventory/availability, qualifies leads, and can perform multi-step business actions autonomously 24/7.",
  },
  {
    q: "Can AI agents be deployed on WhatsApp and our website simultaneously?",
    a: "Yes. We build omnichannel AI agents that run seamlessly on your website chat widget, WhatsApp Business API, Instagram Direct Messages, and internal Slack/CRM workspaces with unified conversation history.",
  },
  {
    q: "How does the AI agent learn about our specific business and products?",
    a: "We implement Retrieval-Augmented Generation (RAG) using your company documents, brochures, FAQs, product catalogs, and pricing sheets. The AI is restricted to your verified business knowledge base, preventing hallucinations.",
  },
  {
    q: "Can the AI agent book meetings directly into our sales calendar?",
    a: "Yes. When a prospect expresses buying intent, the AI agent qualifies their budget, collects their contact details, and embeds a direct Calendly / Google Calendar booking link inside the chat.",
  },
];

const capabilities = [
  {
    icon: IconBot,
    title: "24/7 WhatsApp & Web AI Sales Agents",
    desc: "Autonomous conversational AI trained on your product catalog that engages visitors instantly, answers complex questions, and collects verified lead information.",
  },
  {
    icon: IconSparkles,
    title: "RAG Knowledge Base & Document Intelligence",
    desc: "Train AI models on your proprietary PDF catalogs, technical specs, and standard operating procedures (SOPs) for zero-hallucination support.",
  },
  {
    icon: IconWorkflow,
    title: "Automated Multi-Step Business Actions",
    desc: "Connect AI agents to your CRM, invoice systems, Google Sheets, or ERP to check stock status, generate quotations, and trigger sales alerts.",
  },
  {
    icon: IconServer,
    title: "Enterprise Security & Privacy Guardrails",
    desc: "Full data encryption, prompt injection protection, and private LLM deployments ensuring confidential customer data is never leaked.",
  },
];

export default function AiAgentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateConnectedGraphSchema({
              pagePath: "/services/ai-agents/",
              pageTitle: metadata.title as string,
              pageDescription: metadata.description as string,
              breadcrumbs: [
                { name: "Services", path: "/services/" },
                { name: "AI Agents & Chatbots", path: "/services/ai-agents/" },
              ],
              service: {
                name: "Custom AI Agents & AI Chatbot Development in Ahmedabad",
                description: metadata.description as string,
                serviceType: "AI Agent Development Agency",
              },
              faqs,
            })
          ),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">AI Agents &amp; Chatbots</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            AI AGENTS &amp; AUTOMATION AGENCY IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Custom AI Agents That Qualify Leads &amp; Scale Customer Support 24/7.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Deploy intelligent AI assistants across WhatsApp, website widgets, and CRMs. Trained on your business knowledge base for instant, human-like sales conversions.
          </p>

          <AeoDefinitionCard
            term="Autonomous AI Agents"
            category="Conversational AI & LLM Automation Standard"
            definition="are custom Large Language Model systems engineered with Retrieval-Augmented Generation (RAG) on business knowledge bases, capable of engaging prospects, qualifying sales leads, and scheduling meetings autonomously across WhatsApp and website widgets 24/7 with zero hallucination."
            keyPoints={[
              "WhatsApp & Web Omnichannel Conversational Agents",
              "RAG Knowledge Integration with Zero Hallucination",
              "Autonomous Qualification & Live Calendar Booking",
            ]}
          />

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Build Your AI Agent
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View AI Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            INTELLIGENT AUTOMATION
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            AI Capabilities Engineered for Business Growth
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            AI Agents FAQs
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to automate customer interactions with AI?"
        subtitle="Book a consultation with our AI engineering team in Ahmedabad."
      />
    </>
  );
}
