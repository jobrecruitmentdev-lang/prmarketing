import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBuilding, IconSearch, IconSparkles, IconTarget, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Pharma Marketing Agency in Ahmedabad | Pharmaceutical SEO & Lead Gen | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a specialized pharma marketing agency in Ahmedabad. We help pharmaceutical manufacturers, PCD pharma franchises, API suppliers, and healthcare brands scale B2B orders.",
  alternates: { canonical: "/pharma-marketing-agency-ahmedabad/" },
};

export default function PharmaMarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "pharma-marketing-agency-ahmedabad",
        badge: "Pharma Marketing Agency Ahmedabad",
        h1: "Top Pharma & Pharmaceutical Marketing Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's specialized pharmaceutical marketing agency. Located in Gujarat's pharma capital, we help third-party contract manufacturers, PCD pharma franchises, active pharmaceutical ingredient (API) exporters, and nutraceutical brands generate high-volume B2B buyer inquiries.",
        heroSubtitle: "Scale your pharmaceutical distribution and export contracts. We build compliant, high-intent B2B search pipelines and digital product catalogs tailored for India's premier pharma manufacturing hub.",
        serviceType: "Pharma Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "Pharma SEO & Global Export Visibility",
            desc: "Ranking pharmaceutical formulations, DCGI-approved molecules, and API bulk chemicals at the top of Google across India and international markets.",
          },
          {
            icon: IconTarget,
            title: "PCD Franchise & Third-Party Manufacturing Lead Gen",
            desc: "Targeting stockists, medical distributors, and pharma entrepreneurs searching for franchise rights and contract manufacturing in Gujarat.",
          },
          {
            icon: IconBuilding,
            title: "Compliant Pharmaceutical Web Portals",
            desc: "Sub-second Next.js web applications showcasing WHO-GMP, EU-GMP certifications, product dosage forms, and interactive RFQ quotation forms.",
          },
          {
            icon: IconWorkflow,
            title: "Automated Product Catalog & WhatsApp Nurture",
            desc: "Instant automated delivery of visual product cards, therapeutic category lists, and price lists via WhatsApp Meta API.",
          },
        ],
        faqs: [
          {
            q: "Why do pharmaceutical manufacturers in Ahmedabad need dedicated digital marketing?",
            a: "Gujarat accounts for nearly 30% of India's pharmaceutical manufacturing. Dedicated B2B pharma marketing allows manufacturers to connect directly with nationwide distributors and global importers without relying exclusively on intermediaries.",
          },
          {
            q: "Are your pharma marketing campaigns compliant with regulatory guidelines?",
            a: "Yes. We strictly adhere to Drugs and Cosmetics Act regulations, ensuring all messaging is B2B-focused and compliant with pharmaceutical advertising laws.",
          },
          {
            q: "Which pharmaceutical clusters in Gujarat do you serve?",
            a: "We work directly with pharma enterprises across Ahmedabad (Changodar, Sanand, Vatva), Vadodara, Ankleshwar, and Bharuch.",
          },
        ],
      }}
    />
  );
}
