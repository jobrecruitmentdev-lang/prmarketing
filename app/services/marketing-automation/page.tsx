import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconWorkflow,
  IconBot,
  IconTrendingUp,
  IconArrowRight,
  IconLayout,
  IconServer,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Marketing Automation & AI Workflow Engineering in Ahmedabad | PR Marketing Ventures",
  description:
    "Automate your lead qualification, CRM syncing, WhatsApp follow-ups, and client reporting. Custom n8n, Python, and AI agent workflows that eliminate manual work.",
  alternates: { canonical: "/services/marketing-automation/" },
};

const faqs = [
  {
    q: "What is marketing automation and how does it save our business money?",
    a: "Marketing automation replaces manual lead data entry, delayed follow-up calls, and spreadsheet chaos with instant automated workflows. When an inquiry arrives, our systems immediately qualify the lead, send an instant WhatsApp/email intro, log details in your CRM, and notify your sales team in real time.",
  },
  {
    q: "Why do you use n8n and Python instead of expensive tools like Zapier?",
    a: "Zapier charges high monthly fees that increase as your lead volume scales. n8n and custom Python microservices can be self-hosted with unlimited execution runs, enterprise-level privacy, complex conditional logic, and custom API connections without monthly task limits.",
  },
  {
    q: "Can you automate WhatsApp messaging for new lead notifications and customer support?",
    a: "Yes. Using the official WhatsApp Business Cloud API, we deploy automated welcome messages, instant brochure delivery, booking confirmations, and AI-powered conversational chatbots that qualify client intent 24/7.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "We build bi-directional automations with HubSpot, Zoho CRM, LeadSquared, Salesforce, Google Sheets, Notion, and custom PostgreSQL/MySQL databases.",
  },
  {
    q: "Do you build automated SEO and performance reporting systems?",
    a: "Yes. We engineer automated pipelines that pull live data from Google Search Console, Google Analytics 4, and uptime monitors to generate automated weekly/monthly performance summaries delivered straight to your WhatsApp or Slack.",
  },
];

const deliverables = [
  {
    icon: IconWorkflow,
    title: "n8n & Webhook Automation Pipelines",
    desc: "Custom self-hosted automation workflows connecting websites, landing pages, payment gateways, and databases with zero per-task fees.",
  },
  {
    icon: IconBot,
    title: "AI Chatbots & Sales Agents",
    desc: "Intelligent conversational bots for WhatsApp and websites that answer customer queries, qualify budgets, and book consultation calls 24/7.",
  },
  {
    icon: IconLayout,
    title: "CRM Integration & Bi-Directional Sync",
    desc: "Instant lead routing to HubSpot, Zoho, Google Sheets, or custom CRMs with complete attribution data (source, keyword, device).",
  },
  {
    icon: IconTrendingUp,
    title: "Instant Lead Follow-Up Sequences",
    desc: "Automated WhatsApp and email nurturing sequences triggered in under 30 seconds to capture leads while purchase intent is highest.",
  },
  {
    icon: IconServer,
    title: "Automated SEO & Growth Dashboards",
    desc: "Scheduled reporting pipelines that aggregate Search Console, rank changes, and conversion data into executive summaries.",
  },
  {
    icon: IconCode,
    title: "Custom Python Data & API Microservices",
    desc: "Tailored scraping, enrichment, and business automation scripts running on lightweight FastAPI backends.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Workflow & Bottleneck Analysis",
    desc: "We map your current lead flow from initial click to sales conversion, identifying where leads drop off or manual tasks cause delays.",
  },
  {
    num: "02",
    title: "Architecture & Integration Setup",
    desc: "We configure n8n nodes, secure API webhooks, database tables, and WhatsApp Business Cloud API credentials.",
  },
  {
    num: "03",
    title: "AI Agent & Workflow Logic Build",
    desc: "We write conditional routing, qualification rules, automated messaging templates, and failure alerts.",
  },
  {
    num: "04",
    title: "Live Testing, Monitoring & Handover",
    desc: "Rigorous load testing with simulated inquiries, staff onboarding, and ongoing execution monitoring.",
  },
];

const useCases = [
  { name: "Real Estate Lead Qualification", desc: "Instant WhatsApp brochure delivery and automatic routing of high-budget buyers to senior agents." },
  { name: "Healthcare Clinic Appointments", desc: "Automated appointment booking, reminder notifications, and patient intake forms." },
  { name: "B2B Quote & Inquiry Routing", desc: "Instant qualification of RFQ forms with immediate notification to sales managers via Slack/Telegram." },
  { name: "E-commerce Order Notifications", desc: "Live WhatsApp shipping alerts, delivery tracking, and abandoned cart re-engagement." },
  { name: "Education & Admissions Funnels", desc: "Automated course syllabus downloads and follow-up counseling scheduling." },
  { name: "Financial & Legal Consultation", desc: "Automated document collection and meeting booking workflows." },
];

export default function MarketingAutomationServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Marketing Automation", path: "/services/marketing-automation/" },
            ]),
            singleServiceSchema({
              name: "Marketing & CRM Automation Workflows",
              description: metadata.description as string,
              url: "/services/marketing-automation/",
              serviceType: "Marketing Automation",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">Marketing Automation</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            MARKETING & CRM WORKFLOW ENGINEERING
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Automate Your Lead Capture, Follow-Ups & Growth Operations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Stop losing qualified inquiries to slow, manual responses and scattered spreadsheets. We engineer custom n8n, WhatsApp API, and CRM automation workflows that capture, qualify, and nurture leads in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Automate Your Pipeline
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Service Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Why Speed Wins */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            SPEED TO LEAD
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Responding in 5 Minutes Multiplies Conversion by 9x
          </h2>
          <p className="mt-3 text-slate-600">
            When a prospective client fills out an inquiry form, their interest decays every minute they wait for a response.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">&lt; 30s</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Instant Engagement</h3>
              <p className="mt-2 text-sm text-slate-600">
                Automated WhatsApp messages connect with the lead while they are still looking at your website.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">100%</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Zero Lost Inquiries</h3>
              <p className="mt-2 text-sm text-slate-600">
                Every form submission, call, and chat is instantly logged to your CRM with full campaign attribution.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">15+ hrs</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Weekly Time Saved</h3>
              <p className="mt-2 text-sm text-slate-600">
                Eliminate hours of manual data entry, follow-up scheduling, and report compiling for your sales team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              ENGINEERED WORKFLOWS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our 4-Stage Automation Blueprint
            </h2>
            <p className="mt-3 text-slate-400">
              From business process mapping to reliable, self-healing automated workflows.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 80}>
                <div className="h-full rounded-2xl border border-slate-800 bg-ink-2 p-6">
                  <span className="font-heading text-3xl font-bold text-accent-bright">{step.num}</span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            AUTOMATION SUITE
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete Marketing Automation Capabilities
          </h2>
          <p className="mt-3 text-slate-600">
            Custom automation architectures designed to fit your unique operational workflows.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              APPLICATIONS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Proven Automation Use Cases in Ahmedabad
            </h2>
            <p className="mt-3 text-slate-600">
              Customized pipelines built to address the exact operational bottlenecks in your business sector.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <Reveal key={uc.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{uc.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{uc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions About Marketing Automation
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        title="Ready to automate your lead follow-ups and growth operations?"
        subtitle="Let&rsquo;s audit your current manual bottlenecks and design an automated n8n and WhatsApp workflow that saves hours every week."
      />
    </>
  );
}
