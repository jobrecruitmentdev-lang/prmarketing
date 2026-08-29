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
import { breadcrumbSchema, localBusinessSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact & Free Website Audit — PR Marketing Ventures",
  description:
    "Request a free website and technical SEO audit from PR Marketing Ventures in Ahmedabad. Tell us about your business goals and receive a clear, actionable growth roadmap.",
  alternates: { canonical: "/contact/" },
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
            localBusinessSchema(),
            breadcrumbSchema("Contact", "/contact/"),
            webPageSchema("ContactPage", metadata.title as string, metadata.description as string, "/contact/"),
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-16 sm:px-6 md:pt-24">
          <p className="text-sm font-semibold tracking-wide text-accent-dark">
            GET IN TOUCH
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
            Let&rsquo;s engineer your growth.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Ready to scale your business with engineered web performance, high-converting SEO, and smart automation? Tell us about your goals to receive a complimentary, data-backed diagnostic audit.
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
