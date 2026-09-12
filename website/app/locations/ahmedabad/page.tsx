import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import { IconMapPin, IconArrowRight, IconSearch, IconCode, IconSparkles, IconWorkflow, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Agency Ahmedabad | PR Marketing Co.",
  description:
    "PR Marketing Ventures is located on C.G. Road, Ahmedabad. We deliver premier digital marketing, technical SEO, performance advertising, and custom web apps.",
  alternates: { canonical: "/locations/ahmedabad/" },
};

const localities = [
  {
    name: "Central Ahmedabad: C.G. Road & Navrangpura (HQ)",
    desc: "Our primary office at Fairdeal House (B-903), serving corporate headquarters, consulting firms, retail brands, and institutions across C.G. Road, Ellisbridge, Paldi, Ambawadi, Law Garden, Ashram Road, Usmanpura, and Naranpura.",
    popularServices: [
      { name: "Marketing Agency", href: "/marketing-agency-ahmedabad/" },
      { name: "Digital Marketing", href: "/digital-marketing-agency-ahmedabad/" },
      { name: "Custom Software", href: "/software-development-ahmedabad/" },
      { name: "SEO Services", href: "/seo-agency-ahmedabad/" },
      { name: "Web Development", href: "/web-development-ahmedabad/" },
    ],
  },
  {
    name: "West Ahmedabad: SG Highway, Prahladnagar & SBR",
    desc: "Serving fast-growing tech companies, multinational enterprises, luxury real estate developers, and premium lifestyle brands across SG Highway, Prahladnagar, Sindhu Bhavan Road (SBR), Bodakdev, Satellite, Vastrapur, Bopal, South Bopal, Ambli, Shilaj, Thaltej, Makarba, and Jodhpur.",
    popularServices: [
      { name: "Performance Marketing", href: "/performance-marketing-ahmedabad/" },
      { name: "Google Ads (PPC)", href: "/google-ads-agency-ahmedabad/" },
      { name: "AI Agents", href: "/ai-agents-ahmedabad/" },
      { name: "Local 3-Pack SEO", href: "/local-seo-ahmedabad/" },
      { name: "CRM Automation", href: "/crm-automation-ahmedabad/" },
    ],
  },
  {
    name: "North Ahmedabad: Gota, Chandkheda & Science City",
    desc: "Serving expanding residential developments, coaching institutes, automobile dealerships, and industrial suppliers across Gota, Chandkheda, Motera, Tragad, Jagatpur, Vaishnodevi, Zundal, and Science City.",
    popularServices: [
      { name: "Lead Generation", href: "/lead-generation-agency-ahmedabad/" },
      { name: "Google Maps Ranking", href: "/google-business-profile-management-ahmedabad/" },
      { name: "Local SEO", href: "/local-seo-ahmedabad/" },
      { name: "WhatsApp CRM", href: "/crm-development-ahmedabad/" },
      { name: "Website Design", href: "/website-design-ahmedabad/" },
    ],
  },
  {
    name: "East Ahmedabad: GIDC Naroda, Vatva & Changodar",
    desc: "The industrial backbone of Gujarat, serving chemical manufacturers, engineering OEM suppliers, packaging factories, and exporters across Maninagar, Nikol, Naroda GIDC, Vatva GIDC, Changodar, Sanand, Vastral, Odhav, and Bapunagar.",
    popularServices: [
      { name: "B2B Marketing", href: "/b2b-marketing-agency-ahmedabad/" },
      { name: "Pharma Marketing", href: "/pharma-marketing-agency-ahmedabad/" },
      { name: "SEO Agency", href: "/seo-agency-ahmedabad/" },
      { name: "Google Ads", href: "/google-ads-agency-ahmedabad/" },
      { name: "Business Automation", href: "/business-automation-ahmedabad/" },
    ],
  },
  {
    name: "Fintech & Global Hub: GIFT City & Gandhinagar",
    desc: "Specialized international financial services center (IFSC), fintech startups, IT exporters, and global consultancies requiring international SEO and enterprise cloud architectures.",
    popularServices: [
      { name: "AEO / GEO Agency", href: "/geo-agency-ahmedabad/" },
      { name: "AI Search Optimization", href: "/ai-search-optimization-ahmedabad/" },
      { name: "Software Development", href: "/software-development-ahmedabad/" },
      { name: "Speed Optimization", href: "/website-performance-optimization-ahmedabad/" },
      { name: "AI Agency", href: "/ai-agency-ahmedabad/" },
    ],
  },
];

