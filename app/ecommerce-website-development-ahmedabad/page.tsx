import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconCart, IconSparkles, IconGauge, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Ecommerce Website Development in Ahmedabad | D2C & Multi-Vendor Stores | PR Marketing Ventures",
  description:
    "Custom ecommerce website development in Ahmedabad. PR Marketing Ventures builds high-performance online retail stores, D2C brands, and multi-vendor marketplaces across Gujarat.",
  alternates: { canonical: "/ecommerce-website-development-ahmedabad/" },
};

export default function EcommerceWebsiteDevelopmentAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ecommerce-website-development-ahmedabad",
        badge: "Ecommerce Website Ahmedabad",
        h1: "Custom Ecommerce Website Development Agency in Ahmedabad",
        tldr: "PR Marketing Ventures engineers custom ecommerce websites in Ahmedabad. We combine conversion rate optimization (CRO), product structured data, and high-speed checkout flows to turn retail stores into profitable online powerhouses.",
        heroSubtitle: "Launch an online store engineered for high conversion rates. We design intuitive shopping experiences that rank on Google Merchant Center and convert traffic into sales.",
        serviceType: "Ecommerce Website Development Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconCart,
            title: "Custom D2C Online Storefronts",
            desc: "Tailored shopping experiences designed to showcase your unique products with high-resolution imagery, filters, and sticky buy buttons.",
          },
          {
            icon: IconSparkles,
            title: "Product Schema & Google Merchant Feed",
            desc: "Structured data implementation so your products appear with prices, ratings, and stock status in Google search results and Google Shopping.",
          },
          {
            icon: IconGauge,
            title: "Mobile-First 1-Click Checkout Experience",
            desc: "Frictionless checkout steps optimized for Indian consumers with WhatsApp OTP login and instant UPI QR payments.",
          },
          {
            icon: IconWorkflow,
            title: "ERP, Inventory & Accounting Sync",
            desc: "Automatic inventory syncing across marketplaces (Amazon, Flipkart, Shopify) and direct synchronization with Tally/Zoho Books.",
          },
        ],
        faqs: [
          {
            q: "Can you migrate our physical retail store into an ecommerce website in Ahmedabad?",
            a: "Yes. We handle product photography formatting, catalog upload, payment gateway setup, logistics tie-ups, and staff training.",
          },
          {
            q: "Do you provide digital marketing and ads for ecommerce stores?",
            a: "Yes. We run full-funnel Google Performance Max, Meta catalog ads, and retention marketing to drive consistent sales.",
          },
        ],
      }}
    />
  );
}
