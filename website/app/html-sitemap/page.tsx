import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema } from "@/lib/seo";
import { IconSparkles, IconMapPin, IconSearch, IconCode, IconBuilding, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "HTML Sitemap & Complete Website Index | PR Marketing",
  description:
    "Explore the full HTML sitemap and directory of PR Marketing Ventures in Ahmedabad. Find all marketing services, industry solutions, and growth tools easily.",
  alternates: { canonical: "/html-sitemap/" },
};

const companyPages = [
  { title: "Homepage — PR Marketing Ventures", href: "/", desc: "Global AI-Powered Growth Agency, Performance Marketing & SEO" },
  { title: "About Us & Company Vision", href: "/about/", desc: "Our methodology, growth engineering philosophy, and Ahmedabad headquarters" },
  { title: "Pricing & Service Packages", href: "/pricing/", desc: "Transparent retainer models, deliverables, and performance pricing" },
  { title: "Portfolio & Engineering Work", href: "/portfolio/", desc: "High-performance websites, client case studies, and systems engineered" },
  { title: "Services Overview Directory", href: "/services/", desc: "All 14 core growth, SEO, software, and automation services" },
  { title: "Contact & Free Growth Diagnostic", href: "/contact/", desc: "Get in touch for complimentary technical SEO and website audits" },
  { title: "Ahmedabad Localities Directory", href: "/locations/ahmedabad/", desc: "Coverage across C.G. Road, SG Highway, Prahladnagar, and GIFT City" },
];

const coreServicePages = [
  { title: "Digital Marketing Agency", href: "/services/digital-marketing/" },
  { title: "Custom Software Development", href: "/services/software-development/" },
  { title: "Custom CRM & Pipeline Automation", href: "/services/crm-solutions/" },
  { title: "AI Agents & Intelligent Chatbots", href: "/services/ai-agents/" },
  { title: "Google Business Profile (GMB) Management", href: "/services/google-business-profile/" },
  { title: "Performance Optimization & Speed Rescue", href: "/services/performance-optimization/" },
  { title: "Performance Marketing & Paid Ads", href: "/services/performance-marketing/" },
  { title: "International SEO & Geotargeting", href: "/services/international-seo/" },
  { title: "SEO & Technical Search Architecture", href: "/services/seo/" },
  { title: "Local SEO & Google Maps Dominance", href: "/services/local-seo/" },
  { title: "Modern Website Development (Next.js)", href: "/services/web-development/" },
  { title: "Ecommerce Web & Storefront Scaling", href: "/services/ecommerce/" },
  { title: "AI SEO (Generative Engine GEO / AEO)", href: "/services/ai-seo/" },
  { title: "Marketing Automation (n8n & Webhooks)", href: "/services/marketing-automation/" },
];

const ahmedabadMarketingPages = [
  { title: "Marketing Agency in Ahmedabad", href: "/marketing-agency-ahmedabad/" },
  { title: "Digital Marketing Agency in Ahmedabad", href: "/digital-marketing-agency-ahmedabad/" },
  { title: "SEO Agency in Ahmedabad", href: "/seo-agency-ahmedabad/" },
  { title: "Local SEO Company in Ahmedabad", href: "/local-seo-ahmedabad/" },
  { title: "Google Business Profile Management Ahmedabad", href: "/google-business-profile-management-ahmedabad/" },
  { title: "Performance Marketing in Ahmedabad", href: "/performance-marketing-ahmedabad/" },
  { title: "Performance Marketing Agency Ahmedabad", href: "/performance-marketing-agency-ahmedabad/" },
  { title: "Lead Generation Agency in Ahmedabad", href: "/lead-generation-agency-ahmedabad/" },
  { title: "Social Media Marketing Agency Ahmedabad", href: "/social-media-marketing-agency-ahmedabad/" },
  { title: "Social Media Marketing in Ahmedabad", href: "/social-media-marketing-ahmedabad/" },
  { title: "Google Ads (PPC) Agency Ahmedabad", href: "/google-ads-agency-ahmedabad/" },
  { title: "Marketing Automation Agency Ahmedabad", href: "/marketing-automation-ahmedabad/" },
  { title: "AI Marketing Agency in Ahmedabad", href: "/ai-marketing-agency-ahmedabad/" },
  { title: "B2B Marketing Agency in Ahmedabad", href: "/b2b-marketing-agency-ahmedabad/" },
  { title: "Branding Agency in Ahmedabad", href: "/branding-agency-ahmedabad/" },
  { title: "Pharma Marketing Agency in Ahmedabad", href: "/pharma-marketing-agency-ahmedabad/" },
];

