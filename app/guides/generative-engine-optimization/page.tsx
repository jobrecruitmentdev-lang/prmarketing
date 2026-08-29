import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconSparkles, IconCheck, IconArrowRight, IconBot, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "The Definitive Guide to Generative Engine Optimization (GEO) in 2026 | PR Marketing Ventures",
  description:
    "Learn how Generative Engine Optimization (GEO) works. Discover how to get your brand cited in Google AI Overviews, ChatGPT, Perplexity, and Claude with actionable frameworks.",
  alternates: { canonical: "/guides/generative-engine-optimization/" },
};

const faqs = [
  {
    q: "What is Generative Engine Optimization (GEO)?",
    a: "Generative Engine Optimization (GEO) is the practice of optimizing digital content and entity architecture so that AI engines (such as Google AI Overviews, ChatGPT, Perplexity, and Claude) discover, extract, and cite your brand as an authoritative source in AI-generated answers.",
  },
  {
    q: "What is the difference between Traditional SEO and GEO?",
    a: "Traditional SEO focuses on ranking ten blue links on Google's search engine results page (SERP). GEO focuses on source citation within AI synthesize engines. A page ranking on page 2 or 3 of organic search can still be cited as the #1 source by Perplexity or ChatGPT if its content is extractable and data-rich.",
  },
  {
    q: "What content elements drive the highest AI citation rates?",
    a: "According to Princeton University research (KDD 2024), adding authoritative source citations increases AI visibility by +40%, specific statistics by +37%, expert quotes by +30%, and clear direct-answer definitions by +25%.",
  },
];

export default function GeoGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "Generative Engine Optimization", path: "/guides/generative-engine-optimization/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/generative-engine-optimization/",
              datePublished: "2026-01-15T09:00:00+05:30",
              dateModified: "2026-08-29T12:00:00+05:30",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <article className="bg-white">
        {/* Header */}
        <header className="bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-primary">Guides</Link>
              <span>/</span>
              <span className="text-accent-dark">GEO Guide</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconSparkles width={14} height={14} />
              AI SEO & GENERATIVE ENGINE OPTIMIZATION
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              The Definitive Guide to Generative Engine Optimization (GEO) in 2026
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>Authored by: PR Marketing Ventures Growth Engineering Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>

            {/* Direct Answer Summary Block (Princeton AEO Pattern) */}
            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                <strong>Generative Engine Optimization (GEO)</strong> is the next frontier of search visibility. Over 45% of search queries now display AI Overviews, directly impacting traditional organic click-through rates. To get cited by AI engines like ChatGPT, Perplexity, Gemini, and Google AI Overviews, websites must transition from keyword repetition to <strong>entity-first schema</strong>, <strong>extractable data blocks</strong>, and <strong>citable original statistics</strong>.
              </p>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                1. What is Generative Engine Optimization (GEO)?
              </h2>
              <p className="mt-4 leading-relaxed">
                Generative Engine Optimization (GEO) is the systematic process of designing website content, data models, and semantic entities so AI-powered search engines can accurately extract, synthesize, and cite your brand as an authoritative source in AI answers.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                2. Key Ranking & Citation Factors (Princeton University Research)
              </h2>
              <p className="mt-4 leading-relaxed">
                A seminal study from Princeton University researchers (KDD 2024) evaluated visibility optimization across generative search engines (Perplexity, Google AI Overviews, ChatGPT). The findings revealed distinct citation multipliers:
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Optimization Method</th>
                      <th className="p-4 font-semibold text-primary">AI Visibility Impact</th>
                      <th className="p-4 font-semibold text-slate-600">Implementation Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Cite Reputable Sources</td>
                      <td className="p-4 font-bold text-emerald-600">+40% boost</td>
                      <td className="p-4 text-slate-600">Link claims to peer-reviewed data & research</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Add Specific Statistics</td>
                      <td className="p-4 font-bold text-emerald-600">+37% boost</td>
                      <td className="p-4 text-slate-600">Include exact quantitative metrics & percentages</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Include Expert Quotes</td>
                      <td className="p-4 font-bold text-emerald-600">+30% boost</td>
                      <td className="p-4 text-slate-600">Name authors with verified credentials & titles</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Clear Definition Blocks</td>
                      <td className="p-4 font-bold text-emerald-600">+25% boost</td>
                      <td className="p-4 text-slate-600">Lead sections with 40–60 word direct answers</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-rose-600">Keyword Stuffing</td>
                      <td className="p-4 font-bold text-rose-600">-10% penalty</td>
                      <td className="p-4 text-slate-600">Actively reduces AI citation probability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                3. The 3 Pillars of Global GEO Strategy
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="font-heading text-lg font-bold text-primary">Pillar 1</span>
                  <h3 className="mt-2 font-semibold text-ink">Extractable Structure</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Format content in self-contained answer blocks, definition boxes, and comparison tables.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="font-heading text-lg font-bold text-primary">Pillar 2</span>
                  <h3 className="mt-2 font-semibold text-ink">Entity Schema</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Provide machine-readable JSON-LD (Organization, TechArticle, FAQPage, Service) so bots understand relationships.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="font-heading text-lg font-bold text-primary">Pillar 3</span>
                  <h3 className="mt-2 font-semibold text-ink">AI Crawler Access</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Ensure robots.txt allows GPTBot, PerplexityBot, ClaudeBot, and Google-Extended.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                4. Conclusion & Next Steps
              </h2>
              <p className="mt-4 leading-relaxed">
                As search shifts from ten blue links to AI summaries, brands that optimize for Generative Engine Optimization will capture the majority of market share. PR Marketing Ventures integrates GEO into every website build, content cluster, and SEO campaign.
              </p>
            </section>
          </div>
        </div>

        {/* FAQs */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <CtaBand
          title="Ready to get your brand cited across AI Search Engines?"
          subtitle="Partner with PR Marketing Ventures for advanced Generative Engine Optimization and AI SEO."
        />
      </article>
    </>
  );
}
