import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconCode, IconLayout, IconGauge, IconSparkles } from "@/components/icons";

export const metadata: Metadata = {
  title: "Web Development Company in Ahmedabad | Custom Next.js & Full-Stack Websites | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a leading web development company in Ahmedabad. We build sub-second Next.js, React, and PHP websites optimized for Core Web Vitals, SEO, and conversions.",
  alternates: { canonical: "/web-development-ahmedabad/" },
};

export default function WebDevelopmentAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "web-development-ahmedabad",
        badge: "Web Development Ahmedabad",
        h1: "High-Performance Web Development Company in Ahmedabad",
        tldr: "PR Marketing Ventures builds ultra-fast, SEO-optimized custom websites and web applications in Ahmedabad using Next.js 15, React 19, TypeScript, and modern headless CMS architectures.",
        heroSubtitle: "Get a website that loads in under 1 second, ranks at the top of Google, and turns visitors into customers. Built with cutting-edge web technologies on C.G. Road, Ahmedabad.",
        serviceType: "Web Development Company",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconCode,
            title: "Custom Next.js & React Development",
            desc: "Server-side rendered and static export web apps delivering instant page transitions and superior Google SEO crawlability.",
          },
          {
            icon: IconLayout,
            title: "Conversion-Focused Responsive UI/UX",
            desc: "Pixel-perfect mobile-first designs crafted with modern typography, smooth animations, and high-converting CTA layouts.",
          },
          {
            icon: IconGauge,
            title: "Guaranteed 90+ PageSpeed Score",
            desc: "Engineered to pass all Google Core Web Vitals (LCP, INP, CLS) out of the box with zero layout shifts.",
          },
          {
            icon: IconSparkles,
            title: "Complete Technical SEO & Schema Built-In",
            desc: "Pre-configured canonical tags, OpenGraph previews, breadcrumbs, and rich JSON-LD schema for immediate search visibility.",
          },
        ],
        faqs: [
          {
            q: "How much does a website development project cost in Ahmedabad?",
            a: "Standard business websites range from ₹25,000 to ₹60,000. Custom enterprise Next.js web applications and headless portals range from ₹75,000 to ₹2,50,000+ depending on scope.",
          },
          {
            q: "How long does it take to develop a custom website in Ahmedabad?",
            a: "A typical high-performance business website takes 2 to 4 weeks from UI/UX wireframes to live deployment.",
          },
        ],
      }}
    />
  );
}
