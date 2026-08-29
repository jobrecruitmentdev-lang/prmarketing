import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBuilding, IconSearch, IconWorkflow, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "Manufacturing & Industrial Digital Marketing Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top B2B manufacturing digital marketing agency in Ahmedabad. We help industrial manufacturers in GIDC Naroda, Vatva, Changodar, and Sanand generate high-value OEM buyer inquiries.",
  alternates: { canonical: "/industries/manufacturing/" },
};

export default function ManufacturingIndustryPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "industries/manufacturing",
        badge: "Manufacturing Marketing Ahmedabad",
        h1: "B2B Manufacturing & Industrial Digital Marketing in Ahmedabad",
        tldr: "PR Marketing Ventures helps chemical, engineering, textile, pharmaceutical, packaging, and machinery manufacturers in Ahmedabad and Gujarat generate high-ticket domestic and export OEM inquiries through B2B SEO, Google Search Ads, and custom B2B web portals.",
        heroSubtitle: "Stop relying only on trade expos and broker directories. We build proprietary digital lead generation machines that connect your factory directly with corporate procurement heads and international buyers.",
        serviceType: "Manufacturing Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "B2B Technical & Export SEO",
            desc: "Ranking your industrial products and OEM capabilities on Google across India and global export markets (USA, Europe, Middle East, Africa).",
          },
          {
            icon: IconTarget,
            title: "High-Intent Google Ads for Industrial Keywords",
            desc: "Targeting high-value B2B search terms ('chemical suppliers in Gujarat', 'industrial pump manufacturers') with exact-match precision.",
          },
          {
            icon: IconBuilding,
            title: "Industrial Web Portal & Digital Product Catalog",
            desc: "Sub-second Next.js websites showcasing technical specifications, CAD files, ISO certifications, and 1-click RFQ inquiry forms.",
          },
          {
            icon: IconWorkflow,
            title: "Automated RFQ & Quotation Workflows",
            desc: "Instant automated WhatsApp and email quote acknowledgments with technical brochures and direct routing to sales managers.",
          },
        ],
        faqs: [
          {
            q: "Why do industrial manufacturers in Ahmedabad need dedicated digital marketing?",
            a: "Over 80% of modern procurement officers and B2B buyers research suppliers online before issuing an RFQ. A strong digital presence allows Gujarat manufacturers to bypass middlemen and win direct contracts.",
          },
          {
            q: "Which industrial clusters in Ahmedabad do you serve?",
            a: "We work directly with manufacturers across GIDC Naroda, Vatva, Odhav, Changodar, Sanand, Kathwada, and Kadi industrial corridors.",
          },
          {
            q: "Can you help Gujarat manufacturers acquire international export buyers?",
            a: "Yes. We deploy International SEO with country-specific hreflang tags and targeted Google Ads campaigns across the Middle East, North America, and Europe.",
          },
        ],
      }}
    />
  );
}
