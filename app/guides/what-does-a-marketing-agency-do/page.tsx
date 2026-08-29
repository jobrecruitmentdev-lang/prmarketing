import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconCheck, IconTarget, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "What Does a Marketing Agency Actually Do? (Services & Deliverables 2026) | PR Marketing Ventures",
  description:
    "Discover what a full-service marketing agency does in 2026. Complete guide to services, daily deliverables, strategy execution, and measurable ROI for business owners.",
  alternates: { canonical: "/guides/what-does-a-marketing-agency-do/" },
};

const faqs = [
  {
    q: "What are the primary daily responsibilities of a marketing agency?",
    a: "Market research, campaign strategy, copywriting, video/graphic creation, technical website optimization, ad spend monitoring on Google/Meta, automated lead nurturing, and executive weekly ROI reporting.",
  },
  {
    q: "How does a marketing agency help increase business revenue?",
    a: "By capturing high-intent buyer searches on Google, lowering customer acquisition costs (CAC), doubling website conversion rates with CRO, and engaging leads in under 30 seconds via WhatsApp CRM.",
  },
];

export default function WhatDoesAnAgencyDoGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "What Does a Marketing Agency Do", path: "/guides/what-does-a-marketing-agency-do/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/what-does-a-marketing-agency-do/",
              datePublished: "2026-02-08T09:00:00+05:30",
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
              <span className="text-accent-dark">Agency Deliverables</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconBuilding width={14} height={14} />
              AGENCY SCOPE & DELIVERABLES (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              What Does a Marketing Agency Actually Do? (Complete 2026 Guide)
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Advisory Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                A modern marketing agency acts as an external growth engineering department. Instead of just making creative graphics, it builds customer acquisition systems, executes paid advertising, optimizes Google search rankings, improves website conversion rates, and automates sales pipelines to maximize revenue.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                The 5 Core Pillars of a Full-Service Marketing Agency
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { title: "1. Market Positioning & Brand Strategy", desc: "Crafting clear value propositions, competitor gap analysis, and messaging frameworks that make your business stand out." },
                  { title: "2. Paid Advertising & Performance Funnels", desc: "Managing Google Search, Performance Max, Instagram, Facebook, and LinkedIn ad campaigns to generate qualified leads profitably." },
                  { title: "3. Search Engine Optimization (SEO & Local Maps)", desc: "Optimizing website architecture, technical speed, and Google Business Profiles to dominate first-page organic rankings." },
                  { title: "4. Web Engineering & Conversion Optimization (CRO)", desc: "Designing sub-second Next.js landing pages that eliminate friction and double inbound conversion rates." },
                  { title: "5. Sales Pipeline & WhatsApp CRM Automation", desc: "Connecting advertising campaigns directly to automated WhatsApp and CRM triggers to close deals faster." },
                ].map((p) => (
                  <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="text-base font-bold text-ink">{p.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
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
          title="Ready to partner with a growth-focused marketing agency?"
          subtitle="Speak with our strategic team at our C.G. Road office."
        />
      </article>
    </>
  );
}
