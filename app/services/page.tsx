import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
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
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing, SEO & Web Development Services | PR Marketing Ventures",
  description:
    "Full-stack marketing and growth services in Ahmedabad: digital marketing agency, Google & Meta ads, SEO, website development, local SEO, AI search optimization (GEO/AEO), and marketing automation.",
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

export default function Services() {
  const schemaServices = groups.flatMap((g) => 
    g.services.map(s => ({
      title: s.title,
      desc: s.desc,
      url: `/services/#${g.id}`
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema("Services", "/services/"),
            serviceSchema(schemaServices),
          ]),
        }}
      />
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            SERVICES
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Everything your growth needs, engineered as one system.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Pick a single service or the full growth engine. Either way, every
            piece is built to work with the others — website, search, automation
            and infrastructure.
          </p>
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
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "E-commerce marketing agency",
              desc: "Scaling online stores with product schema, shopping ads, and CRO.",
              icon: IconCart,
            },
            {
              title: "Real estate digital marketing",
              desc: "Lead generation funnels, local SEO, and WhatsApp automation for realtors.",
              icon: IconBuilding,
            },
            {
              title: "Healthcare SEO services",
              desc: "Trust-building content, local map pack dominance, and patient acquisition.",
              icon: IconHeart,
            },
            {
              title: "SaaS growth marketing agency",
              desc: "Product-led SEO, trial conversion funnels, and B2B LinkedIn ads.",
              icon: IconWorkflow,
            },
          ].map((ind, i) => (
            <Reveal key={ind.title} delay={i * 90}>
              <div className="flex h-full flex-col items-center text-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-amber-200 hover:-translate-y-1 transition-all duration-200">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <ind.icon />
                </span>
                <h3 className="font-heading text-base font-semibold text-ink">
                  {ind.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {ind.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure where to start?"
        subtitle="Start with the free audit. We'll tell you exactly which of these services will move the needle first — and which you don't need yet."
      />
    </>
  );
}
