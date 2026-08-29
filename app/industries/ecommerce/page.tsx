import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import { IconCart, IconTarget, IconTrendingUp, IconArrowRight, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "E-commerce Digital Marketing Agency | D2C Scale & ROAS | PR Marketing Ventures",
  description:
    "Scale your online store with PR Marketing Ventures. We engineer high-ROAS Google Shopping, Meta Catalog Ads, Product Schema SEO, and checkout conversion rate optimization.",
  alternates: { canonical: "/industries/ecommerce/" },
};

const faqs = [
  {
    q: "How do you scale e-commerce brands profitably?",
    a: "We combine multi-channel performance media (Google Performance Max, Meta DABA/Catalog ads), product structured data for Google Merchant center, and sub-second Next.js / Shopify speed optimization to increase Average Order Value (AOV) and conversion rate.",
  },
  {
    q: "Do you handle retention marketing and abandoned cart recovery?",
    a: "Yes. We set up automated WhatsApp cart recovery, post-purchase email flows, and SMS VIP campaigns that recover up to 25% of abandoned carts.",
  },
];

export default function EcommerceMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Industries", path: "/services/#industries" },
              { name: "E-commerce Marketing", path: "/industries/ecommerce/" },
            ]),
            singleServiceSchema({
              name: "E-commerce Growth & Performance Marketing",
              description: metadata.description as string,
              url: "/industries/ecommerce/",
              serviceType: "E-commerce Marketing Agency",
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
            <span className="text-accent-dark">E-commerce Marketing</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — D2C E-commerce Growth Engine
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> scales D2C and multi-category online stores through high-ROAS shopping campaigns, dynamic retargeting, technical product schema SEO, and checkout conversion rate optimization.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">E-COMMERCE GROWTH ENGINEERING</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Scale Your E-commerce Revenue & Customer Lifetime Value.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Stop relying on generic discounts. We build data-driven acquisition and retention systems that lower customer acquisition cost and compound repeat orders.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-primary-light"
            >
              Get E-commerce Audit
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
              title: "Google Shopping & Performance Max",
              desc: "Optimized merchant center product feeds, negative brand filters, and smart bidding for maximum ROAS.",
            },
            {
              icon: IconTrendingUp,
              title: "Meta Catalog & Creative Ads",
              desc: "Dynamic product ads, UGC video funnels, and interest-based scaling on Instagram & Facebook.",
            },
            {
              icon: IconGauge,
              title: "Sub-Second Store Speed",
              desc: "Core Web Vitals rescue and lightning-fast checkout experiences that boost store conversion rate.",
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
        title="Ready to scale your D2C online store?"
        subtitle="Book a growth diagnostic session with our e-commerce performance team."
      />
    </>
  );
}
