import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconMapPin, IconTrendingUp, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Hotel & Restaurant Marketing Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures drives table reservations, wedding banquet inquiries, and direct room bookings for luxury hotels, resorts, and restaurants in Ahmedabad and Gujarat.",
  alternates: { canonical: "/industries/hospitality/" },
};

export default function HospitalityIndustryPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "industries/hospitality",
        badge: "Hospitality Marketing Ahmedabad",
        h1: "Hotel, Resort & Restaurant Marketing Agency in Ahmedabad",
        tldr: "PR Marketing Ventures helps luxury hotels, heritage resorts, banquet lawns, and fine-dining restaurants in Ahmedabad drive direct room bookings, wedding banquet inquiries, and table reservations through Instagram viral marketing, Google Maps Local SEO, and high-impact visual campaigns.",
        heroSubtitle: "Stop losing heavy commissions to OTAs and food aggregators. We build direct customer acquisition funnels that fill your rooms, tables, and wedding venues.",
        serviceType: "Hospitality Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSparkles,
            title: "Viral Instagram Food & Luxury Reels",
            desc: "High-production video shoots, chef storytelling, and ambiance reels that capture viral food lovers across Ahmedabad.",
          },
          {
            icon: IconMapPin,
            title: "Google Maps 3-Pack for Diners & Tourists",
            desc: "Optimizing Google Business Profiles with appetizing menu photos, review generation, and 'restaurants near me' domination.",
          },
          {
            icon: IconTrendingUp,
            title: "Wedding Banquet & Corporate Event Lead Generation",
            desc: "Targeted Meta and Google Ads campaigns capturing high-ticket banquet hall and wedding venue inquiries in Ahmedabad.",
          },
          {
            icon: IconWorkflow,
            title: "WhatsApp Table & Event Booking Systems",
            desc: "Automated reservation confirmations, digital menu cards, and seasonal festival promotional broadcasts.",
          },
        ],
        faqs: [
          {
            q: "How can marketing reduce my hotel's dependency on OTA commissions?",
            a: "By building a fast, direct booking website with special perks, Google Hotel Ads, and email/WhatsApp loyalty retention funnels.",
          },
          {
            q: "Do you handle influencer marketing and food blogger collaborations in Ahmedabad?",
            a: "Yes. We manage end-to-end food blogger invitations, influencer PR, and review campaigns across Sindhu Bhavan Road, Bodakdev, and SG Highway.",
          },
        ],
      }}
    />
  );
}
