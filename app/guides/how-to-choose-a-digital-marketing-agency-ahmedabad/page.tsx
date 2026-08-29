import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconCheck, IconTarget, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "How to Choose a Digital Marketing Agency in Ahmedabad (10-Point Checklist) | PR Marketing Ventures",
  description:
    "Expert guide on selecting the best digital marketing company in Ahmedabad. Questions to ask, red flags to avoid, pricing standards, and ROI evaluation criteria.",
  alternates: { canonical: "/guides/how-to-choose-a-digital-marketing-agency-ahmedabad/" },
};

const faqs = [
  {
    q: "What is the biggest red flag when hiring a digital marketing agency in Ahmedabad?",
    a: "Guaranteed #1 rankings within 7 days, lack of access to your own Google Ads/Analytics accounts, and generic social media packages with no lead tracking.",
  },
  {
    q: "Should I hire an agency with a local office in Ahmedabad?",
    a: "Yes. Having an agency with a local office (like C.G. Road or SG Highway) ensures in-person strategy alignment, deep understanding of Gujarat's buyer psychology, and direct accountability.",
  },
];

export default function ChooseAgencyGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "How to Choose an Agency", path: "/guides/how-to-choose-a-digital-marketing-agency-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/how-to-choose-a-digital-marketing-agency-ahmedabad/",
              datePublished: "2026-01-18T09:00:00+05:30",
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
              <span className="text-accent-dark">Agency Selection Guide</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconTarget width={14} height={14} />
              AGENCY EVALUATION BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              How to Choose the Best Digital Marketing Agency in Ahmedabad
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
                To choose the right marketing agency in Ahmedabad, evaluate their focus on <strong>revenue vs vanity metrics</strong>, require full transparency on ad spend accounts, verify their technical web engineering capabilities (Next.js vs slow templates), and confirm local market experience across Gujarat.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                The 5 Questions Every Ahmedabad Business Must Ask Before Hiring an Agency
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { q: "1. Do you optimize for revenue and leads or just likes and impressions?", a: "Ensure their reporting focuses on Customer Acquisition Cost (CAC) and verified sales pipeline value." },
                  { q: "2. Will I own 100% of my Google Ads and Meta ad accounts?", a: "Never allow an agency to run ads from an opaque master account where you lose campaign data if you leave." },
                  { q: "3. What web technology do you use for landing pages?", a: "Ensure landing pages load in under 1 second on mobile devices (Next.js/React) to prevent 50% ad click bounce rates." },
                  { q: "4. How quickly do inbound leads get contacted?", a: "Verify if they have automated WhatsApp/CRM lead triggers that notify your sales team in under 30 seconds." },
                  { q: "5. Are there long-term rigid lock-in contracts?", a: "Top agencies work on 30-day performance retainers because client retention is driven by profitable results." },
                ].map((item) => (
                  <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <h3 className="text-base font-bold text-ink">{item.q}</h3>
                    <p className="text-sm text-slate-600 mt-1">{item.a}</p>
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
          title="Looking for a transparent growth partner in Ahmedabad?"
          subtitle="Meet our team for an in-person discovery session on C.G. Road."
        />
      </article>
    </>
  );
}
