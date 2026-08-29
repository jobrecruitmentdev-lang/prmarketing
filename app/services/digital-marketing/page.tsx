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
  IconSearch,
  IconMapPin,
  IconBot,
  IconCheck,
  IconArrowRight,
  IconShield,
  IconGauge,
  IconBuilding,
  IconCart,
  IconHeart,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Ahmedabad | Performance Marketing & SEO",
  description:
    "PR Marketing Ventures is a premier digital marketing agency in Ahmedabad. We engineer full-funnel performance marketing, Google & Meta ads, SEO, conversion funnels, and marketing automation to scale revenue.",
  alternates: { canonical: "/services/digital-marketing/" },
};

const faqs = [
  {
    q: "Why choose PR Marketing Ventures as your digital marketing agency in Ahmedabad?",
    a: "Unlike traditional agencies that sell vanity metrics (likes, impressions, generic clicks), PR Marketing Ventures is a growth-engineering marketing agency. We combine full-funnel performance marketing, technical SEO, conversion rate optimization (CRO), and AI automation to deliver trackable inquiries, qualified leads, and measurable revenue ROI.",
  },
  {
    q: "What services does your marketing agency provide?",
    a: "Our marketing services cover the entire customer acquisition lifecycle: Performance PPC (Google Ads, Meta/Instagram Ads, LinkedIn Ads), Search Engine Optimization (SEO & Local Map Pack), High-Converting Landing Page Design, Funnel Automation (n8n & CRM), and AI Search Optimization (GEO/AEO).",
  },
  {
    q: "How fast can we see results from digital marketing campaigns?",
    a: "Paid performance marketing campaigns (Google Ads & Meta Ads) begin generating qualified leads within the first 48 to 72 hours of launch. Organic SEO and topical authority compounding typically deliver strong first-page rankings and sustained organic inquiries within 60 to 90 days.",
  },
  {
    q: "How do you optimize ad spend to prevent wasted marketing budgets?",
    a: "We implement rigorous conversion tracking, audience segmentation, negative keyword filtering, and custom high-speed landing pages. By fixing funnel leakage before scaling ad spend, we maintain high Quality Scores and maximize return on ad spend (ROAS).",
  },
  {
    q: "Do you provide marketing services for local Ahmedabad businesses as well as export/D2C brands?",
    a: "Yes. We manage local marketing campaigns for businesses across Ahmedabad (C.G. Road, SG Highway, Prahlad Nagar, Bodakdev) as well as global B2B export funnels and nationwide D2C ecommerce brands.",
  },
];

const pillars = [
  {
    icon: IconTarget,
    title: "Paid Performance Marketing (PPC & Meta Ads)",
    desc: "Laser-targeted Google Search, Performance Max, Instagram, and LinkedIn ad campaigns built for high ROAS and low customer acquisition cost.",
  },
  {
    icon: IconSearch,
    title: "Organic Search & Technical SEO",
    desc: "Dominating high-intent commercial keywords on Google with Core Web Vitals optimization, semantic schema, and topical authority clusters.",
  },
  {
    icon: IconMapPin,
    title: "Local Ahmedabad Map Pack Dominance",
    desc: "Capturing local high-intent customers searching across Ahmedabad with Google Business Profile optimization, local citations, and geo-targeting.",
  },
  {
    icon: IconWorkflow,
    title: "Marketing Automation & CRM Pipelines",
    desc: "Automated WhatsApp lead responders, CRM workflows, and n8n pipelines that nurture and qualify leads within seconds of submission.",
  },
  {
    icon: IconTrendingUp,
    title: "Conversion Rate Optimization (CRO)",
    desc: "Engineering high-speed, persuasive landing pages and A/B test funnels that turn raw traffic into committed buyers.",
  },
  {
    icon: IconBot,
    title: "AI Search Optimization (GEO / AEO)",
    desc: "Positioning your brand as the definitive authority cited in ChatGPT, Perplexity, Gemini, and Google AI Overviews.",
  },
];

const comparisonData = [
  {
    feature: "Primary Focus",
    traditional: "Vanity metrics (likes, impressions, clicks)",
    prmarketing: "Qualified leads, customer acquisition & revenue ROI",
  },
  {
    feature: "Technical Foundation",
    traditional: "Slow generic templates, outsourced fixes",
    prmarketing: "Sub-second Next.js architecture, 90+ PageSpeed score",
  },
  {
    feature: "Lead Follow-up",
    traditional: "Manual email export after 24-48 hours",
    prmarketing: "Instant WhatsApp & CRM automation in under 30 seconds",
  },
  {
    feature: "Transparency & Reporting",
    traditional: "Static monthly PDF summaries with jargon",
    prmarketing: "Live real-time dashboards & clear conversion tracking",
  },
  {
    feature: "AI & Search Ready",
    traditional: "Outdated 2018 keyword stuffing",
    prmarketing: "Entity schema, LLM extractability, GEO & Google AI Overviews",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Growth Audit & Competitor Intelligence",
    desc: "We analyze your existing marketing funnel, ad account health, keyword gaps, and competitor market share in Ahmedabad.",
  },
  {
    num: "02",
    title: "Full-Funnel Architecture & Asset Creation",
    desc: "We design high-converting landing pages, write persuasive ad creatives, set up server-side conversion tracking, and configure CRM routing.",
  },
  {
    num: "03",
    title: "Campaign Launch & Precision Targeting",
    desc: "We deploy multi-channel campaigns across Google Ads, Meta Ads, and Organic Search, continuously testing creatives and audience segments.",
  },
  {
    num: "04",
    title: "Scale, Automate & Maximize ROAS",
    desc: "We scale profitable campaigns, optimize budget allocation, automate follow-up nurturing, and expand market share.",
  },
];

