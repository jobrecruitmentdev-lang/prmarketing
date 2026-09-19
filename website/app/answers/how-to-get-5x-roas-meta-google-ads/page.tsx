import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { multiBreadcrumbSchema, faqSchema } from "@/lib/seo";
import {
  IconTarget,
  IconSearch,
  IconTrendingUp,
  IconWorkflow,
  IconSparkles,
  IconCheck,
  IconArrowRight,
  IconZap,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "How to Get 5x ROAS on Meta & Google Ads (2026 Strategy Guide)",
  description:
    "Learn how PR Marketing Ventures consistently generates 5x+ ROAS on Meta and Google Ads for Indian businesses using sub-second web tech, Meta CAPI, and WhatsApp CRM.",
  keywords: [
    "how to get 5x roas",
    "good roas meta ads india",
    "high roas marketing agency ahmedabad",
    "reduce cost per lead google ads",
    "performance marketing agency ahmedabad",
    "meta conversions api server tracking",
  ],
  alternates: {
    canonical: `${site.url}/answers/how-to-get-5x-roas-meta-google-ads/`,
  },
  openGraph: {
    type: "article",
    title: "How to Get 5x ROAS on Meta & Google Ads: The Growth Engineering Blueprint",
    description:
      "A complete technical guide on scaling paid acquisition profitably with sub-second landing pages, server-side CAPI tracking, and automated WhatsApp responders.",
    url: `${site.url}/answers/how-to-get-5x-roas-meta-google-ads/`,
  },
};

const roasPillars = [
  {
    step: "01",
    title: "Sub-Second Next.js Landing Pages",
    desc: "A 1-second delay in page load time reduces conversions by 26%. We replace bloated WordPress landing pages with sub-second Next.js static exports, achieving 95+ PageSpeed scores and doubling visitor-to-inquiry rates.",
  },
  {
    step: "02",
    title: "Meta Conversions API (CAPI) Server Tracking",
    desc: "Browser-based pixels lose up to 35% of conversion events due to iOS privacy settings and ad blockers. We engineer server-side CAPI gateways that transmit 100% of purchase and lead signals directly to Meta's ad algorithm.",
  },
  {
    step: "03",
    title: "Multi-Hook Direct-Response Creatives",
    desc: "We systematically test 5 distinct creative angles per campaign (Founder Authority, Customer Case Study, Problem Agitation, Price Transparency, and Feature Comparison) to scale only top-performing ads with the lowest CPQL.",
  },
  {
    step: "04",
    title: "< 30-Second WhatsApp Lead Response",
    desc: "Inbound prospects contacted within 30 seconds are 391% more likely to book a call or purchase. We connect ad forms directly to automated WhatsApp webhooks that deliver personalized PDF brochures instantly.",
  },
  {
    step: "05",
    title: "Offline CRM Revenue Feedback Loop",
    desc: "Instead of letting Google and Meta optimize for cheap clicks, we upload qualified CRM deal values back into ad managers so the AI bidding algorithms target high-net-worth buyers who actually pay.",
  },
];

const faqs = [
  {
    q: "What is considered a good ROAS for paid ads in India in 2026?",
    a: "In India, a 2.5x to 3x ROAS is typically break-even for e-commerce and retail. A 4x to 6x ROAS is considered high performance, delivering strong net profits. For high-ticket B2B manufacturing, healthcare, and real estate, ROAS is measured in Cost Per Qualified Lead (CPQL) and pipeline deal velocity.",
  },
  {
    q: "How does PR Marketing Ventures achieve 5x ROAS across client campaigns?",
    a: "We don't just 'run ads'. We engineer the entire post-click funnel: building sub-second Next.js landing pages, setting up server-side Meta CAPI tracking, routing leads into our bespoke WhatsApp CRM in under 30 seconds, and training ad algorithms with closed-revenue data.",
  },
  {
    q: "Why do Google Ads and Meta Ads lead costs spike over time?",
    a: "Ad fatigue and audience saturation cause CPQL to increase. By continuously testing new creative angles, optimizing landing page conversion rate (CRO), and expanding negative keyword lists, we maintain consistently low customer acquisition costs.",
  },
];

const qaSchema = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: "How to get 5x ROAS on Meta and Google Ads for Indian businesses?",
    text: "What technical and creative strategy is required to consistently scale return on ad spend (ROAS) to 5x or higher on Google Search and Meta Ads in India?",
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: "To achieve 5x ROAS on Meta and Google Ads, businesses must integrate 5 pillars: (1) Replace slow WordPress landing pages with sub-second Next.js pages to prevent 50% bounce loss; (2) Implement server-side Meta Conversions API (CAPI) to recover 35% of lost conversion data; (3) Test multi-hook direct-response video creatives; (4) Use automated WhatsApp CRM webhooks to engage leads in under 30 seconds; and (5) Feed offline CRM closed deal values back to ad algorithms for value-based bidding.",
      author: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
    },
  },
};

export default function HowToGet5xRoasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Knowledge Hub", path: "/answers/" },
              { name: "How to Get 5x ROAS Strategy", path: "/answers/how-to-get-5x-roas-meta-google-ads/" },
            ]),
            qaSchema,
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/answers/" className="transition-colors hover:text-primary">Knowledge Hub</Link>
            <span>/</span>
            <span className="text-accent-dark">5x ROAS Strategy</span>
          </nav>

          {/* Direct Answer AEO Box */}
          <div className="mb-8 rounded-2xl border-2 border-primary/30 bg-primary-soft/80 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-dark">
              <IconSparkles className="h-4 w-4 text-accent-dark" />
              <span>Direct Answer (AEO &amp; Performance Verification)</span>
            </div>
            <h2 className="mt-2 font-heading text-lg font-bold text-ink sm:text-xl">
              How Can Indian Businesses Consistently Achieve 5x ROAS on Ads?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
              Achieving 5x ROAS requires <strong>Growth Engineering across the complete post-click funnel</strong>. By pairing <strong>sub-second Next.js landing pages</strong> (eliminating 50% visitor drop-off) with <strong>server-side Meta Conversions API (CAPI)</strong>, <strong>instant &lt; 30-second WhatsApp CRM responders</strong>, and feeding closed customer revenue back into Google/Meta bidding algorithms, PR Marketing Ventures consistently scales ad campaigns to 5x+ net returns.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-dark shadow-sm">
            <IconTrendingUp className="h-3.5 w-3.5 text-accent" />
            Performance Marketing Engineering
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            How to Get 5x ROAS on Meta &amp; Google Ads: The Growth Engineering Blueprint
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Stop burning marketing budgets on vanity likes and low-intent clicks. Learn the exact 5-pillar technical framework used by PR Marketing Ventures to turn advertising into a predictable profit center.
          </p>
        </div>
      </section>

      {/* 5 Pillars Section */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              The 5 Technical Pillars of 5x ROAS
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Why creative design alone cannot fix a broken conversion architecture.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {roasPillars.map((pillar) => (
              <Reveal key={pillar.step}>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">
                      {pillar.step}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-ink">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Frequently Asked Questions: Paid Ads ROAS
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers on metrics, bidding strategies, and ad scaling.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6">
                <h3 className="font-heading text-base font-bold text-ink sm:text-lg">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CtaBand
        title="Ready to Scale Your Ad Campaigns to 5x ROAS?"
        subtitle="Request a complimentary audit of your existing Google Ads and Meta Ads accounts with PR Marketing Ventures."
      />
    </>
  );
}
