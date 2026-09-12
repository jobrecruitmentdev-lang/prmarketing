import os

BASE_DIR = r"C:\hk\prmarketing\website"

pages = {}

# 1. SEO Page
pages["app/services/seo/page.tsx"] = """import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconSearch,
  IconGauge,
  IconSparkles,
  IconTrendingUp,
  IconArrowRight,
  IconLayout,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "SEO Services & Technical SEO Company in Ahmedabad | PR Marketing Ventures",
  description:
    "Data-driven SEO services and technical SEO in Ahmedabad. We optimize architecture, Core Web Vitals, semantic schema, and high-intent rankings that convert to revenue.",
  alternates: { canonical: "/services/seo/" },
};

const faqs = [
  {
    q: "How long does it take to see organic rankings and traffic growth?",
    a: "Most technical fixes and on-page optimizations show initial movement within 30 to 60 days. Highly competitive commercial keywords in Ahmedabad typically achieve solid first-page positions within 3 to 6 months of continuous technical optimization and topical cluster authority.",
  },
  {
    q: "How is your SEO approach different from traditional agencies in Ahmedabad?",
    a: "Traditional agencies focus on high-volume vanity keywords and spammy backlink packages. We engineer SEO from code up: fixing Core Web Vitals, implementing advanced schema, structuring topical entity clusters, and optimizing strictly for high-converting commercial intent.",
  },
  {
    q: "Do you handle technical SEO and Core Web Vitals fixes directly in the code?",
    a: "Yes. As digital engineers, we do not just deliver PDF audit reports for someone else to fix. We write clean code, optimize scripts, fix layout shifts (CLS), compress assets, and restructure semantic HTML directly on your site.",
  },
  {
    q: "Will you help our business rank on Google Maps and Local Pack as well?",
    a: "Yes. Organic SEO and Local SEO go hand-in-hand. For local service areas, we combine technical website optimization with dedicated Google Business Profile management, geo-grid tracking, and local citation auditing.",
  },
  {
    q: "What monthly reporting and transparency do you provide?",
    a: "You receive transparent weekly and monthly dashboards tracking Google Search Console impressions, qualified organic clicks, keyword position changes, and direct lead conversion events—not vanity metrics.",
  },
];

const deliverables = [
  {
    icon: IconSearch,
    title: "Technical SEO & Crawl Architecture",
    desc: "Comprehensive audit of crawl budget, indexation bottlenecks, robots.txt, dynamic sitemaps, and canonical tag structures.",
  },
  {
    icon: IconGauge,
    title: "Core Web Vitals & Speed Hardening",
    desc: "LCP, INP, and CLS performance tuning to achieve sub-second load times and flawless mobile user experience.",
  },
  {
    icon: IconSparkles,
    title: "Topical Authority & Content Silos",
    desc: "Structuring content clusters and pillar hubs that establish deep topical relevance for high-converting commercial search queries.",
  },
  {
    icon: IconCode,
    title: "Semantic Schema & Structured Data",
    desc: "Implementation of Organization, LocalBusiness, FAQPage, Service, and BreadcrumbList JSON-LD for rich snippet visibility.",
  },
  {
    icon: IconTrendingUp,
    title: "High-Intent Keyword Engineering",
    desc: "Targeting buyer-intent searches rather than vanity traffic to maximize qualified lead generation and sales conversions.",
  },
  {
    icon: IconLayout,
    title: "Conversion Rate Optimization (CRO)",
    desc: "Refining call-to-actions, enquiry funnels, and landing page layouts to turn incoming organic search traffic into booked clients.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Diagnostic Audit & Competitive Gap Analysis",
    desc: "We dissect your existing site architecture, technical blockers, search console health, and competitor ranking advantages in your Ahmedabad market sector.",
  },
  {
    num: "02",
    title: "Architecture & On-Page Engineering",
    desc: "We rewrite semantic HTML structures, optimize page titles, meta descriptions, internal link silos, and embed structured JSON-LD schemas.",
  },
  {
    num: "03",
    title: "Technical Hardening & Core Web Vitals",
    desc: "We eliminate JavaScript bloat, optimize asset delivery, enforce HTTPS/canonical rules, and ensure mobile-first performance speed.",
  },
  {
    num: "04",
    title: "Authority Building & Iterative Scaling",
    desc: "We expand topical coverage through authoritative content, track keyword ranking trajectories weekly, and continuously tune for conversion velocity.",
  },
];

const industriesList = [
  { name: "Real Estate & Developers", desc: "Capturing high-ticket property buyers searching for projects across Ahmedabad & Gujarat." },
  { name: "Healthcare & Clinics", desc: "Targeting patient searches for specialized doctors, treatments, and medical facilities." },
  { name: "Manufacturing & B2B", desc: "Generating domestic and export distributor inquiries for industrial equipment and products." },
  { name: "Retail & Ecommerce", desc: "Ranking product catalogs and shopping intents to drive organic transactions." },
  { name: "Education & Institutes", desc: "Driving student admissions and course inquiries through strategic local and regional SEO." },
  { name: "IT & SaaS Companies", desc: "Building national and global search visibility for software platforms and tech services." },
];

export default function SeoServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "SEO Services", path: "/services/seo/" },
            ]),
            singleServiceSchema({
              name: "SEO & Technical SEO Services",
              description: metadata.description as string,
              url: "/services/seo/",
              serviceType: "Search Engine Optimization",
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
            <span className="text-accent-dark">SEO Services</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            TECHNICAL & COMMERCIAL SEO IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            SEO Services Engineered for Revenue, Not Vanity Traffic.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Stop wasting budgets on generic agencies selling meaningless rank reports. We engineer technical SEO, semantic structured data, Core Web Vitals, and topical authority that turn Google searches into paying customers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Request Free SEO Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Pricing Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Diagnostic: Why Traditional SEO Fails */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            THE REALITY CHECK
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Why 90% of SEO Campaigns Fail in Ahmedabad
          </h2>
          <p className="mt-3 text-slate-600">
            Most businesses hire an agency, wait 6 months, and get nothing but an Excel sheet of irrelevant keywords. Here is what is usually broken:
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
              <span className="font-heading text-lg font-bold text-rose-700">01. Vanity Intent</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Ranking for the wrong terms</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ranking #1 for high-volume informational terms brings traffic that bounces in 5 seconds. We focus strictly on high-intent buyer keywords.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
              <span className="font-heading text-lg font-bold text-rose-700">02. Ignored Technical Debt</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Slow sites with broken schemas</h3>
              <p className="mt-2 text-sm text-slate-600">
                Google cannot properly index or rank sites suffering from slow Core Web Vitals, missing metadata, and broken mobile responsiveness.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
              <span className="font-heading text-lg font-bold text-rose-700">03. Zero Conversion Focus</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Traffic without inquiries</h3>
              <p className="mt-2 text-sm text-slate-600">
                Getting visitors to your website is only half the job. Without strategic CTAs and clear conversion funnels, rankings never turn into revenue.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              OUR PROVEN BLUEPRINT
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              How We Engineer Your Search Dominance
            </h2>
            <p className="mt-3 text-slate-400">
              A systematic, transparent 4-stage process designed to build compounding search authority.
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
            FULL-SPECTRUM CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete Technical & Commercial SEO Deliverables
          </h2>
          <p className="mt-3 text-slate-600">
            Everything your website requires to capture and sustain first-page organic visibility.
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

      {/* Industries We Serve */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              VERTICAL EXPERTISE
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Industries We Drive Organic Inquiries For
            </h2>
            <p className="mt-3 text-slate-600">
              Tailored search strategies built around the exact search behavior of buyers in your industry.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industriesList.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{ind.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{ind.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser Bridge */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-primary-soft/50 p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">TRANSPARENT ENGAGEMENT</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
                Ready to review our transparent SEO packages?
              </h2>
              <p className="mt-2 max-w-xl text-slate-600">
                Explore our Essential, Growth, Impact, and Empower tiers tailored to your market competition level.
              </p>
            </div>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-light"
            >
              Explore Pricing Plans
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
            Questions About Our SEO Services
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
        title="Get your free technical SEO diagnostic audit"
        subtitle="Send us your website URL and target keywords. We will send back a prioritized roadmap showing exactly where you are losing rankings and how to fix it."
      />
    </>
  );
}
"""

