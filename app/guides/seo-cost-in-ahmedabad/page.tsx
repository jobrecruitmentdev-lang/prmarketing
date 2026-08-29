import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconSearch, IconArrowRight, IconCheck, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "How Much Does SEO Cost in Ahmedabad? (2026 Price Guide) | PR Marketing Ventures",
  description:
    "Complete breakdown of SEO pricing and monthly packages in Ahmedabad for 2026. Compare local SEO, ecommerce SEO, and enterprise SEO costs in Gujarat.",
  alternates: { canonical: "/guides/seo-cost-in-ahmedabad/" },
};

const faqs = [
  {
    q: "What is the average cost of SEO services in Ahmedabad in 2026?",
    a: "The average monthly cost for professional SEO services in Ahmedabad ranges from ₹15,000 to ₹35,000/month for small local businesses, ₹40,000 to ₹80,000/month for mid-market/e-commerce brands, and ₹1,00,000+/month for enterprise technical SEO.",
  },
  {
    q: "Why do some agencies charge ₹5,000/month for SEO in Ahmedabad?",
    a: "Ultra-cheap SEO packages usually rely on automated spam backlinks and low-quality keyword stuffing that can trigger Google manual penalties and harm your domain authority long-term.",
  },
  {
    q: "How long does it take to see an ROI on SEO spend in Ahmedabad?",
    a: "Most businesses achieve positive ROI within 3 to 6 months as organic rankings compound into inbound customer inquiries without ongoing ad costs.",
  },
];

export default function SeoCostInAhmedabadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "SEO Cost in Ahmedabad", path: "/guides/seo-cost-in-ahmedabad/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/seo-cost-in-ahmedabad/",
              datePublished: "2026-01-10T09:00:00+05:30",
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
              <span className="text-accent-dark">SEO Cost Guide</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconSearch width={14} height={14} />
              AHMEDABAD SEO PRICING BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              How Much Does SEO Cost in Ahmedabad? (2026 Transparent Guide)
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Growth Team</span>
              <span>•</span>
              <span>Updated: August 2026</span>
              <span>•</span>
              <span>6 min read</span>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/60 p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                QUICK SUMMARY / TL;DR
              </p>
              <p className="mt-2 text-base leading-relaxed text-slate-800">
                In 2026, professional SEO in Ahmedabad costs between <strong>₹15,000 to ₹75,000/month</strong> depending on business size, competition level, and target geographic reach. High-quality SEO includes technical audit fixes, Core Web Vitals optimization, content clusters, local Google Maps optimization, and schema markup.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                1. Ahmedabad SEO Pricing Breakdown (By Package Type)
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">SEO Tier</th>
                      <th className="p-4 font-semibold text-primary">Monthly Cost (INR)</th>
                      <th className="p-4 font-semibold text-slate-600">Ideal For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Local SEO & Google Maps</td>
                      <td className="p-4 font-bold text-ink">₹15,000 – ₹25,000 / mo</td>
                      <td className="p-4 text-slate-600">Clinics, local retail, cafes, single-location services</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Regional Business Growth</td>
                      <td className="p-4 font-bold text-ink">₹30,000 – ₹55,000 / mo</td>
                      <td className="p-4 text-slate-600">Manufacturers, real estate developers, B2B startups</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Enterprise & Ecommerce SEO</td>
                      <td className="p-4 font-bold text-ink">₹60,000 – ₹1,50,000+ / mo</td>
                      <td className="p-4 text-slate-600">D2C brands, nationwide SaaS, multi-location companies</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                2. What Should Be Included in a Professional SEO Package?
              </h2>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <IconCheck width={18} height={18} className="text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Complete Technical Audit:</strong> Crawl errors, canonical loops, 404s, and robots.txt.</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck width={18} height={18} className="text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Core Web Vitals Speed:</strong> 90+ PageSpeed score on mobile and desktop.</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck width={18} height={18} className="text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Schema Markup:</strong> LocalBusiness, Organization, FAQPage, and BreadcrumbList.</span>
                </li>
                <li className="flex items-start gap-2">
                  <IconCheck width={18} height={18} className="text-emerald-600 mt-1 shrink-0" />
                  <span><strong>Google Business Profile Optimization:</strong> Category tuning, review funnels, and local citations.</span>
                </li>
              </ul>
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
          title="Want a customized SEO quote for your business in Ahmedabad?"
          subtitle="Book a free 30-minute discovery call with our SEO team on C.G. Road."
        />
      </article>
    </>
  );
}
