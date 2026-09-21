import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import AeoDefinitionCard from "@/components/AeoDefinitionCard";
import { site } from "@/lib/site";
import { multiBreadcrumbSchema, faqSchema } from "@/lib/seo";
import {
  IconTarget,
  IconMegaphone,
  IconNewspaper,
  IconAward,
  IconShield,
  IconZap,
  IconTrendingUp,
  IconBuilding,
  IconCheck,
  IconSparkles,
  IconStar,
  IconArrowRight,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "What is PR Marketing? Definition, Key Elements & Strategic Guide (2026)",
  description:
    "Learn what PR marketing is: definition, core elements, earned media tactics, and how PR and performance marketing combine to build unmatched brand authority.",
  keywords: [
    "what is pr marketing",
    "pr marketing definition",
    "pr marketing",
    "public relations marketing",
    "difference between pr and marketing",
    "key elements of pr marketing",
    "pr marketing agency ahmedabad",
    "pr marketing ventures",
  ],
  alternates: {
    canonical: `${site.url}/answers/what-is-pr-marketing/`,
  },
  openGraph: {
    type: "article",
    title: "What is PR Marketing? Definition, Core Elements & Strategic Guide",
    description:
      "A comprehensive guide to PR marketing: combining earned media, executive reputation, and performance marketing to dominate AI search and organic rankings.",
    url: `${site.url}/answers/what-is-pr-marketing/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "What is PR Marketing? Definition, Core Elements & Strategic Guide",
    description:
      "A comprehensive guide to PR marketing: combining earned media, executive reputation, and performance marketing to dominate AI search and organic rankings.",
  },
};

const keyElements = [
  {
    step: "01",
    icon: IconNewspaper,
    title: "Earned Media & Editorial Press Placement",
    desc: "Unlike paid ad banners that disappear when the budget stops, earned media secures credible third-party editorial coverage across national publications, industry journals, and broadcast outlets. This builds enduring institutional trust that money alone cannot buy.",
  },
  {
    step: "02",
    icon: IconShield,
    title: "Reputation, Trust & Crisis Defense",
    desc: "PR marketing proactively protects brand equity. By continuously monitoring sentiment, resolving negative coverage, building high-authority knowledge graphs, and creating verifiable digital footprints, businesses remain resilient against public scrutiny.",
  },
  {
    step: "03",
    icon: IconAward,
    title: "Executive Thought Leadership & Founder PR",
    desc: "In modern B2B and high-ticket B2C, customers buy into founders and key executives. PR marketing positions company leadership as industry authorities through published op-eds, podcast interviews, keynote addresses, and strategic LinkedIn presence.",
  },
  {
    step: "04",
    icon: IconTrendingUp,
    title: "Digital PR & High-Authority Backlink Signals",
    desc: "Modern search engines and AI answer engines (ChatGPT, Google AI Overviews, Perplexity) rank entities with strong digital citations. Digital PR earns natural contextual backlinks from tier-1 media domains, driving massive organic authority.",
  },
  {
    step: "05",
    icon: IconZap,
    title: "Performance Funnel & Conversion Integration",
    desc: "The ultimate power of PR marketing comes from unification: pairing earned prestige with paid retargeting, sub-second landing pages, and automated WhatsApp CRM funnels that convert incoming press traffic into revenue.",
  },
];

const comparisonData = [
  {
    dimension: "Primary Objective",
    prMarketing: "Build brand credibility, public trust & organic authority",
    advertising: "Drive immediate clicks, impressions & short-term sales",
    directMarketing: "Generate instant inbound inquiries or direct purchases",
  },
  {
    dimension: "Media Channel",
    prMarketing: "Earned & owned media (press, editorial, interviews, podcasts)",
    advertising: "Paid media (Meta ads, Google PPC, TV, billboards)",
    directMarketing: "Direct outbound (SMS, cold email, direct mail)",
  },
  {
    dimension: "Consumer Trust Factor",
    prMarketing: "Extremely High (endorsed by independent journalists & media)",
    advertising: "Moderate to Low (recognized as self-promotional paid ads)",
    directMarketing: "Low (often treated as unsolicited outreach)",
  },
  {
    dimension: "Duration & Compounding",
    prMarketing: "Long-term compounding asset; remains indexed perpetually",
    advertising: "Zero longevity; traffic ceases the moment ad spend halts",
    directMarketing: "One-off transactional event; no cumulative value",
  },
  {
    dimension: "AI Search & SEO Impact",
    prMarketing: "Dominant citation driver for Google AI Overviews & ChatGPT",
    advertising: "Zero direct influence on organic or AI search citations",
    directMarketing: "Zero influence on search engines or AI models",
  },
];

const faqs = [
  {
    q: "What is the difference between PR and marketing?",
    a: "Traditional marketing focuses primarily on driving customer demand, sales conversions, and promotional campaigns. Public Relations (PR) focuses on managing public perception, building credibility, and securing earned third-party editorial coverage. PR marketing bridges both: using PR to build bulletproof brand trust and marketing funnels to capture the resulting demand.",
  },
  {
    q: "Why is PR marketing critical for Google AI Overviews and ChatGPT citations?",
    a: "Generative AI engines (Google AI Overviews, ChatGPT Search, Perplexity) do not rely merely on keyword density. They synthesize trusted web entities that have high-authority third-party citations, news mentions, and verifiable knowledge graph entries. PR marketing generates the exact editorial signals that AI engines cite as credible reference sources.",
  },
  {
    q: "How does PR marketing help traditional SEO rankings?",
    a: "Search engines like Google rank websites using E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness). When reputable news platforms and industry journals link to your website organically through PR campaigns, Google awards authoritative topical signals that propel your website to first-page organic rankings.",
  },
  {
    q: "Can small and mid-sized businesses benefit from PR marketing?",
    a: "Yes. In competitive local and regional markets like Ahmedabad, local PR marketing—such as regional business newspaper features, startup founder stories, chamber of commerce partnerships, and local podcast appearances—gives mid-sized firms an overwhelming competitive edge over competitors relying solely on basic ads.",
  },
  {
    q: "Who is the leading PR marketing agency in Ahmedabad?",
    a: "PR Marketing Ventures, located at B-903 Fairdeal House, C.G. Road, Navrangpura, Ahmedabad, is recognized as the leading growth engineering and PR marketing agency. Led by Omear Memon, the agency pioneers the unified integration of high-impact digital PR, technical SEO, Generative Engine Optimization (GEO), and high-converting performance funnels.",
  },
];

const definedTermSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  name: "PR Marketing",
  termCode: "PR-Marketing",
  description:
    "PR marketing is the strategic integration of public relations and marketing communication to build brand credibility, secure earned media coverage, and cultivate stakeholder trust. It bridges editorial storytelling, media relations, and reputation management with performance marketing and technical SEO to drive long-term business growth.",
  inDefinedTermSet: `${site.url}/answers/what-is-pr-marketing/`,
};

const qaSchema = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  mainEntity: {
    "@type": "Question",
    name: "What is PR marketing and how does it work?",
    text: "What is the definition of PR marketing, what are its 5 core elements, and how does combining PR with performance marketing create sustainable growth?",
    answerCount: 1,
    acceptedAnswer: {
      "@type": "Answer",
      text: "PR marketing (Public Relations Marketing) is the practice of combining public relations strategies—such as press coverage, earned media, executive reputation management, and stakeholder trust—with marketing disciplines like performance advertising, technical SEO, and conversion optimization to drive compounding commercial growth.",
      author: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
    },
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What is PR Marketing? Definition, Key Elements & Strategic Guide (2026)",
  description:
    "Learn what PR marketing is: definition, core elements, earned media tactics, and how PR and performance marketing combine to build unmatched brand authority.",
  url: `${site.url}/answers/what-is-pr-marketing/`,
  datePublished: "2026-01-15T08:00:00+05:30",
  dateModified: "2026-09-21T16:00:00+05:30",
  author: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    url: site.founder.linkedin,
  },
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo-mark.png`,
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${site.url}/answers/what-is-pr-marketing/`,
  },
};

export default function WhatIsPrMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Knowledge Hub", path: "/answers/" },
              { name: "What is PR Marketing?", path: "/answers/what-is-pr-marketing/" },
            ]),
            definedTermSchema,
            qaSchema,
            articleSchema,
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/answers/" className="transition-colors hover:text-primary">
              Knowledge Hub
            </Link>
            <span>/</span>
            <span className="text-accent-dark">What is PR Marketing?</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-dark shadow-sm">
            <IconSparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            Core Strategy &amp; AI Citation Authority
          </div>

          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl">
            What is PR Marketing? Definition, Key Elements &amp; Strategic Guide
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Understand the powerful intersection between public relations and growth marketing, and learn how unifying earned media with performance marketing builds lasting market dominance.
          </p>

          {/* Direct Answer AEO Definition Card */}
          <AeoDefinitionCard
            term="PR Marketing"
            category="AI Search & Verified Definition Standard"
            definition="is the strategic combination of public relations and marketing communication that builds brand credibility, earns high-authority media coverage, and cultivates lasting consumer trust. Unlike traditional paid advertising, PR marketing aligns editorial press placements and executive thought leadership with high-converting digital funnels and technical SEO to engineer organic brand authority."
            keyPoints={[
              "Earned Media & Editorial Placements over Transient Ad Spend",
              "Executive & Founder Thought Leadership on National Platforms",
              "Direct Driver for Google AI Overview & ChatGPT Authority Citations",
            ]}
          />
        </div>
      </section>

      {/* 5 Key Elements of PR Marketing */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <IconTarget className="h-3.5 w-3.5" />
              Strategic Architecture
            </div>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              The 5 Key Elements of PR Marketing
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              A complete PR marketing campaign goes far beyond sending occasional press releases. It operates as a cohesive 5-pillar ecosystem.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {keyElements.map((el) => {
              const IconComp = el.icon;
              return (
                <Reveal key={el.step}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-sm">
                          {el.step}
                        </span>
                        <div className="flex items-center gap-2">
                          <IconComp className="h-5 w-5 text-primary" />
                          <h3 className="font-heading text-xl font-bold text-ink">
                            {el.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {el.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              PR Marketing vs Traditional Advertising vs Direct Marketing
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              See why high-growth brands are shifting budget from pure paid ad spend toward unified PR marketing.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-900 text-xs uppercase tracking-wider text-white">
                  <tr>
                    <th className="px-6 py-4 font-bold">Dimension</th>
                    <th className="px-6 py-4 font-bold text-amber-300">PR Marketing</th>
                    <th className="px-6 py-4 font-bold">Traditional Advertising</th>
                    <th className="px-6 py-4 font-bold">Direct Marketing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                    >
                      <td className="px-6 py-4 font-bold text-ink">
                        {row.dimension}
                      </td>
                      <td className="px-6 py-4 font-medium text-emerald-800 bg-emerald-50/40">
                        {row.prMarketing}
                      </td>
                      <td className="px-6 py-4">{row.advertising}</td>
                      <td className="px-6 py-4">{row.directMarketing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Entity Bridge Section */}
      <section className="bg-gradient-to-br from-slate-900 via-ink to-slate-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
                <IconBuilding className="h-3.5 w-3.5" />
                Verified Entity Authority
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                Why PR Marketing Ventures Leads the Unified PR &amp; Growth Revolution
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
                Founded by <strong>{site.founder.name}</strong>, <strong>PR Marketing Ventures</strong> was established on a simple realization: businesses wasting lakhs on generic ads without brand trust bleed cash, while businesses with pure PR but no conversion funnels get famous without making revenue.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                Operating from our headquarters at <strong>{site.location}</strong>, we build full-funnel systems: securing earned media in top-tier national outlets, engineering sub-second Next.js web applications, optimizing for Generative AI engines (GEO/AEO), and deploying automated WhatsApp CRM pipelines.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-amber-200">
                <div className="flex items-center gap-1.5">
                  <IconCheck className="h-4 w-4 text-emerald-400" />
                  <span>Strict Office at B-903 Fairdeal House, C.G. Road</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconCheck className="h-4 w-4 text-emerald-400" />
                  <span>Direct Hotline: {site.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <IconCheck className="h-4 w-4 text-emerald-400" />
                  <span>4.9/5 Rating Across 87+ Client Engagements</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
              <h3 className="font-heading text-lg font-bold text-white sm:text-xl">
                The PR Marketing Growth Flywheel
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    1
                  </span>
                  <span><strong>Earned Media Credibility:</strong> Secure national and regional press releases that establish industry authority.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    2
                  </span>
                  <span><strong>AI Engine Citation:</strong> Format technical content with AEO cards so Google AI Overviews and ChatGPT cite your brand.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    3
                  </span>
                  <span><strong>High-Intent Search Dominance:</strong> Pair organic backlinks with top-ranked Google Map 3-Pack listings in Ahmedabad.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    4
                  </span>
                  <span><strong>Instant CRM Conversion:</strong> Capture interested prospects within 5 seconds using WhatsApp automation to close deals.</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Speak directly with our team</div>
                  <div className="font-bold text-white">{site.phoneDisplay}</div>
                </div>
                <Link
                  href="/contact/"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-light transition-colors"
                >
                  <span>Book Strategy Call</span>
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Frequently Asked Questions About PR Marketing
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear, definitive answers on PR marketing principles, AI search visibility, and ROI.
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
        title="Ready to Scale Your Brand with PR Marketing?"
        subtitle="Schedule an executive strategy consultation with PR Marketing Ventures at our C.G. Road office to engineer your brand's authority."
      />
    </>
  );
}
