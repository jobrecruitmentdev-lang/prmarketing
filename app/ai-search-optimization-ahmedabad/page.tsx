import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBot, IconSparkles, IconSearch, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Search Optimization in Ahmedabad | ChatGPT & LLM SEO | PR Marketing Ventures",
  description:
    "PR Marketing Ventures helps Ahmedabad brands rank on ChatGPT, Google AI Overviews, Perplexity, and Gemini through advanced AI search optimization (GEO/LLM SEO).",
  alternates: { canonical: "/ai-search-optimization-ahmedabad/" },
};

export default function AiSearchOptimizationAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ai-search-optimization-ahmedabad",
        badge: "AI Search Optimization Ahmedabad",
        h1: "AI Search Optimization & ChatGPT SEO Agency in Ahmedabad",
        tldr: "PR Marketing Ventures optimizes your digital footprint so conversational AI models (ChatGPT, Claude, Perplexity, Gemini, Google AI) recommend and cite your Ahmedabad business when users ask for recommendations.",
        heroSubtitle: "Millions of consumers now ask AI engines instead of typing Google searches. We engineer your brand's AI search presence to ensure you are the recommended choice.",
        serviceType: "AI Search Optimization Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconBot,
            title: "ChatGPT & Claude Brand Recommendation",
            desc: "Optimizing digital PR, brand citations, and authoritative references so generative LLMs proactively recommend your business.",
          },
          {
            icon: IconSparkles,
            title: "Perplexity & SearchGPT Real-Time Citations",
            desc: "Publishing machine-readable data tables and authoritative case studies formatted for real-time web retrieval models.",
          },
          {
            icon: IconSearch,
            title: "LLM Directives & llms.txt Engineering",
            desc: "Deploying standard llms.txt files that guide AI search spiders to your core offerings, key statistics, and contact endpoints.",
          },
          {
            icon: IconWorkflow,
            title: "Entity Schema & Knowledge Base Synchronization",
            desc: "Aligning your brand entity across Wikipedia, Wikidata, industry directories, and search engine knowledge graphs.",
          },
        ],
        faqs: [
          {
            q: "How does AI Search Optimization (LLM SEO) work?",
            a: "AI Search Optimization trains large language models to recognize your brand as the authoritative solution for industry keywords by structuring public data, citations, and semantic schema.",
          },
          {
            q: "Why is AI Search Optimization essential in 2026 for Ahmedabad businesses?",
            a: "As conversational AI tools capture market share from traditional search engines, brands that are not optimized for AI discovery will become invisible to modern buyers.",
          },
          {
            q: "How do you track brand visibility inside ChatGPT and Perplexity?",
            a: "We track conversational prompt triggers, AI citation frequency, and referral traffic originating from AI domains like chatgpt.com and perplexity.ai.",
          },
        ],
      }}
    />
  );
}
