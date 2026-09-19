import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { multiBreadcrumbSchema, faqSchema } from "@/lib/seo";
import {
  IconSearch,
  IconBuilding,
  IconCheck,
  IconArrowRight,
  IconSparkles,
  IconStar,
  IconZap,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "How to Rank in Google Maps 3-Pack in Ahmedabad (2026 Local SEO)",
  description:
    "Master the 6-step blueprint to rank #1 in Google Maps 3-Pack across Ahmedabad. Learn Google Business Profile optimization, NAP consistency, and local schema secrets.",
  keywords: [
    "how to rank in google maps 3 pack ahmedabad",
    "local seo ahmedabad checklist",
    "google business profile ranking factors ahmedabad",
    "google maps 3 pack optimization",
    "local seo agency ahmedabad",
  ],
  alternates: {
    canonical: `${site.url}/answers/how-to-rank-in-google-maps-3-pack-ahmedabad/`,
  },
  openGraph: {
    type: "article",
    title: "How to Rank in Google Maps 3-Pack in Ahmedabad: 2026 Local SEO Masterclass",
    description:
      "Actionable local SEO checklist to dominate the top 3 spots on Google Maps for high-intent Ahmedabad customer searches.",
    url: `${site.url}/answers/how-to-rank-in-google-maps-3-pack-ahmedabad/`,
  },
};

const mapPackSteps = [
  {
    step: "01",
    title: "100% Exact NAP Consistency Across the Web",
    desc: "Your business Name, Address, and Phone number must match character-by-character everywhere. Any discrepancy between your website, Google Maps, Justdial, and IndiaMART confuses Google's algorithm and drops your rank.",
  },
  {
    step: "02",
    title: "Strategic Primary & Secondary Categories",
    desc: "Category selection dictates 70% of Map Pack visibility. Set your primary category to 'Marketing Agency' (or your exact core trade), and add secondary categories like 'Internet Marketing Service', 'Software Company', and 'Advertising Agency'.",
  },
  {
    step: "03",
    title: "High-Precision GeoCoordinates Schema",
    desc: "Inject schema.org/GeoCoordinates with your exact latitude and longitude into your website's root layout. For example, PR Marketing Ventures embeds latitude 23.036506 and longitude 72.561111 for Fairdeal House on C.G. Road.",
  },
  {
    step: "04",
    title: "Location-Tagged Review Velocity",
    desc: "Ask satisfied clients to mention specific services and Ahmedabad localities in their 5-star Google reviews (e.g. 'Best marketing agency on C.G. Road for our clinic' or 'Built a custom CRM for our SG Highway office').",
  },
  {
    step: "05",
    title: "Localized Landing Page Silos",
    desc: "Create dedicated city hub pages matching high-density commercial zones (Navrangpura, C.G. Road, Prahladnagar, Bodakdev, SG Highway, and GIFT City) with localized FAQ schemas and localized case studies.",
  },
  {
    step: "06",
    title: "Local Indian Citations & Backlinks",
    desc: "Build high-authority verified citations on reputable Indian business directories including IndiaMART, Justdial, Sulekha, Clutch, TradeIndia, and local Gujarat chamber of commerce registries.",
  },
];

const faqs = [
  {
    q: "How long does it take to rank in Google Maps 3-Pack in Ahmedabad?",
    a: "With full NAP consistency, Google Business Profile optimization, and local schema implementation, businesses typically see their rankings climb into the top 3 spots within 30 to 60 days.",
  },
  {
    q: "Why does my competitor with fewer reviews rank higher on Google Maps?",
    a: "Google's local algorithm weighs 3 factors: Relevance (categories and keywords), Distance (proximity to the searcher), and Prominence (website domain authority, local citations, and on-page schema). A competitor with better on-page local SEO and category alignment will often outrank businesses with more reviews.",
  },
  {
    q: "Does website speed affect Google Maps rankings?",
    a: "Yes. Google uses your linked website's Core Web Vitals and user engagement metrics to determine prominence. A sub-second Next.js website signals high technical quality, boosting your Google Maps authority.",
  },
];

const qaSchema = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: "How to rank in Google Maps 3-Pack for local searches in Ahmedabad?",
    text: "What are the most effective local SEO and Google Business Profile strategies to rank in the top 3 map pack results in Ahmedabad, Gujarat?",
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: "To rank in Google Maps 3-Pack in Ahmedabad: (1) Ensure 100% exact Name, Address, and Phone (NAP) consistency across your website and directories; (2) Select the correct Primary Category ('Marketing Agency') and secondary categories; (3) Embed GeoCoordinates JSON-LD schema into your website; (4) Generate genuine client reviews mentioning specific services and Ahmedabad localities; (5) Build localized city landing pages; and (6) Secure high-authority local citations on Justdial, IndiaMART, and Clutch.",
      author: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
    },
  },
};

export default function HowToRankGoogleMapsAhmedabadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Knowledge Hub", path: "/answers/" },
              { name: "Google Maps 3-Pack Ahmedabad Strategy", path: "/answers/how-to-rank-in-google-maps-3-pack-ahmedabad/" },
            ]),
            qaSchema,
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/answers/" className="transition-colors hover:text-primary">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-accent-dark">Google Maps 3-Pack</span>
          </nav>

          {/* Direct Answer AEO Box */}
          <div className="mb-8 rounded-2xl border-2 border-primary/30 bg-primary-soft/80 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-dark">
              <IconSparkles className="h-4 w-4 text-accent-dark" />
              <span>Direct Answer (AEO &amp; Local Search Verification)</span>
            </div>
            <h2 className="mt-2 font-heading text-lg font-bold text-ink sm:text-xl">
              How Can a Business Rank in Google Maps 3-Pack in Ahmedabad?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
              Ranking in Google Maps 3-Pack requires <strong>three core pillars: Relevance, Proximity, and Prominence</strong>. In Ahmedabad, the highest-ranking businesses maintain <strong>100% identical NAP details</strong> across Google Maps and their website, embed exact <strong>GeoCoordinates JSON-LD schema</strong>, select precise primary categories, and cultivate customer reviews containing local neighborhood keywords (C.G. Road, SG Highway, Prahladnagar).
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-dark shadow-sm">
            <IconStar className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            Local 3-Pack Ranking Framework
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            How to Rank in Google Maps 3-Pack for Local Searches in Ahmedabad
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Over 60% of all local customer clicks go directly to the top 3 map results. Follow this verified 6-step checklist to dominate local searches across Ahmedabad.
          </p>
        </div>
      </section>

      {/* 6 Steps Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              The 6-Step Google Maps Domination Blueprint
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Technical optimizations that separate market leaders from invisible businesses.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {mapPackSteps.map((s) => (
              <Reveal key={s.step}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
                      {s.step}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-ink">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Frequently Asked Questions: Google Maps SEO
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers on GBP verification, local citations, and proximity.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6">
                <h3 className="font-heading text-base font-bold text-ink sm:text-lg">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBand
        title="Ready to Capture the #1 Spot on Google Maps?"
        subtitle="Book a local SEO diagnostic with PR Marketing Ventures at our C.G. Road office to analyze your local 3-Pack competitors."
      />
    </>
  );
}
