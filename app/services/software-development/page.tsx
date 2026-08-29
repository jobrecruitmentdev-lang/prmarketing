import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import {
  IconCode,
  IconServer,
  IconGauge,
  IconSparkles,
  IconCheck,
  IconArrowRight,
  IconWorkflow,
  IconTarget,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Custom Software Development Company in Ahmedabad | Web & Enterprise Apps | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a premier custom software development company in Ahmedabad, Gujarat. We build scalable SaaS platforms, enterprise web apps, custom ERPs, and high-speed Next.js/Node.js solutions.",
  alternates: { canonical: "/services/software-development/" },
};

const faqs = [
  {
    q: "Why choose PR Marketing Ventures for software development in Ahmedabad?",
    a: "Unlike generic IT staffing agencies, PR Marketing Ventures builds high-performance, conversion-focused software architectures. We specialize in Next.js, Node.js, Python FastAPI, and cloud-native databases that achieve 90+ Core Web Vitals, enterprise security, and seamless API integrations.",
  },
  {
    q: "What types of custom software solutions do you develop?",
    a: "We develop custom CRM systems, B2B SaaS platforms, enterprise workflow automation portals, inventory/ERP management systems, custom booking engines, and REST/GraphQL API microservices.",
  },
  {
    q: "Which technology stack do you use for software development?",
    a: "Our core stack includes TypeScript, Next.js, React, Node.js, Python (FastAPI/Django), PHP/Laravel, PostgreSQL, MySQL, Redis, Docker, and AWS/Cloudflare edge infrastructure.",
  },
  {
    q: "Do you provide post-launch maintenance, security patches, and cloud monitoring?",
    a: "Yes. Every software project includes automated CI/CD deployment pipelines, uptime monitoring, daily database backups, SSL/security hardening, and dedicated SLA support in Ahmedabad.",
  },
  {
    q: "Which areas in Ahmedabad do you serve for on-site software consultations?",
    a: "We serve businesses across C.G. Road (Headquarters), SG Highway, Prahlad Nagar, Bodakdev, Satellite, Sindhu Bhavan Road (SBR), Navrangpura, Vastrapur, Makarba, and Gandhinagar (GIFT City).",
  },
];

const capabilities = [
  {
    icon: IconCode,
    title: "Custom SaaS & Web Application Development",
    desc: "Scalable multi-tenant SaaS architectures, customer portals, and real-time dashboards built on Next.js and TypeScript.",
  },
  {
    icon: IconServer,
    title: "Enterprise Backend & API Engineering",
    desc: "Robust REST & GraphQL microservices, database architecture (PostgreSQL/MySQL), caching with Redis, and cloud infrastructure.",
  },
  {
    icon: IconWorkflow,
    title: "Internal Tools & Custom ERP Portals",
    desc: "Custom business management tools, order tracking, team workflows, and automated reporting systems tailored to your business operations.",
  },
  {
    icon: IconGauge,
    title: "High-Performance Architecture & Refactoring",
    desc: "Modernizing legacy PHP/Node codebases into sub-second, secure, and auto-scaling modern web applications.",
  },
];

export default function SoftwareDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Software Development", path: "/services/software-development/" },
            ]),
            singleServiceSchema({
              name: "Custom Software Development Company in Ahmedabad",
              description: metadata.description as string,
              url: "/services/software-development/",
              serviceType: "Software Development Company",
              areaServed: "Ahmedabad, Gujarat, India",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">Software Development</span>
          </nav>

          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — Custom Software & Web App Engineering in Ahmedabad
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              <strong>PR Marketing Ventures</strong> is Ahmedabad's leading custom software development agency. Located on C.G. Road, we engineer enterprise web applications, B2B SaaS platforms, custom CRM systems, and high-throughput APIs that streamline business operations and scale revenue.
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            SOFTWARE DEVELOPMENT COMPANY IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Custom Software Development Engineered for Scale & Reliability.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            We transform complex operational workflows into high-speed, secure, and intuitive web applications. Built on modern Next.js, Node.js, and cloud architectures.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Discuss Your Software Project
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Completed Applications
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            ENGINEERING EXPERTISE
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            End-to-End Custom Software Development Services
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tech Stack Comparison Table */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            MODERN TECHNOLOGY STACK
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            High-Performance Technologies We Build With
          </h2>
        </Reveal>

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-ink">Layer</th>
                <th className="p-4 font-semibold text-primary">Primary Stack</th>
                <th className="p-4 font-semibold text-slate-600">Business Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium">Frontend / UI</td>
                <td className="p-4 font-semibold text-ink">Next.js 15, React 19, TailwindCSS, TypeScript</td>
                <td className="p-4 text-slate-600">Sub-second page transitions, perfect SEO indexing, 90+ Core Web Vitals</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Backend & APIs</td>
                <td className="p-4 font-semibold text-ink">Node.js, Express, Python FastAPI, PHP 8.3 / Laravel</td>
                <td className="p-4 text-slate-600">High-concurrency request handling, real-time WebSockets, microservices</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Database & Cache</td>
                <td className="p-4 font-semibold text-ink">PostgreSQL, MySQL, Redis, MongoDB</td>
                <td className="p-4 text-slate-600">ACID compliance, microsecond in-memory caching, zero data loss</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">DevOps & Cloud</td>
                <td className="p-4 font-semibold text-ink">Docker, GitHub Actions, AWS, Cloudflare Edge</td>
                <td className="p-4 text-slate-600">Automated 1-click CI/CD deployments, DDoS protection, 99.9% uptime</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ahmedabad Localities */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-soft/80 to-white p-8 md:p-12">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Software Development Services Across Ahmedabad & Gujarat
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl">
            We provide on-site technical architecture consultations, sprint planning, and dedicated engineering support for enterprises, startups, and mid-sized businesses located in:
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              "C.G. Road (Headquarters)",
              "SG Highway",
              "Prahlad Nagar",
              "Bodakdev",
              "Sindhu Bhavan Road (SBR)",
              "Satellite",
              "Navrangpura",
              "Vastrapur",
              "Ashram Road",
              "Makarba",
              "Sanand GIDC",
              "GIFT City Gandhinagar",
            ].map((loc) => (
              <span key={loc} className="rounded-full bg-white border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                📍 {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Software Development FAQs
          </h2>
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
        title="Ready to build custom software for your business?"
        subtitle="Schedule a technical discovery session with our senior software engineers in Ahmedabad."
      />
    </>
  );
}
