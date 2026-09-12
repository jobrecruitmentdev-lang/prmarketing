import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import PrSeoHeroCard from "@/components/PrSeoHeroCard";
import AeoDefinitionCard from "@/components/AeoDefinitionCard";
import { generateConnectedGraphSchema } from "@/lib/seo";
import {
  IconBot,
  IconCart,
  IconCheck,
  IconCode,
  IconGauge,
  IconLayout,
  IconMapPin,
  IconSearch,
  IconServer,
  IconSparkles,
  IconWorkflow,
  IconBuilding,
  IconHeart,
  IconArrowRight,
  IconTarget,
  IconShield,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Ahmedabad | PR Marketing",
  description:
    "Explore digital marketing services by PR Marketing Ventures: SEO, Google Ads, social media marketing, web development, and AI growth. Get your free audit!",
  alternates: { canonical: "/services/" },
};

type Service = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  points: string[];
  href?: string;
};

const groups: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  services: Service[];
}[] = [
  {
    id: "marketing",
    eyebrow: "MARKETING & GROWTH",
    title: "Performance marketing that scales revenue",
    intro:
      "Full-funnel customer acquisition combining precision PPC ads, search rankings, and conversion-optimized funnels in Ahmedabad and globally.",
    services: [
      {
        icon: IconTarget,
        title: "Digital & Performance Marketing",
        desc: "Google Ads, Meta Ads, and multi-channel campaigns built for high ROAS and low CAC.",
        href: "/services/digital-marketing/",
        points: [
          "Google Ads & Performance Max management",
          "Meta (Facebook & Instagram) ad funnels",
          "Conversion tracking & ROAS optimization",
        ],
      },
      {
        icon: IconTarget,
        title: "Performance Marketing Agency",
        desc: "Scaling paid ad media across Google, Meta, and LinkedIn with sub-second CRO funnels.",
        href: "/services/performance-marketing/",
        points: [
          "Omnichannel paid media scaling",
          "Server-side CAPI tracking",
          "Creative testing & CAC reduction",
        ],
      },
      {
        icon: IconSearch,
        title: "SEO & Technical SEO",
        desc: "Topical authority and technical excellence that compound into first-page rankings.",
        href: "/services/seo/",
        points: [
          "Keyword & content cluster strategy",
          "On-page, schema & internal linking",
          "Crawlability, indexing & Core Web Vitals",
        ],
      },
      {
        icon: IconSearch,
        title: "International SEO",
        desc: "Enterprise multi-region search optimization and hreflang architecture for global reach.",
        href: "/services/international-seo/",
        points: [
          "Hreflang & multi-regional geotargeting",
          "Global edge CDN & TTFB acceleration",
          "Worldwide search engine indexing",
        ],
      },
      {
        icon: IconMapPin,
        title: "Google Business Profile & Map Pack",
        desc: "Dominate Google Maps 3-Pack rankings and 'near me' searches across Ahmedabad.",
        href: "/services/google-business-profile/",
        points: [
          "Google Business Profile optimization",
          "Review generation & reputation automation",
          "Local citation & NAP synchronization",
        ],
      },
      {
        icon: IconSparkles,
        title: "AI SEO (GEO / AEO)",
        desc: "Optimization for generative engines — the next frontier of search discovery.",
        href: "/services/ai-seo/",
        points: [
          "Content structured for AI citation",
          "Entity & schema optimization",
          "Visibility in ChatGPT, Gemini & Perplexity",
        ],
      },
    ],
  },
  {
    id: "software",
    eyebrow: "SOFTWARE & WEB ENGINEERING",
    title: "Software & Web Applications built to perform",
    intro:
      "Design, software engineering and web development where speed, security, and scalability are prerequisites.",
    services: [
      {
        icon: IconCode,
        title: "Custom Software Development",
        desc: "Scalable SaaS platforms, enterprise web applications, and robust API microservices.",
        href: "/services/software-development/",
        points: [
          "Next.js, Node.js & Python FastAPI architectures",
          "Custom ERPs, portals & internal tools",
          "Secure database design & cloud deployment",
        ],
      },
      {
        icon: IconCode,
        title: "Website Development",
        desc: "Next.js, PHP and headless CMS builds with clean, maintainable, sub-second code.",
        href: "/services/web-development/",
        points: [
          "Next.js / React or PHP stacks",
          "90+ PageSpeed performance targets",
          "Mobile-first responsive architecture",
        ],
      },
      {
        icon: IconCart,
        title: "Ecommerce Development",
        desc: "Fast storefronts that scale with your product catalogue and marketing campaigns.",
        href: "/services/ecommerce/",
        points: [
          "WooCommerce, Shopify & headless stores",
          "Product schema & merchant feed setup",
          "Sub-second checkout & CRO tuning",
        ],
      },
      {
        icon: IconGauge,
        title: "Performance Optimization",
        desc: "Core Web Vitals rescue and speed engineering to score 90+ on Google PageSpeed.",
        href: "/services/performance-optimization/",
        points: [
          "LCP, INP, and CLS Core Web Vitals rescue",
          "Image, caching & CDN optimization",
          "Database query tuning & TTFB reduction",
        ],
      },
    ],
  },
  {
    id: "automation",
    eyebrow: "AUTOMATION & AI AGENTS",
    title: "Intelligent systems that qualify and convert 24/7",
    intro:
      "Every lead captured in seconds, automated WhatsApp nurturing, and autonomous AI agents.",
    services: [
      {
        icon: IconWorkflow,
        title: "Custom CRM & Pipeline Automation",
        desc: "Centralized lead capture, sales Kanban pipelines, and automated WhatsApp follow-ups.",
        href: "/services/crm-solutions/",
        points: [
          "Instant lead ingestion from Google & Meta Ads",
          "Automated WhatsApp & email sequences",
          "Sales team call tracking & performance metrics",
        ],
      },
      {
        icon: IconBot,
        title: "AI Agents & Intelligent Chatbots",
        desc: "Autonomous conversational AI trained on your catalog to qualify leads 24/7.",
        href: "/services/ai-agents/",
        points: [
          "WhatsApp & website conversational AI",
          "RAG document search with zero hallucination",
          "Direct meeting booking into sales calendars",
        ],
      },
      {
        icon: IconWorkflow,
        title: "Marketing Automation",
        desc: "n8n and webhook-powered pipelines connecting website forms, CRMs, and ad platforms.",
        href: "/services/marketing-automation/",
        points: [
          "Lead capture & instant round-robin routing",
          "Automated payment reminders & invoices",
          "Cross-platform CRM integrations",
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    eyebrow: "INFRASTRUCTURE",
    title: "A solid foundation",
    intro:
      "Fast, secure hosting and DNS handled for you — one partner for the whole stack.",
    services: [
      {
        icon: IconServer,
        title: "Hosting & Domains",
        desc: "Managed hosting, domains and email configured for performance and deliverability.",
        points: [
          "VPS & managed hosting setup",
          "Domain registration & DNS management",
          "SSL, backups & uptime monitoring",
        ],
      },
    ],
  },
];

const servicesFaqs = [
  {
    q: "What digital marketing and web engineering services does PR Marketing Ventures provide in Ahmedabad?",
    a: "PR Marketing Ventures provides an integrated full-stack growth engine comprising Performance Marketing (Google & Meta Ads), Technical SEO, Generative Engine Optimization (GEO/AEO), high-speed Next.js web application development, custom CRM and WhatsApp sales automation pipelines, and autonomous conversational AI agents.",
  },
  {
    q: "Can businesses hire PR Marketing Ventures for a single focused service like SEO or web development?",
    a: "Yes. Clients can engage us for individual services such as a standalone Technical SEO audit & rescue, custom Next.js web build, or Meta Ads scaling, or deploy our unified growth engine where all disciplines work as one coordinated system.",
  },
  {
    q: "How does PR Marketing Ventures optimize client brands for ChatGPT and Google AI Overviews?",
    a: "We implement Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) by structuring extractable definition anchor blocks (#definition-block), interconnected JSON-LD schema graphs, statistical metrics, and entity knowledge feeds (llms.txt) that generative AI engines ingest and cite.",
  },
  {
    q: "What are your retainer pricing tiers for services in Ahmedabad?",
    a: "Our transparent service packages range from ₹15,000/month for the Essential Local tier (Google Business Profile & local SEO) to ₹35,000/month for Growth Engine, ₹65,000/month for Market Impact, and ₹1,20,000/month for Enterprise Empower multi-channel growth systems.",
  },
];

export default function Services() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateConnectedGraphSchema({
              pagePath: "/services/",
              pageTitle: metadata.title as string,
              pageDescription: metadata.description as string,
              pageType: "CollectionPage",
              breadcrumbs: [{ name: "Services", path: "/services/" }],
              service: {
                name: "Full-Stack Marketing, SEO & Web Engineering Services",
                description: metadata.description as string,
                serviceType: "Digital Marketing & Growth Engineering",
              },
              faqs: servicesFaqs,
            })
          ),
        }}
      />
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:gap-12 px-4 pb-16 pt-16 sm:px-6 md:pt-24 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent-dark">
              SERVICES DIRECTORY
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
              Everything your growth needs, engineered as one system.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Pick a single service or the full growth engine. Either way, every
              piece is built to work with the others — website, search, automation
              and infrastructure.
            </p>
            <AeoDefinitionCard
              term="Growth Engineering"
              category="AI Search & Executive Overview"
              definition="is a synchronized discipline at PR Marketing Ventures combining custom Next.js web development, technical SEO, Generative Engine Optimization (GEO/AEO), high-ROAS paid media advertising, and automated WhatsApp CRM pipelines to scale predictable revenue for businesses in Ahmedabad and globally."
              keyPoints={[
                "Sub-second Core Web Vitals & 90+ PageSpeed",
                "Connected 15-Point Schema & AI Knowledge Feeds",
                "Full Inbound Acquisition & Automated Follow-Up",
              ]}
            />
          </div>
          <div className="mt-4 lg:mt-0">
            <PrSeoHeroCard />
          </div>
        </div>
      </section>

      {groups.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          aria-labelledby={`heading-${group.id}`}
          className={gi % 2 === 1 ? "bg-slate-50" : undefined}
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Reveal>
              <p className="text-sm font-semibold tracking-wide text-accent-dark">
                {group.eyebrow}
              </p>
              <h2 id={`heading-${group.id}`} className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink">
                {group.title}
              </h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                {group.intro}
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {group.services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 2) * 90}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-200 hover:shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                        <s.icon />
                      </span>
                      <h3 className="font-heading text-lg font-semibold text-ink">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {s.desc}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {s.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <IconCheck
                            width={17}
                            height={17}
                            className="mt-0.5 shrink-0 text-accent-dark"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    {s.href && (
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link
                          href={s.href}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark transition-colors hover:text-primary"
                        >
                          Explore {s.title}
                          <IconArrowRight width={16} height={16} />
                        </Link>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Industry Specific Solutions */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="text-center">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            INDUSTRY SOLUTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink">
            Specialized marketing for your niche
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">
            We adapt our growth engineering framework to the unique demands of specific industries.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "E-Commerce & Retail Stores",
              desc: "Scaling online stores with product schema, Google Shopping ads, and sub-second checkout CRO.",
              icon: IconCart,
              href: "/industries/ecommerce/",
            },
            {
              title: "Real Estate & Developers",
              desc: "High-ticket buyer lead funnels, local Google Maps dominance, and automated WhatsApp nurturing.",
              icon: IconBuilding,
              href: "/industries/real-estate/",
            },
            {
              title: "Healthcare & Super-Specialty Clinics",
              desc: "Patient acquisition funnels, local map pack dominance, and medical E-E-A-T search authority.",
              icon: IconHeart,
              href: "/industries/healthcare/",
            },
            {
              title: "SaaS & Tech Companies",
              desc: "Product-led SEO, trial conversion funnels, and enterprise B2B paid media acquisition.",
              icon: IconWorkflow,
              href: "/industries/saas/",
            },
            {
              title: "B2B Manufacturing & Exporters",
              desc: "Industrial OEM search catalogs, export lead generation, and high-converting B2B inquiry portals.",
              icon: IconTarget,
              href: "/industries/manufacturing/",
            },
            {
              title: "Education & EdTech Institutions",
              desc: "Student admission campaigns, course launch funnels, and localized search visibility.",
              icon: IconSparkles,
              href: "/industries/education/",
            },
            {
              title: "Hospitality & Luxury Hotels",
              desc: "Direct booking engine optimization, local travel search dominance, and influencer PR.",
              icon: IconBuilding,
              href: "/industries/hospitality/",
            },
            {
              title: "Finance & CA Consultancy Firms",
              desc: "Corporate lead capture, advisory thought leadership SEO, and high-trust landing pages.",
              icon: IconShield,
              href: "/industries/finance-ca/",
            },
            {
              title: "Law Firms & Legal Advocates",
              desc: "High-intent client search rankings, case intake funnels, and localized practice area schema.",
              icon: IconTarget,
              href: "/industries/legal/",
            },
          ].map((ind, i) => (
            <Reveal key={ind.title} delay={i * 60}>
              <Link
                href={ind.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-primary hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div>
                  <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ind.icon />
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-ink group-hover:text-primary transition-colors">
                    {ind.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-accent-dark group-hover:underline">
                    Explore Framework
                  </span>
                  <IconArrowRight width={14} height={14} className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services FAQ Section (AEO & LLM Citation Target) */}
      <section className="bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              QUESTIONS &amp; ANSWERS
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Frequently Asked Questions About Our Services
            </h2>
            <p className="mt-3 text-slate-600">
              Clear, transparent answers about our growth engineering approach, deliverables, and retainers.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {servicesFaqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-ink">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        subtitle="Start with the free audit. We'll tell you exactly which of these services will move the needle first — and which you don't need yet."
      />
    </>
  );
}
