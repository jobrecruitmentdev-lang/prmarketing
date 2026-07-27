import type { Metadata } from "next";
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
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Services — Web Development, SEO, AI SEO & Automation",
  description:
    "Full-stack growth services in Ahmedabad: website design and development, ecommerce, technical SEO, local SEO, AI SEO (GEO/AEO), marketing automation, AI chatbots, hosting and domains.",
  alternates: { canonical: "/services/" },
};

type Service = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  points: string[];
};

const groups: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  services: Service[];
}[] = [
  {
    id: "web",
    eyebrow: "WEB ENGINEERING",
    title: "Websites built to perform",
    intro:
      "Design and development where speed, SEO and conversion are requirements — not afterthoughts.",
    services: [
      {
        icon: IconLayout,
        title: "Website Design",
        desc: "Conversion-focused UI/UX with modern, accessible design systems.",
        points: [
          "Responsive, mobile-first layouts",
          "Brand-aligned design system",
          "Landing pages engineered for conversion",
        ],
      },
      {
        icon: IconCode,
        title: "Website Development",
        desc: "Next.js, PHP and CMS builds with clean, maintainable code.",
        points: [
          "Next.js / React or PHP stacks",
          "90+ PageSpeed performance targets",
          "CMS options for easy content editing",
        ],
      },
      {
        icon: IconCart,
        title: "Ecommerce Development",
        desc: "Fast storefronts that scale with your catalogue and campaigns.",
        points: [
          "WooCommerce & headless storefronts",
          "Payment, shipping & catalogue setup",
          "Product schema for rich results",
        ],
      },
      {
        icon: IconGauge,
        title: "Performance Optimization",
        desc: "Core Web Vitals rescue for slow sites that are losing rankings.",
        points: [
          "Core Web Vitals & Lighthouse audits",
          "Image, caching & CDN optimization",
          "Cloudflare setup and tuning",
        ],
      },
    ],
  },
  {
    id: "seo",
    eyebrow: "SEARCH & VISIBILITY",
    title: "Found everywhere search happens",
    intro:
      "Google rankings, the local map pack, and AI answers — one strategy that covers every place your customers look.",
    services: [
      {
        icon: IconSearch,
        title: "SEO & Technical SEO",
        desc: "Topical authority and technical excellence that compound over time.",
        points: [
          "Keyword & content cluster strategy",
          "On-page, schema & internal linking",
          "Crawlability, indexing & log analysis",
        ],
      },
      {
        icon: IconMapPin,
        title: "Local SEO & Google Business Profile",
        desc: "Dominate 'near me' searches across Ahmedabad and beyond.",
        points: [
          "Google Business Profile optimization",
          "Reviews, citations & NAP consistency",
          "Area-specific location pages",
        ],
      },
      {
        icon: IconSparkles,
        title: "AI SEO (GEO / AEO)",
        desc: "Optimization for generative engines — the next front of search.",
        points: [
          "Content structured for AI citation",
          "Entity & schema optimization",
          "Visibility in ChatGPT, Gemini & AI Overviews",
        ],
      },
    ],
  },
  {
    id: "automation",
    eyebrow: "AUTOMATION & AI",
    title: "Systems that work while you sleep",
    intro:
      "Every lead answered in seconds, every follow-up on time, every report delivered automatically.",
    services: [
      {
        icon: IconWorkflow,
        title: "Marketing & CRM Automation",
        desc: "n8n-powered pipelines connecting your forms, CRM, email and WhatsApp.",
        points: [
          "Lead capture & instant routing",
          "WhatsApp & email nurture sequences",
          "CRM setup and integration",
        ],
      },
      {
        icon: IconBot,
        title: "AI Chatbots & Agents",
        desc: "AI assistants trained on your business that qualify and convert 24/7.",
        points: [
          "Website & WhatsApp chatbots",
          "Lead qualification workflows",
          "FastAPI microservices for custom AI",
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
          className={gi % 2 === 1 ? "bg-slate-50" : undefined}
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <Reveal>
              <p className="text-sm font-semibold tracking-wide text-accent-dark">
                {group.eyebrow}
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink">
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
