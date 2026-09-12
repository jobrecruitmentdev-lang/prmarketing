import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, faqSchema } from "@/lib/seo";
import { IconSparkles, IconCheck, IconArrowRight, IconShield } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Pricing & SEO Packages | PR Marketing",
  description:
    "Transparent digital marketing packages and SEO pricing in Ahmedabad by PR Marketing Ventures. Choose high-ROI plans for SEO, PPC, and web growth. Call now!",
  alternates: { canonical: "/pricing/" },
};

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const faqs = [
  {
    q: "How much do digital marketing packages cost in Ahmedabad?",
    a: "Digital marketing packages in Ahmedabad typically range from ₹15,000/month for local business SEO and Google Maps optimization, ₹35,000 to ₹65,000/month for comprehensive SEO and paid ads, and ₹1,20,000+/month for enterprise growth engineering.",
  },
  {
    q: "What deliverables are included in your monthly SEO packages?",
    a: "Every tier includes technical audits, on-page schema, Core Web Vitals maintenance, keyword cluster creation, Google Business Profile management, high-authority backlink building, and transparent weekly rank tracking.",
  },
  {
    q: "Are there any long-term lock-in contracts?",
    a: "No lock-in contracts. We work on performance-first monthly retainers. You retain 100% ownership of your website code, ad accounts, analytics, and CRM assets.",
  },
  {
    q: "How fast will our campaign start generating leads?",
    a: "Paid ad funnels (Google Ads & Meta) begin generating qualified customer inquiries within 48 to 72 hours. Organic SEO and Google Maps rankings compound into top-3 positions within 30 to 90 days.",
  },
];

const plans = [
  {
    name: "Essential Local",
    pitch: "Perfect for local businesses establishing dominant Google Maps & local search presence.",
    price: "₹15,000",
    billing: "/ month",
    buttonText: "Activate Essential",
    popular: false,
    href: "/contact/?plan=essential",
    features: [
      { name: "Google Business Profile (GMB) 3-Pack Optimization", included: true },
      { name: "Local Keyword Targeting (Up to 5 Keywords)", included: true },
      { name: "Local Citations & NAP Synchronization across Ahmedabad", included: true },
      { name: "Review Automation & QR Standee Setup", included: true },
      { name: "Monthly Performance & Call Tracking Reports", included: true },
      { name: "White-Hat Local Link Signals", included: true },
    ],
  },
  {
    name: "Growth Engine",
    pitch: "Engineered for scaling services seeking predictable inbound leads and website traffic.",
    price: "₹35,000",
    billing: "/ month",
    buttonText: "Launch Growth Plan",
    popular: true,
    href: "/contact/?plan=growth",
    features: [
      { name: "Everything in Essential Local Plan", included: true },
      { name: "Full Technical SEO & Schema.org Architecture", included: true },
      { name: "15 Target Commercial Keywords Ranked on Google", included: true },
      { name: "Sub-Second Next.js Website Maintenance & Speed Rescue", included: true },
      { name: "Google Ads & Search PPC Campaign Management", included: true },
      { name: "WhatsApp Lead Auto-Responder Integration", included: true },
      { name: "Bi-Weekly Search Console & ROAS Analytics", included: true },
    ],
  },
  {
    name: "Market Impact",
    pitch: "Aggressive multi-channel acquisition with custom web development and social media PR.",
    price: "₹65,000",
    billing: "/ month",
    buttonText: "Deploy Impact Stack",
    popular: false,
    href: "/contact/?plan=impact",
    features: [
      { name: "Everything in Growth Engine Plan", included: true },
      { name: "30+ High-Commercial Search Keywords Targeted", included: true },
      { name: "Full Next.js Custom Dynamic Web Application (15 Pages)", included: true },
      { name: "Omnichannel Meta Ads + Google Performance Max Scaling", included: true },
      { name: "Instagram Reels, Founder PR & Creative Content", included: true },
      { name: "AI Search Optimization (GEO/AEO for ChatGPT & Gemini)", included: true },
      { name: "Dedicated Senior Growth Engineer on C.G. Road", included: true },
    ],
  },
  {
    name: "Enterprise Empower",
    pitch: "The ultimate growth engine for market leaders seeking undisputed industry dominance.",
    price: "₹1,20,000",
    billing: "/ month",
    buttonText: "Scale with Empower",
    popular: false,
    href: "/contact/?plan=empower",
    features: [
      { name: "Everything in Market Impact Plan", included: true },
      { name: "Unlimited Enterprise Keyword & Topical Silos", included: true },
      { name: "Custom CRM & Automated Sales Pipeline Development", included: true },
      { name: "Autonomous 24/7 AI Chatbots on WhatsApp & Web", included: true },
      { name: "National News Digital PR & Wikipedia Entity Authority", included: true },
      { name: "Server-Side CAPI & Advanced Multi-Touch Attribution", included: true },
      { name: "Weekly Executive Strategy Reviews with Founders", included: true },
    ],
  },
];

