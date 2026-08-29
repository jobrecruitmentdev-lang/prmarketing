import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import {
  multiBreadcrumbSchema,
  singleServiceSchema,
  faqSchema,
} from "@/lib/seo";
import {
  IconCart,
  IconGauge,
  IconLayout,
  IconTrendingUp,
  IconArrowRight,
  IconSparkles,
  IconCode,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Ecommerce Website Development in Ahmedabad | PR Marketing Ventures",
  description:
    "Custom ecommerce store development in Ahmedabad. Fast, high-converting online stores built on Shopify, WooCommerce, and headless Next.js with automated checkout and payment gateways.",
  alternates: { canonical: "/services/ecommerce/" },
};

const faqs = [
  {
    q: "Which ecommerce platform is best for my business: Shopify, WooCommerce, or Custom Next.js?",
    a: "For fast turnkey catalog launches, Shopify offers rapid deployment. For deep customization and content integration, WooCommerce gives complete ownership. For massive catalogs requiring sub-second filtering and 100/100 Core Web Vitals, headless Next.js provides unmatched performance and scalability.",
  },
  {
    q: "Do you integrate Indian payment gateways like Razorpay, Cashfree, and PayU?",
    a: "Yes. We configure complete payment processing with UPI, credit/debit cards, net banking, EMI, and Cash on Delivery (COD) verification to prevent fake orders and cart abandonment.",
  },
  {
    q: "How do you optimize ecommerce stores for Google Product rich results?",
    a: "We embed automated Product, Offer, AggregateRating, and MerchantListing structured data schemas so your products display pricing, stock availability, and star ratings directly on Google Search and Google Shopping.",
  },
  {
    q: "Can you automate shipping and order notifications via WhatsApp?",
    a: "Yes. We integrate Shiprocket, Delhivery, or custom courier APIs alongside automated WhatsApp order confirmation and tracking alerts for your customers.",
  },
  {
    q: "How do you help reduce cart abandonment?",
    a: "We streamline the checkout funnel to a single friction-free page, enable guest checkout, add trust badges, and deploy automated WhatsApp/email recovery sequences for abandoned carts.",
  },
];

const deliverables = [
  {
    icon: IconCart,
    title: "Custom Storefront Engineering",
    desc: "Bespoke design and development on Shopify, WooCommerce, or headless Next.js tailored for seamless product discovery and high conversion.",
  },
  {
    icon: IconGauge,
    title: "Fast Mobile Checkout Funnel",
    desc: "Single-page checkout flows optimized for mobile buyers with instant OTP login, auto-address fills, and one-tap UPI payments.",
  },
  {
    icon: IconCode,
    title: "Payment & Logistics Integrations",
    desc: "Flawless setup of Razorpay, Cashfree, Stripe, Shiprocket, and automated GST invoice generation systems.",
  },
  {
    icon: IconSparkles,
    title: "Product SEO & Merchant Schema",
    desc: "Rich snippet schemas that display real-time pricing, stock status, and customer reviews directly in Google Search results.",
  },
  {
    icon: IconTrendingUp,
    title: "Cart Recovery & CRM Automation",
    desc: "Automated WhatsApp and email sequences that re-engage abandoned carts and incentivize shoppers to complete their purchase.",
  },
  {
    icon: IconLayout,
    title: "Catalog Architecture & Filtering",
    desc: "Instant multi-attribute search and facet filtering (size, color, price, material) that helps customers find products in milliseconds.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Catalog & Business Flow Mapping",
    desc: "We analyze your SKU volume, categories, shipping requirements, and target customer purchase habits.",
  },
  {
    num: "02",
    title: "UI/UX & Mobile Storefront Design",
    desc: "We craft intuitive shopping journeys, high-converting product pages, and friction-free checkout interfaces.",
  },
  {
    num: "03",
    title: "Platform Engineering & API Integration",
    desc: "We connect inventory management, payment gateways, logistics partners, and automated tax invoicing.",
  },
  {
    num: "04",
    title: "Product Schema, Testing & Launch",
    desc: "Rigorous end-to-end payment testing, schema validation, and speed tuning before going live.",
  },
];

