import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import {
  IconBuilding,
  IconTarget,
  IconTrendingUp,
  IconCheck,
  IconArrowRight,
  IconMapPin,
  IconSparkles,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Google Business Profile (GMB) Optimization & Map Ranking in Ahmedabad | PR Marketing Ventures",
  description:
    "Dominate Google Maps 3-Pack rankings in Ahmedabad. PR Marketing Ventures optimizes Google Business Profiles (GMB), local citations, geo-tagged photos, review generation systems, and local search signals.",
  alternates: { canonical: "/services/google-business-profile/" },
};

const faqs = [
  {
    q: "How do you rank a business in the Google Maps Local 3-Pack in Ahmedabad?",
    a: "Google Maps ranking depends on three core pillars: Relevance (optimizing primary/secondary categories and service menus), Distance/Proximity (geo-tagged signals, localized landing page schema), and Prominence (consistent local NAP citations across Justdial/IndiaMART, review velocity, and keyword-rich customer reviews).",
  },
  {
    q: "How quickly can my Google Business Profile rank in the top 3 on Google Maps?",
    a: "For low-to-medium competition areas in Ahmedabad, clients typically see ranking improvements in 15 to 30 days. For highly competitive areas like C.G. Road, SG Highway, and Prahlad Nagar, comprehensive citation building and review acquisition achieve top 3 rankings within 60 to 90 days.",
  },
  {
    q: "How do you handle fake negative reviews or profile suspensions?",
    a: "We perform GBP suspension appeals, documentation verification with Google support, and review dispute submissions to protect your business reputation and reinstate rankings.",
  },
  {
    q: "Which local directories do you submit citations to in Ahmedabad?",
    a: "We build verified NAP (Name, Address, Phone) citations on Justdial, IndiaMART, Sulekha, Google Maps, Apple Maps, Bing Places, YellowPages India, and Gujarat chamber directory networks.",
  },
];

const capabilities = [
  {
    icon: IconMapPin,
    title: "Google Maps 3-Pack Ranking",
    desc: "Target high-intent 'near me' searches across Ahmedabad so your business appears in the top 3 map positions with direct call and direction buttons.",
  },
  {
    icon: IconSparkles,
    title: "Review Velocity & Reputation Automation",
    desc: "Automated WhatsApp and SMS review request funnels that generate genuine 5-star reviews from happy clients with keyword mentions.",
  },
  {
    icon: IconTarget,
    title: "Local Citation & NAP Synchronization",
    desc: "100% consistent business Name, Address, and Phone numbers across 50+ high-authority Indian business directories to build domain prominence.",
  },
  {
    icon: IconBuilding,
    title: "Weekly Geo-Tagged Updates & Products",
    desc: "Weekly high-resolution geo-tagged photos, product listings, promotional offers, and Q&A optimization to signal active business authority to Google.",
  },
];

export default function GoogleBusinessProfilePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Google Business Profile Optimization", path: "/services/google-business-profile/" },
            ]),
            singleServiceSchema({
              name: "Google Business Profile & Map Pack Ranking in Ahmedabad",
              description: metadata.description as string,
              url: "/services/google-business-profile/",
              serviceType: "Local SEO & GMB Agency",
              areaServed: "Ahmedabad, Gujarat, India",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">Google Business Profile</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Top 3 Google Maps Ranking in Ahmedabad
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> helps local businesses, clinics, retail stores, and service providers dominate Google Maps search in Ahmedabad. We optimize categories, build local citations, automate review collection, and drive phone calls.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            GMB & LOCAL MAP PACK DOMINATION IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Rank #1 on Google Maps. Capture High-Intent Local Customers.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Over 60% of local customers call directly from Google Maps. We optimize your Google Business Profile to capture phone inquiries, direction requests, and walk-in foot traffic.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get Free GMB Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Local SEO Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            MAP PACK DOMINATION
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How We Get Your Profile into the Top 3
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Google Business Profile FAQs
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to rank #1 on Google Maps in Ahmedabad?"
        subtitle="Book a free local visibility audit with our local SEO specialists."
      />
    </>
  );
}
