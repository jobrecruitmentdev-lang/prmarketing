import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconBot, IconSearch, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "AEO Agency in Ahmedabad | Answer Engine Optimization Services | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a leading Answer Engine Optimization (AEO) agency in Ahmedabad. Get cited in Google AI Overviews, Perplexity, Claude, and voice search assistants.",
  alternates: { canonical: "/aeo-agency-ahmedabad/" },
};

export default function AeoAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "aeo-agency-ahmedabad",
        badge: "AEO Agency Ahmedabad",
        h1: "Answer Engine Optimization (AEO) Agency in Ahmedabad",
        tldr: "PR Marketing Ventures optimizes your digital authority so AI answer engines (Google AI Overviews, Perplexity, ChatGPT, Claude) synthesize and cite your business as the premier direct answer for industry queries.",
        heroSubtitle: "Search is evolving from 10 blue links to synthesized AI direct answers. We structure your website data, FAQs, and entity graphs to win the primary citation spot across modern answer engines.",
        serviceType: "Answer Engine Optimization Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSparkles,
            title: "Direct Answer & FAQ Schema Engineering",
            desc: "Deploying high-precision JSON-LD FAQPage, HowTo, and TechArticle structured markup to win Google AI answer extraction.",
          },
          {
            icon: IconBot,
            title: "Entity Authority & Knowledge Graph Anchoring",
            desc: "Connecting your brand to Google Knowledge Graph and Wikidata entities to validate your subject-matter authority.",
          },
          {
            icon: IconSearch,
            title: "Conversational Query & Voice Search Optimization",
            desc: "Optimizing content for natural question-and-answer patterns favored by voice assistants (Siri, Alexa, Google Assistant).",
          },
          {
            icon: IconTarget,
            title: "Perplexity & SearchGPT Direct Source Citations",
            desc: "Structuring statistical proof points, proprietary data tables, and llms.txt directives for direct AI citation inclusion.",
          },
        ],
        faqs: [
          {
            q: "What is Answer Engine Optimization (AEO)?",
            a: "AEO is the practice of formatting and structuring web content so AI search engines can parse, understand, and display your brand as the direct synthesized answer to user questions.",
          },
          {
            q: "How does AEO differ from traditional SEO in Ahmedabad?",
            a: "Traditional SEO focuses on keyword rankings and clicks to blue links. AEO focuses on entity authority, direct question extraction, and being cited as the trusted source in AI overviews.",
          },
          {
            q: "How can my Ahmedabad business rank in Google AI Overviews?",
            a: "By structuring content with clear H2/H3 question headers, concise 40-word summary answers, authoritative statistics, and valid JSON-LD schema.",
          },
        ],
      }}
    />
  );
}
