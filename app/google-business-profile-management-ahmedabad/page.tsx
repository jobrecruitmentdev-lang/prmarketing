import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBuilding, IconMapPin, IconSparkles, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "Google Business Profile Management in Ahmedabad | GMB Optimization | PR Marketing Ventures",
  description:
    "Complete Google Business Profile (GBP / GMB) management in Ahmedabad. PR Marketing Ventures handles weekly posts, review automation, geo-tagged photos, suspension recovery, and map pack optimization.",
  alternates: { canonical: "/google-business-profile-management-ahmedabad/" },
};

export default function GbpManagementAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "google-business-profile-management-ahmedabad",
        badge: "GBP Management Ahmedabad",
        h1: "Full-Service Google Business Profile Management in Ahmedabad",
        tldr: "PR Marketing Ventures provides complete hands-off Google Business Profile (formerly GMB) management for Ahmedabad companies. We manage weekly geo-tagged posts, product listings, review responses, and local ranking optimization.",
        heroSubtitle: "Turn your Google Business Profile into a 24/7 customer generation engine. We handle regular updates, Q&A, photo uploads, and review acquisition to keep your business at the top of local maps.",
        serviceType: "Google Business Profile Management Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconBuilding,
            title: "Weekly Geo-Tagged Content & Product Posts",
            desc: "Publishing weekly geo-tagged photos, special offers, and product updates that signal active local authority to Google.",
          },
          {
            icon: IconSparkles,
            title: "Review Acquisition & Response Automation",
            desc: "Professional responses to all customer reviews and automated WhatsApp funnels to consistently gather 5-star ratings.",
          },
          {
            icon: IconMapPin,
            title: "Category & Service Menu Optimization",
            desc: "Deep optimization of primary categories, secondary services, custom business hours, and direct call buttons.",
          },
          {
            icon: IconTarget,
            title: "Suspension Appeals & Verification Support",
            desc: "Expert resolution of Google Business Profile suspensions, re-verification issues, and duplicate listing removals.",
          },
        ],
        faqs: [
          {
            q: "What does Google Business Profile management include?",
            a: "Our monthly management includes weekly post creation, high-resolution geo-tagged photo uploads, review monitoring and replies, Q&A management, local citation audits, and monthly call tracking reports.",
          },
          {
            q: "How does active profile management help my rankings in Ahmedabad?",
            a: "Google prioritizes active, verified businesses that consistently update photos, respond to reviews, and maintain accurate information, resulting in higher 3-Pack rankings.",
          },
        ],
      }}
    />
  );
}
