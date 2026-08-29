import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconMapPin, IconCheck, IconSparkles } from "@/components/icons";

export const metadata: Metadata = {
  title: "How to Rank on Google Maps in Ahmedabad (Local 3-Pack Guide) | PR Marketing Ventures",
  description:
    "Step-by-step checklist to rank your business in the top 3 on Google Maps in Ahmedabad. Category optimization, review funnels, local citations, and geo-tagged photos.",
  alternates: { canonical: "/guides/how-to-rank-on-google-maps-ahmedabad/" },
};

const faqs = [
  {
    q: "What is the #1 ranking factor for Google Maps in Ahmedabad?",
    a: "The most impactful ranking factors are Primary Category accuracy, consistent business Name, Address, and Phone (NAP) citations across local directories, and consistent review velocity with keyword mentions from local customers.",
  },
  {
    q: "How many Google reviews do I need to rank in the top 3 on Google Maps in Ahmedabad?",
    a: "While quality and recency matter more than total count, top 3 ranking profiles in competitive Ahmedabad localities (like C.G. Road or SG Highway) typically have 25 to 75+ verified 5-star reviews with detailed feedback.",
  },
];

export default function RankOnGoogleMapsAhmedabadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "How to Rank on Google Maps in Ahmedabad", path: "/guides/how-to-rank-on-google-maps-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/how-to-rank-on-google-maps-ahmedabad/",
              datePublished: "2026-01-20T09:00:00+05:30",
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
              <span className="text-accent-dark">Google Maps Guide</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconMapPin width={14} height={14} />
              AHMEDABAD LOCAL MAP PACK CHECKLIST (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              How to Rank Your Business on Google Maps in Ahmedabad (Top 3 Pack)
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Local SEO Team</span>
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
                To rank in Google's Local 3-Pack in Ahmedabad, businesses must ensure: 1) exact primary category matching, 2) 100% NAP consistency across Justdial, IndiaMART, and local citations, 3) steady weekly review velocity, 4) weekly geo-tagged photos, and 5) embedded Google Maps and LocalBusiness schema on your website.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                The 5-Step Ahmedabad Google Maps Domination Checklist
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  { step: "Step 1", title: "Select the Exact Primary Category", desc: "Your primary category carries the heaviest ranking weight. Ensure it matches your core high-intent search term (e.g. 'Marketing Agency', 'Software Company')." },
                  { step: "Step 2", title: "Build 50+ Verified Local Citations", desc: "Ensure your Name, Address, and Phone number are formatted 100% identically across Justdial, IndiaMART, Sulekha, and Apple Maps." },
                  { step: "Step 3", title: "Automate 5-Star Customer Reviews", desc: "Use WhatsApp review funnels to collect reviews that naturally mention your target services and location." },
                  { step: "Step 4", title: "Upload Weekly Geo-Tagged Photos", desc: "Publish regular photos of your real office, team, and projects to signal active local prominence." },
                  { step: "Step 5", title: "Connect Your Website with Local Schema", desc: "Embed complete LocalBusiness and PostalAddress JSON-LD markup on your website." },
                ].map((item) => (
                  <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">{item.step}</span>
                    <h3 className="text-lg font-bold text-ink mt-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
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
          title="Want to rank #1 on Google Maps in Ahmedabad?"
          subtitle="Book a free local visibility audit with our local SEO specialists on C.G. Road."
        />
      </article>
    </>
  );
}
