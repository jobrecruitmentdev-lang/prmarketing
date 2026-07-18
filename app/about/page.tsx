import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import DarkFeatureGrid from "@/components/DarkFeatureGrid";
import { breadcrumbSchema } from "@/lib/seo";
import {
  IconCheck,
  IconGauge,
  IconShield,
  IconTarget,
  IconTrendingUp,
  IconUsers,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us — Growth Engineering, Not Just Marketing",
  description:
    "PR Marketing Ventures is an AI-powered growth and technology agency in Ahmedabad. Learn why we build growth systems instead of selling commodity marketing services.",
  alternates: { canonical: "/about/" },
};

const values = [
  {
    icon: IconTarget,
    title: "Outcomes over deliverables",
    desc: "A website is not the goal. Rankings, enquiries and revenue are. Everything we ship is tied to a measurable target.",
  },
  {
    icon: IconShield,
    title: "White-hat, always",
    desc: "No shortcuts that risk your domain. Guideline-safe SEO and honest reporting — even when the honest number is small.",
  },
  {
    icon: IconGauge,
    title: "Engineering discipline",
    desc: "Version control, performance budgets, automated testing and monitoring. Marketing built like software.",
  },
  {
    icon: IconUsers,
    title: "Local-first partnership",
    desc: "We start where we live — Ahmedabad. Face-to-face understanding of your market before we scale you beyond it.",
  },
];

const pillars = [
  {
    title: "SEO-first web engineering",
    desc: "High-performance websites on modern stacks (Next.js, headless, PHP) with schema, Core Web Vitals and crawl architecture designed in from day one.",
  },
  {
    title: "Search everywhere",
    desc: "Traditional Google rankings, the local map pack, and the new frontier — AI answers in ChatGPT, Gemini and AI Overviews (GEO/AEO).",
  },
  {
    title: "Automation & AI agents",
    desc: "n8n workflows, CRM automation, WhatsApp and email pipelines, AI chatbots — systems that respond to leads in seconds, not hours.",
  },
  {
    title: "Continuous measurement",
    desc: "Search Console, Analytics, rank tracking and uptime feed automated weekly reports. Decisions come from data, not opinions.",
  },
];

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema("About", "/about/")),
        }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            ABOUT PR MARKETING VENTURES
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            We left the &ldquo;typical agency&rdquo; playbook behind.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Most agencies in Ahmedabad still sell the same bundle: a website, some
            SEO, a few ads. We started PR Marketing Ventures to do something
            different — engineer complete growth systems where AI, automation,
            technical SEO and web performance work as one machine.
          </p>
        </div>
      </section>

      {/* Story / positioning */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-ink">
              Why &ldquo;growth engineering&rdquo;?
            </h2>
            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed">
              <p>
                Search has changed. Your customers ask Google, Maps, ChatGPT and
                Instagram — sometimes all four — before they call anyone. A
                brochure website with bolted-on SEO can&rsquo;t win that game.
              </p>
              <p>
                Winning takes a system: a technically excellent website, content
                architected for topical authority, local signals that dominate
                the map pack, structured data that AI engines can cite, and
                automation that captures and nurtures every lead instantly.
              </p>
              <p>
                That is what we build. One integrated system, one accountable
                partner, measured weekly.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-ink">
                <IconTrendingUp className="text-accent-dark" />
                What a growth system includes
              </h3>
              <ul className="mt-5 space-y-3">
                {[
                  "SEO-first website architecture & development",
                  "Technical SEO, schema & Core Web Vitals",
                  "Local SEO & Google Business Profile management",
                  "AI SEO — visibility in ChatGPT, Gemini & AI Overviews",
                  "Marketing & CRM automation with n8n and AI agents",
                  "Automated analytics, rank tracking & weekly reports",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <IconCheck
                      width={18}
                      height={18}
                      className="mt-0.5 shrink-0 text-accent-dark"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              What we stand for
            </h2>
          </Reveal>
          <DarkFeatureGrid items={values} />
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            The four pillars of our work
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 90}>
              <div className="h-full rounded-2xl border border-slate-200 p-6">
                <p className="font-heading text-sm font-bold text-accent-dark">
                  PILLAR {i + 1}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Let's talk about your growth"
        subtitle="Tell us where your business is today — we'll show you the system that gets it found, chosen and scaled."
      />
    </>
  );
}
