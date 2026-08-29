import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconSparkles, IconTarget, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Playbook for Startups & SMEs in Ahmedabad (2026) | PR Marketing Ventures",
  description:
    "How startups and SMEs in Ahmedabad can achieve product-market fit and scale revenue through performance marketing, zero-cost SEO, and WhatsApp automation.",
  alternates: { canonical: "/guides/digital-marketing-for-startups-ahmedabad/" },
};

const faqs = [
  {
    q: "How should an early-stage startup in Ahmedabad allocate its first marketing budget?",
    a: "We recommend allocating 50% to high-intent Google Search ads for immediate customer validation, 30% to sub-second landing page CRO and WhatsApp automation, and 20% to compounding organic technical SEO.",
  },
  {
    q: "Can bootstrapped SMEs compete against funded corporate giants in Ahmedabad?",
    a: "Yes. By focusing on hyper-local 3-Pack Google Maps SEO, long-tail niche search queries, and sub-30-second WhatsApp customer service, local SMEs routinely outperform slow corporate rivals.",
  },
];

export default function StartupMarketingGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "Startup Marketing Playbook", path: "/guides/digital-marketing-for-startups-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/digital-marketing-for-startups-ahmedabad/",
              datePublished: "2026-01-22T09:00:00+05:30",
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
              <span className="text-accent-dark">Startup Playbook</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconSparkles width={14} height={14} />
              GUJARAT STARTUP GROWTH BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Digital Marketing Playbook for Startups & SMEs in Ahmedabad
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Growth Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                Startups in Ahmedabad do not need massive budgets to scale. By deploying lean growth loops—high-intent Google PPC, rapid A/B landing page testing, WhatsApp auto-responders, and long-tail SEO—Gujarat founders can achieve profitable unit economics within 60 days.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                The 4 Pillars of Lean Startup Growth in Gujarat
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { p: "Pillar 1", t: "Validate Demand with High-Intent Search Ads", d: "Test customer willingness to pay using targeted Google Search ads before writing lines of custom code or ordering inventory." },
                  { p: "Pillar 2", t: "Engineer Sub-Second Next.js Landing Pages", d: "Every 1-second delay in page load time cuts mobile conversion rates by 7%. Build with modern React architectures." },
                  { p: "Pillar 3", t: "Automate Instant WhatsApp Qualification", d: "Engage prospective buyers within 30 seconds to capture peak buying interest and close meetings instantly." },
                  { p: "Pillar 4", t: "Compound Organic Topical Authority", d: "Publish authoritative industry content clusters that rank for low-competition, high-intent buyer searches." },
                ].map((item) => (
                  <div key={item.p} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">{item.p}</span>
                    <h3 className="text-base font-bold text-ink mt-1">{item.t}</h3>
                    <p className="text-sm text-slate-600 mt-1">{item.d}</p>
                  </div>
                ))}
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
          title="Building a startup in Ahmedabad or GIFT City?"
          subtitle="Book a free 30-minute growth engineering session with our founders."
        />
      </article>
    </>
  );
}
