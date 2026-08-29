import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconTrendingUp, IconTarget, IconWorkflow, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "Social Media Marketing Agency in Ahmedabad | Top SMM Company | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a premier social media marketing agency in Ahmedabad. We create viral Instagram reels, high-ROAS Meta ads, LinkedIn B2B lead generation, and brand growth campaigns.",
  alternates: { canonical: "/social-media-marketing-agency-ahmedabad/" },
};

export default function SocialMediaMarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "social-media-marketing-agency-ahmedabad",
        badge: "Social Media Marketing Agency Ahmedabad",
        h1: "Top Social Media Marketing Agency in Ahmedabad for Brand & Sales Growth",
        tldr: "PR Marketing Ventures is Ahmedabad's premier performance social media marketing agency located on C.G. Road. We combine thumb-stopping creative video reels, high-ROAS Instagram & Facebook ad funnels, and B2B LinkedIn outreach to turn followers into paying customers.",
        heroSubtitle: "Stop posting generic graphics that get zero engagement. We design data-backed social media campaigns that captivate local Ahmedabad audiences, build brand authority, and drive direct revenue.",
        serviceType: "Social Media Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTrendingUp,
            title: "Performance Meta Ads (Instagram & Facebook)",
            desc: "Direct-response video and carousel ad funnels engineered to acquire new customers at the lowest Cost Per Lead (CPL) across Gujarat.",
          },
          {
            icon: IconSparkles,
            title: "Viral Video Reels & Creative Storytelling",
            desc: "Professional video shoots, dynamic motion graphics, and founder storytelling that generate massive local organic reach.",
          },
          {
            icon: IconBuilding,
            title: "B2B LinkedIn Lead Generation",
            desc: "Targeting verified CEOs, procurement directors, and business owners in Ahmedabad, Sanand, and GIFT City with high-ticket offer funnels.",
          },
          {
            icon: IconWorkflow,
            title: "Automated Instagram DM & Lead Funnels",
            desc: "Instant automated chatbot responses inside Instagram DMs that deliver product links and collect customer phone numbers in under 5 seconds.",
          },
        ],
        faqs: [
          {
            q: "What does a full-service social media marketing agency in Ahmedabad do?",
            a: "We handle end-to-end social media growth: monthly content calendars, reel scriptwriting and production, graphic design, paid ad management on Meta & LinkedIn, influencer collaborations, and automated DM lead capture.",
          },
          {
            q: "How much does social media marketing agency management cost in Ahmedabad?",
            a: "Our monthly social media retainer packages range from ₹20,000/month for organic growth and reel production up to ₹75,000+/month for full-funnel paid ad management, video shoots, and multi-platform scaling.",
          },
          {
            q: "Do you shoot professional video reels in-house at our Ahmedabad location?",
            a: "Yes. Our creative team conducts on-site video shoots at your office, showroom, clinic, or factory in Ahmedabad to capture authentic brand content.",
          },
          {
            q: "How quickly can social media ads generate leads for my business?",
            a: "Paid direct-response ad campaigns on Instagram and Facebook start delivering qualified buyer inquiries within 48 to 72 hours of launch.",
          },
        ],
      }}
    />
  );
}
