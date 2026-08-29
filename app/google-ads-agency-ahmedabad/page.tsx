import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconTrendingUp, IconGauge, IconSearch } from "@/components/icons";

export const metadata: Metadata = {
  title: "Google Ads Agency in Ahmedabad | Certified PPC Management Company | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a certified Google Ads agency in Ahmedabad. We manage high-converting Google Search, Performance Max, YouTube, and Display PPC campaigns with maximum ROAS.",
  alternates: { canonical: "/google-ads-agency-ahmedabad/" },
};

export default function GoogleAdsAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "google-ads-agency-ahmedabad",
        badge: "Google Ads Agency Ahmedabad",
        h1: "High-ROAS Google Ads & PPC Management Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is a certified Google Ads management company in Ahmedabad. We build high-intent Search, Performance Max (PMax), YouTube, and Shopping ad campaigns that capture active buyers at the exact moment of search.",
        heroSubtitle: "Eliminate wasted clicks and unqualified inquiries. We optimize keyword match types, negative filters, bid strategies, and landing page quality scores to lower your Cost Per Acquisition (CPA).",
        serviceType: "Google Ads Management Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "High-Intent Google Search Ads",
            desc: "Bidding on high-commercial search terms with compelling ad copy and sitelink extensions that outrank competitors.",
          },
          {
            icon: IconTarget,
            title: "Performance Max (PMax) Campaigns",
            desc: "Leveraging Google's machine learning across Search, Maps, YouTube, and Display with tailored audience signals.",
          },
          {
            icon: IconTrendingUp,
            title: "Google Shopping Feed Optimization",
            desc: "Optimizing product titles, descriptions, and custom merchant center labels to dominate Google Shopping results.",
          },
          {
            icon: IconGauge,
            title: "Negative Keyword Pruning & Quality Score Boost",
            desc: "Weekly search term audits to eliminate irrelevant clicks and achieve 9/10 or 10/10 quality scores on core keywords.",
          },
        ],
        faqs: [
          {
            q: "How quickly do Google Ads generate leads in Ahmedabad?",
            a: "Google Search ads start generating phone calls and form submissions within 24 to 48 hours of campaign activation.",
          },
          {
            q: "How do you prevent money waste on irrelevant Google clicks?",
            a: "We maintain exhaustive negative keyword lists, exact match structures, and geo-fencing restricted exclusively to target locations in Ahmedabad and Gujarat.",
          },
        ],
      }}
    />
  );
}