const pricingModels = [
  {
    title: "Fixed Monthly Retainer",
    desc: "Predictable, transparent monthly fee with zero hidden charges. Best for compounding SEO, website engineering, and continuous growth management.",
  },
  {
    title: "Performance & Media Management",
    desc: "A competitive base retainer combined with transparent ad spend management for high-ROAS Google and Meta ad scaling.",
  },
  {
    title: "Custom Project Milestones",
    desc: "Fixed-price milestone contracts for custom Next.js web applications, bespoke CRM software, and end-to-end automation pipelines.",
  },
];

export default function Pricing() {
  const offerSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "PR Marketing Ventures Service Plans",
    itemListElement: plans.map((p, idx) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: p.name,
        description: p.pitch,
      },
      price: p.price.replace(/[^0-9]/g, ""),
      priceCurrency: "INR",
      position: idx + 1,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing/" },
            ]),
            offerSchema,
            faqSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white">
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pt-24 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 border border-primary/40 px-3.5 py-1 text-xs font-semibold text-accent-bright uppercase tracking-wider">
            <IconSparkles width={14} height={14} />
            TRANSPARENT GROWTH TIERS
          </span>
          <h1 className="mt-4 mx-auto max-w-4xl font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl text-white">
            Invest in Revenue Growth, Not Commodity Deliverables.
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
            Engineered SEO, high-ROAS performance ads, sub-second web applications, and automated pipelines with clear deliverables and zero long lock-ins.
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="mx-auto max-w-[90rem] px-4 py-12 sm:px-6 md:py-20 -mt-14 sm:-mt-16 relative z-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div
                className={`group relative flex h-full flex-col justify-between rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-primary bg-white shadow-xl ring-2 ring-primary"
                    : "border-slate-200 bg-white shadow-lg hover:border-primary/50"
                } p-6 sm:p-7 xl:p-8`}
              >
                <div>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-primary-light px-4 py-1 text-xs font-extrabold tracking-wide text-white uppercase shadow-md">
                      Most Popular
                    </div>
                  )}
                  
                  <h2 className="font-heading text-2xl font-black text-slate-900 tracking-tight">
                    {plan.name}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-slate-500 leading-relaxed min-h-[38px]">
                    {plan.pitch}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1.5 pb-6 border-b border-slate-100">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{plan.price}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-400">{plan.billing}</span>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                      Key Deliverables
                    </p>
                    <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-700">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <CheckIcon className="mt-0.5 shrink-0 text-primary" />
                          <span className="text-slate-700 leading-snug">{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    href={plan.href}
                    className={`block w-full rounded-xl px-4 py-3.5 text-center text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all duration-300 ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary-light hover:shadow-lg shadow-md"
                        : "bg-slate-100 text-slate-900 hover:bg-primary hover:text-white"
                    }`}
                  >
                    {plan.buttonText} →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Transparent Pricing Models */}
      <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">TRANSPARENT BILLING</span>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              How We Structure Engagements
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              No hidden fees. You own 100% of your codebase, ad accounts, and conversion assets.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pricingModels.map((model, i) => (
              <Reveal key={model.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-xs">
                  <h3 className="font-heading text-lg font-bold text-slate-900">
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

      {/* FAQs */}
      <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Frequently Asked Questions on Pricing
            </h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900">
                    {faq.q}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need a custom growth blueprint?"
        subtitle="Schedule a 30-minute diagnostic session with our engineers on C.G. Road."
      />
    </>
  );
}
