import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconBuilding, IconCheck, IconTarget, IconSearch } from "@/components/icons";

export const metadata: Metadata = {
  title: "B2B Marketing Strategies for Gujarat Manufacturers & Exporters (2026) | PR Marketing Ventures",
  description:
    "How industrial manufacturers, chemical exporters, and engineering companies in Ahmedabad and Gujarat generate high-ticket OEM RFQ leads using digital marketing.",
  alternates: { canonical: "/guides/b2b-marketing-guide-ahmedabad/" },
};

const faqs = [
  {
    q: "What is the most effective digital channel for B2B manufacturers in Gujarat?",
    a: "High-intent Google Search advertising combined with Technical Export SEO and WhatsApp RFQ qualification funnels generates the highest ROI for industrial manufacturers.",
  },
  {
    q: "How can Gujarat manufacturers bypass middlemen and sell directly to overseas buyers?",
    a: "By building high-speed Next.js product catalog websites with multilingual SEO, international schema markup, and targeted Google Ads across Europe, North America, and the Middle East.",
  },
];

export default function B2bMarketingGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "B2B Marketing Strategy", path: "/guides/b2b-marketing-guide-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/b2b-marketing-guide-ahmedabad/",
              datePublished: "2026-02-18T09:00:00+05:30",
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
              <span className="text-accent-dark">B2B Marketing</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconBuilding width={14} height={14} />
              INDUSTRIAL B2B PLAYBOOK (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              B2B Marketing Strategies for Gujarat Manufacturers & Exporters
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Industrial Growth Division</span>
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
                Gujarat is India's manufacturing powerhouse. To capture high-value OEM contracts and direct export orders, industrial enterprises in GIDC Naroda, Vatva, Changodar, and Sanand must move beyond broker directories and build proprietary inbound digital customer acquisition pipelines.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                The 4-Step Inbound Blueprint for Manufacturers
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { step: "Step 1", t: "Dominate Commercial B2B Search Terms", d: "Target high-intent search queries ('custom die casting manufacturers Gujarat', 'bulk industrial chemical exporters') on Google." },
                  { step: "Step 2", t: "Showcase Technical Spec Sheets & Certifications", d: "Publish machine specifications, ISO/GMP certificates, and laboratory test reports in sub-second downloadable formats." },
                  { step: "Step 3", t: "Frictionless 1-Click WhatsApp RFQ Forms", d: "Allow procurement officers to request quotes and upload technical drawings instantly via WhatsApp." },
                  { step: "Step 4", t: "Deploy LinkedIn Account-Based Marketing (ABM)", d: "Engage decision-makers at target enterprise accounts with tailored case studies and supplier capabilities." },
                ].map((item) => (
                  <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">{item.step}</span>
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
          title="Ready to scale your manufacturing or export orders in Gujarat?"
          subtitle="Consult with our industrial B2B growth engineers."
        />
      </article>
    </>
  );
}
