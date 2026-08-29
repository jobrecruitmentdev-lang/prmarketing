import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBuilding, IconSearch, IconTarget, IconWorkflow, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "B2B Marketing Agency in Ahmedabad | Industrial & Export Lead Gen | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a specialized B2B marketing agency in Ahmedabad. We help manufacturers, exporters, engineering firms, and enterprise SaaS companies generate high-value OEM leads.",
  alternates: { canonical: "/b2b-marketing-agency-ahmedabad/" },
};

export default function B2bMarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "b2b-marketing-agency-ahmedabad",
        badge: "B2B Marketing Agency Ahmedabad",
        h1: "Top B2B Marketing Agency in Ahmedabad for Industrial & Corporate Growth",
        tldr: "PR Marketing Ventures helps chemical, engineering, manufacturing, pharmaceutical, and technology enterprises in Ahmedabad and Gujarat acquire high-value corporate clients and international OEM buyers through B2B SEO, Google Search Ads, LinkedIn ABM, and automated RFQ systems.",
        heroSubtitle: "Stop relying solely on word-of-mouth and trade expos. We build predictable B2B customer acquisition pipelines that connect your business directly with verified corporate decision-makers.",
        serviceType: "B2B Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "B2B Technical & Export SEO",
            desc: "Ranking your industrial products and OEM capabilities at the top of Google across India and global export markets (USA, Europe, Middle East).",
          },
          {
            icon: IconBuilding,
            title: "LinkedIn Account-Based Marketing (ABM)",
            desc: "Targeting verified CEOs, Managing Directors, and Procurement Heads with tailored B2B value propositions and case studies.",
          },
          {
            icon: IconTarget,
            title: "High-Intent Google Search Ads for B2B",
            desc: "Precision bidding on high-commercial B2B keywords ('bulk chemical manufacturers Gujarat', 'custom packaging machinery suppliers').",
          },
          {
            icon: IconWorkflow,
            title: "Automated RFQ & Quotation Workflows",
            desc: "Frictionless digital product catalogs with instant WhatsApp quote acknowledgments and automatic routing to senior sales engineers.",
          },
        ],
        faqs: [
          {
            q: "How does B2B digital marketing work for manufacturers in Ahmedabad?",
            a: "B2B marketing positions your factory in front of corporate procurement teams at the exact moment they search for certified suppliers, capturing qualified RFQs directly.",
          },
          {
            q: "Which industrial corridors in Gujarat do you serve?",
            a: "We work directly with manufacturers and exporters across GIDC Naroda, Vatva, Odhav, Changodar, Sanand, Kadi, Ankleshwar, and GIFT City.",
          },
          {
            q: "How do you filter out low-value retail inquiries from high-ticket B2B leads?",
            a: "We implement minimum order quantity (MOQ) qualifiers, company email verification, and conversational AI screening on all landing page forms.",
          },
        ],
      }}
    />
  );
}