const ahmedabadTechPages = [
  { title: "GEO (Generative Engine Optimization) Agency Ahmedabad", href: "/geo-agency-ahmedabad/" },
  { title: "AEO (Answer Engine Optimization) Agency Ahmedabad", href: "/aeo-agency-ahmedabad/" },
  { title: "AI Search Optimization Agency Ahmedabad", href: "/ai-search-optimization-ahmedabad/" },
  { title: "AI Agency in Ahmedabad", href: "/ai-agency-ahmedabad/" },
  { title: "AI Agents Development in Ahmedabad", href: "/ai-agents-ahmedabad/" },
  { title: "AI Automation Agency in Ahmedabad", href: "/ai-automation-ahmedabad/" },
  { title: "Business Automation Services Ahmedabad", href: "/business-automation-ahmedabad/" },
  { title: "Custom CRM Development Ahmedabad", href: "/crm-development-ahmedabad/" },
  { title: "CRM Automation Services Ahmedabad", href: "/crm-automation-ahmedabad/" },
  { title: "Custom Software Development Ahmedabad", href: "/software-development-ahmedabad/" },
  { title: "Web Development Company in Ahmedabad", href: "/web-development-ahmedabad/" },
  { title: "Website Design Agency in Ahmedabad", href: "/website-design-ahmedabad/" },
  { title: "Website Development in Ahmedabad", href: "/website-development-ahmedabad/" },
  { title: "Ecommerce Development in Ahmedabad", href: "/ecommerce-development-ahmedabad/" },
  { title: "Ecommerce Website Development Ahmedabad", href: "/ecommerce-website-development-ahmedabad/" },
  { title: "Conversion Rate Optimization (CRO) Ahmedabad", href: "/conversion-rate-optimization-ahmedabad/" },
  { title: "Website Performance & Speed Optimization Ahmedabad", href: "/website-performance-optimization-ahmedabad/" },
];

const industryPages = [
  { title: "Real Estate Digital Marketing & Lead Funnels", href: "/industries/real-estate/" },
  { title: "Healthcare, Hospitals & Clinic SEO", href: "/industries/healthcare/" },
  { title: "Manufacturing & Industrial B2B Marketing", href: "/industries/manufacturing/" },
  { title: "Education, Colleges & EdTech Marketing", href: "/industries/education/" },
  { title: "Hospitality, Resorts & Hotel Marketing", href: "/industries/hospitality/" },
  { title: "Finance, CA & Accounting Firm SEO", href: "/industries/finance-ca/" },
  { title: "Law Firms, Advocates & Legal SEO", href: "/industries/legal/" },
  { title: "Ecommerce & D2C Store Growth Engineering", href: "/industries/ecommerce/" },
  { title: "SaaS & Product-Led Growth Marketing", href: "/industries/saas/" },
];

const freeTools = [
  { title: "Free Tools Directory Hub", href: "/tools/" },
  { title: "Domain Authority (DA/PA) Checker", href: "/tools/domain-authority-checker/" },
  { title: "Google Review Standee QR Generator", href: "/tools/google-review-qr-generator/" },
  { title: "WhatsApp Direct Chat & QR Builder", href: "/tools/whatsapp-link-generator/" },
];

const startupStories = [
  { title: "Startup Stories & Growth Blueprints Hub", href: "/startup-stories/" },
  { title: "InstaAstro: $12 Mn Series A AI Astrology Scale", href: "/startup-stories/instaastro-raises-12-mn-series-a-to-scale-ai-led-astrology-and-spiritual-commerce/" },
  { title: "Urban Company: ₹4,000 Ads to ₹14,790 Cr IPO", href: "/startup-stories/from-4000-in-facebook-ads-to-a-14790-crore-ipo-the-urban-company-story/" },
  { title: "Shadowfax: India's Largest Crowdsourced Logistics", href: "/startup-stories/shadowfax-success-story-how-four-iit-delhi-alumni-built-indias-largest-crowdsourced-logistics-network/" },
  { title: "Pee Safe: Hygiene Category Creator to $32M Brand", href: "/startup-stories/pee-safe-the-brand-that-started-with-a-uti-and-is-now-rewriting-indias-hygiene-story/" },
  { title: "GenoConnect: Bringing DNA Testing to Everyday Life", href: "/startup-stories/genoconnect-how-this-kerala-startup-is-bringing-dna-testing-out-of-the-lab-and-into-everyday-life/" },
  { title: "Sekar Vembu: Taking on Global Data Giants Bootstrapped", href: "/startup-stories/how-sekar-vembu-is-taking-on-global-data-protection-giants-without-external-funding/" },
];