const allAhmedabadServices = [
  { title: "Marketing Agency Ahmedabad", href: "/marketing-agency-ahmedabad/", category: "Marketing" },
  { title: "Digital Marketing Agency Ahmedabad", href: "/digital-marketing-agency-ahmedabad/", category: "Marketing" },
  { title: "SEO Agency Ahmedabad", href: "/seo-agency-ahmedabad/", category: "SEO" },
  { title: "Local SEO Ahmedabad", href: "/local-seo-ahmedabad/", category: "SEO" },
  { title: "Google Business Profile Management", href: "/google-business-profile-management-ahmedabad/", category: "SEO" },
  { title: "Performance Marketing Ahmedabad", href: "/performance-marketing-ahmedabad/", category: "Paid Ads" },
  { title: "Performance Marketing Agency Ahmedabad", href: "/performance-marketing-agency-ahmedabad/", category: "Paid Ads" },
  { title: "Lead Generation Agency Ahmedabad", href: "/lead-generation-agency-ahmedabad/", category: "Paid Ads" },
  { title: "Social Media Marketing Agency", href: "/social-media-marketing-agency-ahmedabad/", category: "Social Media" },
  { title: "Social Media Marketing Ahmedabad", href: "/social-media-marketing-ahmedabad/", category: "Social Media" },
  { title: "Google Ads Agency Ahmedabad", href: "/google-ads-agency-ahmedabad/", category: "Paid Ads" },
  { title: "Marketing Automation Ahmedabad", href: "/marketing-automation-ahmedabad/", category: "Automation" },
  { title: "AI Marketing Agency Ahmedabad", href: "/ai-marketing-agency-ahmedabad/", category: "AI & GEO" },
  { title: "B2B Marketing Agency Ahmedabad", href: "/b2b-marketing-agency-ahmedabad/", category: "Marketing" },
  { title: "Branding Agency Ahmedabad", href: "/branding-agency-ahmedabad/", category: "Branding" },
  { title: "Pharma Marketing Agency Ahmedabad", href: "/pharma-marketing-agency-ahmedabad/", category: "Industry" },
  { title: "GEO Agency Ahmedabad", href: "/geo-agency-ahmedabad/", category: "AI & GEO" },
  { title: "AEO Agency Ahmedabad", href: "/aeo-agency-ahmedabad/", category: "AI & GEO" },
  { title: "AI Search Optimization Ahmedabad", href: "/ai-search-optimization-ahmedabad/", category: "AI & GEO" },
  { title: "AI Agency Ahmedabad", href: "/ai-agency-ahmedabad/", category: "AI & GEO" },
  { title: "AI Agents Ahmedabad", href: "/ai-agents-ahmedabad/", category: "AI & GEO" },
  { title: "AI Automation Ahmedabad", href: "/ai-automation-ahmedabad/", category: "Automation" },
  { title: "Business Automation Ahmedabad", href: "/business-automation-ahmedabad/", category: "Automation" },
  { title: "CRM Development Ahmedabad", href: "/crm-development-ahmedabad/", category: "Software" },
  { title: "CRM Automation Ahmedabad", href: "/crm-automation-ahmedabad/", category: "Automation" },
  { title: "Software Development Ahmedabad", href: "/software-development-ahmedabad/", category: "Software" },
  { title: "Web Development Ahmedabad", href: "/web-development-ahmedabad/", category: "Web Dev" },
  { title: "Website Design Ahmedabad", href: "/website-design-ahmedabad/", category: "Web Dev" },
  { title: "Website Development Ahmedabad", href: "/website-development-ahmedabad/", category: "Web Dev" },
  { title: "Ecommerce Development Ahmedabad", href: "/ecommerce-development-ahmedabad/", category: "Ecommerce" },
  { title: "Ecommerce Website Development", href: "/ecommerce-website-development-ahmedabad/", category: "Ecommerce" },
  { title: "Conversion Rate Optimization (CRO)", href: "/conversion-rate-optimization-ahmedabad/", category: "Web Dev" },
  { title: "Website Performance Optimization", href: "/website-performance-optimization-ahmedabad/", category: "Web Dev" },
];

