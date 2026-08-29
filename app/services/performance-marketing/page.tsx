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
  IconTarget,
  IconTrendingUp,
  IconWorkflow,
  IconCheck,
  IconArrowRight,
  IconGauge,
  IconCart,
  IconBuilding,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Performance Marketing Agency | High-ROAS Paid Media & Funnels | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a global performance marketing agency. We engineer high-ROAS Google Ads, Meta Ads, TikTok/LinkedIn campaigns, and conversion rate optimization that scale revenue profitably.",
  alternates: { canonical: "/services/performance-marketing/" },
};

const faqs = [
  {
    q: "What is Performance Marketing and how does it differ from traditional advertising?",
    a: "Performance marketing is 100% data-driven advertising where spend is tied directly to measurable actions—such as leads, sales, booked appointments, and revenue return on ad spend (ROAS). Unlike brand awareness campaigns, every rupee or dollar spent is tracked against customer acquisition cost (CAC) and lifetime value (LTV).",
  },
  {
    q: "Which ad platforms do you manage for performance marketing?",
    a: "We manage omnichannel paid media across Google Search, Performance Max, YouTube Ads, Meta (Instagram & Facebook), LinkedIn Ads for B2B, and Programmatic Retargeting.",
  },
  {
    q: "How do you scale ad spend profitably without increasing CAC?",
    a: "We implement creative testing frameworks, server-side conversion tracking (CAPI), audience segmentation, and custom high-speed landing pages. By removing friction in the conversion funnel, conversion rates increase as ad budgets scale.",
  },
  {
    q: "What minimum ad budget is recommended to start performance marketing?",
    a: "We work with scaling businesses spending from $1,000/mo (₹50,000/mo) up to enterprise accounts spending $50,000+/mo across international markets.",
  },
];

const capabilities = [
  {
    icon: IconTarget,
    title: "Google Ads & Performance Max (PMax)",
    desc: "Intent-based search capture, high-converting shopping feeds, and smart bidding algorithms tuned for maximum ROAS.",
  },
  {
    icon: IconTrendingUp,
    title: "Meta (Instagram & Facebook) Growth Funnels",
    desc: "Creative-first direct response video and carousel ads designed to capture attention and scale cold acquisition.",
  },
  {
    icon: IconWorkflow,
    title: "B2B LinkedIn & Account-Based Marketing (ABM)",
    desc: "Laser-targeting decision-makers (CEOs, CMOs, Directors) with high-ticket offer funnels and lead qualification.",
  },
  {
    icon: IconGauge,
    title: "Conversion Rate Optimization (CRO)",
    desc: "High-speed landing pages built on Next.js with A/B split testing to double your conversion velocity.",
  },
];

export default function PerformanceMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Performance Marketing", path: "/services/performance-marketing/" },
            ]),
            singleServiceSchema({
              name: "Performance Marketing & Paid Media Scaling",
              description: metadata.description as string,
              url: "/services/performance-marketing/",
              serviceType: "Performance Marketing Agency",
              areaServed: "Worldwide",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">Performance Marketing</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — High-ROAS Customer Acquisition
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> engineers global performance marketing systems combining high-converting paid media (Google, Meta, LinkedIn), sub-second Next.js landing pages, server-side CAPI tracking, and automated CRM pipelines that deliver predictable revenue ROI.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            GLOBAL PERFORMANCE MARKETING & PAID MEDIA
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Scale Revenue With High-ROAS Performance Marketing.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            We eliminate wasted ad spend through creative testing, precision targeting, and high-speed funnel optimization. Every campaign is engineered for profitable customer acquisition.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get Free Growth Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Pricing Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            PROVEN PAID MEDIA CHANNELS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Omnichannel Paid Media Engineered for Scale
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
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

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Performance Marketing FAQs
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
        title="Ready to maximize your advertising ROAS?"
        subtitle="Book a 30-minute growth consultation. We'll audit your ad accounts, landing page funnels, and tracking to show you how to reduce CAC."
      />
    </>
  );
}
