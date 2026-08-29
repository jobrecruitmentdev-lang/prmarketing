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
