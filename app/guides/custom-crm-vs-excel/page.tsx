import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, articleSchema, faqSchema } from "@/lib/seo";
import { IconCheck, IconTarget, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Custom CRM vs Excel for Business Growth (Why Spreadsheets Kill Sales) | PR Marketing Ventures",
  description:
    "Why managing sales leads in Excel or Google Sheets leads to 35% lost revenue. Discover how custom CRM software automates WhatsApp follow-ups and doubles deal closing rates.",
  alternates: { canonical: "/guides/custom-crm-vs-excel/" },
};

const faqs = [
  {
    q: "Why is managing leads in Excel bad for growing businesses?",
    a: "Excel lacks automated follow-up reminders, offers zero data security (employees can download entire customer lists in 1 click), does not integrate with WhatsApp or phone calls, and provides no real-time conversion reporting.",
  },
  {
    q: "How much does a custom CRM save compared to subscription SaaS like Salesforce?",
    a: "A 10-person sales team on commercial CRMs pays ₹3,00,000 to ₹10,00,000 every year in recurring license fees. A custom CRM requires only a 1-time build cost with zero recurring per-user fees forever.",
  },
];

export default function CustomCrmVsExcelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Guides", path: "/guides/" },
              { name: "CRM vs Excel Guide", path: "/guides/custom-crm-vs-excel/" },
            ]),
            articleSchema({
              title: metadata.title as string,
              description: metadata.description as string,
              path: "/guides/custom-crm-vs-excel/",
              datePublished: "2026-01-28T09:00:00+05:30",
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
              <span className="text-accent-dark">CRM vs Excel</span>
            </nav>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold text-primary">
              <IconWorkflow width={14} height={14} />
              SALES PIPELINE AUTOMATION BLUEPRINT (2026)
            </span>

            <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Custom CRM vs Excel: Why Spreadsheets Are Costing Your Business 35% in Lost Sales
            </h1>

            <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-200 pb-6">
              <span>By: PR Marketing Ventures Software Engineering Team</span>
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
                While Excel is easy to start with, it creates massive blind spots: forgotten follow-ups, delayed response times, and client data theft. A custom CRM automates sub-30-second WhatsApp responses, protects customer data with role permissions, and doubles sales closing velocity.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="prose prose-slate max-w-none text-slate-700 space-y-8">
            <section>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
                Comparing Spreadsheets vs Custom CRM
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-semibold text-ink">Capability</th>
                      <th className="p-4 font-semibold text-slate-600">Excel / Google Sheets</th>
                      <th className="p-4 font-semibold text-primary">Custom CRM Software</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-4 font-medium">Lead Response Speed</td>
                      <td className="p-4 text-slate-600">Manual copy-paste (Hours/Days)</td>
                      <td className="p-4 font-semibold text-ink">Instant (&lt; 30s via WhatsApp API)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Data Security</td>
                      <td className="p-4 text-rose-600">Zero (Full list exportable in 1 click)</td>
                      <td className="p-4 font-semibold text-emerald-600">Masked numbers, Role RBAC, No export</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Recurring Costs</td>
                      <td className="p-4 text-slate-600">Free</td>
                      <td className="p-4 font-semibold text-ink">Zero per-user monthly license fees</td>
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
          title="Ready to upgrade from Excel to a custom CRM?"
          subtitle="See an interactive live demo tailored for your sales workflow."
        />
      </article>
    </>
  );
}
