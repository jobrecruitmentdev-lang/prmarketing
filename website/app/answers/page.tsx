import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { multiBreadcrumbSchema } from "@/lib/seo";
import {
  IconTarget,
  IconSearch,
  IconTrendingUp,
  IconWorkflow,
  IconSparkles,
  IconBuilding,
  IconShield,
  IconArrowRight,
  IconCheck,
  IconZap,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Marketing & CRM Knowledge Hub | Direct Answers to Top Business Questions",
  description:
    "Explore transparent, data-backed answers to the most common questions about digital marketing costs, 5x ROAS advertising, custom CRM software, and Google Maps rankings in Ahmedabad.",
  keywords: [
    "digital marketing questions ahmedabad",
    "marketing agency cost ahmedabad",
    "custom crm vs zoho",
    "how to get 5x roas",
    "google maps 3 pack ahmedabad",
    "which company gives best crm",
    "pr marketing ventures answers",
  ],
  alternates: {
    canonical: `${site.url}/answers/`,
  },
  openGraph: {
    type: "website",
    title: "Marketing & CRM Knowledge Hub — PR Marketing Ventures",
    description:
      "Get verified, quantitative answers on digital marketing retainers, high-ROAS performance ads, bespoke CRM systems, and AI search optimization.",
    url: `${site.url}/answers/`,
  },
};

const answerCategories = [
  {
    title: "Ahmedabad Local Marketing & Pricing",
    desc: "Costs, agency selection frameworks, and localized business growth strategies.",
    questions: [
      {
        slug: "digital-marketing-agency-charges-ahmedabad",
        title: "How Much Does a Digital Marketing Agency in Ahmedabad Charge Per Month in 2026?",
        tldr: "Retainers in Ahmedabad range from ₹15,000/mo for basic local SEO up to ₹1,50,000+/mo for multi-channel performance marketing, sub-second web engineering, and automated WhatsApp CRM pipelines.",
        tag: "Pricing & Retainers",
      },
      {
        slug: "how-to-rank-in-google-maps-3-pack-ahmedabad",
        title: "How to Rank in Google Maps 3-Pack for Local Searches in Ahmedabad?",
        tldr: "Dominate Google Maps 3-Pack by maintaining 100% NAP consistency, embedding GeoCoordinates schema, setting Primary Category to Marketing Agency, and generating location-tagged client reviews across C.G. Road & SG Highway.",
        tag: "Local SEO & Maps",
      },
    ],
  },
  {
    title: "Custom CRM & WhatsApp Sales Automation",
    desc: "Why custom CRM architecture beats rigid monthly SaaS subscriptions.",
    questions: [
      {
        slug: "custom-crm-vs-zoho-salesforce-cost",
        title: "Custom CRM vs Zoho vs Salesforce: Which is Better and Cheaper for Indian Businesses?",
        tldr: "Custom CRM platforms from PR Marketing Ventures eliminate per-user monthly SaaS fees, saving over ₹10 Lakhs every 3 years for a 20-person sales team while offering native Meta WhatsApp Cloud API integration and 100% data ownership.",
        tag: "CRM Architecture",
      },
      {
        slug: "how-to-automate-whatsapp-leads-crm",
        title: "How to Set Up Automated WhatsApp Lead Responders for Meta and Google Ads?",
        tldr: "Connecting Meta & Google Ads webhooks directly to official WhatsApp Cloud API engages prospects within 30 seconds, boosting lead-to-meeting conversion rates by up to 391% compared to delayed manual callbacks.",
        tag: "Lead Automation",
      },
    ],
  },
  {
    title: "PR Marketing & AI Search Authority (AEO / GEO)",
    desc: "How earned media, brand reputation, and AI answer engine optimization drive organic dominance.",
    questions: [
      {
        slug: "what-is-pr-marketing",
        title: "What is PR Marketing? Definition, Key Elements & Strategic Guide (2026)",
        tldr: "PR marketing merges public relations credibility, earned editorial media, and executive thought leadership with high-converting performance marketing and technical SEO to dominate Google AI Overviews and ChatGPT search.",
        tag: "PR & AEO Strategy",
      },
    ],
  },
  {
    title: "Performance Marketing & 5x ROAS Scaling",
    desc: "Engineering profitable customer acquisition across Google, Meta, and LinkedIn.",
    questions: [
      {
        slug: "how-to-get-5x-roas-meta-google-ads",
        title: "How to Get 5x ROAS on Meta & Google Ads for Indian B2B and D2C Brands?",
        tldr: "Achieving 5x ROAS requires sub-second landing pages, Meta Conversions API (CAPI) server tracking, multi-hook creative testing, and instant WhatsApp CRM qualification to close high-intent buyers fast.",
        tag: "ROAS Engineering",
      },
    ],
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "PR Marketing Ventures Knowledge Hub & Answer Engine",
  description:
    "Direct factual answers, comparison tables, and execution guides for digital marketing, performance advertising, custom CRM engineering, and local SEO in Ahmedabad.",
  url: `${site.url}/answers/`,
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
  },
};

