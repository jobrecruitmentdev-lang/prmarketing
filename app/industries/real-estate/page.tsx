import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import { IconBuilding, IconTarget, IconTrendingUp, IconCheck, IconArrowRight, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Real Estate Digital Marketing Agency | High-Ticket Property Lead Gen | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a specialized real estate digital marketing agency. We generate qualified homebuyer and investor leads through targeted Google & Meta Ads, Local Map Pack SEO, and automated CRM pipelines.",
  alternates: { canonical: "/industries/real-estate/" },
};

const faqs = [
  {
    q: "How does PR Marketing Ventures generate qualified real estate buyer leads?",
    a: "We deploy hyper-targeted Google Search ads for high-intent queries (e.g. 3BHK luxury flats, commercial offices), geo-fenced Meta video campaigns, and local map pack SEO, backed by WhatsApp automated qualification bots that filter non-serious inquiries in under 30 seconds.",
  },
  {
    q: "What cost per qualified lead (CPL) can real estate developers expect?",
    a: "Depending on unit ticket size (affordable vs luxury vs commercial), our optimized landing pages and audience exclusions typically achieve 40% lower cost per verified site visit compared to generic agency averages.",
  },
];

export default function RealEstateMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Industries", path: "/services/#industries" },
              { name: "Real Estate Marketing", path: "/industries/real-estate/" },
            ]),
            singleServiceSchema({
              name: "Real Estate Digital Marketing & Lead Generation",
              description: metadata.description as string,
              url: "/industries/real-estate/",
              serviceType: "Real Estate Marketing Agency",
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
            <span className="text-accent-dark">Real Estate Marketing</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Real Estate Lead Generation Engine
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> builds dedicated high-ticket buyer acquisition funnels for real estate developers, brokers, and commercial projects combining high-intent Google Search ads, Meta video walk-through ads, local map dominance, and automated WhatsApp CRM nurturing.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">VERTICAL GROWTH SOLUTIONS</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Real Estate Marketing Engineered for Booked Site Visits.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Stop collecting fake leads. We build qualified buyer acquisition systems that deliver genuine site visits and sales velocity for residential and commercial projects.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-light"
            >
              Get Real Estate Growth Plan
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
              icon: IconTarget,
              title: "High-Intent Google Ads",
              desc: "Targeting active buyers searching for specific configurations, areas, and price brackets.",
            },
            {
              icon: IconTrendingUp,
              title: "Immersive Social Ads",
              desc: "Video walkthroughs and lifestyle ads on Instagram and Facebook with instant lead qualification.",
            },
            {
              icon: IconWorkflow,
              title: "Instant WhatsApp Routing",
              desc: "Automated brochure sending and instant sales team notification within 30 seconds of form fill.",
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
        title="Ready to fill your project site visits?"
        subtitle="Book a consultation with our real estate growth team."
      />
    </>
  );
}
