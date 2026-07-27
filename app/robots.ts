import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"], allow: "/" },
      { userAgent: ["CCBot", "anthropic-ai", "Bytespider", "cohere-ai"], disallow: "/" }
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
