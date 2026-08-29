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
  IconSparkles,
  IconSearch,
  IconTrendingUp,
  IconArrowRight,
  IconLayout,
  IconBot,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "AI SEO & Generative Engine Optimization (GEO / AEO) in Ahmedabad | PR Marketing Ventures",
  description:
    "Get cited and recommended by ChatGPT, Google AI Overviews, Perplexity, and Gemini. Next-generation Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO).",
  alternates: { canonical: "/services/ai-seo/" },
};

const faqs = [
  {
    q: "What is Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO)?",
    a: "GEO and AEO are advanced search disciplines designed to ensure your business is cited, summarized, and recommended when users ask questions to AI models like ChatGPT Search, Google AI Overviews (SGE), Perplexity AI, Claude, and Gemini.",
  },
  {
    q: "How do AI search engines decide which businesses to recommend?",
    a: "AI models synthesize information based on entity clarity, semantic structured schema, authoritative third-party brand consensus, direct answer formatting, and verified citation sources across the web.",
  },
  {
    q: "Can traditional SEO alone get my business into AI Overviews?",
    a: "Traditional keyword stuffing does not work for AI engines. AI models look for clear entity relationships, tabular comparison data, expert quotation formatting, and dense informational value that directly answers conversational prompts.",
  },
  {
    q: "How do you measure and track AI search visibility?",
    a: "We query AI models across standard prompt variations relevant to your Ahmedabad and national industry sector, measuring citation frequency, brand sentiment, and inclusion in synthesized answer overviews.",
  },
  {
    q: "When should businesses in Ahmedabad start investing in AI SEO?",
    a: "Immediately. Over 40% of search queries now trigger AI answer snapshots or are conducted directly inside conversational AI assistants. Establishing early entity authority prevents competitors from locking in consensus citations.",
  },
];

const deliverables = [
  {
    icon: IconSparkles,
    title: "Entity & Knowledge Graph Modeling",
    desc: "Structuring your brand entity with Organization schema, sameAs links, and Wikidata cross-referencing for unambiguous LLM recognition.",
  },
  {
    icon: IconBot,
    title: "Direct Answer & Synthesis Engineering",
    desc: "Formatting core service definitions, tabular comparisons, and concise expert summaries designed for direct AI model quoting.",
  },
  {
    icon: IconSearch,
    title: "Google AI Overviews (SGE) Targeting",
    desc: "Optimizing content structures to capture featured AI snapshot slots on high-value commercial search terms.",
  },
  {
    icon: IconCode,
    title: "Deep Semantic JSON-LD Architecture",
    desc: "Implementing multi-layered Service, FAQPage, ItemList, and LocalBusiness schemas to feed structured data directly to LLM crawlers.",
  },
  {
    icon: IconTrendingUp,
    title: "Brand Consensus & Citation PR",
    desc: "Building authoritative citations across reference platforms and media sources that AI models trust as training and retrieval ground truth.",
  },
  {
    icon: IconLayout,
    title: "AI Search Visibility & Prompt Tracking",
    desc: "Auditing brand recommendations and citation presence across ChatGPT, Perplexity, Gemini, and Google Search AI Overviews.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "AI Brand Visibility & Citation Audit",
    desc: "We test your brand visibility across leading LLMs (ChatGPT, Perplexity, Gemini) on high-intent buyer prompts in your sector.",
  },
  {
    num: "02",
    title: "Entity Disambiguation & Schema Hardening",
    desc: "We eliminate entity confusion, define your primary service offerings in JSON-LD, and connect official social and industry registries.",
  },
  {
    num: "03",
    title: "Answer-Engine Content Architecture",
    desc: "We restructure web pages with concise answer capsules, data tables, and FAQ definitions that AI synthesis algorithms prioritize.",
  },
  {
    num: "04",
    title: "Multi-Platform AI Monitoring & Scaling",
    desc: "We track ongoing AI citations, measure organic referral traffic from AI platforms, and expand entity coverage.",
  },
];

const sectors = [
  { name: "B2B Manufacturers & Exporters", desc: "Ensuring global procurement officers find your specs when querying AI assistants." },
  { name: "Healthcare Specialists & Hospitals", desc: "Establishing doctor credentials and treatment expertise as trusted medical answers." },
  { name: "Real Estate Developers", desc: "Becoming the recommended property option for AI searches on residential and commercial investments." },
  { name: "Tech, SaaS & IT Consultancies", desc: "Getting featured in software comparisons and AI-generated vendor shortlists." },
  { name: "Legal & Financial Advisory Firms", desc: "Positioning partners as authoritative source experts on corporate law, GST, and wealth management." },
  { name: "Higher Education & Training Institutes", desc: "Appearing as top recommendations for course eligibility and career program searches." },
];

export default function AiSeoServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "AI SEO (GEO / AEO)", path: "/services/ai-seo/" },
            ]),
            singleServiceSchema({
              name: "AI SEO & Generative Engine Optimization (GEO/AEO)",
              description: metadata.description as string,
              url: "/services/ai-seo/",
              serviceType: "Generative Engine Optimization",
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
            <span className="text-accent-dark">AI SEO (GEO / AEO)</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            GENERATIVE ENGINE & ANSWER ENGINE OPTIMIZATION
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Get Your Brand Recommended in ChatGPT, Gemini & AI Overviews.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Search is no longer just 10 blue links. Today, buyers ask AI conversational engines for recommendations. We optimize your entity architecture, structured schemas, and brand consensus so AI assistants cite your business first.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get an AI Search Audit
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

      {/* The Shift */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            THE PARADIGM SHIFT
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How Generative AI Is Reshaping Search Inquiries
          </h2>
          <p className="mt-3 text-slate-600">
            When potential clients ask AI for the &ldquo;best provider in Ahmedabad&rdquo;, AI doesn&rsquo;t read keywords—it analyzes semantic relationships and verified consensus.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Entity-Based Retrieval</h3>
              <p className="mt-2 text-sm text-slate-600">
                Large language models rely on clean entity mapping to understand what your company does without ambiguity.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Direct-Answer Capsules</h3>
              <p className="mt-2 text-sm text-slate-600">
                Content formatted in concise, high-density factual snippets is 4x more likely to be quoted directly in Google AI Overviews.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Third-Party Consensus</h3>
              <p className="mt-2 text-sm text-slate-600">
                AI validates your authority across verified directories, citations, and reviews before making a high-confidence recommendation.
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
              GEO/AEO FRAMEWORK
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our 4-Stage AI Optimization Blueprint
            </h2>
            <p className="mt-3 text-slate-400">
              Transforming your digital footprint to dominate conversational AI answers and Google AI snapshots.
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
            CORE CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete AI SEO & Answer Engine Deliverables
          </h2>
          <p className="mt-3 text-slate-600">
            Engineered specifically for ChatGPT Search, Perplexity, Gemini, and Google AI Overviews.
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

      {/* Target Sectors */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              HIGH-IMPACT SECTORS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Who Needs AI SEO Optimization Most?
            </h2>
            <p className="mt-3 text-slate-600">
              Industries where decision-makers and high-net-worth buyers increasingly rely on AI tools to research options.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sec, i) => (
              <Reveal key={sec.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{sec.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{sec.desc}</p>
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
            Questions About AI SEO & GEO
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
        title="Find out how ChatGPT and Google AI view your brand"
        subtitle="Request a complimentary AI Search & Citation Audit. We will analyze your entity presence across conversational AI engines and provide actionable optimization steps."
      />
    </>
  );
}
