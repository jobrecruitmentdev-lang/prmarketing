import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, webPageSchema } from "@/lib/seo";
import {
  IconArrowRight,
  IconBot,
  IconCart,
  IconCode,
  IconMapPin,
  IconSparkles,
  IconWorkflow,
  IconTarget,
  IconGauge,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Portfolio & Case Studies | PR Marketing",
  description:
    "View proven digital marketing case studies and client results from PR Marketing Ventures in Ahmedabad. See how we scale traffic, leads, and ROAS. Explore now!",
  alternates: { canonical: "/portfolio/" },
};

const work = [
  {
    icon: IconCode,
    category: "High-Traffic Content Portal",
    title: "techandcarsinfo.com",
    desc: "A high-performance news and technical information portal for the latest in technology and automobiles, optimized for sub-second Core Web Vitals and Google Discover indexation.",
    tags: ["Next.js", "Technical SEO", "Content Architecture"],
    href: "https://techandcarsinfo.com",
    serviceLink: "/services/seo/",
    serviceName: "Technical SEO",
  },
  {
    icon: IconWorkflow,
    category: "Enterprise Job Board Portal",
    title: "jobrecruitment.in",
    desc: "A streamlined recruitment and candidate matching platform featuring optimized schema.org JobPosting indexing, PostgreSQL database indexing, and automated candidate alerts.",
    tags: ["Web Portal", "Database Architecture", "Job Board"],
    href: "https://jobrecruitment.in",
    serviceLink: "/services/software-development/",
    serviceName: "Custom Software",
  },
  {
    icon: IconCart,
    category: "High-Converting Ecommerce",
    title: "atozgadgets.com",
    desc: "A feature-rich consumer electronics storefront engineered with product schema, instant headless search, merchant center integration, and conversion rate optimization.",
    tags: ["Ecommerce", "UI/UX", "Checkout CRO"],
    href: "https://atozgadgets.com",
    serviceLink: "/services/ecommerce/",
    serviceName: "Ecommerce Dev",
  },
  {
    icon: IconGauge,
    category: "Web Engineering",
    title: "High-Performance Business Websites",
    desc: "Corporate and service websites built on Next.js with clean code, responsive layouts, structured schema, and 90+ PageSpeed targets from launch.",
    tags: ["Next.js", "Tailwind CSS", "Schema.org", "Core Web Vitals"],
    serviceLink: "/services/web-development/",
    serviceName: "Web Development",
  },
  {
    icon: IconCart,
    category: "Ecommerce Scaling",
    title: "Fast, Conversion-Ready Storefronts",
    desc: "WooCommerce, Shopify and headless stores with product schema, optimized checkout flows and category architecture designed for both shoppers and search engines.",
    tags: ["WooCommerce", "Headless", "Product Schema", "CRO"],
    serviceLink: "/services/ecommerce/",
    serviceName: "Ecommerce Scaling",
  },
  {
    icon: IconMapPin,
    category: "Local SEO & Map Pack",
    title: "Google Map Pack Domination Programs",
    desc: "Google Business Profile optimization, review systems, citation building and area-specific landing pages for businesses targeting Ahmedabad commercial hubs.",
    tags: ["Google Business Profile", "Citations", "Local 3-Pack", "Reviews"],
    serviceLink: "/services/local-seo/",
    serviceName: "Local SEO",
  },
  {
    icon: IconSparkles,
    category: "AI SEO (GEO / AEO)",
    title: "Generative Engine Visibility Systems",
    desc: "Content and entity optimization that positions brands to be cited as authoritative sources in ChatGPT, Gemini, Perplexity, and Google AI Overviews.",
    tags: ["GEO", "AEO", "Entity SEO", "AI Overviews"],
    serviceLink: "/services/ai-seo/",
    serviceName: "AI SEO (GEO)",
  },
  {
    icon: IconWorkflow,
    category: "Automation & CRM",
    title: "Lead-to-Revenue Automated Pipelines",
    desc: "n8n workflows connecting website forms, WhatsApp, CRM and email — instant lead response, automated follow-ups, and weekly ROI reporting.",
    tags: ["n8n", "CRM Pipelines", "WhatsApp API", "Email Sequences"],
    serviceLink: "/services/marketing-automation/",
    serviceName: "Automation",
  },
  {
    icon: IconBot,
    category: "Autonomous AI",
    title: "24/7 AI Conversational Sales Assistants",
    desc: "Custom AI agents trained on business knowledge that qualify leads, answer customer questions, and book calendar appointments automatically on WhatsApp & web.",
    tags: ["AI Chatbots", "FastAPI", "Lead Qualification", "24/7"],
    serviceLink: "/services/ai-agents/",
    serviceName: "AI Agents",
  },
];

export default function Portfolio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Portfolio", path: "/portfolio/" },
            ]),
            webPageSchema("CollectionPage", metadata.title as string, metadata.description as string, "/portfolio/"),
          ]),
        }}
      />
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-accent-dark uppercase">
            PORTFOLIO & CASE BLUEPRINTS
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-ink">
            Systems and Growth Architectures We Engineer.
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            A comprehensive look at the high-speed websites, conversion-driven SEO programs, and automated pipelines we engineer for clients across Ahmedabad and global markets.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {work.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 80}>
              <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                      <w.icon />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {w.category}
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-semibold text-ink">
                    {w.href ? (
                      <a href={w.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
                        {w.title} <IconArrowRight width={14} height={14} />
                      </a>
                    ) : (
                      w.title
                    )}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {w.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={w.serviceLink}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-dark hover:text-primary transition-colors"
                  >
                    <span>Learn about {w.serviceName}</span>
                    <IconArrowRight width={12} height={12} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <h2 className="font-heading text-xl font-semibold text-ink">
              Looking for a custom build for your business?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
              We engineer custom growth stacks matching your exact unit economics, audience personas, and market opportunity.
            </p>
            <Link
              href="/contact/"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:bg-primary-light shadow-md"
            >
              <span>Request a Custom Growth Diagnostic</span>
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
