import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import { IconWorkflow, IconTarget, IconTrendingUp, IconArrowRight, IconSparkles } from "@/components/icons";

export const metadata: Metadata = {
  title: "SaaS Growth Marketing Agency | Product-Led SEO & B2B Funnels | PR Marketing Ventures",
  description:
    "Scale SaaS MRR and trial signups. PR Marketing Ventures provides product-led SEO, competitor comparison hubs, LinkedIn account-based marketing, and trial-to-paid conversion optimization.",
  alternates: { canonical: "/industries/saas/" },
};

const faqs = [
  {
    q: "How does PR Marketing Ventures drive qualified SaaS product signups?",
    a: "We deploy product-led SEO (optimizing for high-intent 'alternative to [competitor]' and 'how to solve [problem]' queries), targeted B2B LinkedIn ads for decision makers, and trial onboarding email automation to increase activation rates.",
  },
  {
    q: "Do you help SaaS companies rank in AI search engines (ChatGPT, Perplexity)?",
    a: "Yes. Using Generative Engine Optimization (GEO), we structure your software features, pricing, and comparison tables so AI tools cite your software in 'Best software for [use case]' answers.",
  },
];

export default function SaasMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Industries", path: "/services/#industries" },
              { name: "SaaS Marketing", path: "/industries/saas/" },
            ]),
            singleServiceSchema({
              name: "SaaS Growth & Product-Led SEO",
              description: metadata.description as string,
              url: "/industries/saas/",
              serviceType: "SaaS Marketing Agency",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span>Industries</span>
            <span>/</span>
            <span className="text-accent-dark">SaaS Growth Marketing</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — B2B SaaS Growth Engine
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> accelerates B2B SaaS ARR and trial signups through product-led SEO, competitor comparison programmatic pages, high-intent LinkedIn ABM funnels, and trial-to-paid conversion rate optimization.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">B2B SAAS GROWTH ENGINEERING</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Scale SaaS MRR With Product-Led SEO & High-Intent Funnels.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Convert developers, founders, and enterprise buyers into paying accounts with high-intent search content and precision B2B acquisition funnels.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-light"
            >
              Get SaaS Growth Audit
              <IconArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: IconSparkles,
              title: "Product-Led SEO & Comparison Hubs",
              desc: "Capturing high-intent '[Competitor] alternatives' and 'Best [Category] software' search queries.",
            },
            {
              icon: IconTarget,
              title: "B2B LinkedIn & ABM Funnels",
              desc: "Targeting verified job titles, company sizes, and technologies with high-converting demo funnels.",
            },
            {
              icon: IconWorkflow,
              title: "Trial-to-Paid Activation",
              desc: "Onboarding automation and CRM trigger flows that reduce churn and boost trial conversion rates.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                <item.icon width={22} height={22} />
              </span>
              <h3 className="font-heading text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to accelerate your SaaS pipeline?"
        subtitle="Book an architectural session with our B2B SaaS growth team."
      />
    </>
  );
}
