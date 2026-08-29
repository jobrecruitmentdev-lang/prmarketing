import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconGauge, IconServer, IconCode, IconSparkles } from "@/components/icons";

export const metadata: Metadata = {
  title: "Website Performance Optimization in Ahmedabad | Core Web Vitals Agency | PR Marketing Ventures",
  description:
    "Speed up your website in Ahmedabad. PR Marketing Ventures optimizes PageSpeed to 90+, fixes LCP/INP/CLS Core Web Vitals, and deploys sub-second edge CDN caching.",
  alternates: { canonical: "/website-performance-optimization-ahmedabad/" },
};

export default function WebsitePerformanceOptimizationAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "website-performance-optimization-ahmedabad",
        badge: "Website Performance Ahmedabad",
        h1: "Website Performance & Speed Optimization Agency in Ahmedabad",
        tldr: "PR Marketing Ventures is Ahmedabad's specialized web performance engineering agency. We rescue slow websites, optimize Core Web Vitals (LCP, INP, CLS), and achieve 90+ Google PageSpeed scores.",
        heroSubtitle: "A 1-second delay in page load time costs you 7% in lost conversions. We engineer sub-second page rendering, image CDNs, database caching, and clean JS payloads to boost your search rankings.",
        serviceType: "Website Performance Optimization Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconGauge,
            title: "Core Web Vitals Assessment & Fixes",
            desc: "Eliminating render-blocking CSS, reducing layout shifts (CLS), and optimizing Largest Contentful Paint (LCP) to under 1.5 seconds.",
          },
          {
            icon: IconServer,
            title: "Cloudflare Edge CDN & Server Caching",
            desc: "Configuring Redis object caching, Cloudflare APO, and edge worker routing to achieve under 100ms Time-to-First-Byte (TTFB).",
          },
          {
            icon: IconCode,
            title: "JavaScript Payload & Bundle Splitting",
            desc: "Tree-shaking redundant JavaScript libraries, deferring non-essential scripts, and inlining critical CSS for instantaneous paint.",
          },
          {
            icon: IconSparkles,
            title: "Next-Gen WebP/AVIF Image Compression",
            desc: "Automated media compression, lazy-loading, and responsive srcset attributes that slash page weights by up to 70%.",
          },
        ],
        faqs: [
          {
            q: "How does website speed affect my Google rankings in Ahmedabad?",
            a: "Google uses Core Web Vitals as a confirmed ranking signal. Fast websites outrank slower competitors and deliver significantly higher conversion rates.",
          },
          {
            q: "Can you optimize slow WordPress and WooCommerce sites in Ahmedabad?",
            a: "Yes. We optimize slow WordPress and WooCommerce databases, clean up bloated plugins, and implement edge caching to deliver sub-second loading.",
          },
        ],
      }}
    />
  );
}