const faqs = [
  {
    q: "Where is PR Marketing Ventures located in Ahmedabad?",
    a: "Our headquarters is located at B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Navrangpura, Ahmedabad, Gujarat 380009.",
  },
  {
    q: "Do you offer on-site client consultations across Ahmedabad?",
    a: "Yes. In addition to meeting at our C.G. Road office, our growth engineers and consultants provide on-site diagnostic meetings across SG Highway, Prahladnagar, Bodakdev, Bopal, Science City, GIDC industrial estates, and GIFT City Gandhinagar.",
  },
  {
    q: "How many specialized services do you offer in Ahmedabad?",
    a: "We offer 34 specialized local service programs covering Technical SEO, Google & Meta Ads, AI Search Optimization (GEO/AEO), Next.js Website Engineering, Custom CRM Development, and WhatsApp Automation.",
  },
];

export default function AhmedabadLocationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Locations", path: "/locations/ahmedabad/" },
              { name: "Ahmedabad", path: "/locations/ahmedabad/" },
            ]),
            singleServiceSchema({
              name: "Digital Marketing & Software Agency Locations in Ahmedabad",
              description: metadata.description as string,
              url: "/locations/ahmedabad/",
              serviceType: "Marketing & Software Agency",
              areaServed: "Ahmedabad, Gujarat, India",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span>Locations</span>
            <span>/</span>
            <span className="text-accent-dark">Ahmedabad</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">LOCALITY COVERAGE DIRECTORY</p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Serving Businesses Across All Major Ahmedabad Localities.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            From our headquarters on C.G. Road to tech corridors across SG Highway, Prahladnagar, and GIFT City, we deliver on-site strategic growth, technical SEO, and engineering across Gujarat.
          </p>
        </div>
      </section>

      {/* Regional Locality Hubs */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-dark">REGIONAL ZONES</span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-ink">Ahmedabad Commercial Zones</h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          {localities.map((loc) => (
            <Reveal key={loc.name}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-lg font-heading">
                    <IconMapPin width={20} height={20} className="text-accent-dark" />
                    <h2>{loc.name}</h2>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{loc.desc}</p>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">High-Demand Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {loc.popularServices.map((srv) => (
                        <Link
                          key={srv.name}
                          href={srv.href}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-primary hover:text-white transition-colors"
                        >
                          {srv.name} →
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-dark hover:text-primary transition-colors"
                  >
                    Schedule On-Site Consultation <IconArrowRight width={14} height={14} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Comprehensive 34 Services Directory Grid */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
              <IconSparkles width={14} height={14} />
              COMPLETE LOCAL CATALOG
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              All 34 Localized Growth Services in Ahmedabad
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Browse every localized marketing, SEO, web engineering, and AI automation program we deploy for Ahmedabad businesses:
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allAhmedabadServices.map((srv, idx) => (
              <Reveal key={srv.href} delay={idx * 20}>
                <Link
                  href={srv.href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent-dark">
                      {srv.category}
                    </span>
                    <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors line-clamp-1">
                      {srv.title}
                    </h3>
                  </div>
                  <IconArrowRight width={16} height={16} className="text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            Frequently Asked Questions — Ahmedabad Operations
          </h2>
        </Reveal>
        <div className="mt-8 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <h3 className="font-heading text-base font-bold text-ink">{f.q}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ready to meet our team in Ahmedabad?"
        subtitle="Visit our office at Fairdeal House (B-903), C.G. Road or request an on-site strategy session at your location."
      />
    </>
  );
}
