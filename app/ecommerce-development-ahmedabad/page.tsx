import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconCart, IconTarget, IconGauge, IconTrendingUp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Ecommerce Development Company in Ahmedabad | Online Store Solutions | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top ecommerce development company in Ahmedabad. High-conversion Shopify, WooCommerce, and headless Next.js online stores with payment gateway integrations.",
  alternates: { canonical: "/ecommerce-development-ahmedabad/" },
};

export default function EcommerceDevelopmentAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ecommerce-development-ahmedabad",
        badge: "Ecommerce Development Ahmedabad",
        h1: "High-Converting Ecommerce Development Company in Ahmedabad",
        tldr: "PR Marketing Ventures builds scalable, high-converting online stores for D2C brands, retailers, and B2B manufacturers in Ahmedabad using Shopify, WooCommerce, and headless Next.js architectures.",
        heroSubtitle: "Scale your online sales with lightning-fast product pages, streamlined checkout funnels, product schema for Google Shopping, and automated WhatsApp abandoned cart recovery.",
        serviceType: "Ecommerce Development Company",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconCart,
            title: "Custom Shopify & WooCommerce Storefronts",
            desc: "Custom-designed, mobile-optimized ecommerce stores built for smooth browsing, high average order value (AOV), and easy inventory management.",
          },
          {
            icon: IconGauge,
            title: "Sub-Second Headless Next.js Commerce",
            desc: "Headless online storefronts powered by Next.js and Shopify/Medusa backend for instantaneous page transitions and superior SEO rankings.",
          },
          {
            icon: IconTarget,
            title: "Payment Gateway & Logistics Integration",
            desc: "Seamless integration with Razorpay, Cashfree, Shiprocket, Delhivery, and automated COD verification systems.",
          },
          {
            icon: IconTrendingUp,
            title: "Automated Abandoned Cart & WhatsApp Recovery",
            desc: "Automated WhatsApp and SMS notification funnels that recover up to 25% of dropped checkouts automatically.",
          },
        ],
        faqs: [
          {
            q: "Which ecommerce platform should I choose: Shopify, WooCommerce, or Custom Next.js?",
            a: "Shopify is ideal for fast launch and D2C brands. WooCommerce is perfect for flexible content and catalog control. Custom Next.js is the gold standard for high-volume stores needing sub-second speed and maximum SEO authority.",
          },
          {
            q: "Do you integrate Indian payment gateways (Razorpay, UPI, Cashfree)?",
            a: "Yes. Every ecommerce store includes full UPI, Credit/Debit card, Netbanking, EMI, and COD fraud verification workflows.",
          },
        ],
      }}
    />
  );
}