const ecomSectors = [
  { name: "Fashion, Apparel & Luxury Jewellery", desc: "High-resolution lookbooks, size guides, and visual catalog discovery." },
  { name: "Direct-to-Consumer (D2C) Brands", desc: "Engaging brand storytelling, subscription options, and high-converting landing funnels." },
  { name: "Industrial Supplies & B2B Wholesale", desc: "Tiered wholesale pricing, minimum order quantities (MOQ), and GST billing." },
  { name: "Health, Wellness & Organic Foods", desc: "Clean ingredient highlights, bundle discounts, and repeat delivery options." },
  { name: "Electronics & Home Appliances", desc: "Detailed technical specifications, warranty badges, and EMI calculators." },
  { name: "Custom Print & Merchandise", desc: "Dynamic product configurators and custom file upload options." },
];

export default function EcommerceServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Services", path: "/services/" },
              { name: "Ecommerce Development", path: "/services/ecommerce/" },
            ]),
            singleServiceSchema({
              name: "Ecommerce Website Development",
              description: metadata.description as string,
              url: "/services/ecommerce/",
              serviceType: "Ecommerce Development",
            }),
            faqSchema(faqs),
          ]),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-soft via-white to-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 md:pt-24">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/services/" className="transition-colors hover:text-primary">Services</Link>
            <span>/</span>
            <span className="text-accent-dark">Ecommerce Development</span>
          </nav>

          <p className="text-sm font-bold uppercase tracking-wider text-accent-dark">
            ECOMMERCE ENGINEERING IN AHMEDABAD
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            High-Converting Ecommerce Stores Built to Scale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
            Build an online store that turns casual browsers into repeat buyers. We engineer fast, responsive Shopify, WooCommerce, and headless ecommerce platforms with frictionless UPI checkout, automated shipping, and rich product SEO.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Launch Your Store
              <IconArrowRight width={18} height={18} />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
            >
              View Service Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Conversion Advantages */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            BUILT FOR TRANSACTION REVENUE
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            The Three Pillars of High-Converting Stores
          </h2>
          <p className="mt-3 text-slate-600">
            A beautiful store is useless if mobile checkout is clunky or pages take 4 seconds to load.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">1-Tap Mobile Checkout</h3>
              <p className="mt-2 text-sm text-slate-600">
                Over 80% of Indian ecommerce orders happen on mobile. We eliminate multi-step barriers with direct UPI and OTP-based checkout.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Google Rich Results</h3>
              <p className="mt-2 text-sm text-slate-600">
                Automated Merchant schema displays your prices, ratings, and in-stock badges directly on organic Google Search results.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-heading text-lg font-bold text-ink">Automated WhatsApp Operations</h3>
              <p className="mt-2 text-sm text-slate-600">
                Automatic order confirmations, tracking links, and abandoned cart recovery sent straight to your customer&rsquo;s WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4-Stage Methodology */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-bright">
              ECOMMERCE PIPELINE
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight md:text-4xl">
              How We Launch & Scale Your Store
            </h2>
            <p className="mt-3 text-slate-400">
              A systematic build process covering catalog structure, UX design, API connectivity, and performance validation.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => (
              <Reveal key={step.num} delay={idx * 80}>
                <div className="h-full rounded-2xl border border-slate-800 bg-ink-2 p-6">
                  <span className="font-heading text-3xl font-bold text-accent-bright">{step.num}</span>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Grid */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            COMPLETE CAPABILITIES
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Everything Included in Our Ecommerce Builds
          </h2>
          <p className="mt-3 text-slate-600">
            End-to-end technical infrastructure to run, manage, and scale your online sales.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex rounded-xl bg-primary-soft p-3 text-primary">
                  <item.icon width={22} height={22} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Verticals */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
              STORE TYPES
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Ecommerce Categories We Specialize In
            </h2>
            <p className="mt-3 text-slate-600">
              Customized store layouts adapted to the specific buying behaviors of your target audience.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecomSectors.map((sec, i) => (
              <Reveal key={sec.name} delay={i * 50}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="font-heading text-base font-semibold text-ink">{sec.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{sec.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-dark">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions About Ecommerce Development
          </h2>
        </Reveal>

        <div className="mt-10 space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 40}>
              <details className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-base font-semibold text-ink">
                  <span>{faq.q}</span>
                  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand
        title="Ready to launch a high-converting ecommerce store?"
        subtitle="Let&rsquo;s discuss your products, payment gateway setup, and timeline. Get a comprehensive ecommerce proposal tailored to your business."
      />
    </>
  );
}
