import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconTrendingUp, IconTarget, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Social Media Marketing Agency in Ahmedabad | Meta & Instagram Ads | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top social media marketing company in Ahmedabad. High-converting Instagram ads, Meta lead generation funnels, LinkedIn B2B marketing, and brand growth.",
  alternates: { canonical: "/social-media-marketing-ahmedabad/" },
};

export default function SocialMediaMarketingAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "social-media-marketing-ahmedabad",
        badge: "Social Media Marketing Ahmedabad",
        h1: "Results-Driven Social Media Marketing Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's performance-focused social media agency. We create direct-response Instagram & Facebook video ads, LinkedIn B2B lead generation campaigns, and organic community growth strategies.",
        heroSubtitle: "Transform social media followers into paying clients. We combine thumb-stopping video creatives with precision demographic targeting to drive real revenue for Ahmedabad brands.",
        serviceType: "Social Media Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTrendingUp,
            title: "Meta (Instagram & Facebook) Paid Ads",
            desc: "Direct response video reels, carousels, and instant lead forms designed to capture local attention and scale cold acquisition.",
          },
          {
            icon: IconTarget,
            title: "B2B LinkedIn Lead Generation",
            desc: "Targeting verified CEOs, Founders, and Procurement Directors in Ahmedabad and GIFT City with high-ticket offer funnels.",
          },
          {
            icon: IconSparkles,
            title: "Content Creation & Brand Storytelling",
            desc: "Professional video shoots, motion graphics, and educational carousel posts that establish brand credibility.",
          },
          {
            icon: IconWorkflow,
            title: "Automated DM & Comment Lead Qualification",
            desc: "Automated chatbot responses in Instagram DMs that instantly send product links and collect customer phone numbers.",
          },
        ],
        faqs: [
          {
            q: "What social media platforms do you manage in Ahmedabad?",
            a: "We manage Instagram, Facebook, LinkedIn, YouTube, and WhatsApp marketing campaigns for B2B and B2C brands.",
          },
          {
            q: "Do you create video reels and ad graphics in-house?",
            a: "Yes. Our team handles scriptwriting, graphic design, video editing, and ad copywriting from our C.G. Road office.",
          },
        ],
      }}
    />
  );
}