# 2. Local SEO Page
pages["app/services/local-seo/page.tsx"] = """import type { Metadata } from "next";
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
"""

# 3. Web Development Page
pages["app/services/web-development/page.tsx"] = """import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconCode,
  IconGauge,
  IconLayout,
  IconServer,
  IconArrowRight,
  IconSparkles,
  IconSearch,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Website Development & Web Engineering in Ahmedabad | PR Marketing Ventures",
  description:
    "Custom website development in Ahmedabad built with Next.js, React, and modern web architectures. Ultra-fast, 100/100 Core Web Vitals, secure, and SEO-engineered.",
  alternates: { canonical: "/services/web-development/" },
};

const faqs = [
  {
    q: "Why do you build with Next.js and modern stacks instead of cheap WordPress templates?",
    a: "Most WordPress templates are bloated with 40+ plugins, slow SQL queries, and security vulnerabilities that ruin Core Web Vitals. Next.js and static export architectures deliver sub-second load times, instant caching on global CDNs, bulletproof security, and superior technical SEO rankings.",
  },
  {
    q: "How fast will our new website load?",
    a: "We target 90-100 on Google PageSpeed Insights and strictly enforce passing Core Web Vitals (LCP < 1.2s, CLS = 0, INP < 100ms) on both mobile and desktop devices.",
  },
  {
    q: "Is the website mobile-responsive and accessible?",
    a: "Yes. Every layout is crafted mobile-first with fluid typography, responsive flex/grid layouts, high-contrast accessible colors, and touch-friendly navigation.",
  },
  {
    q: "Do you integrate custom lead forms, WhatsApp buttons, and CRM pipelines?",
    a: "Yes. Every website we build includes direct WhatsApp chat integration, validation-hardened contact forms, and automated webhook routing to Google Sheets, CRMs, and email notifications.",
  },
  {
    q: "Who owns the code and intellectual property after launch?",
    a: "You own 100% of the codebase, design assets, and content. We deliver clean, modular Git repositories and assist with direct deployment to your preferred hosting (Cloudflare, Hostinger VPS, Vercel, or AWS).",
  },
];

const deliverables = [
  {
    icon: IconCode,
    title: "Next.js & React Web Engineering",
    desc: "Modern web applications built with TypeScript, Tailwind CSS, and clean modular component architecture for long-term maintainability.",
  },
  {
    icon: IconGauge,
    title: "100/100 Core Web Vitals",
    desc: "Zero layout shifts, instant first-contentful paint, and optimized asset delivery for maximum user engagement and search engine favoritism.",
  },
  {
    icon: IconLayout,
    title: "Conversion-Focused UI/UX Design",
    desc: "Custom design systems tailored to your brand identity with clear visual hierarchy, trust badges, and frictionless lead capture forms.",
  },
  {
    icon: IconSearch,
    title: "SEO-First Code Structure",
    desc: "Semantic HTML5, automated OpenGraph social preview generation, canonical tags, and pre-rendered JSON-LD schema on every route.",
  },
  {
    icon: IconServer,
    title: "High-Performance Cloud Hosting",
    desc: "Cloudflare edge caching, SSL encryption, automated daily backups, and server configuration optimized for low latency and zero downtime.",
  },
  {
    icon: IconSparkles,
    title: "Lead Capture & API Integrations",
    desc: "Direct integration with WhatsApp Business, CRM systems, email notification webhooks, and Google Analytics 4 event tracking.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Architecture & Wireframe Planning",
    desc: "We define page hierarchy, commercial user journeys, conversion funnels, and component design systems.",
  },
  {
    num: "02",
    title: "Custom UI/UX & Responsive Design",
    desc: "We design clean, modern layouts tailored to your brand with dark/light contrast rules and intuitive typography.",
  },
  {
    num: "03",
    title: "Engineering & Performance Optimization",
    desc: "We write clean, semantic code with static pre-rendering, lazy asset loading, and zero layout shift.",
  },
  {
    num: "04",
    title: "SEO Integration, Testing & Deployment",
    desc: "Comprehensive cross-browser, unit, and end-to-end testing before instant deployment and search engine indexing.",
  },
];

const useCases = [
  { name: "Corporate & Enterprise Sites", desc: "Authoritative digital headquarters for established enterprises, manufacturers, and corporate brands." },
  { name: "High-Converting Lead Gen Sites", desc: "Landing pages and multi-page funnels engineered to maximize qualified phone and WhatsApp inquiries." },
  { name: "SaaS & Product Platforms", desc: "Interactive web applications with modern dashboards, auth flows, and API microservice backends." },
  { name: "Healthcare & Clinic Portals", desc: "Fast, accessible websites with doctor profiles, treatment overviews, and appointment booking forms." },
  { name: "Real Estate Project Showcases", desc: "Immersive property microsites with floorplans, virtual tour embeds, and brochure download captures." },
  { name: "Professional Consultancy Portals", desc: "Showcasing expertise, client case studies, and automated consultation scheduling." },
];

export default function WebDevelopmentServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Website Development", path: "/services/web-development/" },
            ]),
            singleServiceSchema({
              name: "Website Development & Web Engineering",
              description: metadata.description as string,
              url: "/services/web-development/",
              serviceType: "Web Development",
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
            <span className="text-accent-dark">Website Development</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            WEB ENGINEERING & DEVELOPMENT IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            High-Performance Websites Engineered to Rank and Convert.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Say goodbye to slow, bloated website templates that crash and fail Core Web Vitals. We engineer custom, ultra-fast web platforms using Next.js and modern technologies that elevate your brand and turn visitors into qualified leads.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Start Your Web Project
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* The Engineering Difference */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            THE TECHNICAL STANDARD
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Why Modern Web Architecture Beats Legacy CMS
          </h2>
          <p className="mt-3 text-slate-600">
            Speed is not an afterthought—it is a ranking factor, a conversion driver, and the foundation of brand trust.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Sub-Second Load Speeds</h3>
              <p className="mt-2 text-sm text-slate-600">
                Static edge caching serves web pages in under 200ms worldwide, slashing bounce rates and keeping mobile users engaged.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Zero Vulnerability Surface</h3>
              <p className="mt-2 text-sm text-slate-600">
                No fragile third-party plugins that break on updates or expose databases to automated injection exploits.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Built-in Semantic SEO</h3>
              <p className="mt-2 text-sm text-slate-600">
                Every page is pre-rendered with perfect schema markup, automated sitemaps, and optimized open-graph metadata for maximum search discoverability.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              DEVELOPMENT LIFECYCLE
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              From Concept to High-Performance Deployment
            </h2>
            <p className="mt-3 text-slate-400">
              A structured engineering pipeline that ensures pixel perfection, flawless responsiveness, and bulletproof code.
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
            WHAT WE DELIVER
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Full-Stack Web Development Capabilities
          </h2>
          <p className="mt-3 text-slate-600">
            Comprehensive development solutions tailored to your business operations.
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

      {/* Use Cases */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              TAILORED SOLUTIONS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Web Applications & Websites We Build
            </h2>
            <p className="mt-3 text-slate-600">
              Engineered specifically for your industry requirements and customer workflows.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <Reveal key={uc.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{uc.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{uc.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Bridge */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-primary-soft/50 p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">PROVEN SYSTEMS</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">
                See our live web engineering and design in action
              </h2>
              <p className="mt-2 max-w-xl text-slate-600">
                Explore real client projects with verified 95+ PageSpeed scores and custom UI architectures.
              </p>
            </div>
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-light"
            >
              Explore Portfolio
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
            Questions About Our Web Development
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
        title="Ready to build a website that out-performs your competitors?"
        subtitle="Schedule a consultation with our web engineering team in Ahmedabad. We will review your goals and provide a detailed scope, timeline, and quote."
      />
    </>
  );
}
"""

