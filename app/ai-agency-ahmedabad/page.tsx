import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBot, IconSparkles, IconWorkflow, IconServer } from "@/components/icons";

export const metadata: Metadata = {
  title: "AI Agency in Ahmedabad | Artificial Intelligence Solutions | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a premier AI agency in Ahmedabad. We build custom AI applications, LLM workflows, conversational AI assistants, and enterprise machine learning automation across Gujarat.",
  alternates: { canonical: "/ai-agency-ahmedabad/" },
};

export default function AiAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "ai-agency-ahmedabad",
        badge: "AI Agency Ahmedabad",
        h1: "Enterprise AI Solutions & Machine Learning Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's leading AI agency. We develop custom LLM applications, autonomous AI agents, enterprise search systems, and automated workflow pipelines for forward-thinking Gujarat enterprises.",
        heroSubtitle: "Harness the power of generative AI and automation. We engineer custom AI models, intelligent chatbots, and document processing systems that reduce operational costs and accelerate revenue.",
        serviceType: "Artificial Intelligence Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconBot,
            title: "Custom LLM & AI Application Development",
            desc: "Fine-tuned language models and private OpenAI/Anthropic architectures engineered for your specific enterprise domain.",
          },
          {
            icon: IconSparkles,
            title: "Retrieval-Augmented Generation (RAG)",
            desc: "Connect AI models securely to your private PDFs, internal databases, and ERP systems for zero-hallucination document search.",
          },
          {
            icon: IconWorkflow,
            title: "Autonomous AI Workflow Automation",
            desc: "Self-operating AI agents that process customer inquiries, extract invoice data, and trigger CRM updates automatically.",
          },
          {
            icon: IconServer,
            title: "Enterprise AI Security & Private Hosting",
            desc: "On-premise or private cloud AI deployment ensuring your proprietary business data is never shared with public models.",
          },
        ],
        faqs: [
          {
            q: "What AI services do you provide for Ahmedabad companies?",
            a: "We provide custom AI application development, WhatsApp AI bots, RAG document search engines, internal AI copilot tools, and business process automation.",
          },
          {
            q: "How secure is our company data when using your AI solutions?",
            a: "We implement strict data isolation, zero-retention API policies, and end-to-end encryption so your proprietary data is never used to train public models.",
          },
        ],
      }}
    />
  );
}
