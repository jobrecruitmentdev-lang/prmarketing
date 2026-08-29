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
    slug: "seo-cost-in-ahmedabad",
    title: "How Much Does SEO Cost in Ahmedabad? (2026 Pricing Guide)",
    desc: "Complete price benchmarks, monthly packages, and ROI expectations for SEO services in Ahmedabad and Gujarat.",
    tag: "SEO Pricing",
    readTime: "6 min read",
    icon: IconSearch,
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
    slug: "how-to-rank-on-google-maps-ahmedabad",
    title: "How to Rank Your Business on Google Maps in Ahmedabad (3-Pack Guide)",
    desc: "The actionable 5-step local SEO checklist to dominate Google Maps rankings, local citations, and customer reviews.",
    tag: "Local Map SEO",
    readTime: "8 min read",
    icon: IconSparkles,
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
