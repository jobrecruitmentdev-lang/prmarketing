import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import PrSeoHeroCard from "@/components/PrSeoHeroCard";
import {
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/icons";
import { site } from "@/lib/site";
import { breadcrumbSchema, localBusinessSchema, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Digital Marketing Agency | PR Marketing Ventures",
  description:
    "Contact PR Marketing Ventures in Ahmedabad for a free SEO audit and high-converting growth strategy. Call +91 8160666408 or visit our C.G. Road office today!",
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
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:gap-12 px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 md:pt-24 lg:grid-cols-2">
          <div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-accent-dark uppercase">
              GET IN TOUCH
            </p>
            <h1 className="mt-3 sm:mt-4 max-w-3xl font-heading text-3xl sm:text-5xl font-bold leading-tight tracking-tight text-ink break-words">
              Let&rsquo;s engineer your growth.
            </h1>
            <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
              Ready to scale your business with engineered web performance, high-converting SEO, and smart automation? Tell us about your goals to receive a complimentary, data-backed diagnostic audit.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <PrSeoHeroCard />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              {info.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3.5 sm:gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs"
                >
                  <span className="inline-flex shrink-0 rounded-xl bg-primary-soft p-2.5 sm:p-3 text-primary mt-0.5">
                    <item.icon />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-slate-500">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 block font-semibold text-ink transition-colors hover:text-primary break-all text-sm sm:text-base"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-semibold text-ink break-words text-sm sm:text-base leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-ink p-5 sm:p-6 text-sm leading-relaxed text-slate-300">
                <p className="font-heading text-base font-semibold text-white">
                  What happens next?
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-4 text-xs sm:text-sm">
                  <li>We review your website, rankings and competitors.</li>
                  <li>You get a prioritized audit — free, no strings.</li>
                  <li>If it makes sense, we propose a growth plan.</li>
                </ol>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-xs">
              <h2 className="font-heading text-xl font-semibold text-ink">
                Send an enquiry
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
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
