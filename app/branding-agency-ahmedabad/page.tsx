import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconLayout, IconBuilding, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "Branding Agency in Ahmedabad | Brand Strategy & Corporate Identity | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top branding agency in Ahmedabad. We craft memorable brand strategies, logo design systems, corporate positioning, packaging, and digital brand identities.",
  alternates: { canonical: "/branding-agency-ahmedabad/" },
};

export default function BrandingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "branding-agency-ahmedabad",
        badge: "Branding Agency Ahmedabad",
        h1: "Top Branding & Corporate Identity Agency in Ahmedabad",
        tldr: "PR Marketing Ventures crafts powerful, distinct brand identities in Ahmedabad. We combine strategic brand positioning, memorable visual design systems, corporate logo design, and brand storytelling to elevate your market standing above competitors.",
        heroSubtitle: "Your brand is your greatest long-term commercial asset. We create cohesive, premium visual identities and messaging frameworks that build emotional trust and command premium pricing.",
        serviceType: "Branding Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconLayout,
            title: "Brand Identity & Visual Design Systems",
            desc: "Custom logo design, harmonious color palettes, modern typography, and comprehensive brand guideline books for multi-channel consistency.",
          },
          {
            icon: IconTarget,
            title: "Strategic Market Positioning & Messaging",
            desc: "Defining your unique value proposition (UVP), brand narrative, and corporate tone of voice to resonate deeply with target buyers.",
          },
          {
            icon: IconBuilding,
            title: "Corporate Rebranding & Modernization",
            desc: "Revitalizing legacy businesses into modern, dynamic brands ready for domestic expansion and global export markets.",
          },
          {
            icon: IconSparkles,
            title: "Packaging & Marketing Collateral Design",
            desc: "Striking product packaging, corporate brochures, business profiles, and digital sales decks that captivate clients.",
          },
        ],
        faqs: [
          {
            q: "What is included in a complete branding package in Ahmedabad?",
            a: "Our branding packages include brand strategy workshops, logo design and usage guidelines, typography standards, color palettes, stationery/marketing collateral design, and digital asset kits.",
          },
          {
            q: "How does strong branding help an Ahmedabad business grow?",
            a: "Strong branding builds instant credibility, justifies premium pricing, differentiates you from competitors, and significantly increases conversion rates across all marketing channels.",
          },
          {
            q: "How long does a brand identity project take?",
            a: "A comprehensive brand identity design and positioning project typically takes 3 to 5 weeks from discovery to final delivery.",
          },
        ],
      }}
    />
  );
}
