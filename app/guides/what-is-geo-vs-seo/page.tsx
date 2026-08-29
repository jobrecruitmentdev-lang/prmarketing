import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconSparkles, IconBot, IconSearch, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "What is GEO vs SEO? (Generative Engine Optimization 2026 Guide) | PR Marketing Ventures",
  description:
    "Complete breakdown of GEO vs SEO. Learn how to optimize your brand for ChatGPT, Google AI Overviews, Perplexity, and Claude alongside traditional Google search rankings.",
  alternates: { canonical: "/guides/what-is-geo-vs-seo/" },
};

const faqs = [
  {
    q: "Will GEO replace traditional SEO in 2026?",
    a: "No. GEO complements traditional SEO. Traditional SEO ensures technical crawlability, indexing, and blue-link rankings, while GEO ensures generative AI models synthesize and cite your brand as the primary source in conversational answers.",
  },
  {
    q: "What are the most important ranking factors for GEO and ChatGPT citation?",
    a: "Clear entity schema (Organization, TechArticle), structured statistical proof points (+37% citation boost according to Princeton research), authoritative citations (+40% boost), and machine-readable data formatting.",
  },
];

export default function GeoVsSeoGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "GEO vs SEO Guide", path: "/guides/what-is-geo-vs-seo/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/what-is-geo-vs-seo/",
              datePublished: "2026-01-25T09:00:00+05:30",
              dateModified: "2026-08-29T12:00:00+05:30",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <article className="bg-white">
        <header className="bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-primary">Guides</Link>
              <span>/</span>
              <span className="text-accent-dark">GEO vs SEO</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconSparkles width={14} height={14} />
              AI SEARCH & DISCOVERY FRAMEWORK (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              What is GEO vs SEO? The Definitive 2026 Guide to AI Search Optimization
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures AI Research Lab</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>9 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                <strong>SEO</strong> optimizes your web pages to rank in Google's traditional 10 blue links. <strong>GEO (Generative Engine Optimization)</strong> optimizes your brand data, entity schema, and content structures so AI search engines (ChatGPT, Google AI Overviews, Perplexity) synthesize and cite your brand as the primary authority.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Comparing SEO vs GEO (Side-by-Side Breakdown)
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Feature</th>
                      <th className="p-4 font-semibold text-primary">Traditional SEO</th>
                      <th className="p-4 font-semibold text-accent-dark">Generative Engine Optimization (GEO)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Primary Goal</td>
                      <td className="p-4 text-slate-600">Rank #1 in Google Search 10 blue links</td>
                      <td className="p-4 font-semibold text-ink">Win direct source citation in AI answers</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Core Target</td>
                      <td className="p-4 text-slate-600">Google, Bing spiders</td>
                      <td className="p-4 font-semibold text-ink">ChatGPT, Perplexity, Gemini, Claude, Google AI</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Content Format</td>
                      <td className="p-4 text-slate-600">Keyword-dense blog posts & articles</td>
                      <td className="p-4 font-semibold text-ink">Structured tables, statistics, entity schema & llms.txt</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

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
          title="Want your brand cited in ChatGPT and Google AI Overviews?"
          subtitle="Book a free GEO & AI visibility audit with our research team."
        />
      </article>
    </>
  );
}
