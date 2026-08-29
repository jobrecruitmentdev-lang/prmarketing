import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconCode, IconCheck, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "Website Development Cost in Ahmedabad (2026 Transparent Guide) | PR Marketing Ventures",
  description:
    "How much does it cost to build a website in Ahmedabad in 2026? Complete pricing guide for corporate websites, e-commerce stores, Next.js web apps, and custom portals.",
  alternates: { canonical: "/guides/website-development-cost-ahmedabad/" },
};

const faqs = [
  {
    q: "How much does a basic business website cost in Ahmedabad?",
    a: "A high-quality 5–10 page responsive business website in Ahmedabad typically costs between ₹25,000 to ₹50,000, including custom UI design, mobile responsiveness, and basic on-page SEO setup.",
  },
  {
    q: "How much does an e-commerce website cost in Ahmedabad?",
    a: "A full-featured e-commerce store (Shopify or WooCommerce) with payment gateway integration, shipping calculators, and product catalog setup costs between ₹45,000 to ₹1,20,000.",
  },
  {
    q: "What is the cost of custom Next.js web application development?",
    a: "Custom Next.js web apps with database architectures, user dashboards, and API microservices range from ₹75,000 to ₹2,50,000+ depending on operational complexity.",
  },
];

export default function WebsiteCostAhmedabadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "Website Development Cost in Ahmedabad", path: "/guides/website-development-cost-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/website-development-cost-ahmedabad/",
              datePublished: "2026-01-12T09:00:00+05:30",
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
              <span className="text-accent-dark">Web Cost Guide</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconCode width={14} height={14} />
              WEB DEVELOPMENT PRICING BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              How Much Does Website Development Cost in Ahmedabad? (2026 Guide)
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Web Engineering Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>7 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                EXECUTIVE SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                In 2026, building a website in Ahmedabad costs between <strong>₹25,000 to ₹1,50,000+</strong>. The exact price depends on whether you are building a standard corporate site, a high-volume ecommerce store, or a custom Next.js web application.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                1. Website Development Price Matrix in Ahmedabad
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Website Type</th>
                      <th className="p-4 font-semibold text-primary">Estimated Cost (INR)</th>
                      <th className="p-4 font-semibold text-slate-600">Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Standard Business Website (5–10 Pages)</td>
                      <td className="p-4 font-bold text-ink">₹25,000 – ₹50,000</td>
                      <td className="p-4 text-slate-600">10 to 18 Days</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Custom E-commerce Store (Shopify/Woo)</td>
                      <td className="p-4 font-bold text-ink">₹45,000 – ₹1,20,000</td>
                      <td className="p-4 text-slate-600">3 to 5 Weeks</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Custom Next.js Web App / SaaS Portal</td>
                      <td className="p-4 font-bold text-ink">₹75,000 – ₹2,50,000+</td>
                      <td className="p-4 text-slate-600">4 to 8 Weeks</td>
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
          title="Ready to get a formal website development quote?"
          subtitle="Speak directly with our technical web leads on C.G. Road, Ahmedabad."
        />
      </article>
    </>
  );
}
