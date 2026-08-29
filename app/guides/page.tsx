import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/seo";
import { IconSparkles, IconArrowRight, IconSearch, IconCode } from "@/components/icons";

export const metadata: Metadata = {
  title: "Growth & SEO Guides | PR Marketing Ventures",
  description:
    "Definitive engineering blueprints, Generative Engine Optimization (GEO) guides, and technical SEO frameworks authored by PR Marketing Ventures.",
  alternates: { canonical: "/guides/" },
};

const guides = [
  {
    slug: "generative-engine-optimization",
    title: "The Definitive Guide to Generative Engine Optimization (GEO) in 2026",
    desc: "How to structure your website, data, and content to get cited in ChatGPT, Google AI Overviews, Perplexity, and Gemini.",
    tag: "AI SEO & GEO",
    readTime: "8 min read",
    icon: IconSparkles,
  },
  {
    slug: "marketing-agency-vs-digital-marketing-agency",
    title: "Marketing Agency vs Digital Marketing Agency: What's the Difference?",
    desc: "Understand the core differences between traditional brand strategy and measurable digital performance marketing.",
    tag: "Strategy",
    readTime: "7 min read",
    icon: IconSearch,
  },
  {
    slug: "what-does-a-marketing-agency-do",
    title: "What Does a Marketing Agency Actually Do? (Complete 2026 Guide)",
    desc: "Explore the core deliverables, daily responsibilities, and revenue growth systems engineered by a full-service agency.",
    tag: "Agency Scope",
    readTime: "6 min read",
    icon: IconCode,
  },
  {
    slug: "when-to-hire-a-marketing-agency",
    title: "When Should a Business Hire a Marketing Agency? (7 Growth Signs)",
    desc: "The revenue benchmarks, founder capacity triggers, and scaling milestones that signal it's time to partner with an agency.",
    tag: "Business Scaling",
    readTime: "6 min read",
    icon: IconSparkles,
  },
  {
    slug: "in-house-marketing-vs-agency",
    title: "In-House Marketing Team vs Hiring an Agency: Cost & Speed Comparison",
    desc: "Compare the true costs, hiring timelines, and multi-skill execution depth of internal teams versus agency retainers.",
    tag: "Cost Benchmark",
    readTime: "7 min read",
    icon: IconCode,
  },
  {
    slug: "b2b-marketing-guide-ahmedabad",
    title: "B2B Marketing Strategies for Gujarat Manufacturers & Exporters",
    desc: "How industrial companies in GIDC industrial estates capture high-value OEM RFQ orders using Google search and export SEO.",
    tag: "Industrial B2B",
    readTime: "8 min read",
    icon: IconSearch,
  },
  {
    slug: "digital-marketing-cost-in-ahmedabad",
    title: "How Much Does Digital Marketing Cost in Ahmedabad? (2026 Price Guide)",
    desc: "Complete price breakdown for SEO, Google Ads, Meta Ads, and full-funnel performance marketing retainers in Gujarat.",
    tag: "Marketing Pricing",
    readTime: "7 min read",
    icon: IconSearch,
  },
  {
    slug: "how-to-choose-a-digital-marketing-agency-ahmedabad",
    title: "How to Choose the Best Digital Marketing Agency in Ahmedabad",
    desc: "The 10-point checklist and evaluation criteria every Ahmedabad business owner must know before hiring an agency.",
    tag: "Agency Evaluation",
    readTime: "6 min read",
    icon: IconSparkles,
  },
  {
    slug: "seo-cost-in-ahmedabad",
    title: "How Much Does SEO Cost in Ahmedabad? (2026 Pricing Guide)",
    desc: "Complete price benchmarks, monthly packages, and ROI expectations for SEO services in Ahmedabad and Gujarat.",
    tag: "SEO Pricing",
    readTime: "6 min read",
    icon: IconSearch,
  },
  {
    slug: "what-is-geo-vs-seo",
    title: "What is GEO vs SEO? The Definitive 2026 Guide to AI Search Optimization",
    desc: "Comparing traditional Google search rankings with Generative Engine Optimization for ChatGPT and Perplexity citations.",
    tag: "AI Search",
    readTime: "9 min read",
    icon: IconSparkles,
  },
  {
    slug: "digital-marketing-for-startups-ahmedabad",
    title: "Digital Marketing Playbook for Startups & SMEs in Ahmedabad",
    desc: "How startups in Gujarat can achieve product-market fit and scale revenue with lean paid advertising and WhatsApp automation.",
    tag: "Startup Growth",
    readTime: "8 min read",
    icon: IconCode,
  },
  {
    slug: "website-development-cost-ahmedabad",
    title: "How Much Does Website Development Cost in Ahmedabad?",
    desc: "Transparent price guide for business websites, custom ecommerce stores, and Next.js web applications in Ahmedabad.",
    tag: "Web Development",
    readTime: "7 min read",
    icon: IconCode,
  },
  {
    slug: "ecommerce-website-cost-ahmedabad",
    title: "How Much Does an Ecommerce Website Cost in Ahmedabad? (2026 Guide)",
    desc: "Compare Shopify, WooCommerce, and Headless Next.js development costs, timelines, and payment gateway integrations.",
    tag: "Ecommerce Cost",
    readTime: "8 min read",
    icon: IconCode,
  },
  {
    slug: "how-to-rank-on-google-maps-ahmedabad",
    title: "How to Rank Your Business on Google Maps in Ahmedabad (3-Pack Guide)",
    desc: "The actionable 5-step local SEO checklist to dominate Google Maps rankings, local citations, and customer reviews.",
    tag: "Local Map SEO",
    readTime: "8 min read",
    icon: IconSparkles,
  },
  {
    slug: "custom-crm-vs-excel",
    title: "Custom CRM vs Excel: Why Spreadsheets Are Costing Your Business 35% in Sales",
    desc: "Why managing sales leads in spreadsheets leads to lost deals, and how a custom CRM with WhatsApp automation doubles closing rates.",
    tag: "CRM & Automation",
    readTime: "7 min read",
    icon: IconCode,
  },
];

export default function GuidesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema("Guides", "/guides/")]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">KNOWLEDGE & BLUEPRINTS</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Engineering Insights, SEO Blueprints & AI Frameworks.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Actionable research and technical methodologies on search algorithms, generative AI discovery, and performance marketing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {guides.map((guide) => (
            <Reveal key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}/`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
                      <guide.icon width={14} height={14} />
                      {guide.tag}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{guide.readTime}</span>
                  </div>
                  <h2 className="mt-5 font-heading text-2xl font-bold text-ink group-hover:text-primary transition-colors">
                    {guide.title}
                  </h2>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">{guide.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary">
                  Read Full Guide
                  <IconArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Want custom SEO & AI search blueprints for your brand?"
        subtitle="Book a free technical diagnostic session with our growth engineering team."
      />
    </>
  );
}
