import Link from "next/link";
import Logo from "./Logo";
import { IconMail, IconMapPin, IconPhone, IconSparkles } from "./icons";
import { site } from "@/lib/site";

const coreServices = [
  { label: "Digital Marketing Agency", href: "/services/digital-marketing/" },
  { label: "Custom Software Development", href: "/services/software-development/" },
  { label: "Custom CRM & Automation", href: "/services/crm-solutions/" },
  { label: "AI Agents & Chatbots", href: "/services/ai-agents/" },
  { label: "Google Business Profile (GMB)", href: "/services/google-business-profile/" },
  { label: "Performance Optimization", href: "/services/performance-optimization/" },
  { label: "Performance Marketing", href: "/services/performance-marketing/" },
  { label: "International SEO", href: "/services/international-seo/" },
  { label: "SEO & Technical SEO", href: "/services/seo/" },
  { label: "Local SEO Ahmedabad", href: "/services/local-seo/" },
  { label: "Website Development", href: "/services/web-development/" },
  { label: "Ecommerce Development", href: "/services/ecommerce/" },
  { label: "AI SEO (GEO / AEO)", href: "/services/ai-seo/" },
  { label: "Marketing Automation", href: "/services/marketing-automation/" },
];

const ahmedabadMarketingLinks = [
  { label: "Marketing Agency Ahmedabad", href: "/marketing-agency-ahmedabad/" },
  { label: "Digital Marketing Agency Ahmedabad", href: "/digital-marketing-agency-ahmedabad/" },
  { label: "SEO Agency Ahmedabad", href: "/seo-agency-ahmedabad/" },
  { label: "Local SEO Ahmedabad", href: "/local-seo-ahmedabad/" },
  { label: "Google Business Profile Ahmedabad", href: "/google-business-profile-management-ahmedabad/" },
  { label: "Performance Marketing Ahmedabad", href: "/performance-marketing-ahmedabad/" },
  { label: "Performance Marketing Agency", href: "/performance-marketing-agency-ahmedabad/" },
  { label: "Lead Generation Agency Ahmedabad", href: "/lead-generation-agency-ahmedabad/" },
  { label: "Social Media Marketing Agency", href: "/social-media-marketing-agency-ahmedabad/" },
  { label: "Social Media Marketing Ahmedabad", href: "/social-media-marketing-ahmedabad/" },
  { label: "Google Ads Agency Ahmedabad", href: "/google-ads-agency-ahmedabad/" },
  { label: "Marketing Automation Ahmedabad", href: "/marketing-automation-ahmedabad/" },
  { label: "AI Marketing Agency Ahmedabad", href: "/ai-marketing-agency-ahmedabad/" },
  { label: "B2B Marketing Agency Ahmedabad", href: "/b2b-marketing-agency-ahmedabad/" },
  { label: "Branding Agency Ahmedabad", href: "/branding-agency-ahmedabad/" },
  { label: "Pharma Marketing Agency Ahmedabad", href: "/pharma-marketing-agency-ahmedabad/" },
];

const ahmedabadTechLinks = [
  { label: "GEO Agency Ahmedabad", href: "/geo-agency-ahmedabad/" },
  { label: "AEO Agency Ahmedabad", href: "/aeo-agency-ahmedabad/" },
  { label: "AI Search Optimization Ahmedabad", href: "/ai-search-optimization-ahmedabad/" },
  { label: "AI Agency Ahmedabad", href: "/ai-agency-ahmedabad/" },
  { label: "AI Agents Ahmedabad", href: "/ai-agents-ahmedabad/" },
  { label: "AI Automation Ahmedabad", href: "/ai-automation-ahmedabad/" },
  { label: "Business Automation Ahmedabad", href: "/business-automation-ahmedabad/" },
  { label: "CRM Development Ahmedabad", href: "/crm-development-ahmedabad/" },
  { label: "CRM Automation Ahmedabad", href: "/crm-automation-ahmedabad/" },
  { label: "Software Development Ahmedabad", href: "/software-development-ahmedabad/" },
  { label: "Web Development Ahmedabad", href: "/web-development-ahmedabad/" },
  { label: "Website Design Ahmedabad", href: "/website-design-ahmedabad/" },
  { label: "Website Development Ahmedabad", href: "/website-development-ahmedabad/" },
  { label: "Ecommerce Development Ahmedabad", href: "/ecommerce-development-ahmedabad/" },
  { label: "Ecommerce Website Development", href: "/ecommerce-website-development-ahmedabad/" },
  { label: "Conversion Rate Optimization", href: "/conversion-rate-optimization-ahmedabad/" },
  { label: "Website Performance Optimization", href: "/website-performance-optimization-ahmedabad/" },
  { label: "Ahmedabad Localities Directory", href: "/locations/ahmedabad/" },
];