# 4. Ecommerce Page
pages["app/services/ecommerce/page.tsx"] = """import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconCart,
  IconGauge,
  IconLayout,
  IconTrendingUp,
  IconArrowRight,
  IconSparkles,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Ecommerce Website Development in Ahmedabad | PR Marketing Ventures",
  description:
    "Custom ecommerce store development in Ahmedabad. Fast, high-converting online stores built on Shopify, WooCommerce, and headless Next.js with automated checkout and payment gateways.",
  alternates: { canonical: "/services/ecommerce/" },
};

const faqs = [
  {
    q: "Which ecommerce platform is best for my business: Shopify, WooCommerce, or Custom Next.js?",
    a: "For fast turnkey catalog launches, Shopify offers rapid deployment. For deep customization and content integration, WooCommerce gives complete ownership. For massive catalogs requiring sub-second filtering and 100/100 Core Web Vitals, headless Next.js provides unmatched performance and scalability.",
  },
  {
    q: "Do you integrate Indian payment gateways like Razorpay, Cashfree, and PayU?",
    a: "Yes. We configure complete payment processing with UPI, credit/debit cards, net banking, EMI, and Cash on Delivery (COD) verification to prevent fake orders and cart abandonment.",
  },
  {
    q: "How do you optimize ecommerce stores for Google Product rich results?",
    a: "We embed automated Product, Offer, AggregateRating, and MerchantListing structured data schemas so your products display pricing, stock availability, and star ratings directly on Google Search and Google Shopping.",
  },
  {
    q: "Can you automate shipping and order notifications via WhatsApp?",
    a: "Yes. We integrate Shiprocket, Delhivery, or custom courier APIs alongside automated WhatsApp order confirmation and tracking alerts for your customers.",
  },
  {
    q: "How do you help reduce cart abandonment?",
    a: "We streamline the checkout funnel to a single friction-free page, enable guest checkout, add trust badges, and deploy automated WhatsApp/email recovery sequences for abandoned carts.",
  },
];

const deliverables = [
  {
    icon: IconCart,
    title: "Custom Storefront Engineering",
    desc: "Bespoke design and development on Shopify, WooCommerce, or headless Next.js tailored for seamless product discovery and high conversion.",
  },
  {
    icon: IconGauge,
    title: "Fast Mobile Checkout Funnel",
    desc: "Single-page checkout flows optimized for mobile buyers with instant OTP login, auto-address fills, and one-tap UPI payments.",
  },
  {
    icon: IconCode,
    title: "Payment & Logistics Integrations",
    desc: "Flawless setup of Razorpay, Cashfree, Stripe, Shiprocket, and automated GST invoice generation systems.",
  },
  {
    icon: IconSparkles,
    title: "Product SEO & Merchant Schema",
    desc: "Rich snippet schemas that display real-time pricing, stock status, and customer reviews directly in Google Search results.",
  },
  {
    icon: IconTrendingUp,
    title: "Cart Recovery & CRM Automation",
    desc: "Automated WhatsApp and email sequences that re-engage abandoned carts and incentivize shoppers to complete their purchase.",
  },
  {
    icon: IconLayout,
    title: "Catalog Architecture & Filtering",
    desc: "Instant multi-attribute search and facet filtering (size, color, price, material) that helps customers find products in milliseconds.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Catalog & Business Flow Mapping",
    desc: "We analyze your SKU volume, categories, shipping requirements, and target customer purchase habits.",
  },
  {
    num: "02",
    title: "UI/UX & Mobile Storefront Design",
    desc: "We craft intuitive shopping journeys, high-converting product pages, and friction-free checkout interfaces.",
  },
  {
    num: "03",
    title: "Platform Engineering & API Integration",
    desc: "We connect inventory management, payment gateways, logistics partners, and automated tax invoicing.",
  },
  {
    num: "04",
    title: "Product Schema, Testing & Launch",
    desc: "Rigorous end-to-end payment testing, schema validation, and speed tuning before going live.",
  },
];

const ecomSectors = [
  { name: "Fashion, Apparel & Luxury Jewellery", desc: "High-resolution lookbooks, size guides, and visual catalog discovery." },
  { name: "Direct-to-Consumer (D2C) Brands", desc: "Engaging brand storytelling, subscription options, and high-converting landing funnels." },
  { name: "Industrial Supplies & B2B Wholesale", desc: "Tiered wholesale pricing, minimum order quantities (MOQ), and GST billing." },
  { name: "Health, Wellness & Organic Foods", desc: "Clean ingredient highlights, bundle discounts, and repeat delivery options." },
  { name: "Electronics & Home Appliances", desc: "Detailed technical specifications, warranty badges, and EMI calculators." },
  { name: "Custom Print & Merchandise", desc: "Dynamic product configurators and custom file upload options." },
];

export default function EcommerceServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Ecommerce Development", path: "/services/ecommerce/" },
            ]),
            singleServiceSchema({
              name: "Ecommerce Website Development",
              description: metadata.description as string,
              url: "/services/ecommerce/",
              serviceType: "Ecommerce Development",
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
            <span className="text-accent-dark">Ecommerce Development</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            ECOMMERCE ENGINEERING IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            High-Converting Ecommerce Stores Built to Scale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Build an online store that turns casual browsers into repeat buyers. We engineer fast, responsive Shopify, WooCommerce, and headless ecommerce platforms with frictionless UPI checkout, automated shipping, and rich product SEO.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Launch Your Store
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Service Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Conversion Advantages */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            BUILT FOR TRANSACTION REVENUE
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            The Three Pillars of High-Converting Stores
          </h2>
          <p className="mt-3 text-slate-600">
            A beautiful store is useless if mobile checkout is clunky or pages take 4 seconds to load.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">1-Tap Mobile Checkout</h3>
              <p className="mt-2 text-sm text-slate-600">
                Over 80% of Indian ecommerce orders happen on mobile. We eliminate multi-step barriers with direct UPI and OTP-based checkout.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Google Rich Results</h3>
              <p className="mt-2 text-sm text-slate-600">
                Automated Merchant schema displays your prices, ratings, and in-stock badges directly on organic Google Search results.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Automated WhatsApp Operations</h3>
              <p className="mt-2 text-sm text-slate-600">
                Automatic order confirmations, tracking links, and abandoned cart recovery sent straight to your customer&rsquo;s WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              ECOMMERCE PIPELINE
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              How We Launch & Scale Your Store
            </h2>
            <p className="mt-3 text-slate-400">
              A systematic build process covering catalog structure, UX design, API connectivity, and performance validation.
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
            COMPLETE CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Everything Included in Our Ecommerce Builds
          </h2>
          <p className="mt-3 text-slate-600">
            End-to-end technical infrastructure to run, manage, and scale your online sales.
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

      {/* Verticals */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              STORE TYPES
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Ecommerce Categories We Specialize In
            </h2>
            <p className="mt-3 text-slate-600">
              Customized store layouts adapted to the specific buying behaviors of your target audience.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecomSectors.map((sec, i) => (
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

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions About Ecommerce Development
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
        title="Ready to launch a high-converting ecommerce store?"
        subtitle="Let&rsquo;s discuss your products, payment gateway setup, and timeline. Get a comprehensive ecommerce proposal tailored to your business."
      />
    </>
  );
}
"""

