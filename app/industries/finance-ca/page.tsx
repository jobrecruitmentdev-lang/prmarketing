import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBuilding, IconSearch, IconTarget, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "CA & Financial Services Digital Marketing in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures helps Chartered Accountants (CA), wealth managers, fintech startups, and investment firms in Ahmedabad and GIFT City acquire verified corporate and HNI clients.",
  alternates: { canonical: "/industries/finance-ca/" },
};

export default function FinanceCaIndustryPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "industries/finance-ca",
        badge: "Financial Services Marketing Ahmedabad",
        h1: "Financial Services & CA Digital Marketing in Ahmedabad & GIFT City",
        tldr: "PR Marketing Ventures builds compliant, high-trust digital growth systems for Chartered Accountants (CA firms), wealth management consultancies, mutual fund advisors, loan brokers, and GIFT City fintech enterprises.",
        heroSubtitle: "Attract high-net-worth individuals (HNIs) and corporate business clients. We combine authoritative financial content, Google Search intent ads, and discrete lead qualification pipelines.",
        serviceType: "Financial Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "High-Intent Financial & Taxation SEO",
            desc: "Ranking for lucrative tax advisory, GST consultancy, corporate auditing, and business registration searches in Gujarat.",
          },
          {
            icon: IconTarget,
            title: "HNI & Corporate Google Search Ads",
            desc: "Precision bidding on corporate funding, project loan, and private wealth management search keywords.",
          },
          {
            icon: IconBuilding,
            title: "High-Trust Corporate Websites & Client Portals",
            desc: "Clean, professional Next.js websites built with SSL security, client document upload vaults, and financial calculators.",
          },
          {
            icon: IconWorkflow,
            title: "Automated Consultation Scheduling",
            desc: "Syncing qualified financial leads directly with partner calendars for confidential initial discovery meetings.",
          },
        ],
        faqs: [
          {
            q: "How do you generate corporate clients for financial consultancies in Ahmedabad?",
            a: "We deploy high-intent Google Search advertising targeting business owners searching for tax planning, project financing, and company incorporation.",
          },
          {
            q: "Do you serve fintech and international financial entities in GIFT City?",
            a: "Yes. We engineer compliant international SEO and enterprise B2B lead pipelines for entities operating in GIFT City IFSC.",
          },
        ],
      }}
    />
  );
}