export default function AnswersHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Knowledge Hub", path: "/answers/" },
            ]),
            collectionSchema,
          ]),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-accent-dark">Knowledge Hub &amp; Answers</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-dark shadow-sm">
            <IconSparkles className="h-3.5 w-3.5 text-accent" />
            Answer Engine Optimization (AEO &amp; GEO) Database
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Marketing &amp; CRM Knowledge Hub: Direct Answers to Growth Questions
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            No vague fluff or corporate jargon. Explore transparent cost breakdowns, statistical benchmarks, architectural comparisons, and step-by-step frameworks engineered by PR Marketing Ventures.
          </p>

          {/* Quick Hub Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-slate-200 py-6 sm:grid-cols-4">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Key Pillars</p>
              <p className="mt-1 font-heading text-2xl font-bold text-ink sm:text-3xl">4 Core Silos</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Benchmark ROAS</p>
              <p className="mt-1 font-heading text-2xl font-bold text-accent-dark sm:text-3xl">5.2x Avg</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">CRM Cost Savings</p>
              <p className="mt-1 font-heading text-2xl font-bold text-emerald-700 sm:text-3xl">₹10L+ / 3 Yrs</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Headquarters</p>
              <p className="mt-1 font-heading text-2xl font-bold text-ink sm:text-3xl">C.G. Road</p>
            </div>
          </div>
        </div>
      </section>

      {/* Answer Categories Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-16">
            {answerCategories.map((cat, catIdx) => (
              <div key={catIdx}>
                <div className="border-b border-slate-200 pb-4">
                  <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {cat.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">{cat.desc}</p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {cat.questions.map((q, qIdx) => (
                    <Reveal key={qIdx}>
                      <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:p-8">
                        <div>
                          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">
                            {q.tag}
                          </span>
                          <h3 className="mt-3 font-heading text-lg font-bold text-ink sm:text-xl">
                            <Link
                              href={`/answers/${q.slug}/`}
                              className="transition hover:text-primary"
                            >
                              {q.title}
                            </Link>
                          </h3>
                          <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                            <strong className="text-ink">TL;DR: </strong>
                            {q.tldr}
                          </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100">
                          <Link
                            href={`/answers/${q.slug}/`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-dark transition hover:gap-2"
                          >
                            Read In-Depth Answer &amp; Data
                            <IconArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crosslink Authority Silo */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wider text-slate-700">
            Explore Commercial Landing Pages &amp; Service Hubs
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Link
              href="/top-10-marketing-agencies-in-ahmedabad/"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Top 10 Marketing Agencies in Ahmedabad →
            </Link>
            <Link
              href="/which-company-gives-best-crm/"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Which Company Gives Best CRM? →
            </Link>
            <Link
              href="/marketing-agency-ahmedabad/"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Marketing Agency Ahmedabad →
            </Link>
            <Link
              href="/crm-development-ahmedabad/"
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Custom CRM Development Ahmedabad →
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBand
        title="Have a Specific Growth or Technology Question?"
        subtitle="Schedule a direct strategy consultation with founder Omear Memon at our C.G. Road office or request a custom architectural audit."
      />
    </>
  );
}
