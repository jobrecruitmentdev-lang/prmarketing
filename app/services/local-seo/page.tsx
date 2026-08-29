import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconMapPin,
  IconSearch,
  IconTrendingUp,
  IconArrowRight,
  IconLayout,
  IconSparkles,
  IconGauge,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Local SEO & Google Business Profile Optimization in Ahmedabad | PR Marketing Ventures",
  description:
    "Dominate the Google 3-Pack in Ahmedabad. Comprehensive Local SEO, Google Business Profile management, local citation audits, and geotargeted review acceleration.",
  alternates: { canonical: "/services/local-seo/" },
};

const faqs = [
  {
    q: "How does Local SEO help my business in Ahmedabad?",
    a: "Over 70% of local searches on Google result in a phone call, direction request, or website visit to the top 3 Google Maps listings. Local SEO ensures your business ranks in the Google 3-Pack for high-intent queries across Ahmedabad and surrounding localities.",
  },
  {
    q: "What is Google Business Profile (GBP) optimization?",
    a: "GBP optimization involves choosing primary and secondary categories, adding geo-tagged photos, managing business attributes, setting up service menus, creating localized weekly updates, and actively responding to customer reviews to signal high local relevance.",
  },
  {
    q: "How do you track local map rankings across different parts of the city?",
    a: "We use geo-grid ranking technology that tracks your exact map position (1st, 2nd, 3rd, or lower) at multiple GPS coordinate pins across Navrangpura, SG Highway, Prahlad Nagar, Satellite, Bopal, and across Ahmedabad.",
  },
  {
    q: "What is NAP consistency and why is it important?",
    a: "NAP stands for Name, Address, and Phone Number. Having identical NAP data across your website, Google Maps, Justdial, Sulekha, and Indian directories builds Google's trust and prevents algorithmic suppression.",
  },
  {
    q: "Can you help remove fake negative reviews or optimize review collection?",
    a: "We implement review generation funnels that encourage genuine happy clients to leave 5-star Google reviews via automated WhatsApp and SMS links, while helping you appeal policy-violating spam reviews through official Google channels.",
  },
];

const deliverables = [
  {
    icon: IconMapPin,
    title: "Google Business Profile Overhaul",
    desc: "Complete optimization of categories, business attributes, operating hours, products, services, and local geotagged imagery.",
  },
  {
    icon: IconSearch,
    title: "Geo-Grid Rank Tracking",
    desc: "Pinpoint coordinate rank tracking across neighborhoods to visualize exactly where your business ranks #1 and where competitors dominate.",
  },
  {
    icon: IconLayout,
    title: "Local Citation & Directory Cleanup",
    desc: "Auditing and correcting Name, Address, Phone (NAP) inconsistencies across 50+ authoritative Indian and global business directories.",
  },
  {
    icon: IconSparkles,
    title: "Review Velocity & Reputation Funnel",
    desc: "Automated review request workflows via WhatsApp and email that steadily increase 5-star ratings and keyword-rich customer testimonials.",
  },
  {
    icon: IconTrendingUp,
    title: "Hyper-Local Content & Schema",
    desc: "Embedding LocalBusiness and GeoCoordinates structured schema alongside localized landing page content for targeted zones.",
  },
  {
    icon: IconGauge,
    title: "Local Spam & Suspension Defense",
    desc: "Continuous monitoring against malicious edits, keyword-stuffed competitor listings, and compliance with Google Business Profile guidelines.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Local Presence & NAP Audit",
    desc: "We scan your current Google Maps ranking radius, duplicate listings, and directory NAP consistency across Ahmedabad.",
  },
  {
    num: "02",
    title: "Profile Structuring & Category Alignment",
    desc: "We calibrate your GBP categories, service items, business descriptions, and geo-targeted photo assets.",
  },
  {
    num: "03",
    title: "Local Citation & Authority Building",
    desc: "We publish citations on verified local platforms and embed deep LocalBusiness schema on your website.",
  },
  {
    num: "04",
    title: "Review Velocity & Geo-Grid Expansion",
    desc: "We deploy automated review gathering systems and expand your ranking radius across neighboring areas.",
  },
];