const industriesList = [
  {
    name: "Real Estate & Developers",
    desc: "High-ticket buyer lead generation for residential & commercial projects across Ahmedabad.",
    icon: IconBuilding,
  },
  {
    name: "Healthcare & Specialized Clinics",
    desc: "Patient acquisition funnels, local Google Maps ranking, and reputation marketing.",
    icon: IconHeart,
  },
  {
    name: "D2C & Retail Brands",
    desc: "Ecommerce marketing, Catalog ads, Google Shopping, and customer retention systems.",
    icon: IconCart,
  },
  {
    name: "B2B & Manufacturing",
    desc: "Domestic distributor inquiries and international export lead generation funnels.",
    icon: IconWorkflow,
  },
];

export default function DigitalMarketingServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Digital Marketing Agency", path: "/services/digital-marketing/" },
            ]),
            singleServiceSchema({
              name: "Digital Marketing Agency & Performance Marketing Services",
              description: metadata.description as string,
              url: "/services/digital-marketing/",
              serviceType: "Digital Marketing Agency",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">
              Services
            </Link>
            <span>/</span>
            <span className="text-accent-dark">Digital Marketing Agency</span>
          </nav>

          {/* Direct Answer / TL;DR for AEO & AI Extraction */}
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Full-Service Growth Engineering
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> is a top-tier digital marketing agency in Ahmedabad delivering full-funnel growth: high-ROAS paid ads (Google & Meta), technical SEO, local search dominance, high-speed website development, and marketing automation systems that turn clicks into measurable revenue.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            PREMIER MARKETING AGENCY IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Digital Marketing Engineered for Revenue & Exponential Growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Stop burning budgets on vanity marketing that fails to produce sales. We build integrated marketing engines combining precision performance ads, SEO rankings, high-converting web funnels, and automated CRM pipelines.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get a Free Marketing Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Marketing Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Core Marketing Capabilities Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FULL-SPECTRUM MARKETING SERVICES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete Marketing Solutions That Drive Real Inquiries
          </h2>
          <p className="mt-3 text-slate-600">
            Every channel is integrated into a unified growth engine designed to lower your customer acquisition cost (CAC) and compound returns.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
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

      {/* Comparison Table: Traditional Agency vs PR Marketing Ventures */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              THE DIFFERENCE
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Why Businesses Switch to PR Marketing Ventures
            </h2>
            <p className="mt-3 text-slate-600">
              See how our engineering-first marketing framework outperforms typical agency retainers.
            </p>
          </Reveal>

          <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <th className="p-4 font-heading font-semibold text-slate-700">Capability / Metric</th>
                    <th className="p-4 font-heading font-semibold text-slate-500">Traditional Marketing Agency</th>
                    <th className="p-4 font-heading font-bold text-accent-dark bg-primary-soft/40">
                      PR Marketing Ventures
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/70">
                      <td className="p-4 font-medium text-ink">{row.feature}</td>
                      <td className="p-4 text-slate-500">{row.traditional}</td>
                      <td className="p-4 font-semibold text-primary bg-primary-soft/20">{row.prmarketing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Growth Blueprint */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              PROVEN EXECUTION FRAMEWORK
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our 4-Stage Marketing Engine
            </h2>
            <p className="mt-3 text-slate-400">
              How we scale brand visibility and customer acquisition systematically.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 80}>
                <div className="h-full rounded-2xl border border-slate-800 bg-ink-2 p-6">
                  <span className="font-heading text-3xl font-bold text-accent-bright">
                    {step.num}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            INDUSTRY-SPECIFIC MARKETING
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Tailored Marketing Strategies for Ahmedabad Sectors
          </h2>
          <p className="mt-3 text-slate-600">
            We understand customer psychology and search intent in your specific vertical.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {industriesList.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 60}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-amber-200 hover:-translate-y-1 transition-all duration-200">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <ind.icon width={22} height={22} />
                </span>
                <h3 className="font-heading text-base font-semibold text-ink">
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {ind.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions About Our Marketing Agency Services
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
        title="Ready to partner with a top marketing agency in Ahmedabad?"
        subtitle="Book a free 30-minute growth consultation. We will analyze your website, ad accounts, and competitor positioning to deliver an actionable scaling blueprint."
      />
    </>
  );
}
