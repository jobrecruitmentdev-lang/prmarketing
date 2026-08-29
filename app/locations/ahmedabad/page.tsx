import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema, singleServiceSchema, faqSchema } from "@/lib/seo";
import { IconMapPin, IconArrowRight, IconBuilding, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing & Software Agency Locations in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures serves businesses across all Ahmedabad localities including C.G. Road, SG Highway, Prahladnagar, Satellite, Bodakdev, Bopal, Vastrapur, and Navrangpura.",
  alternates: { canonical: "/locations/ahmedabad/" },
};

const localities = [
  {
    name: "Central Ahmedabad: C.G. Road & Navrangpura (HQ)",
    desc: "Our primary office at Fairdeal House, serving corporate headquarters, consulting firms, retail brands, and institutions across C.G. Road, Ellisbridge, Paldi, Ambawadi, Law Garden, Ashram Road, Usmanpura, and Naranpura.",
    popularServices: ["Marketing Agency", "Digital Marketing", "Custom Software Development", "SEO Services", "Next.js Web Development"],
  },
  {
    name: "West Ahmedabad: SG Highway, Prahladnagar & SBR",
    desc: "Serving fast-growing tech companies, multinational enterprises, luxury real estate developers, and premium lifestyle brands across SG Highway, Prahladnagar, Sindhu Bhavan Road (SBR), Bodakdev, Satellite, Vastrapur, Bopal, South Bopal, Ambli, Shilaj, Thaltej, Makarba, and Jodhpur.",
    popularServices: ["Performance Marketing", "Google Ads & PMax", "AI Agents", "Local 3-Pack SEO", "Website Redesign", "CRM Automation"],
  },
  {
    name: "North Ahmedabad: Gota, Chandkheda & Science City",
    desc: "Serving expanding residential developments, coaching institutes, automobile dealerships, and industrial suppliers across Gota, Chandkheda, Motera, Tragad, Jagatpur, Vaishnodevi, Zundal, and Science City.",
    popularServices: ["Lead Generation Ads", "Google Maps Ranking", "Local SEO", "WhatsApp CRM", "Responsive Web Design"],
  },
  {
    name: "East Ahmedabad: GIDC Naroda, Vatva & Changodar",
    desc: "The industrial backbone of Gujarat, serving chemical manufacturers, engineering OEM suppliers, packaging factories, and exporters across Maninagar, Nikol, Naroda GIDC, Vatva GIDC, Changodar, Sanand, Vastral, Odhav, and Bapunagar.",
    popularServices: ["B2B Manufacturing SEO", "Export Marketing", "Industrial Web Portals", "Google Search Ads", "WhatsApp Quotation CRM"],
  },
  {
    name: "Fintech & Global Hub: GIFT City & Gandhinagar",
    desc: "Specialized international financial services center (IFSC), fintech startups, IT exporters, and global consultancies requiring international SEO and enterprise cloud architectures.",
    popularServices: ["International SEO", "Enterprise SaaS Development", "GEO/AEO AI Optimization", "Performance Optimization"],
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
            From our headquarters on C.G. Road to tech corridors across SG Highway, Prahladnagar, and GIFT City, we deliver on-site strategic growth and engineering across Gujarat.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
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
                        <span key={srv} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                          {srv}
                        </span>
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

      <CtaBand
        title="Ready to meet our team in Ahmedabad?"
        subtitle="Visit our office at Fairdeal House, C.G. Road or request an on-site strategy session at your location."
      />
    </>
  );
}
