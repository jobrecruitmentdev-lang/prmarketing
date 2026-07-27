import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import {
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/icons";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact — Get a Free Website & SEO Audit",
  description:
    "Contact the best digital marketing agency in Navrangpura, Ahmedabad for a free website and SEO audit. Tell us about your project and get a clear, prioritized growth plan.",
  alternates: { canonical: "/contact/" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  image: `${site.url}/logo-mark.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-910, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Shital Kunj Society, Vasant Vihar, Navrangpura",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380009",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "State", name: "Gujarat" },
  ],
  priceRange: "₹₹",
};

const info = [
  {
    icon: IconMail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: IconPhone,
    label: "Phone / WhatsApp",
    value: site.phoneDisplay,
  },
  {
    icon: IconMapPin,
    label: "Location",
    value: site.location,
  },
  {
    icon: IconClock,
    label: "Response time",
    value: "Within 1 business day",
  },
];

export default function Contact() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            localBusinessSchema,
            breadcrumbSchema("Contact", "/contact/"),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            CONTACT
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Let&rsquo;s engineer your growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Looking for a local PPC agency and SEO partner in Ahmedabad? Tell us about your business and goals. We&rsquo;ll reply with a
            free, no-obligation audit — a clear picture of what&rsquo;s holding
            you back and what to fix first.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                    <item.icon />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 block font-semibold text-ink transition-colors hover:text-primary"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-semibold text-ink">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-ink p-6 text-sm leading-relaxed text-slate-300">
                <p className="font-heading text-base font-semibold text-white">
                  What happens next?
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-4">
                  <li>We review your website, rankings and competitors.</li>
                  <li>You get a prioritized audit — free, no strings.</li>
                  <li>If it makes sense, we propose a growth plan.</li>
                </ol>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Send an enquiry
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Fields marked <span className="text-red-600">*</span> are
                required.
              </p>
              <div className="mt-6">
                <EnquiryForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
