import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/seo";
import {
  IconArrowRight,
  IconBot,
  IconCart,
  IconCode,
  IconMapPin,
  IconSparkles,
  IconWorkflow,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Portfolio — What We Build",
  description:
    "Explore the kinds of growth systems PR Marketing Ventures engineers: high-performance websites, ecommerce stores, local SEO programs, AI SEO and automation pipelines.",
  alternates: { canonical: "/portfolio/" },
};

/* Capability showcase. Client case studies with real metrics will replace
   these entries as projects complete and clients approve publication. */
const work = [
  {
    icon: IconCode,
    category: "Content Portal",
    title: "techandcarsinfo.com",
    desc: "A high-performance news and information portal for the latest in technology and automobiles, optimized for speed and search visibility.",
    tags: ["Web Design", "SEO", "Content Architecture"],
    href: "https://techandcarsinfo.com",
  },
  {
    icon: IconWorkflow,
    category: "Job Board",
    title: "jobrecruitment.in",
    desc: "A streamlined recruitment platform connecting employers with candidates, featuring advanced search capabilities and user profiles.",
    tags: ["Web Portal", "Database Architecture", "Job Board"],
    href: "https://jobrecruitment.in",
  },
  {
    icon: IconCart,
    category: "Ecommerce",
    title: "atozgadgets.com",
    desc: "A feature-rich ecommerce storefront for consumer electronics, designed for high conversion rates and seamless checkout.",
    tags: ["Ecommerce", "UI/UX", "CRO"],
    href: "https://atozgadgets.com",
  },
  {
    icon: IconCode,
    category: "Web Engineering",
    title: "High-performance business websites",
    desc: "Corporate and service websites built on Next.js and PHP with SEO-first architecture — structured data, content clusters and 90+ PageSpeed targets from launch.",
    tags: ["Next.js", "Tailwind CSS", "Schema.org", "Core Web Vitals"],
  },
  {
    icon: IconCart,
    category: "Ecommerce",
    title: "Fast, conversion-ready storefronts",
    desc: "WooCommerce and headless stores with product schema, optimized checkout flows and category architecture designed for both shoppers and search engines.",
    tags: ["WooCommerce", "Headless", "Product schema", "CRO"],
  },
  {
    icon: IconMapPin,
    category: "Local SEO",
    title: "Map pack domination programs",
    desc: "Google Business Profile optimization, review systems, citation building and area-specific landing pages for businesses targeting Ahmedabad neighbourhoods.",
    tags: ["Google Business Profile", "Citations", "Location pages", "Reviews"],
  },
  {
    icon: IconSparkles,
    category: "AI SEO",
    title: "GEO/AEO visibility systems",
    desc: "Content and entity optimization that positions brands to be cited in ChatGPT, Gemini and Google AI Overviews — the fastest-growing search surface.",
    tags: ["GEO", "AEO", "Entity SEO", "AI Overviews"],
  },
  {
    icon: IconWorkflow,
    category: "Automation",
    title: "Lead-to-revenue pipelines",
    desc: "n8n workflows connecting website forms, WhatsApp, CRM and email — instant lead response, automated follow-ups and weekly performance reports.",
    tags: ["n8n", "CRM", "WhatsApp API", "Email automation"],
  },
  {
    icon: IconBot,
    category: "AI Agents",
    title: "24/7 AI sales assistants",
    desc: "Custom chatbots trained on business knowledge that qualify leads, answer questions and book appointments around the clock — on web and WhatsApp.",
    tags: ["AI Chatbots", "FastAPI", "Lead qualification", "24/7"],
  },
];

export default function Portfolio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema("Portfolio", "/portfolio/")),
        }}
      />
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            PORTFOLIO
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            The systems we engineer.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            A look at the kinds of builds we deliver. Detailed client case
            studies — with real before/after metrics — are published here as
            projects complete and clients approve them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 90}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                    <w.icon />
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {w.category}
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {/* @ts-ignore */}
                  {w.href ? (
                    // @ts-ignore
                    <a href={w.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1.5">
                      {w.title} <IconArrowRight width={16} height={16} />
                    </a>
                  ) : (
                    w.title
                  )}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {w.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-amber-200 bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-ink">
              Case studies coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              We publish results only with client approval and real numbers.
              Want to see what we could do for your business specifically?
            </p>
            <Link
              href="/contact/"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-primary-light"
            >
              Request a sample growth plan
              <IconArrowRight width={18} height={18} />
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBand
        title="Your project could be here next"
        subtitle="Tell us what you're building — we'll show you how we'd engineer it to rank, convert and scale."
      />
    </>
  );
}
