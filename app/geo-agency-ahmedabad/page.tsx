import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconSearch, IconTarget, IconBot } from "@/components/icons";

export const metadata: Metadata = {
  title: "GEO Agency in Ahmedabad | Generative Engine & AI Search Optimization | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is Ahmedabad's first Generative Engine Optimization (GEO) and AEO agency. Get your brand cited in ChatGPT, Google AI Overviews, Perplexity, and Claude.",
  alternates: { canonical: "/geo-agency-ahmedabad/" },
};

export default function GeoAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "geo-agency-ahmedabad",
        badge: "GEO Agency Ahmedabad",
        h1: "Generative Engine Optimization (GEO) & AI Search Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is the leading GEO and AEO agency in Ahmedabad. We structure your website content, entity schema, and data models to get your brand cited in ChatGPT, Google AI Overviews, Perplexity, and Gemini.",
        heroSubtitle: "Over 45% of search queries now generate AI Overviews. We engineer your digital presence so AI answer engines recommend and cite your business as the premier authority in Ahmedabad.",
        serviceType: "Generative Engine Optimization Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSparkles,
            title: "AI Answer Engine Optimization (AEO)",
            desc: "Formatting definitions, statistics, and comparison matrices to win direct citations in Google AI Overviews and Perplexity.",
          },
          {
            icon: IconBot,
            title: "ChatGPT & Claude Brand Citation",
            desc: "Optimizing your brand entity, press mentions, and llms.txt directives so generative conversational LLMs recommend your business.",
          },
          {
            icon: IconSearch,
            title: "Entity Schema & Knowledge Graph Engineering",
            desc: "Deploying machine-readable JSON-LD (Organization, TechArticle, Service) to firmly establish your brand entity in search engine knowledge graphs.",
          },
          {
            icon: IconTarget,
            title: "Princeton-Researched GEO Frameworks",
            desc: "Implementing verified citation multipliers (+40% authoritative sources, +37% statistics) for maximum AI visibility.",
          },
        ],
        faqs: [
          {
            q: "What is Generative Engine Optimization (GEO)?",
            a: "GEO is the practice of structuring digital content and brand data so AI models (ChatGPT, Perplexity, Google AI Overviews) extract and cite your business in AI-generated answers.",
          },
          {
            q: "How does GEO differ from traditional SEO in Ahmedabad?",
            a: "Traditional SEO targets ten blue links on Google's results page. GEO targets direct source citations within synthesized AI answers, allowing you to win market share even from conversational prompts.",
          },
          {
            q: "How can my Ahmedabad business get cited by ChatGPT and Perplexity?",
            a: "By establishing clear entity schema, publishing authoritative data tables, adding llms.txt directives, and securing contextual mentions in high-authority local and industry publications.",
          },
        ],
      }}
    />
  );
}
