import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconTarget, IconSparkles, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Marketing Agency vs Digital Marketing Agency: What's the Difference? | PR Marketing Ventures",
  description:
    "Understand the core differences between a traditional marketing agency and a full-service digital marketing agency in 2026. Learn which partner your business needs for revenue growth.",
  alternates: { canonical: "/guides/marketing-agency-vs-digital-marketing-agency/" },
};

const faqs = [
  {
    q: "What is the primary difference between a marketing agency and a digital marketing agency?",
    a: "A traditional marketing agency focuses on broad brand strategy, market research, print, TV, and outdoor advertising. A digital marketing agency focuses specifically on online growth channels—SEO, Google Ads, Meta advertising, conversion funnels, and CRM automation with 100% measurable ROI.",
  },
  {
    q: "Can a digital marketing agency handle full-service brand strategy?",
    a: "Modern integrated agencies like PR Marketing Ventures combine brand strategy and corporate positioning with digital performance execution, providing the best of both worlds.",
  },
];

export default function AgencyComparisonGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "Marketing vs Digital Marketing Agency", path: "/guides/marketing-agency-vs-digital-marketing-agency/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/marketing-agency-vs-digital-marketing-agency/",
              datePublished: "2026-02-05T09:00:00+05:30",
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
              <span className="text-accent-dark">Agency Comparison</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconTarget width={14} height={14} />
              STRATEGIC AGENCY COMPARISON (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Marketing Agency vs Digital Marketing Agency: What's the Difference & Which Do You Need?
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Strategy Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                While a traditional <strong>marketing agency</strong> defines overarching market positioning, competitive research, and brand identity, a <strong>digital marketing agency</strong> executes measurable revenue funnels across online search, paid ads, and CRM automation. Modern businesses in Ahmedabad achieve maximum growth by partnering with an integrated agency that does both.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Side-by-Side Comparison
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Dimension</th>
                      <th className="p-4 font-semibold text-slate-600">Traditional Marketing Agency</th>
                      <th className="p-4 font-semibold text-primary">Integrated Digital Agency (PR Marketing)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Measurement</td>
                      <td className="p-4 text-slate-600">Brand awareness & estimated reach</td>
                      <td className="p-4 font-semibold text-ink">Exact ROAS, CPA, and verified sales revenue</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Core Channels</td>
                      <td className="p-4 text-slate-600">Print, TV, Billboard, Event PR</td>
                      <td className="p-4 font-semibold text-ink">Google Ads, Meta Ads, Technical SEO, AI Search</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Speed to Results</td>
                      <td className="p-4 text-slate-600">3 to 6 Months</td>
                      <td className="p-4 font-semibold text-ink">24 to 72 Hours for Paid Funnels</td>
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
          title="Looking for an integrated marketing and growth partner in Ahmedabad?"
          subtitle="Book a free 30-minute discovery call at our C.G. Road headquarters."
        />
      </article>
    </>
  );
}
