import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import {
  IconGauge,
  IconServer,
  IconSparkles,
  IconCheck,
  IconArrowRight,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Website Performance Optimization & Core Web Vitals Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "Speed up your website and score 90+ on Google PageSpeed Insights. PR Marketing Ventures provides Core Web Vitals optimization, Next.js performance engineering, image CDN caching, and database query tuning.",
  alternates: { canonical: "/services/performance-optimization/" },
};

const faqs = [
  {
    q: "Why is website speed and Core Web Vitals critical for Google ranking?",
    a: "Google uses Core Web Vitals (Largest Contentful Paint - LCP, Interaction to Next Paint - INP, and Cumulative Layout Shift - CLS) as official search ranking factors. Fast-loading websites rank higher and convert up to 3x better because a 1-second delay in page load causes a 7% drop in conversions.",
  },
  {
    q: "Can you fix slow WordPress, Shopify, Next.js, and PHP websites?",
    a: "Yes. We optimize all major platforms. For WordPress/PHP, we eliminate bloated plugins, enable Redis object caching, and configure Cloudflare edge caching. For Next.js/React, we optimize bundle splitting, server components, and asset preloading.",
  },
  {
    q: "What Core Web Vitals scores do you guarantee?",
    a: "We target a 90+ score on mobile and desktop Google PageSpeed Insights, with sub-1.5s LCP, under 200ms INP, and zero CLS layout shifts.",
  },
  {
    q: "Do you optimize database queries and server TTFB (Time to First Byte)?",
    a: "Yes. We optimize slow MySQL/PostgreSQL queries, add missing indexes, tune server connection pooling, and deploy edge CDN caching to reduce TTFB to under 100 milliseconds.",
  },
];

const capabilities = [
  {
    icon: IconGauge,
    title: "Core Web Vitals Rescue (LCP, INP, CLS)",
    desc: "Pass Google's Core Web Vitals assessment on mobile and desktop with critical CSS inlining, font display swap, and layout stabilization.",
  },
  {
    icon: IconServer,
    title: "Edge CDN & Global Server Caching",
    desc: "Cloudflare APO, Redis in-memory caching, and edge routing to deliver instant page responses across India and worldwide.",
  },
  {
    icon: IconCode,
    title: "JavaScript & CSS Payload Optimization",
    desc: "Remove unused CSS, defer non-critical JS scripts, tree-shake bulky libraries, and optimize render-blocking resources.",
  },
  {
    icon: IconSparkles,
    title: "Next-Gen Image & Video Compression",
    desc: "Automatic WebP/AVIF image generation, lazy loading, responsive srcset attributes, and CDN media delivery.",
  },
];

export default function PerformanceOptimizationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Performance Optimization", path: "/services/performance-optimization/" },
            ]),
            singleServiceSchema({
              name: "Website Performance Optimization & Core Web Vitals Agency in Ahmedabad",
              description: metadata.description as string,
              url: "/services/performance-optimization/",
              serviceType: "Performance Optimization Agency",
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
            <span className="text-accent-dark">Performance Optimization</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Sub-Second Page Speed & Core Web Vitals 90+
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> provides senior web performance engineering in Ahmedabad. We optimize PageSpeed scores, eliminate render-blocking scripts, tune database queries, and pass Core Web Vitals to boost Google rankings and conversions.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            CORE WEB VITALS & WEBSITE SPEED ENGINEERING
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Sub-Second Website Speed. Score 90+ on Google PageSpeed Insights.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Slow websites lose rankings and bounce potential customers. We engineer high-speed caching, optimize frontend payloads, and eliminate database bottlenecks.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get Free Speed Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Fast Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            SPEED ENGINEERING
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete Web Performance Optimization Services
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
            Performance Optimization FAQs
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
        title="Ready to make your website load in under 1 second?"
        subtitle="Book a performance diagnostic session with our Core Web Vitals engineers in Ahmedabad."
      />
    </>
  );
}
