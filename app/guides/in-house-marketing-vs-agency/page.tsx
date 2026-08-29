import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconCheck, IconTarget, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "In-House Marketing Team vs Hiring an Agency: Cost & ROI Guide | PR Marketing Ventures",
  description:
    "Compare the true cost, skill depth, execution speed, and ROI of building an in-house marketing team versus hiring a dedicated growth agency in 2026.",
  alternates: { canonical: "/guides/in-house-marketing-vs-agency/" },
};

const faqs = [
  {
    q: "How much does it cost to build a full in-house marketing team in India?",
    a: "Hiring a marketing manager, copywriter, graphic designer, media buyer, and SEO engineer costs ₹18,00,000 to ₹35,00,000+ per year in salaries, software tools, and employee benefits.",
  },
  {
    q: "Why do high-growth companies prefer hiring an agency over in-house staff?",
    a: "An agency provides immediate access to specialized senior experts, cutting-edge software stacks, and proven industry playbooks with zero recruitment overhead or employee churn risks.",
  },
];

export default function InHouseVsAgencyGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "In-House vs Agency", path: "/guides/in-house-marketing-vs-agency/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/in-house-marketing-vs-agency/",
              datePublished: "2026-02-15T09:00:00+05:30",
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
              <span className="text-accent-dark">In-House vs Agency</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconBuilding width={14} height={14} />
              TALENT & COST BENCHMARK (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              In-House Marketing Team vs Hiring an Agency: Cost, Speed & ROI Comparison
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Advisory Team</span>
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
                Building an in-house marketing team requires significant fixed overhead (₹20L–₹35L/year) and takes months to hire. Hiring an agency like PR Marketing Ventures gives you an entire multidisciplinary team of media buyers, SEO engineers, and web developers on Day 1 for a fraction of the cost.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Cost & Capability Comparison
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Factor</th>
                      <th className="p-4 font-semibold text-slate-600">In-House Marketing Team</th>
                      <th className="p-4 font-semibold text-primary">Marketing Agency (PR Marketing)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Annual Cost</td>
                      <td className="p-4 text-slate-600">₹20,00,000 – ₹35,00,000+</td>
                      <td className="p-4 font-semibold text-ink">₹3,00,000 – ₹9,00,000 / year</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Skill Depth</td>
                      <td className="p-4 text-slate-600">Limited to 1–2 generalists</td>
                      <td className="p-4 font-semibold text-ink">Full team (SEO, Ads, CRO, Code, CRM)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Ramp-Up Time</td>
                      <td className="p-4 text-slate-600">60 to 90 days of hiring</td>
                      <td className="p-4 font-semibold text-ink">Immediate execution in 48 hours</td>
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
          title="Want a full marketing and engineering team without the overhead?"
          subtitle="Explore our flexible monthly growth retainers."
        />
      </article>
    </>
  );
}