const industryLinks = [
  { label: "Real Estate Marketing", href: "/industries/real-estate/" },
  { label: "Healthcare & Clinics SEO", href: "/industries/healthcare/" },
  { label: "Manufacturing & B2B Growth", href: "/industries/manufacturing/" },
  { label: "Education & EdTech Marketing", href: "/industries/education/" },
  { label: "Hospitality & Hotels Marketing", href: "/industries/hospitality/" },
  { label: "Finance & CA Firm SEO", href: "/industries/finance-ca/" },
  { label: "Law Firms & Legal SEO", href: "/industries/legal/" },
  { label: "Ecommerce Store Scaling", href: "/industries/ecommerce/" },
  { label: "SaaS Growth Marketing", href: "/industries/saas/" },
];

const companyLinks = [
  { label: "About Us", href: "/about/" },
  { label: "Startup Stories", href: "/startup-stories/" },
  { label: "Pricing Plans", href: "/pricing/" },
  { label: "Portfolio & Work", href: "/portfolio/" },
  { label: "Services Hub", href: "/services/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "HTML Sitemap Index", href: "/html-sitemap/" },
];

const toolLinks = [
  { label: "Domain Authority Checker", href: "/tools/domain-authority-checker/" },
  { label: "Google Review Standee Generator", href: "/tools/google-review-qr-generator/" },
  { label: "WhatsApp Link & QR Builder", href: "/tools/whatsapp-link-generator/" },
  { label: "Free Tools Directory", href: "/tools/" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      {/* Primary Top Grid */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand & Mission */}
        <div>
          <Logo dark tagline />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {site.tagline}. We engineer full-funnel marketing, technical SEO, and AI automation systems
            that help businesses in Ahmedabad and globally rank, convert, and scale.
          </p>
          <div className="mt-6">
            <Link
              href="/html-sitemap/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-accent-bright hover:border-accent-bright transition-colors"
            >
              <IconSparkles width={13} height={13} />
              <span>Browse All 79+ Pages (HTML Sitemap)</span>
            </Link>
          </div>
        </div>

        {/* Core Services */}
        <nav aria-label="Services">
          <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
            Core Growth Services
          </h2>
          <ul className="mt-4 space-y-2 text-xs sm:text-sm">
            {coreServices.slice(0, 8).map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="transition-colors duration-200 hover:text-accent-bright"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/services/" className="font-semibold text-accent-bright hover:underline">
                View all 14 services →
              </Link>
            </li>
          </ul>
        </nav>

        {/* Company & Tools */}
        <div>
          <nav aria-label="Company">
            <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
              Company & Insights
            </h2>
            <ul className="mt-4 space-y-2 text-xs sm:text-sm">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-200 hover:text-accent-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6">
            <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
              Free Growth Tools
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs sm:text-sm">
              {toolLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="transition-colors duration-200 hover:text-accent-bright"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Address (Strictly B-903 via site.location) */}
        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
            Headquarters & Contact
          </h2>
          <ul className="mt-4 space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5">
              <IconMail width={18} height={18} className="mt-0.5 shrink-0 text-accent-bright" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent-bright break-all"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconPhone width={18} height={18} className="mt-0.5 shrink-0 text-accent-bright" />
              <span className="break-words">{site.phoneDisplay}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <IconMapPin width={18} height={18} className="mt-0.5 shrink-0 text-accent-bright" />
              <span className="break-words leading-relaxed">{site.location}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Structured SEO & Local Ahmedabad Internal Linking Silo Grid */}
      <div className="border-t border-slate-800 bg-slate-950/60 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Ahmedabad Marketing Silo */}
            <div>
              <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-accent-bright">
                Ahmedabad Marketing & SEO Hubs
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-slate-400">
                {ahmedabadMarketingLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-white hover:underline transition-colors line-clamp-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ahmedabad AI & Tech Silo */}
            <div>
              <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-accent-bright">
                Ahmedabad AI & Web Engineering Hubs
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-slate-400">
                {ahmedabadTechLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-white hover:underline transition-colors line-clamp-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industry Specific Silos */}
            <div>
              <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-accent-bright">
                Industry Commercial Silos
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-1.5 text-xs text-slate-400">
                {industryLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-white hover:underline transition-colors line-clamp-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://prmarketingventures.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-slate-300 underline hover:text-accent-bright"
            >
              PR Marketing Ventures
            </a>
            . All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="/html-sitemap/" className="hover:text-white transition-colors">
              HTML Sitemap
            </Link>
            <span>•</span>
            <Link href="/locations/ahmedabad/" className="hover:text-white transition-colors">
              Ahmedabad Hubs
            </Link>
            <span>•</span>
            <Link href="/services/" className="hover:text-white transition-colors">
              All Services
            </Link>
            <span>•</span>
            <p className="text-slate-500">{site.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