# 5. AI SEO Page (GEO / AEO)
pages["app/services/ai-seo/page.tsx"] = """import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconSparkles,
  IconSearch,
  IconTrendingUp,
  IconArrowRight,
  IconLayout,
  IconBot,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "AI SEO & Generative Engine Optimization (GEO / AEO) in Ahmedabad | PR Marketing Ventures",
  description:
    "Get cited and recommended by ChatGPT, Google AI Overviews, Perplexity, and Gemini. Next-generation Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO).",
  alternates: { canonical: "/services/ai-seo/" },
};

const faqs = [
  {
    q: "What is Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO)?",
    a: "GEO and AEO are advanced search disciplines designed to ensure your business is cited, summarized, and recommended when users ask questions to AI models like ChatGPT Search, Google AI Overviews (SGE), Perplexity AI, Claude, and Gemini.",
  },
  {
    q: "How do AI search engines decide which businesses to recommend?",
    a: "AI models synthesize information based on entity clarity, semantic structured schema, authoritative third-party brand consensus, direct answer formatting, and verified citation sources across the web.",
  },
  {
    q: "Can traditional SEO alone get my business into AI Overviews?",
    a: "Traditional keyword stuffing does not work for AI engines. AI models look for clear entity relationships, tabular comparison data, expert quotation formatting, and dense informational value that directly answers conversational prompts.",
  },
  {
    q: "How do you measure and track AI search visibility?",
    a: "We query AI models across standard prompt variations relevant to your Ahmedabad and national industry sector, measuring citation frequency, brand sentiment, and inclusion in synthesized answer overviews.",
  },
  {
    q: "When should businesses in Ahmedabad start investing in AI SEO?",
    a: "Immediately. Over 40% of search queries now trigger AI answer snapshots or are conducted directly inside conversational AI assistants. Establishing early entity authority prevents competitors from locking in consensus citations.",
  },
];

const deliverables = [
  {
    icon: IconSparkles,
    title: "Entity & Knowledge Graph Modeling",
    desc: "Structuring your brand entity with Organization schema, sameAs links, and Wikidata cross-referencing for unambiguous LLM recognition.",
  },
  {
    icon: IconBot,
    title: "Direct Answer & Synthesis Engineering",
    desc: "Formatting core service definitions, tabular comparisons, and concise expert summaries designed for direct AI model quoting.",
  },
  {
    icon: IconSearch,
    title: "Google AI Overviews (SGE) Targeting",
    desc: "Optimizing content structures to capture featured AI snapshot slots on high-value commercial search terms.",
  },
  {
    icon: IconCode,
    title: "Deep Semantic JSON-LD Architecture",
    desc: "Implementing multi-layered Service, FAQPage, ItemList, and LocalBusiness schemas to feed structured data directly to LLM crawlers.",
  },
  {
    icon: IconTrendingUp,
    title: "Brand Consensus & Citation PR",
    desc: "Building authoritative citations across reference platforms and media sources that AI models trust as training and retrieval ground truth.",
  },
  {
    icon: IconLayout,
    title: "AI Search Visibility & Prompt Tracking",
    desc: "Auditing brand recommendations and citation presence across ChatGPT, Perplexity, Gemini, and Google Search AI Overviews.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "AI Brand Visibility & Citation Audit",
    desc: "We test your brand visibility across leading LLMs (ChatGPT, Perplexity, Gemini) on high-intent buyer prompts in your sector.",
  },
  {
    num: "02",
    title: "Entity Disambiguation & Schema Hardening",
    desc: "We eliminate entity confusion, define your primary service offerings in JSON-LD, and connect official social and industry registries.",
  },
  {
    num: "03",
    title: "Answer-Engine Content Architecture",
    desc: "We restructure web pages with concise answer capsules, data tables, and FAQ definitions that AI synthesis algorithms prioritize.",
  },
  {
    num: "04",
    title: "Multi-Platform AI Monitoring & Scaling",
    desc: "We track ongoing AI citations, measure organic referral traffic from AI platforms, and expand entity coverage.",
  },
];

const sectors = [
  { name: "B2B Manufacturers & Exporters", desc: "Ensuring global procurement officers find your specs when querying AI assistants." },
  { name: "Healthcare Specialists & Hospitals", desc: "Establishing doctor credentials and treatment expertise as trusted medical answers." },
  { name: "Real Estate Developers", desc: "Becoming the recommended property option for AI searches on residential and commercial investments." },
  { name: "Tech, SaaS & IT Consultancies", desc: "Getting featured in software comparisons and AI-generated vendor shortlists." },
  { name: "Legal & Financial Advisory Firms", desc: "Positioning partners as authoritative source experts on corporate law, GST, and wealth management." },
  { name: "Higher Education & Training Institutes", desc: "Appearing as top recommendations for course eligibility and career program searches." },
];

export default function AiSeoServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "AI SEO (GEO / AEO)", path: "/services/ai-seo/" },
            ]),
            singleServiceSchema({
              name: "AI SEO & Generative Engine Optimization (GEO/AEO)",
              description: metadata.description as string,
              url: "/services/ai-seo/",
              serviceType: "Generative Engine Optimization",
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
            <span className="text-accent-dark">AI SEO (GEO / AEO)</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            GENERATIVE ENGINE & ANSWER ENGINE OPTIMIZATION
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Get Your Brand Recommended in ChatGPT, Gemini & AI Overviews.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Search is no longer just 10 blue links. Today, buyers ask AI conversational engines for recommendations. We optimize your entity architecture, structured schemas, and brand consensus so AI assistants cite your business first.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get an AI Search Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Service Plans
            </Link>
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            THE PARADIGM SHIFT
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How Generative AI Is Reshaping Search Inquiries
          </h2>
          <p className="mt-3 text-slate-600">
            When potential clients ask AI for the &ldquo;best provider in Ahmedabad&rdquo;, AI doesn&rsquo;t read keywords—it analyzes semantic relationships and verified consensus.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Entity-Based Retrieval</h3>
              <p className="mt-2 text-sm text-slate-600">
                Large language models rely on clean entity mapping to understand what your company does without ambiguity.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Direct-Answer Capsules</h3>
              <p className="mt-2 text-sm text-slate-600">
                Content formatted in concise, high-density factual snippets is 4x more likely to be quoted directly in Google AI Overviews.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Third-Party Consensus</h3>
              <p className="mt-2 text-sm text-slate-600">
                AI validates your authority across verified directories, citations, and reviews before making a high-confidence recommendation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              GEO/AEO FRAMEWORK
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our 4-Stage AI Optimization Blueprint
            </h2>
            <p className="mt-3 text-slate-400">
              Transforming your digital footprint to dominate conversational AI answers and Google AI snapshots.
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
            CORE CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete AI SEO & Answer Engine Deliverables
          </h2>
          <p className="mt-3 text-slate-600">
            Engineered specifically for ChatGPT Search, Perplexity, Gemini, and Google AI Overviews.
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

      {/* Target Sectors */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              HIGH-IMPACT SECTORS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Who Needs AI SEO Optimization Most?
            </h2>
            <p className="mt-3 text-slate-600">
              Industries where decision-makers and high-net-worth buyers increasingly rely on AI tools to research options.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sec, i) => (
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

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions About AI SEO & GEO
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
        title="Find out how ChatGPT and Google AI view your brand"
        subtitle="Request a complimentary AI Search & Citation Audit. We will analyze your entity presence across conversational AI engines and provide actionable optimization steps."
      />
    </>
  );
}
"""

