import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/seo";
import { IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Pricing — Digital Marketing Service Plans",
  description:
    "Comprehensive digital marketing service plans and pricing in India. See our Basic, Standard Growth, and Advanced Performance packages.",
  alternates: { canonical: "/pricing/" },
};

const plans = [
  {
    name: "Basic / Starter Plan",
    bestFor: "Local businesses and startups looking for affordable small business marketing.",
    price: "₹15,000 – ₹40,000 / mo",
    timeline: "4 to 6 months for visible organic growth.",
    features: [
      "Local Search Optimization: Setup and weekly management of Google Business Profile.",
      "On-Page SEO Execution: Optimization of up to 15 primary target keywords.",
      "Technical Site Fixes: Basic correction of broken links, site speed, and meta tags.",
      "Social Media Creation: 8 to 12 monthly static graphics for Facebook and Instagram.",
      "Content & Citations: 1 to 2 targeted blog posts to establish foundational topical authority.",
      "Performance Reporting: Standard monthly analytics overview covering traffic and reach.",
    ],
  },
  {
    name: "Standard Growth Plan",
    popular: true,
    bestFor: "Established regional brands, expanding B2B firms, and new e-commerce sites.",
    price: "₹40,000 – ₹1,00,000 / mo",
    timeline: "3 to 4 months for measurable lead generation.",
    features: [
      "Expanded SEO Campaign: Tracking and optimization for up to 50 competitive keywords.",
      "AEO & Content Pipeline: 4 high-quality articles engineered for AI Overview (GEO) citations.",
      "Active Social Media Strategy: 16 to 20 monthly assets, including basic video/Reels.",
      "Paid Ads Architecture: Setup and daily monitoring of Google Ads and Meta Ads.",
      "Basic Funnel Creation: Development of dedicated landing pages for ad campaigns.",
      "Strategic Growth Review: Bi-weekly performance syncs with detailed attribution tracking.",
    ],
  },
  {
    name: "Advanced Performance Plan",
    bestFor: "Enterprise digital marketing agency needs, high-growth e-commerce, and businesses needing fractional CMO services.",
    price: "₹1,00,000 – ₹2,50,000+ / mo",
    timeline: "1 to 2 months for significant conversion improvements.",
    features: [
      "Enterprise GEO & Topical Authority: Comprehensive entity SEO to secure brand citations in ChatGPT & Gemini.",
      "Premium Asset Creation: 4 high-quality video Reels/TikToks per week and custom infographics.",
      "Omnichannel Ad Execution: Coordination of Google Search, Shopping, Meta, and LinkedIn Ads.",
      "Conversion Optimization: Weekly A/B testing of landing pages, checkout flows, and CTAs.",
      "Email Marketing Automation: Setup of automated cart-abandonment, welcome, and retention flows.",
      "Advanced Analytics Suite: Custom Looker Studio dashboards tracking live CAC and LTV.",
    ],
  },
];

const pricingModels = [
  {
    title: "Fixed Monthly Retainer",
    desc: "You pay a flat fee every month for a defined list of deliverables. Best for predictable budgeting.",
  },
  {
    title: "Percentage of Ad Spend",
    desc: "Typically 10% to 20% of your total monthly advertising budget. Best for scaling paid traffic campaigns.",
  },
  {
    title: "Performance-Based Pricing",
    desc: "A lower base fee combined with a commission per qualified lead or sale generated. Best for transaction-driven businesses.",
  },
];

export default function Pricing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema("Pricing", "/pricing/")),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            PRICING & PLANS
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Comprehensive Digital Marketing Service Plans
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            The right digital marketing plan depends on your business revenue, growth targets, and industry competition. Choose a plan that scales with you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border ${
                  plan.popular
                    ? "border-accent shadow-xl ring-1 ring-accent"
                    : "border-slate-200 bg-white shadow-sm"
                } p-8`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-semibold tracking-wide text-white">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-ink">{plan.price}</span>
                </div>
                <p className="mt-4 text-sm font-medium text-slate-700">
                  <span className="font-semibold">Best for:</span> {plan.bestFor}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-700">
                  <span className="font-semibold">Timeline:</span> {plan.timeline}
                </p>

                <div className="mt-8 flex-1">
                  <p className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                    Core Deliverables
                  </p>
                  <ul className="mt-4 space-y-4 text-sm text-slate-600">
                    {plan.features.map((feature, idx) => {
                      const [title, desc] = feature.split(": ");
                      return (
                        <li key={idx} className="flex gap-3">
                          <IconCheck
                            className="mt-0.5 shrink-0 text-primary"
                            width={18}
                            height={18}
                          />
                          <div>
                            <strong className="text-ink">{title}:</strong>{" "}
                            {desc || ""}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <a
                  href="/contact/"
                  className={`mt-10 block w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-primary-soft text-primary hover:bg-amber-100"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-ink">
              Comprehensive Pricing Models
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
              Agencies bill for these plans using three primary structures. We can tailor this to suit your business needs.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingModels.map((model, i) => (
              <Reveal key={model.title} delay={i * 100}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {model.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {model.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to choose your plan?"
        subtitle="Let's align your business targets with the perfect growth strategy."
      />
    </>
  );
}
