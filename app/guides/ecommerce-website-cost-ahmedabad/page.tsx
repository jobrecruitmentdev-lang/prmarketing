import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconCart, IconCheck, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "Ecommerce Website Cost in Ahmedabad (Shopify vs WooCommerce 2026) | PR Marketing Ventures",
  description:
    "How much does it cost to build an e-commerce website in Ahmedabad in 2026? Compare Shopify, WooCommerce, and custom Next.js development costs and timelines.",
  alternates: { canonical: "/guides/ecommerce-website-cost-ahmedabad/" },
};

const faqs = [
  {
    q: "How much does a basic Shopify store cost to launch in Ahmedabad?",
    a: "A professionally designed Shopify store with payment gateway setup (Razorpay/Cashfree) and shipping integration (Shiprocket) typically costs between ₹45,000 to ₹85,000 in Ahmedabad.",
  },
  {
    q: "When should a brand choose custom Next.js over Shopify?",
    a: "When your online store experiences high traffic volume, requires sub-second mobile page loads (under 1s), or needs custom ERP/inventory integrations that would be restricted on standard SaaS platforms.",
  },
];

export default function EcommerceCostGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "Ecommerce Website Cost", path: "/guides/ecommerce-website-cost-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/ecommerce-website-cost-ahmedabad/",
              datePublished: "2026-02-01T09:00:00+05:30",
              dateModified: "2026-08-29T12:00:00+05:30",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <article className="bg-white">
        <header className="bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link href="/guides/" className="hover:text-primary">Guides</Link>
              <span>/</span>
              <span className="text-accent-dark">Ecommerce Cost</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconCart width={14} height={14} />
              ECOMMERCE PRICING BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              How Much Does an Ecommerce Website Cost in Ahmedabad? (2026 Guide)
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Ecommerce Engineering Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>8 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                In 2026, building an ecommerce website in Ahmedabad costs between <strong>₹45,000 to ₹2,50,000+</strong>. The exact price depends on whether you choose Shopify (fastest launch for D2C), WooCommerce (flexible catalog control), or Headless Next.js (maximum speed and enterprise SEO authority).
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Ecommerce Platform Pricing Comparison
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Platform</th>
                      <th className="p-4 font-semibold text-primary">Development Cost</th>
                      <th className="p-4 font-semibold text-slate-600">Best Suited For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Shopify Store</td>
                      <td className="p-4 font-bold text-ink">₹45,000 – ₹95,000</td>
                      <td className="p-4 text-slate-600">D2C brands needing fast launch & easy operations</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">WooCommerce Store</td>
                      <td className="p-4 font-bold text-ink">₹40,000 – ₹85,000</td>
                      <td className="p-4 text-slate-600">Custom business catalogs & WordPress content control</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Headless Next.js Commerce</td>
                      <td className="p-4 font-bold text-ink">₹1,25,000 – ₹3,00,000+</td>
                      <td className="p-4 text-slate-600">High-volume stores needing sub-second speed & max SEO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <CtaBand
          title="Ready to build a high-converting ecommerce store in Ahmedabad?"
          subtitle="Get a free technical consultation and ecommerce architecture proposal."
        />
      </article>
    </>
  );
}