# 6. Marketing Automation Page
pages["app/services/marketing-automation/page.tsx"] = """import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconWorkflow,
  IconBot,
  IconTrendingUp,
  IconArrowRight,
  IconLayout,
  IconServer,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Marketing Automation & AI Workflow Engineering in Ahmedabad | PR Marketing Ventures",
  description:
    "Automate your lead qualification, CRM syncing, WhatsApp follow-ups, and client reporting. Custom n8n, Python, and AI agent workflows that eliminate manual work.",
  alternates: { canonical: "/services/marketing-automation/" },
};

const faqs = [
  {
    q: "What is marketing automation and how does it save our business money?",
    a: "Marketing automation replaces manual lead data entry, delayed follow-up calls, and spreadsheet chaos with instant automated workflows. When an inquiry arrives, our systems immediately qualify the lead, send an instant WhatsApp/email intro, log details in your CRM, and notify your sales team in real time.",
  },
  {
    q: "Why do you use n8n and Python instead of expensive tools like Zapier?",
    a: "Zapier charges high monthly fees that increase as your lead volume scales. n8n and custom Python microservices can be self-hosted with unlimited execution runs, enterprise-level privacy, complex conditional logic, and custom API connections without monthly task limits.",
  },
  {
    q: "Can you automate WhatsApp messaging for new lead notifications and customer support?",
    a: "Yes. Using the official WhatsApp Business Cloud API, we deploy automated welcome messages, instant brochure delivery, booking confirmations, and AI-powered conversational chatbots that qualify client intent 24/7.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "We build bi-directional automations with HubSpot, Zoho CRM, LeadSquared, Salesforce, Google Sheets, Notion, and custom PostgreSQL/MySQL databases.",
  },
  {
    q: "Do you build automated SEO and performance reporting systems?",
    a: "Yes. We engineer automated pipelines that pull live data from Google Search Console, Google Analytics 4, and uptime monitors to generate automated weekly/monthly performance summaries delivered straight to your WhatsApp or Slack.",
  },
];

const deliverables = [
  {
    icon: IconWorkflow,
    title: "n8n & Webhook Automation Pipelines",
    desc: "Custom self-hosted automation workflows connecting websites, landing pages, payment gateways, and databases with zero per-task fees.",
  },
  {
    icon: IconBot,
    title: "AI Chatbots & Sales Agents",
    desc: "Intelligent conversational bots for WhatsApp and websites that answer customer queries, qualify budgets, and book consultation calls 24/7.",
  },
  {
    icon: IconLayout,
    title: "CRM Integration & Bi-Directional Sync",
    desc: "Instant lead routing to HubSpot, Zoho, Google Sheets, or custom CRMs with complete attribution data (source, keyword, device).",
  },
  {
    icon: IconTrendingUp,
    title: "Instant Lead Follow-Up Sequences",
    desc: "Automated WhatsApp and email nurturing sequences triggered in under 30 seconds to capture leads while purchase intent is highest.",
  },
  {
    icon: IconServer,
    title: "Automated SEO & Growth Dashboards",
    desc: "Scheduled reporting pipelines that aggregate Search Console, rank changes, and conversion data into executive summaries.",
  },
  {
    icon: IconCode,
    title: "Custom Python Data & API Microservices",
    desc: "Tailored scraping, enrichment, and business automation scripts running on lightweight FastAPI backends.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Workflow & Bottleneck Analysis",
    desc: "We map your current lead flow from initial click to sales conversion, identifying where leads drop off or manual tasks cause delays.",
  },
  {
    num: "02",
    title: "Architecture & Integration Setup",
    desc: "We configure n8n nodes, secure API webhooks, database tables, and WhatsApp Business Cloud API credentials.",
  },
  {
    num: "03",
    title: "AI Agent & Workflow Logic Build",
    desc: "We write conditional routing, qualification rules, automated messaging templates, and failure alerts.",
  },
  {
    num: "04",
    title: "Live Testing, Monitoring & Handover",
    desc: "Rigorous load testing with simulated inquiries, staff onboarding, and ongoing execution monitoring.",
  },
];

const useCases = [
  { name: "Real Estate Lead Qualification", desc: "Instant WhatsApp brochure delivery and automatic routing of high-budget buyers to senior agents." },
  { name: "Healthcare Clinic Appointments", desc: "Automated appointment booking, reminder notifications, and patient intake forms." },
  { name: "B2B Quote & Inquiry Routing", desc: "Instant qualification of RFQ forms with immediate notification to sales managers via Slack/Telegram." },
  { name: "E-commerce Order Notifications", desc: "Live WhatsApp shipping alerts, delivery tracking, and abandoned cart re-engagement." },
  { name: "Education & Admissions Funnels", desc: "Automated course syllabus downloads and follow-up counseling scheduling." },
  { name: "Financial & Legal Consultation", desc: "Automated document collection and meeting booking workflows." },
];

export default function MarketingAutomationServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Marketing Automation", path: "/services/marketing-automation/" },
            ]),
            singleServiceSchema({
              name: "Marketing & CRM Automation Workflows",
              description: metadata.description as string,
              url: "/services/marketing-automation/",
              serviceType: "Marketing Automation",
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
            <span className="text-accent-dark">Marketing Automation</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            MARKETING & CRM WORKFLOW ENGINEERING
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Automate Your Lead Capture, Follow-Ups & Growth Operations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Stop losing qualified inquiries to slow, manual responses and scattered spreadsheets. We engineer custom n8n, WhatsApp API, and CRM automation workflows that capture, qualify, and nurture leads in seconds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Automate Your Pipeline
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Service Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Why Speed Wins */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            SPEED TO LEAD
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Responding in 5 Minutes Multiplies Conversion by 9x
          </h2>
          <p className="mt-3 text-slate-600">
            When a prospective client fills out an inquiry form, their interest decays every minute they wait for a response.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">&lt; 30s</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Instant Engagement</h3>
              <p className="mt-2 text-sm text-slate-600">
                Automated WhatsApp messages connect with the lead while they are still looking at your website.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">100%</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Zero Lost Inquiries</h3>
              <p className="mt-2 text-sm text-slate-600">
                Every form submission, call, and chat is instantly logged to your CRM with full campaign attribution.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <span className="font-heading text-2xl font-bold text-accent-dark">15+ hrs</span>
              <h3 className="mt-2 font-heading text-base font-semibold text-ink">Weekly Time Saved</h3>
              <p className="mt-2 text-sm text-slate-600">
                Eliminate hours of manual data entry, follow-up scheduling, and report compiling for your sales team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              ENGINEERED WORKFLOWS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              Our 4-Stage Automation Blueprint
            </h2>
            <p className="mt-3 text-slate-400">
              From business process mapping to reliable, self-healing automated workflows.
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
            AUTOMATION SUITE
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete Marketing Automation Capabilities
          </h2>
          <p className="mt-3 text-slate-600">
            Custom automation architectures designed to fit your unique operational workflows.
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

      {/* Industry Use Cases */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              APPLICATIONS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Proven Automation Use Cases in Ahmedabad
            </h2>
            <p className="mt-3 text-slate-600">
              Customized pipelines built to address the exact operational bottlenecks in your business sector.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc, i) => (
              <Reveal key={uc.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{uc.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{uc.desc}</p>
                </div>
              </Reveal>
            ))}
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
            Questions About Marketing Automation
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
        title="Ready to automate your lead follow-ups and growth operations?"
        subtitle="Let&rsquo;s audit your current manual bottlenecks and design an automated n8n and WhatsApp workflow that saves hours every week."
      />
    </>
  );
}
"""

for rel_path, content in pages.items():
    full_path = os.path.join(BASE_DIR, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated {rel_path} successfully.")

print("All 6 commercial service pages generated successfully.")

