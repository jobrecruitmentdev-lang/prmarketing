import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconLayout, IconSparkles, IconGauge, IconTarget } from "@/components/icons";

export const metadata: Metadata = {
  title: "Website Design Company in Ahmedabad | UI/UX & Responsive Web Design | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a premier website design agency in Ahmedabad. We craft high-converting, modern, mobile-friendly website designs and UI/UX design systems across Gujarat.",
  alternates: { canonical: "/website-design-ahmedabad/" },
};

export default function WebsiteDesignAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "website-design-ahmedabad",
        badge: "Website Design Ahmedabad",
        h1: "Conversion-Focused Website Design Company in Ahmedabad",
        tldr: "PR Marketing Ventures crafts world-class website designs, user interfaces (UI), and user experiences (UX) in Ahmedabad. We design visually striking, high-converting digital storefronts and corporate websites.",
        heroSubtitle: "Your website is your 24/7 digital showroom. We design modern, mobile-responsive, and brand-aligned interfaces that captivate visitors and convert them into paying clients.",
        serviceType: "Website Design Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconLayout,
            title: "Modern UI/UX & Design Systems",
            desc: "Custom Figma wireframes and visual design tokens crafted with curated color palettes, elegant typography, and micro-interactions.",
          },
          {
            icon: IconTarget,
            title: "High-Converting Landing Page Design",
            desc: "Psychologically-backed landing page layouts with clear value propositions, trust badges, and frictionless lead capture forms.",
          },
          {
            icon: IconGauge,
            title: "Mobile-First Responsive Layouts",
            desc: "Flawless rendering across iPhone, Android, tablet, and desktop screens with lightning-fast visual rendering.",
          },
          {
            icon: IconSparkles,
            title: "Brand Identity & Graphic Assets",
            desc: "Cohesive logos, iconography, marketing collateral, and custom illustrations tailored to your brand identity.",
          },
        ],
        faqs: [
          {
            q: "What is your website design process in Ahmedabad?",
            a: "Our process includes 1) Discovery & competitor research, 2) Wireframing & UX architecture, 3) High-fidelity Figma visual design, 4) Interactive client prototyping, and 5) Frontend development handoff.",
          },
          {
            q: "Do you redesign existing websites that look outdated?",
            a: "Yes. We specialize in redesigning outdated websites into modern, high-speed, and conversion-focused digital experiences.",
          },
        ],
      }}
    />
  );
}
