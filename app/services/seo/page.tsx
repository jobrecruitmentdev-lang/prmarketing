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
