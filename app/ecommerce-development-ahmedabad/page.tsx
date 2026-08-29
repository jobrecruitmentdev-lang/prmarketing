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
          {
            q: "How much does ecommerce website development cost in Ahmedabad?",
            a: "Standard Shopify and WooCommerce stores range from ₹45,000 to ₹1,20,000. Custom headless Next.js online commerce platforms range from ₹1,25,000 to ₹3,00,000+.",
          },
          {
            q: "Can you automate shipping and courier tracking with Shiprocket / Delhivery?",
            a: "Yes. We integrate automated shipping label generation, pickup scheduling, COD remittance tracking, and WhatsApp tracking alerts for customers.",
          },
          {
            q: "How do you recover abandoned carts on WhatsApp?",
            a: "We deploy automated WhatsApp sequences with personalized discount codes sent 15 minutes, 2 hours, and 24 hours after a customer drops off at checkout.",
          },
          {
            q: "Do you implement Product Schema for Google Shopping and Google Search?",
            a: "Yes. Every product page has structured JSON-LD Product, AggregateRating, Offer, and BreadcrumbList markup for immediate Google Merchant visibility.",
          },
          {
            q: "Can we connect our physical retail store POS/ERP with the online store?",
            a: "Yes. We integrate real-time inventory synchronization with Tally, Busy, Marg, and custom retail POS software.",
          },
          {
            q: "How long does it take to launch an e-commerce website in Ahmedabad?",
            a: "A turnkey e-commerce store with catalog setup and payment testing typically launches in 2 to 4 weeks.",
          },
        ],
      }}
    />
  );
}
