import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

// Inline icons to ensure zero dependencies break while giving a premium look
const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CrossIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const faqs = [
  {
    q: "How much do digital marketing packages cost in Ahmedabad?",
    a: "Digital marketing packages in Ahmedabad vary based on the level of SEO competition, web infrastructure needs, and content volume. We offer scalable tiers from entry-level local maps visibility to complete enterprise market dominance."
  },
  {
    q: "What exactly do your SEO deliverables include?",
    a: "Unlike generic agencies, we specify exactly how many target keywords and local Google Business Profile categories we optimize for. Our higher tiers combine advanced website SEO with local maps optimization to capture maximum market share."
  },
  {
    q: "Why do you focus heavily on Instagram instead of broad 'Social Media'?",
    a: "We believe in precision. Rather than spreading efforts thin across multiple platforms for vanity metrics, we focus strictly on high-quality Instagram posts and Reels to drive real engagement and visual brand authority."
  },
  {
    q: "Which digital marketing package is best for my business?",
    a: "Our Growth Plan is our most popular tier for services seeking credibility, while our Impact and Empower plans are designed for aggressive conversion and industry dominance."
  }
];

export const metadata: Metadata = {
  title: "Pricing — Digital Marketing Service Plans",
  description:
    "Comprehensive digital marketing service plans and pricing in India. See our Essential, Growth, Impact, and Empower packages tailored for business dominance.",
  alternates: { canonical: "/pricing/" },
};

const plans = [
  {
    name: "Essential",
    pitch: "Perfect for local businesses starting their organic maps presence.",
    price: "",
    billing: "",
    buttonText: "Activate Essential",
    popular: false,
    features: [
      { name: "SEO Friendly Google Business Profile Optimization", included: true },
      { name: "Targeting Business Blog", included: true },
      { name: "Three Keywords Targeted with S.E.O", included: true },
      { name: "Your Area", included: true },
      { name: "Top Google Position", included: true },
      { name: "Monthly Performance Reports", included: true },
      { name: "One Year Duration", included: true },
      { name: "Activation Up To 30 Days", included: true },
    ],
  },
  {
    name: "Growth",
    pitch: "Designed for growing services looking to establish full credibility.",
    price: "",
    billing: "",
    buttonText: "Launch Growth Plan",
    popular: true,
    features: [
      { name: "SEO Friendly Google Business Profile Optimization", included: true },
      { name: "Targeting Business Blog", included: true },
      { name: "Five Keywords Targeted with S.E.O", included: true },
      { name: "Your Area", included: true },
      { name: "Top Google Position", included: true },
      { name: "Static Website", included: true },
      { name: "Domain & Hosting", included: true },
      { name: "Monthly Performance Reports", included: true },
      { name: "One Year Duration", included: true },
      { name: "Activation Up To 30 Days", included: true },
    ],
  },
  {
    name: "Impact",
    pitch: "Elite conversion package with multi-page web setups & SMM.",
    price: "",
    billing: "",
    buttonText: "Deploy Impact Stack",
    popular: false,
    features: [
      { name: "SEO Friendly Google Business Profile Optimization", included: true },
      { name: "Targeting Business Blog", included: true },
      { name: "Seven Keywords Targeted with S.E.O", included: true },
      { name: "Your Area", included: true },
      { name: "Top Google Position", included: true },
      { name: "S.E.O Friendly Dynamic website (15 pages)", included: true },
      { name: "Domain & Hosting", included: true },
      { name: "Social Media Management", included: true },
      { name: "Monthly Performance Reports", included: true },
      { name: "One Year Duration", included: true },
      { name: "Activation Up To 30 Days", included: true },
    ],
  },
  {
    name: "Empower",
    pitch: "The ultimate scaling plan for brands seeking undisputed industry dominance.",
    price: "",
    billing: "",
    buttonText: "Scale with Empower",
    popular: false,
    features: [
      { name: "SEO Friendly Google Business Profile Optimization", included: true },
      { name: "Targeting Business Blog", included: true },
      { name: "Ten Keywords Targeted with S.E.O", included: true },
      { name: "Your Area", included: true },
      { name: "Top Google Position", included: true },
      { name: "S.E.O Friendly Dynamic website(25 pages)", included: true },
      { name: "Domain & Hosting", included: true },
      { name: "Social Media Management", included: true },
      { name: "Monthly Performance Reports", included: true },
      { name: "One Year Duration", included: true },
      { name: "Activation Up To 30 Days", included: true },
    ],
  }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />

      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 md:pt-28 text-center">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">
            Pricing & Strategy Plans
          </p>
          <h1 className="mt-4 mx-auto max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-white">
            Dominate your market with precise execution.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-slate-300">
            Stop paying for generic packages. Invest in targeted SEO, omnichannel growth, and conversion-focused assets that scale with your revenue.
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 md:py-24 -mt-20 relative z-10">
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal as="li" key={plan.name} delay={i * 100}>
              <div
                className={`group relative flex h-full flex-col rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-primary bg-white shadow-xl ring-2 ring-primary"
                    : "border-slate-200 bg-white shadow-lg hover:border-primary/50"
                } p-8`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-5 py-1.5 text-xs font-extrabold tracking-wide text-white uppercase shadow-md">
                    Most Popular
                  </div>
                )}
                
                <h3 className="font-heading text-2xl font-black text-slate-900 tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-3 text-sm font-medium text-slate-500 leading-relaxed min-h-[40px]">
                  {plan.pitch}
                </p>

                {/* 
                <div className="mt-6 flex items-baseline gap-2 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                  <span className="text-sm font-bold text-slate-400">{plan.billing}</span>
                </div>
                */}

                <div className="mt-8 flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                    What's Included
                  </p>
                  <ul className="space-y-4 text-sm font-medium text-slate-700">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        {feature.included ? (
                          <CheckIcon className="mt-0.5 shrink-0 text-emerald-500" />
                        ) : (
                          <CrossIcon className="mt-0.5 shrink-0 text-red-400 opacity-60" />
                        )}
                        <span className={feature.included ? "text-slate-700" : "text-slate-400 line-through decoration-slate-300"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/contact/"
                  className={`mt-10 block w-full rounded-xl px-4 py-4 text-center text-sm font-extrabold uppercase tracking-wide transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/30"
                      : "bg-slate-100 text-slate-900 hover:bg-primary hover:text-white"
                  }`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Transparent Pricing Models
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600">
              No hidden fees. You own your assets. Here is how our billing is structured.
            </p>
          </Reveal>
          <ul className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingModels.map((model, i) => (
              <Reveal as="li" key={model.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <h3 className="font-heading text-xl font-bold text-slate-900">
                    {model.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {model.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <div className="mt-16 space-y-10">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to dominate your market?"
        subtitle="Let's align your business targets with the perfect growth strategy today."
      />
    </>
  );
}
