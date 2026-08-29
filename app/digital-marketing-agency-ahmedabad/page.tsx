import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconSearch, IconTrendingUp, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "Top digital marketing agency in Ahmedabad. PR Marketing Ventures delivers ROI-driven SEO, Google Ads, Meta Ads, social media growth, and conversion funnels for startups and enterprises in Gujarat.",
  alternates: { canonical: "/digital-marketing-agency-ahmedabad/" },
};

export default function DigitalMarketingAgencyAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "digital-marketing-agency-ahmedabad",
        badge: "Digital Marketing Agency Ahmedabad",
        h1: "Top Digital Marketing Agency in Ahmedabad for Scalable Growth",
        tldr: "PR Marketing Ventures is a premier full-service digital marketing company in Ahmedabad located on C.G. Road. We specialize in high-ROAS Google & Meta Ads, revenue-focused SEO, local map domination, and conversion funnels.",
        heroSubtitle: "We engineer data-driven digital marketing campaigns that generate high-quality inquiries, lower customer acquisition costs, and maximize revenue for Ahmedabad businesses.",
        serviceType: "Digital Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "Performance Google & Meta Ads",
            desc: "Laser-targeted PPC campaigns on Google Search, PMax, Instagram, and Facebook designed to generate verified buyer inquiries with high ROAS.",
          },
          {
            icon: IconSearch,
            title: "Rank #1 Organic SEO & Local Map Pack",
            desc: "Technical SEO, topical content clusters, and Google Business Profile optimization to capture Ahmedabad searchers at the exact moment of buying intent.",
          },
          {
            icon: IconTrendingUp,
            title: "Conversion Rate Optimization (CRO)",
            desc: "Sub-second Next.js landing pages, frictionless forms, and A/B split testing to turn more website visitors into qualified paying leads.",
          },
          {
            icon: IconWorkflow,
            title: "WhatsApp & CRM Lead Automation",
            desc: "Connect your ad campaigns directly to WhatsApp auto-responders and sales pipelines so leads are contacted within 30 seconds.",
          },
        ],
        table: {
          title: "PR Marketing Ventures vs Traditional Ahmedabad Agencies",
          headers: ["Feature / Metric", "PR Marketing Ventures", "Traditional Agencies"],
          rows: [
            { col1: "Strategy Focus", col2: "Revenue & ROAS Optimization", col3: "Vanity Impressions & Likes" },
            { col1: "Lead Response Time", col2: "< 30 Seconds via WhatsApp CRM", col3: "24 to 48 Hours via Email" },
            { col1: "Website Technology", col2: "Sub-Second Next.js & React 19", col3: "Slow, Bloated WordPress Themes" },
            { col1: "Local Proximity", col2: "C.G. Road, Navrangpura, Ahmedabad", col3: "Outsourced / Remote Freelancers" },
          ],
        },
        faqs: [
          {
            q: "Why is PR Marketing Ventures considered the top digital marketing agency in Ahmedabad?",
            a: "We combine engineering rigor with performance marketing. Instead of commodity social media posts, we build full-funnel customer acquisition systems, high-speed landing pages, and automated CRM pipelines that deliver measurable revenue ROI.",
          },
          {
            q: "How much do digital marketing services cost in Ahmedabad?",
            a: "Our monthly marketing packages start from ₹15,000/month for local businesses up to ₹1,50,000+/month for full-funnel enterprise performance marketing and multi-channel ad management.",
          },
          {
            q: "Which industries in Ahmedabad do you specialize in?",
            a: "We have proven case studies in Real Estate, Healthcare/Clinics, Manufacturing/B2B Exports, D2C E-commerce, Education, and Tech Startups across Ahmedabad and Gujarat.",
          },
          {
            q: "How quickly can we expect results from digital marketing campaigns?",
            a: "Paid Google and Meta Ads start delivering qualified leads within 48 to 72 hours of launch. Organic SEO and Google Maps rankings typically compound within 30 to 90 days.",
          },
          {
            q: "Do you manage both B2B and B2C digital marketing campaigns?",
            a: "Yes. For B2B, we use high-intent Google Search, LinkedIn ABM, and cold email systems. For B2C, we scale Instagram, Meta video ads, Google Shopping, and local map search.",
          },
        ],
      }}
    />
  );
}