const localSectors = [
  { name: "Clinics & Healthcare Specialists", desc: "Dental clinics, IVF centers, orthopedic surgeons, and diagnostic labs." },
  { name: "Real Estate Brokers & Developers", desc: "Property consultants, architects, interior designers, and construction firms." },
  { name: "Legal, CA & Corporate Services", desc: "Chartered accountants, law firms, trademark consultants, and tax advisors." },
  { name: "Retail Stores & Luxury Showrooms", desc: "Jewellers, apparel boutiques, furniture showrooms, and electronics stores." },
  { name: "Restaurants, Cafes & Hospitality", desc: "Dining venues, banquet halls, catering services, and boutique hotels." },
  { name: "Industrial & Manufacturing Units", desc: "Machinery suppliers, chemical distributors, and fabrication workshops." },
];

export default function LocalSeoServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Local SEO & GBP", path: "/services/local-seo/" },
            ]),
            singleServiceSchema({
              name: "Local SEO & Google Business Profile Optimization",
              description: metadata.description as string,
              url: "/services/local-seo/",
              serviceType: "Local Search Optimization",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">Local SEO</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            LOCAL SEO & GOOGLE MAPS DOMINANCE
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Rank in the Google Local 3-Pack Across Ahmedabad.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            When high-intent customers search for your service nearby, are they calling you or your competitors? We optimize your Google Business Profile, citations, and review velocity to dominate the local map pack.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Request Free Local Audit
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

      {/* Why Local SEO Matters */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            LOCAL VISIBILITY IMPACT
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Why the Google 3-Pack Controls 70% of Local Inquiries
          </h2>
          <p className="mt-3 text-slate-600">
            Mobile users want fast answers, phone numbers, and directions. Missing out on the top 3 map positions means invisible lost revenue.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">76%</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Same-Day Visits</h3>
              <p className="mt-2 text-sm text-slate-600">
                76% of people who search on a smartphone for something nearby visit a business within a single day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">3.2x</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Higher Click Share</h3>
              <p className="mt-2 text-sm text-slate-600">
                The top 3 map pack results receive more direct phone calls and direction requests than all other local links combined.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">100%</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Zero Ad Waste</h3>
              <p className="mt-2 text-sm text-slate-600">
                Organic Google Maps rankings generate consistent, daily inbound inquiries without paying per click.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              LOCAL METHODOLOGY
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our 4-Stage Local Dominance Blueprint
            </h2>
            <p className="mt-3 text-slate-400">
              From audit and categorization to review automation and multi-locality expansion.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 80}>
                <div className="h-full rounded-2xl border border-slate-800 bg-ink-2 p-6">
                  <span className="font-heading text-3xl font-bold text-accent-bright">{step.num}</span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            COMPREHENSIVE DELIVERABLES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Everything Included in Our Local SEO Systems
          </h2>
          <p className="mt-3 text-slate-600">
            A complete suite of technical optimizations to expand your local search radius.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Target Local Sectors */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              PROVEN RESULTS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Local Businesses We Help Scale in Ahmedabad
            </h2>
            <p className="mt-3 text-slate-600">
              Targeting hyper-local customers in Navrangpura, SG Highway, Prahlad Nagar, Satellite, and beyond.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localSectors.map((sec, i) => (
              <Reveal key={sec.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{sec.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{sec.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Bridge */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-primary-soft/50 p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">LOCAL PACKAGES</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
                Ready to take over your local neighborhood rankings?
              </h2>
              <p className="mt-2 max-w-xl text-slate-600">
                View our Essential and Growth plans tailored specifically for local Google Business Profile dominance.
              </p>
            </div>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-light"
            >
              Compare Local Plans
              <IconArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions About Local SEO & Google Business
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        title="Get your free Google Maps ranking scan"
        subtitle="We will generate a geo-grid scan of your business profile across Ahmedabad, showing exactly where you rank and where you are losing leads to competitors."
      />
    </>
  );
}
