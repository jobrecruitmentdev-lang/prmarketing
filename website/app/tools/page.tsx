import React from "react";
import Link from "next/link";
import { IconSearch, IconStar, IconMessageCircle, IconCheck, IconZap } from "@/components/icons";
import { multiBreadcrumbSchema, webPageSchema } from "@/lib/seo";

export const metadata = {
  title: "Free Digital Marketing & SEO Growth Tools | PR Marketing",
  description:
    "Access free digital marketing and SEO growth tools by PR Marketing Ventures: WhatsApp link generator, Google review QR builder, and domain authority checker.",
  alternates: {
    canonical: "/tools/",
  },
};

const freeTools = [

  {
    title: "Website Domain Authority (DA) & PA Checker",
    description:
      "Audit real-time Website Domain Authority, Page Authority, Spam Score, and total linking root domains for any website instantly.",
    href: "/tools/domain-authority-checker/",
    badge: "Most Popular",
    icon: IconSearch,
    features: [
      "Real-time Search Authority & Quality score (1-100)",
      "Spam Score & Toxic link penalty detector",
      "Referring root domains & total backlink volume",
      "Actionable SEO ranking recommendations",
    ],
  },
  {
    title: "Google Review QR Code & Standee Generator",
    description:
      "Generate printable, high-resolution table counter standees and direct review links to get 5x more 5-star Google reviews from walk-in customers.",
    href: "/tools/google-review-qr-generator/",
    badge: "High Conversion",
    icon: IconStar,
    features: [
      "Customizable business name & review headline",
      "3 Luxury & Modern card design themes",
      "HD Printable PNG Standee download (800x1100)",
      "Ranks your business higher in Google Maps 3-Pack",
    ],
  },
  {
    title: "WhatsApp Direct Click-to-Chat Link & QR Generator",
    description:
      "Create direct WhatsApp chat links with pre-filled enquiry messages and scannable QR codes for your Instagram bio, website, and ads.",
    href: "/tools/whatsapp-link-generator/",
    badge: "100% Free",
    icon: IconMessageCircle,
    features: [
      "Instant https://wa.me/ direct chat link builder",
      "Pre-filled lead qualification message templates",
      "Ready-to-use HTML button widget embed code",
      "Scannable print-ready QR code for flyers & cards",
    ],
  },
];

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-[#EDE4D8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Tools", path: "/tools/" },
            ]),
            webPageSchema("CollectionPage", metadata.title, metadata.description, "/tools/"),
          ]),
        }}
      />
      {/* Hero Header — Clean White Background with Sharp Black/Dark Text */}
      <section className="relative overflow-hidden border-b border-[#D8CBB9] bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            <IconZap className="w-3.5 h-3.5 text-primary" /> Free Business Growth Suite
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Free Utilities to Scale Your Business & Leads
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Essential tools used by business owners, doctors, clinics, retailers, and real estate developers across Ahmedabad and India to capture leads and boost authority.
          </p>
        </div>
      </section>

      {/* Tools Section — Dark Cream / Warm Stone Background with Luxury Dark Charcoal Cards */}
      <section className="relative bg-[#EDE4D8] px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {freeTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.href}
                  className="flex flex-col justify-between rounded-3xl border border-[#3d2719] bg-[#1f140e] p-6 sm:p-7 lg:p-8 text-[#fdfbf7] shadow-2xl transition-all duration-300 hover:border-[#d4af37]/70 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4a3424] bg-[#2a1d15] text-[#d4af37]">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="rounded-full bg-[#2d1e15] px-3 py-1 text-[11px] font-semibold text-[#e5c07b] border border-[#4a3424]">
                        {tool.badge}
                      </span>
                    </div>

                    <h2 className="mt-5 font-heading text-xl font-bold text-[#fdfbf7]">
                      {tool.title}
                    </h2>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#d9cebe] leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="mt-6 border-t border-[#382415] pt-5">
                      <span className="text-[11px] font-semibold text-[#b5a898] uppercase tracking-wider">
                        Key Features:
                      </span>
                      <ul className="mt-2.5 space-y-2 text-xs text-[#d9cebe]">
                        {tool.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <IconCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Link
                      href={tool.href}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] py-3.5 text-sm font-bold text-[#140d09] shadow-md transition-all hover:bg-[#c5a059]"
                    >
                      <span>Launch Free Tool →</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 sm:mt-16 rounded-3xl border border-[#3d2719] bg-[#1f140e] p-6 sm:p-10 md:p-12 text-center text-[#fdfbf7] shadow-2xl">
            <h3 className="font-heading text-2xl font-bold text-[#fdfbf7] sm:text-3xl">
              Want us to manage your Full-Funnel Marketing & Growth?
            </h3>
            <p className="mt-3 text-sm text-[#d9cebe] max-w-2xl mx-auto leading-relaxed">
              From technical SEO, Google Ads, and custom CRM automation to 360° offline branding and personal PR — PR Marketing Ventures delivers guaranteed results.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact/"
                className="w-full sm:w-auto text-center rounded-2xl bg-[#d4af37] px-8 py-3.5 text-sm font-bold text-[#140d09] shadow-md hover:bg-[#c5a059] transition-all"
              >
                Get a Free Growth Audit →
              </Link>
              <Link
                href="/services/"
                className="w-full sm:w-auto text-center rounded-2xl border border-[#4a3424] bg-[#2a1d15] px-6 py-3.5 text-sm font-semibold text-[#fdfbf7] hover:border-[#d4af37] transition-all"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
