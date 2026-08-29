import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconMapPin, IconSparkles, IconTarget, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "Local SEO Agency in Ahmedabad | Google Maps 3-Pack SEO | PR Marketing Ventures",
  description:
    "Dominate local searches in Ahmedabad. PR Marketing Ventures optimizes Google Business Profiles, local NAP citations, review velocity, and geo-targeted landing pages across Gujarat.",
  alternates: { canonical: "/local-seo-ahmedabad/" },
};

export default function LocalSeoAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "local-seo-ahmedabad",
        badge: "Local SEO Ahmedabad",
        h1: "Local SEO & Google Maps 3-Pack Optimization in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's premier Local SEO company. We get your business ranked in the top 3 Google Maps positions, driving real phone inquiries, directions, and walk-in foot traffic.",
        heroSubtitle: "Over 60% of local searches click directly from Google Maps. We optimize your local presence across Ahmedabad's key business corridors to capture high-intent customers near you.",
        serviceType: "Local SEO Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconMapPin,
            title: "Google Maps 3-Pack Ranking",
            desc: "Category optimization, secondary attributes, and geo-relevance signals to place your business at the top of Google Maps search.",
          },
          {
            icon: IconSparkles,
            title: "Review Generation & Reputation Funnels",
            desc: "Automated WhatsApp and SMS review request flows that collect authentic 5-star customer reviews containing target keywords.",
          },
          {
            icon: IconTarget,
            title: "100% NAP Consistency & Local Citations",
            desc: "Building and synchronizing Name, Address, and Phone details across Justdial, IndiaMART, Sulekha, and Indian directories.",
          },
          {
            icon: IconBuilding,
            title: "Hyper-Local Area Landing Pages",
            desc: "Dedicated location content targeting C.G. Road, SG Highway, Prahladnagar, Satellite, Bodakdev, Bopal, and Gandhinagar.",
          },
        ],
        faqs: [
          {
            q: "Why is Local SEO crucial for Ahmedabad businesses?",
            a: "Local SEO captures customers with immediate buying intent. When someone searches 'clinics near me' or 'real estate agency in SG Highway', ranking in the top 3 on Google Maps generates direct phone calls and visits.",
          },
          {
            q: "What is the Google 3-Pack and why does it matter?",
            a: "The Google 3-Pack is the block of three prominent local business listings that appear at the top of Google search results for local queries. It captures over 60% of all local clicks and calls.",
          },
          {
            q: "How do you improve my Google Business Profile rank on Google Maps?",
            a: "We optimize primary/secondary categories, add geo-tagged photos, build local NAP citations, implement automated review generation, and publish weekly business updates.",
          },
          {
            q: "How long does Local SEO take to show results in Ahmedabad?",
            a: "Most businesses see significant increases in phone calls and Google Maps rankings within 30 to 60 days of starting our Local SEO program.",
          },
          {
            q: "Can you help rank multiple branch locations across Ahmedabad?",
            a: "Yes. We create unique localized landing pages and separate verified Google Business Profiles for each location (e.g. Navrangpura, SG Highway, Bopal, Maninagar).",
          },
          {
            q: "How do customer reviews with keywords boost local ranking?",
            a: "When customer reviews naturally mention your services and location (e.g., 'best digital marketing in C.G. Road'), Google's local algorithm recognizes strong relevance signals.",
          },
          {
            q: "What local business directories do you submit citations to in Gujarat?",
            a: "We submit and verify consistent citations on Justdial, IndiaMART, Sulekha, Google Maps, Apple Maps, Bing Places, YellowPages India, and Gujarat Chamber directories.",
          },
          {
            q: "How do you protect profiles from suspensions and fake negative reviews?",
            a: "We ensure strict compliance with Google Business Profile policies, handle verification appeals, and flag policy-violating spam reviews for removal.",
          },
        ],
      }}
    />
  );
}
