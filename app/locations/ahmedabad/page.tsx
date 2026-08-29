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
    name: "C.G. Road (Headquarters & Navrangpura)",
    desc: "Our primary office location serving central Ahmedabad corporate offices, retail brands, and financial consultancies.",
    popularServices: ["Digital Marketing", "Custom Software Development", "SEO Services", "Next.js Web Development"],
  },
  {
    name: "SG Highway (Sarkhej–Gandhinagar Highway)",
    desc: "Serving IT hubs, automobile showrooms, large commercial complexes, and multinational technology enterprises.",
    popularServices: ["B2B Lead Generation", "Enterprise Software", "Google Ads & PMax", "CRM Automation"],
  },
  {
    name: "Prahladnagar & Corporate Road",
    desc: "Serving high-growth startups, corporate offices, wealth management firms, and luxury real estate developers.",
    popularServices: ["Performance Marketing", "AI Agents", "Local 3-Pack SEO", "Website Redesign"],
  },
  {
    name: "Sindhu Bhavan Road (SBR) & Bodakdev",
    desc: "The premier luxury commercial corridor for high-ticket retail, lifestyle brands, architecture firms, and premium clinics.",
    popularServices: ["Social Media Marketing", "Ecommerce Development", "Brand Identity", "GEO/AI Search"],
  },
  {
    name: "Satellite & Vastrapur",
    desc: "Serving educational institutes, healthcare centers, retail chains, and consumer technology businesses.",
    popularServices: ["Local SEO", "Google Business Profile", "Custom CRM", "Website Development"],
  },
  {
    name: "Bopal, South Bopal & Ghuma",
    desc: "Rapidly expanding residential and commercial zone for local retail, clinics, schools, and service providers.",
    popularServices: ["Google Maps Ranking", "WhatsApp Automation", "Local Business SEO", "Shopify Store"],
  },
  {
    name: "GIFT City & Gandhinagar",
    desc: "Specialized financial, fintech, and export enterprises requiring international SEO and enterprise software engineering.",
    popularServices: ["International SEO", "Enterprise SaaS Development", "API Architecture", "Performance Optimization"],
  },
  {
    name: "Gota, Chandkheda & New Ranip",
    desc: "Northern Ahmedabad commercial belt for industrial suppliers, coaching centers, and residential real estate.",
    popularServices: ["Lead Generation Ads", "Local SEO", "WhatsApp CRM", "Responsive Web Design"],
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