export default function HtmlSitemapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "HTML Sitemap", path: "/html-sitemap/" },
            ]),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
                <IconSparkles width={14} height={14} />
                COMPLETE DIRECTORY INDEX
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl">
                HTML Sitemap & Navigation Index
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed">
                A structured directory of all 79+ live URLs across PR Marketing Ventures — covering our core services, localized Ahmedabad growth hubs, industry blueprints, free tools, and startup stories.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Company & Core Pages */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-primary font-bold text-xl font-heading mb-4">
                <IconBuilding width={22} height={22} className="text-accent-dark" />
                <h2>Company & Core Navigation Pages</h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {companyPages.map((page) => (
                  <li key={page.href} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-primary-soft/40 transition-colors">
                    <Link href={page.href} className="font-semibold text-sm text-ink hover:text-primary transition-colors block">
                      {page.title}
                    </Link>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{page.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Core Growth Services */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-primary font-bold text-xl font-heading mb-4">
                <IconSearch width={22} height={22} className="text-accent-dark" />
                <h2>Growth & Marketing Services Silos (14 Hubs)</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {coreServicePages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-slate-700 hover:text-primary hover:underline transition-colors flex items-center gap-2 py-1">
                      <span className="text-primary font-bold">→</span>
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Ahmedabad Localized Marketing Pages */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-primary font-bold text-xl font-heading mb-4">
                <IconMapPin width={22} height={22} className="text-accent-dark" />
                <h2>Ahmedabad Digital Marketing & SEO Money Pages (16 Local Pages)</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {ahmedabadMarketingPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-slate-700 hover:text-primary hover:underline transition-colors flex items-center gap-2 py-1">
                      <span className="text-accent-dark font-bold">📍</span>
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Ahmedabad AI & Software Engineering Pages */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-primary font-bold text-xl font-heading mb-4">
                <IconCode width={22} height={22} className="text-accent-dark" />
                <h2>Ahmedabad AI, Software & Web Engineering Pages (17 Local Pages)</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {ahmedabadTechPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-slate-700 hover:text-primary hover:underline transition-colors flex items-center gap-2 py-1">
                      <span className="text-primary font-bold">⚡</span>
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Industry Commercial Silos */}
          <Reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2.5 text-primary font-bold text-xl font-heading mb-4">
                <IconWorkflow width={22} height={22} className="text-accent-dark" />
                <h2>Industry Commercial Solutions (9 Silos)</h2>
              </div>
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {industryPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-slate-700 hover:text-primary hover:underline transition-colors flex items-center gap-2 py-1">
                      <span className="text-accent-dark font-bold">🏢</span>
                      <span>{page.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Growth Tools & Startup Stories */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Free Tools */}
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading text-lg font-bold text-primary mb-4">
                  Free Growth & Marketing Tools
                </h2>
                <ul className="space-y-3 text-sm">
                  {freeTools.map((page) => (
                    <li key={page.href}>
                      <Link href={page.href} className="text-slate-700 hover:text-primary hover:underline transition-colors flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">🛠</span>
                        <span>{page.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Startup Stories */}
            <Reveal>
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-heading text-lg font-bold text-primary mb-4">
                  Startup Stories & Venture Blueprints
                </h2>
                <ul className="space-y-3 text-sm">
                  {startupStories.map((page) => (
                    <li key={page.href}>
                      <Link href={page.href} className="text-slate-700 hover:text-primary hover:underline transition-colors flex items-center gap-2">
                        <span className="text-amber-600 font-bold">📖</span>
                        <span className="line-clamp-1">{page.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
