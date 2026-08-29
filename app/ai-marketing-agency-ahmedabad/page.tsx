import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBot, IconSparkles, IconWorkflow, IconSearch, IconTrendingUp } from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Marketing Agency in Ahmedabad | AI Powered Growth & Ads | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is Ahmedabad's first AI marketing agency. We leverage predictive AI ad bidding, generative content engines, AI sales agents, and automated lead intelligence.",
  alternates: { canonical: "/ai-marketing-agency-ahmedabad/" },
};

export default function AiMarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ai-marketing-agency-ahmedabad",
        badge: "AI Marketing Agency Ahmedabad",
        h1: "AI Marketing Agency in Ahmedabad for Next-Gen Business Growth",
        tldr: "PR Marketing Ventures is Ahmedabad's specialized AI marketing company. We combine artificial intelligence, predictive machine learning ad optimization, autonomous conversational sales agents, and generative search optimization (GEO) to give your brand an unfair market advantage.",
        heroSubtitle: "Harness the power of AI to outpace competitors. We integrate AI into your marketing funnels to cut customer acquisition costs, hyper-personalize customer journeys, and automate revenue.",
        serviceType: "AI Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconBot,
            title: "Autonomous AI Sales & Support Agents",
            desc: "Custom LLM bots deployed on WhatsApp and web chat that handle multi-turn conversations, qualify leads, and close calendar bookings.",
          },
          {
            icon: IconTrendingUp,
            title: "Predictive AI Ad Bidding & Audience Modeling",
            desc: "Algorithmic bidding models that predict customer lifetime value (LTV) and allocate ad budget to highest-converting segments.",
          },
          {
            icon: IconSearch,
            title: "Generative Search Optimization (GEO/AEO)",
            desc: "Optimizing your brand data and digital footprint so ChatGPT, Perplexity, and Google AI Overviews recommend your business.",
          },
          {
            icon: IconSparkles,
            title: "AI-Powered Content & Creative Personalization",
            desc: "Rapid testing of hundreds of ad creative variations and hyper-personalized landing page copy tailored to specific buyer personas.",
          },
        ],
        faqs: [
          {
            q: "What is an AI marketing agency?",
            a: "An AI marketing agency uses artificial intelligence, machine learning, and natural language processing to automate lead qualification, optimize ad spend in real time, and position brands inside AI answer engines like ChatGPT.",
          },
          {
            q: "How does AI marketing lower customer acquisition costs (CAC)?",
            a: "AI analyzes thousands of data signals simultaneously, eliminating wasted ad spend on unqualified clicks and engaging leads instantly with personalized messaging.",
          },
          {
            q: "Can AI marketing integrate with our existing business systems?",
            a: "Yes. Our AI models connect securely to your existing CRM, WhatsApp Business account, website, and Google/Meta ad accounts.",
          },
        ],
      }}
    />
  );
}
