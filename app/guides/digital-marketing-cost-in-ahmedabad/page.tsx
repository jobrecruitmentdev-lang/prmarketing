import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconTarget, IconCheck, IconSearch, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Cost in Ahmedabad (2026 Transparent Pricing Guide) | PR Marketing Ventures",
  description:
    "How much does digital marketing cost in Ahmedabad in 2026? Complete price breakdown for SEO, Google Ads, Meta Ads, social media management, and growth retainers.",
  alternates: { canonical: "/guides/digital-marketing-cost-in-ahmedabad/" },
};

const faqs = [
  {
    q: "What is the average monthly cost of digital marketing in Ahmedabad in 2026?",
    a: "The average monthly retainer ranges from ₹15,000 to ₹35,000/month for small businesses, ₹40,000 to ₹80,000/month for mid-sized growing companies, and ₹1,00,000 to ₹2,50,000+/month for enterprise brands managing multi-channel ad spend.",
  },
  {
    q: "Why do some agencies charge ₹5,000/month while others charge ₹50,000/month in Ahmedabad?",
    a: "Low-cost agencies usually post basic generic graphics on social media with zero revenue impact. Professional performance agencies engineer custom Next.js landing pages, technical SEO, server-side tracking, and automated CRM pipelines that generate direct customer revenue.",
  },
  {
    q: "What portion of the budget goes to the agency fee vs the ad platform (Google/Meta)?",
    a: "The agency management retainer covers strategy, creative design, copywriting, and technical optimization. Ad spend is paid directly to Google/Meta by the client based on campaign scale.",
  },
];

export default function DigitalMarketingCostPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "Digital Marketing Cost in Ahmedabad", path: "/guides/digital-marketing-cost-in-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/digital-marketing-cost-in-ahmedabad/",
              datePublished: "2026-01-15T09:00:00+05:30",
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
              <span className="text-accent-dark">Marketing Cost Guide</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconTarget width={14} height={14} />
              AHMEDABAD DIGITAL MARKETING PRICING MATRIX (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              How Much Does Digital Marketing Cost in Ahmedabad? (2026 Price Guide)
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Growth Team</span>
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
                In 2026, professional digital marketing services in Ahmedabad cost between <strong>₹15,000 to ₹1,50,000+ per month</strong>. The exact cost depends on service scope: Local Google Maps SEO, Performance PPC advertising on Google & Meta, AI search optimization (GEO), and CRM automation.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                1. Ahmedabad Digital Marketing Monthly Price Benchmark
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Service Tier</th>
                      <th className="p-4 font-semibold text-primary">Monthly Retainer</th>
                      <th className="p-4 font-semibold text-slate-600">Included Scope</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Starter / Local SEO</td>
                      <td className="p-4 font-bold text-ink">₹15,000 – ₹25,000 / mo</td>
                      <td className="p-4 text-slate-600">Google Maps 3-Pack, local citations, review automation</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Growth / Performance PPC</td>
                      <td className="p-4 font-bold text-ink">₹35,000 – ₹65,000 / mo</td>
                      <td className="p-4 text-slate-600">Google Search Ads, Meta Video Ads, Next.js landing pages</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Enterprise Growth Engine</td>
                      <td className="p-4 font-bold text-ink">₹75,000 – ₹1,75,000+ / mo</td>
                      <td className="p-4 text-slate-600">Full-funnel ads, technical SEO, AI agents, WhatsApp CRM</td>
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
          title="Want a tailored digital marketing proposal for your business in Ahmedabad?"
          subtitle="Speak with our growth consultants at our C.G. Road office."
        />
      </article>
    </>
  );
}
