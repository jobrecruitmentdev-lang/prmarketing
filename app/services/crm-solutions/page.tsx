import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import {
  IconWorkflow,
  IconTarget,
  IconTrendingUp,
  IconCheck,
  IconArrowRight,
  IconBuilding,
  IconCart,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Custom CRM Software Development & Automation in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures builds custom CRM systems and sales pipeline automation in Ahmedabad. Connect website leads, WhatsApp automation, lead scoring, and automated follow-ups.",
  alternates: { canonical: "/services/crm-solutions/" },
};

const faqs = [
  {
    q: "Why build a custom CRM instead of paying for off-the-shelf software like Zoho or Salesforce?",
    a: "Off-the-shelf CRMs charge expensive monthly per-user licenses and force your team to adapt to rigid workflows. A custom CRM built by PR Marketing Ventures gives you 100% data ownership, zero recurring user fees, direct WhatsApp/telephony integration, and custom stages tailored exactly to your sales process.",
  },
  {
    q: "Can the custom CRM integrate with WhatsApp, IVR telephony, and website forms?",
    a: "Yes. Every lead from your website, Google Ads, Meta Ads, Justdial, and IndiaMART is instantly ingested into the CRM, assigned to a sales executive, and triggers an immediate automated WhatsApp response within 30 seconds.",
  },
  {
    q: "Which industries benefit most from custom CRM systems in Ahmedabad?",
    a: "We specialize in CRM solutions for Real Estate developers (site visit tracking), Healthcare & Clinics (patient appointments), B2B Manufacturing (quote & order pipelines), Education/Coaching, and E-commerce brands.",
  },
  {
    q: "How secure is the client data in a custom CRM?",
    a: "We implement role-based access control (RBAC), end-to-end database encryption, IP restrictions, and automated daily cloud backups so your sensitive customer leads can never be leaked or exported by unauthorized staff.",
  },
];

const features = [
  {
    icon: IconTarget,
    title: "Instant Lead Capture & Smart Routing",
    desc: "Ingest leads from Google Ads, Facebook/Instagram, website forms, and marketplaces into a centralized dashboard with automated round-robin sales distribution.",
  },
  {
    icon: IconWorkflow,
    title: "Automated WhatsApp & Email Follow-Ups",
    desc: "Trigger personalized WhatsApp catalogs, brochures, SMS reminders, and email sequences based on lead status changes.",
  },
  {
    icon: IconTrendingUp,
    title: "Visual Sales Pipeline & Deal Stages",
    desc: "Drag-and-drop Kanban boards for deal tracking, quotation generation, payment milestone tracking, and revenue forecasting.",
  },
  {
    icon: IconBuilding,
    title: "Team Performance & Call Analytics",
    desc: "Real-time tracking of response time, call logs, conversion ratios per sales executive, and automated daily executive summary reports.",
  },
];

export default function CrmSolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "CRM Solutions & Automation", path: "/services/crm-solutions/" },
            ]),
            singleServiceSchema({
              name: "Custom CRM Software Development & Automation in Ahmedabad",
              description: metadata.description as string,
              url: "/services/crm-solutions/",
              serviceType: "CRM Software Development Agency",
              areaServed: "Ahmedabad, Gujarat, India",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">CRM Solutions</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Custom CRM & Lead Automation in Ahmedabad
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> develops bespoke CRM systems and sales pipeline automation for Ahmedabad businesses. We connect ad campaigns directly to WhatsApp bots, call tracking, and Kanban sales pipelines with zero monthly per-user licensing costs.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            CUSTOM CRM & PIPELINE AUTOMATION IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Never Lose a Lead. Custom CRM Systems Built for Your Sales Pipeline.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Convert more inquiries into paying clients with sub-minute lead response times, automated WhatsApp nurturing, and complete visibility over your sales team.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get Custom CRM Demo
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            SALES PIPELINE CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Everything Your Sales Team Needs to Close Deals Faster
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((item, i) => (
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
            Custom CRM FAQs
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
        title="Ready to automate your sales pipeline in Ahmedabad?"
        subtitle="Book a 30-minute CRM workflow consultation with our automation engineers."
      />
    </>
  );
}
