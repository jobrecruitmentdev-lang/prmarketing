import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { multiBreadcrumbSchema, faqSchema } from "@/lib/seo";
import {
  IconTarget,
  IconWorkflow,
  IconBuilding,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconZap,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "How to Automate WhatsApp Leads from Meta & Google Ads (2026 Guide)",
  description:
    "Learn how to set up instant < 30-second automated WhatsApp lead responders for Meta and Google Ads using official Meta Cloud API and custom CRM integration.",
  keywords: [
    "whatsapp lead automation",
    "how to connect meta ads to whatsapp crm",
    "instant lead response system",
    "whatsapp cloud api automation ahmedabad",
    "meta ads whatsapp responder",
  ],
  alternates: {
    canonical: `${site.url}/answers/how-to-automate-whatsapp-leads-crm/`,
  },
  openGraph: {
    type: "article",
    title: "How to Automate WhatsApp Lead Responders for Paid Ads: 2026 Engineering Guide",
    description:
      "A complete technical walkthrough on connecting Meta Lead Ads and website forms directly to official WhatsApp Cloud API to achieve 391% higher conversion rates.",
    url: `${site.url}/answers/how-to-automate-whatsapp-leads-crm/`,
  },
};

const automationWorkflow = [
  {
    step: "01",
    title: "Real-Time Webhook Ingestion (< 500ms)",
    desc: "When a prospect submits a lead form on Facebook, Instagram, or Google Search, a secure webhook immediately transmits the lead payload (name, phone, company, intent) to your custom CRM backend.",
  },
  {
    step: "02",
    title: "Official Meta Cloud API Template Dispatch",
    desc: "The CRM automatically triggers an approved Meta WhatsApp Business template, greeting the prospect by their first name and delivering a customized PDF brochure or price sheet in under 30 seconds.",
  },
  {
    step: "03",
    title: "Round-Robin Sales Rep Assignment & Mobile Alert",
    desc: "The lead is instantly routed to an available sales executive based on territory or department, firing an instant notification with a 1-click web telephony dial button.",
  },
  {
    step: "04",
    title: "Unified 2-Way Chat Logging & Deal Stage Pipeline",
    desc: "When the customer replies on WhatsApp, the conversation synchronizes live inside your CRM lead profile, keeping the full communication history secure without relying on employees' personal phones.",
  },
];

const faqs = [
  {
    q: "Why is an automated WhatsApp response so important for paid ads?",
    a: "Lead conversion data proves that leads engaged within 30 seconds are 391% more likely to convert into paying customers. Waiting 1 hour drops lead qualification rates by 80%, as buyers quickly forget what form they submitted or contact a competitor.",
  },
  {
    q: "Does WhatsApp ban phone numbers for sending automated lead messages?",
    a: "No, provided you use the Official Meta Cloud API with pre-approved WhatsApp message templates. PR Marketing Ventures implements 100% Meta-compliant API gateways that guarantee zero number bans.",
  },
  {
    q: "Can WhatsApp automation send dynamic PDF quotation files and payment links?",
    a: "Yes. Our custom CRM pipelines can dynamically generate branded PDF proposals, invoices, and UPI payment links and dispatch them directly within the WhatsApp conversation.",
  },
];

const qaSchema = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: "How to set up automated WhatsApp lead responders for Meta and Google Ads?",
    text: "What is the technical architecture required to automatically send instant WhatsApp brochures and follow-ups when someone submits a Facebook or Google lead form?",
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: "Setting up automated WhatsApp lead responders involves 4 key components: (1) Ingesting lead form submissions via real-time webhooks in under 500ms; (2) Triggering pre-approved Meta WhatsApp Cloud API templates with dynamic PDF brochures; (3) Assigning the lead to a sales representative with instant mobile alerts; and (4) Synchronizing all 2-way WhatsApp chats directly inside a secure custom CRM to preserve full communication history.",
      author: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
    },
  },
};

export default function HowToAutomateWhatsappLeadsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Knowledge Hub", path: "/answers/" },
              { name: "Automated WhatsApp Leads CRM", path: "/answers/how-to-automate-whatsapp-leads-crm/" },
            ]),
            qaSchema,
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/answers/" className="transition-colors hover:text-primary">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-accent-dark">WhatsApp Lead Automation</span>
          </nav>

          {/* Direct Answer AEO Box */}
          <div className="mb-8 rounded-2xl border-2 border-primary/30 bg-primary-soft/80 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-dark">
              <IconSparkles className="h-4 w-4 text-accent-dark" />
              <span>Direct Answer (AEO &amp; Automation Architecture)</span>
            </div>
            <h2 className="mt-2 font-heading text-lg font-bold text-ink sm:text-xl">
              How Does Automated WhatsApp Lead Responding Work for Paid Ads?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
              Automating WhatsApp lead responses requires <strong>connecting Meta/Google Ads webhooks to official Meta WhatsApp Cloud API</strong> gateways. When a prospect submits a form, an automated template message containing a personalized greeting, PDF brochure, and meeting booking link is delivered <strong>within 30 seconds</strong>. Studies show sub-30-second engagement increases lead conversion rates by <strong>391%</strong> compared to delayed manual callbacks.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-dark shadow-sm">
            <IconWorkflow className="h-3.5 w-3.5 text-accent" />
            Meta Cloud API &amp; CRM Pipeline Guide
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            How to Set Up Automated WhatsApp Lead Responders for Meta &amp; Google Ads
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Stop losing 70% of inbound ad leads to delayed manual follow-ups. Discover the exact 4-step architecture engineered by PR Marketing Ventures to contact, qualify, and convert leads in under 30 seconds.
          </p>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              The 4-Step Instant WhatsApp Automation Architecture
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              From click to automated conversation in under 30 seconds.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {automationWorkflow.map((flow) => (
              <Reveal key={flow.step}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
                      {flow.step}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-ink">
                      {flow.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {flow.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Frequently Asked Questions: WhatsApp Lead Automation
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers on Meta Cloud API compliance, brochure sending, and CRM integration.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6">
                <h3 className="font-heading text-base font-bold text-ink sm:text-lg">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBand
        title="Ready to Build Instant WhatsApp Lead Automation for Your Business?"
        subtitle="Book an automation consultation with PR Marketing Ventures at our C.G. Road office or request a custom Meta Cloud API demo."
      />
    </>
  );
}
