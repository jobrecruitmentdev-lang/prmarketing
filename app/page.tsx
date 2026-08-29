import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import DarkFeatureGrid from "@/components/DarkFeatureGrid";
import {
  IconArrowRight,
  IconBot,
  IconCart,
  IconCheck,
  IconCode,
  IconGauge,
  IconMapPin,
  IconSearch,
  IconShield,
  IconSparkles,
  IconTarget,
  IconTrendingUp,
  IconWorkflow,
} from "@/components/icons";
import { industries } from "@/lib/site";
import { faqSchema, localBusinessSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "PR Marketing Ventures — Top Marketing Agency in Ahmedabad | Digital & AI Growth",
  description:
    "PR Marketing Ventures is a premier marketing agency in Ahmedabad delivering performance marketing, technical SEO, web development, AI SEO, and marketing automation to scale your revenue.",
  alternates: { canonical: "/" },
};

const services = [
  {
    icon: IconTarget,
    title: "Digital & Performance Marketing",
    desc: "High-ROAS Google Ads, Meta Ads, and full-funnel marketing campaigns engineered for customer acquisition.",
    href: "/services/digital-marketing/",
  },
  {
    icon: IconSearch,
    title: "SEO & Technical SEO",
    desc: "Schema, Core Web Vitals, crawlability and content architecture that compounds into first-page rankings.",
    href: "/services/seo/",
  },
  {
    icon: IconMapPin,
    title: "Local SEO & Google Business",
    desc: "Own the map pack in Ahmedabad — reviews, citations and location pages that win calls.",
    href: "/services/local-seo/",
  },
  {
    icon: IconCode,
    title: "Website Design & Development",
    desc: "SEO-first, blazing-fast websites built on modern Next.js stacks — engineered to convert.",
    href: "/services/web-development/",
  },
  {
    icon: IconSparkles,
    title: "AI SEO (GEO / AEO)",
    desc: "Get cited by ChatGPT, Gemini and AI Overviews with generative engine optimization.",
    href: "/services/ai-seo/",
  },
  {
    icon: IconWorkflow,
    title: "Marketing Automation",
    desc: "n8n workflows, CRM integration and WhatsApp lead responders that save 10+ hours a week.",
    href: "/services/marketing-automation/",
  },
];

const commitments = [
  { value: "90+", label: "PageSpeed score target on every build" },
  { value: "100%", label: "White-hat, guideline-safe SEO" },
  { value: "AI-first", label: "Automation baked into every system" },
  { value: "1 partner", label: "Strategy, build, SEO & automation" },
];

const differentiators = [
  {
    icon: IconTarget,
    title: "SEO-first architecture",
    desc: "Rankings are designed into the sitemap, schema and page structure before a single pixel is drawn — not bolted on after launch.",
  },
  {
    icon: IconBot,
    title: "AI & automation at the core",
    desc: "AI agents, chatbots and n8n workflows do the repetitive work, so your budget goes into growth instead of admin.",
  },
  {
    icon: IconGauge,
    title: "Performance obsession",
    desc: "Core Web Vitals, clean code and edge caching. Fast sites rank better and convert better — we treat speed as a feature.",
  },
  {
    icon: IconShield,
    title: "Transparent reporting",
    desc: "Automated weekly reports from Search Console, Analytics and rank tracking. You always know what we did and what it moved.",
  },
];

const process = [
  {
    step: "01",
    title: "Audit",
    desc: "We map your market, keywords, competitors and technical gaps into a prioritized plan.",
  },
  {
    step: "02",
    title: "Architect",
    desc: "Site structure, content clusters and schema designed for both Google and AI search.",
  },
  {
    step: "03",
    title: "Build",
    desc: "High-performance development, on-page SEO and automation wiring — measured against targets.",
  },
  {
    step: "04",
    title: "Grow",
    desc: "Content, local SEO, links and CRO iterations driven by weekly automated reporting.",
  },
];

