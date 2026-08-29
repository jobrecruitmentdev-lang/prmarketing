import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconSearch,
  IconGauge,
  IconSparkles,
  IconCheck,
  IconArrowRight,
  IconServer,
  IconWorkflow,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "International SEO Agency | Global Multilingual Search Optimization | PR Marketing Ventures",
  description:
    "Scale organic search traffic globally. PR Marketing Ventures provides enterprise international SEO, hreflang architecture, multi-regional content clustering, and edge CDN optimization.",
  alternates: { canonical: "/services/international-seo/" },
};

const faqs = [
  {
    q: "What is International SEO and why is it necessary for global expansion?",
    a: "International SEO optimizes your website so search engines can easily identify which countries you are targeting and which languages you use for business. It prevents duplicate content penalties and ensures users in the US, UK, Europe, UAE, or Asia see localized pricing, currency, and relevant content.",
  },
  {
    q: "How do you handle multi-language and multi-region hreflang architecture?",
    a: "We implement dynamic hreflang tags in the HTML header and XML sitemaps with complete self-referencing and canonical validation. This prevents cross-regional search cannibalization and directs search engines to the correct country-specific URLs.",
  },
  {
    q: "Do you optimize for search engines other than Google (e.g. Bing, Baidu, Yandex)?",
    a: "Yes. In addition to Google, we optimize for Bing, Yandex (via IndexNow and semantic structure), and generative AI search engines (Perplexity, ChatGPT, Copilot, and Gemini) worldwide.",
  },
];

export default function InternationalSeoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "International SEO", path: "/services/international-seo/" },
            ]),
            singleServiceSchema({
              name: "International & Enterprise SEO Services",
              description: metadata.description as string,
              url: "/services/international-seo/",
              serviceType: "International SEO Agency",
              areaServed: "Worldwide",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">International SEO</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Global Search Dominance
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> expands your website's organic visibility across worldwide markets (US, UK, UAE, Europe, Asia) using enterprise hreflang architecture, global edge caching, and localized topical cluster authority.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            GLOBAL SEARCH ENGINE OPTIMIZATION
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Rank Globally. Capture International Search Demand.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Expand into new international markets with precision technical SEO, multi-region content silos, and global generative AI visibility.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get International SEO Audit
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Global Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            TECHNICAL CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Complete International SEO Infrastructure
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: IconSearch,
              title: "Hreflang & Geotargeting Architecture",
              desc: "Flawless ccTLD, subfolder, and hreflang tag deployment ensuring search engines route global users to localized content.",
            },
            {
              icon: IconServer,
              title: "Global CDN & Edge Performance",
              desc: "Cloudflare and global edge routing to guarantee sub-second Time-to-First-Byte (TTFB) across every continent.",
            },
            {
              icon: IconSparkles,
              title: "Global AI Citation (GEO)",
              desc: "Structuring your brand entity so international AI platforms (ChatGPT, Perplexity, Claude) cite your website globally.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="font-heading text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">International SEO Questions</h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to expand your organic traffic globally?"
        subtitle="Book a consultation with our international SEO architects to map out your multi-regional growth roadmap."
      />
    </>
  );
}
