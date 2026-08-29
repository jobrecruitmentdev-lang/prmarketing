import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import { IconArrowRight, IconCheck } from "@/components/icons";

export interface AhmedabadPageConfig {
  slug: string;
  badge: string;
  h1: string;
  tldr: string;
  heroSubtitle: string;
  serviceType: string;
  metaDescription: string;
  capabilities: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    desc: string;
    points?: string[];
  }[];
  table?: {
    title: string;
    headers: string[];
    rows: { col1: string; col2: string; col3: string }[];
  };
  faqs: { q: string; a: string }[];
}

const ahmedabadLocalities = [
  "C.G. Road (Headquarters)",
  "SG Highway",
  "Prahladnagar",
  "Satellite",
  "Bodakdev",
  "Vastrapur",
  "Navrangpura",
  "Bopal",
  "Thaltej",
  "Makarba",
  "Maninagar",
  "Gota",
  "Chandkheda",
  "Science City",
  "Ambawadi",
  "Iscon Cross Roads",
  "Ellisbridge",
  "Nikol",
  "Naroda",
  "GIFT City Gandhinagar",
];

export default function AhmedabadLandingPage({ config }: { config: AhmedabadPageConfig }) {
  const urlPath = `/${config.slug}/`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: config.badge, path: urlPath },
            ]),
            singleServiceSchema({
              name: config.h1,
              description: config.metaDescription,
              url: urlPath,
              serviceType: config.serviceType,
              areaServed: "Ahmedabad, Gujarat, India",
            }),
            faqSchema(config.faqs),
          ]),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">{config.badge}</span>
          </nav>

          {/* AEO Direct Answer Summary Box */}
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/60 p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-accent-dark">
              TL;DR — {config.badge}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-700">
              {config.tldr}
            </p>
          </div>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            {config.badge.toUpperCase()}
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-3xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {config.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            {config.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Get Free Ahmedabad Consultation
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Service Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            CORE CAPABILITIES & SOLUTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Everything Your Business Needs to Grow in Ahmedabad
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {config.capabilities.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary mb-4">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="font-heading text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
                {item.points && (
                  <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                    {item.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs text-slate-700">
                        <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-accent-dark" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Table Section (if provided) */}
      {config.table && (
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl mb-6">
            {config.table.title}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  {config.table.headers.map((h, idx) => (
                    <th key={h} className={`p-4 font-semibold ${idx === 1 ? "text-primary" : "text-ink"}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {config.table.rows.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-medium text-slate-800">{row.col1}</td>
                    <td className="p-4 font-semibold text-ink">{row.col2}</td>
                    <td className="p-4 text-slate-600">{row.col3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Localities Section */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-soft/80 to-white p-8 md:p-12">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Serving Businesses Across All Ahmedabad & Gujarat Hubs
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed max-w-3xl text-sm">
            We deliver on-site strategy, technical support, and dedicated account management for clients throughout Ahmedabad's primary commercial sectors:
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {ahmedabadLocalities.map((loc) => (
              <span key={loc} className="rounded-full bg-white border border-primary/20 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
                📍 {loc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Frequently Asked Questions in Ahmedabad
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {config.faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 30}>
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
        title={`Ready to scale your business in Ahmedabad?`}
        subtitle="Book a 30-minute growth diagnostic session with our local engineering and marketing specialists on C.G. Road."
      />
    </>
  );
}