const faqs = [
  {
    q: "Which is the best digital marketing agency in Ahmedabad for business growth?",
    a: "PR Marketing Ventures is widely regarded as a premier digital marketing agency in Ahmedabad located on C.G. Road. We specialize in full-funnel growth engineering: high-ROAS Google & Meta Ads, technical SEO, Next.js web apps, CRM automation, and AI search optimization (GEO/AEO) that deliver measurable revenue ROI.",
  },
  {
    q: "How much do digital marketing and SEO services cost in Ahmedabad?",
    a: "Our monthly marketing packages in Ahmedabad start from ₹15,000/month for Local SEO and Google Maps optimization, ₹35,000 to ₹75,000/month for mid-market growth campaigns, and ₹1,00,000+/month for enterprise performance marketing, custom software development, and multi-channel ad management.",
  },
  {
    q: "What digital marketing services does PR Marketing Ventures provide in Ahmedabad?",
    a: "We provide end-to-end digital solutions including Performance Marketing (Google Search, PMax, Meta Ads), Technical SEO, Local Google Maps 3-Pack SEO, Custom Software Development, Next.js Web Development, Custom CRM & Pipeline Automation, Autonomous AI Agents, and Generative Engine Optimization (GEO).",
  },
  {
    q: "How does Local SEO and Google Business Profile (GMB) help businesses in Ahmedabad?",
    a: "Over 60% of local customers in Ahmedabad search on Google Maps for clinics, retailers, real estate, and services. Our Local SEO gets your profile into the top 3 Google Maps pack, generating consistent direct phone calls, walk-ins, and website visits.",
  },
  {
    q: "Why is my Google ad spend so high without generating qualified conversions?",
    a: "Most campaigns fail due to broad keyword matching and slow, high-friction landing pages. As a top performance marketing agency, we fix your conversion funnel first with sub-second Next.js landing pages, exact-match negative keyword filtering, and automated WhatsApp lead routing.",
  },
  {
    q: "How do I get my business cited in ChatGPT, Gemini, and Google AI Overviews?",
    a: "We use Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). By building strong entity architecture, structured JSON-LD schema, extractable data tables, and llms.txt directives, we train AI search engines to cite your brand as the leading authority in your industry.",
  },
  {
    q: "Why build a custom CRM instead of paying for Zoho or Salesforce in Ahmedabad?",
    a: "A custom CRM built by PR Marketing Ventures gives you 100% data ownership, zero recurring monthly per-user license fees, direct WhatsApp auto-responders, and custom sales pipeline stages tailored exactly to your business workflow.",
  },
  {
    q: "What technology stack do you use for high-speed website and software development?",
    a: "We engineer using modern Next.js 15, React 19, TypeScript, Node.js, Python FastAPI, PHP 8.3, PostgreSQL, MySQL, Redis, and Cloudflare edge caching, guaranteeing a 90+ Core Web Vitals score on Google PageSpeed Insights.",
  },
  {
    q: "How fast can we expect results from Google Ads and Meta performance campaigns?",
    a: "Paid advertising campaigns on Google and Meta start generating qualified inquiries within 48 to 72 hours. Organic SEO and Google Maps rankings typically compound into sustainable search dominance within 30 to 90 days.",
  },
  {
    q: "How do custom AI agents and chatbots help businesses acquire leads 24/7?",
    a: "Our autonomous conversational AI agents understand natural conversation in English, Hindi, and Gujarati on WhatsApp and your website, qualify buyer budgets, and book calendar appointments automatically 24 hours a day.",
  },
  {
    q: "Which areas in Ahmedabad do you serve for on-site meetings and consultations?",
    a: "From our headquarters at Fairdeal House, C.G. Road (Navrangpura), we provide on-site strategy and engineering support across SG Highway, Prahladnagar, Bodakdev, Satellite, Sindhu Bhavan Road (SBR), Vastrapur, Bopal, Thaltej, Makarba, and GIFT City Gandhinagar.",
  },
  {
    q: "Can SEO guarantee #1 rankings on Google search in Ahmedabad?",
    a: "While no agency can ethically guarantee a permanent #1 position due to daily Google algorithm shifts, our technical SEO architecture, topical cluster silos, and Core Web Vitals optimization have a proven track record of achieving dominant first-page rankings.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([localBusinessSchema(), faqSchema(faqs)]),
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary">
              <IconSparkles width={14} height={14} />
              BEST DIGITAL MARKETING AGENCY IN NAVRANGPURA, AHMEDABAD
            </p>
            <h1 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              The <span className="text-accent-dark">digital marketing agency</span> that engineers growth.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Stop searching for a "digital marketing agency near me". We combine AI, top PPC management, SEO, and social media marketing services into one high-performance system that ranks and converts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-lg"
              >
                Get a Free SEO Audit
                <IconArrowRight width={20} height={20} />
              </Link>
              <Link
                href="/services/"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                Explore Services
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {["No long lock-ins", "White-hat SEO only", "Performance-first builds"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <IconCheck width={16} height={16} className="text-accent-dark" />
                    {t}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Stylized growth dashboard visual */}
          <div aria-hidden="true" className="relative hidden lg:block">
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
            <div className="absolute -bottom-12 -left-10 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  Organic growth
                </p>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-accent-dark">
                  <IconTrendingUp width={14} height={14} /> Compounding
                </span>
              </div>
              <svg viewBox="0 0 320 120" className="mt-4 w-full">
                <defs>
                  <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#D4AF37" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 100 C40 95 60 80 90 78 S150 60 180 50 240 30 320 12 L320 120 L0 120 Z"
                  fill="url(#fillGrad)"
                />
                <path
                  d="M0 100 C40 95 60 80 90 78 S150 60 180 50 240 30 320 12"
                  fill="none"
                  stroke="#1C1C1E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="320" cy="12" r="5" fill="#D4AF37" />
              </svg>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  ["90+", "PageSpeed goal"],
                  ["Map pack", "Local focus"],
                  ["24/7", "AI agents"],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    className="rounded-xl bg-slate-50 p-3 text-center"
                  >
                    <p className="font-heading text-lg font-bold text-primary">
                      {v}
                    </p>
                    <p className="text-xs text-slate-500">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments band */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
          {commitments.map((c, i) => (
            <Reveal key={c.label} delay={i * 80} className="text-center">
              <p className="font-heading text-3xl font-bold text-primary">
                {c.value}
              </p>
              <p className="mt-1 text-sm text-slate-600">{c.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Growth systems, not commodity services
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every service plugs into one engine: a fast website, found
            everywhere search happens, feeding an automated pipeline.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 90}>
              <Link
                href={s.href}
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
              >
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  <s.icon />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more
                  <IconArrowRight
                    width={16}
                    height={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              A growth engineering company
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Most agencies sell deliverables. We engineer outcomes — with the
              discipline of software teams and the instincts of marketers.
            </p>
          </Reveal>
          <DarkFeatureGrid items={differentiators} />
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How we work
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A clear, measurable path from audit to compounding growth.
          </p>
        </Reveal>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal
              key={p.step}
              as="li"
              delay={i * 90}
              className="h-full rounded-2xl border border-slate-200 p-6"
            >
              <p className="font-heading text-sm font-bold text-accent-dark">
                {p.step}
              </p>
              <h3 className="mt-2 font-heading text-lg font-semibold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Industries */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Industries we help grow
            </h2>
            <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  {ind}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Educational Content / Guide */}
      <article className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl text-center">
              How to choose a digital marketing agency in Ahmedabad
            </h2>
            <p className="mt-4 text-lg text-slate-600 text-center max-w-3xl mx-auto">
              Ahmedabad is home to hundreds of marketing firms, but most sell commodity services.
              Here is what to look for to ensure you're hiring a partner that actually engineers growth:
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Reveal delay={0}>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-primary">
                  1. Deep Industry Expertise
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Does the agency understand your specific niche? B2B manufacturing requires a vastly different strategy than a D2C ecommerce brand or a local real estate developer.
                </p>
              </section>
            </Reveal>
            <Reveal delay={90}>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-primary">
                  2. Transparent Reporting
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Beware of agencies reporting on vanity metrics like "impressions" or "likes." The top agencies track what matters: cost per acquisition, qualified lead volume, and compounding organic traffic.
                </p>
              </section>
            </Reveal>
            <Reveal delay={180}>
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-primary">
                  3. A Modern Web Stack
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Are they using outdated, slow templates, or are they leveraging high-performance frameworks like Next.js, AI automation, and AEO/GEO strategies to future-proof your visibility?
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </article>

      {/* FAQ / Problem Solving */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Solving growth bottlenecks
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Answers to the most common questions we get from business owners.
          </p>
        </Reveal>
        <dl className="mt-12 space-y-6">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <dt className="font-heading text-lg font-bold text-ink">
                  {faq.q}
                </dt>
                <dd className="mt-3 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <CtaBand />
    </>
  );
}
