import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconCode, IconServer, IconGauge, IconWorkflow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Software Development Company in Ahmedabad | Custom Web Apps & SaaS | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top software development company in Ahmedabad, Gujarat. Custom SaaS platforms, enterprise ERPs, Next.js, Node.js, and Python backend engineering.",
  alternates: { canonical: "/software-development-ahmedabad/" },
};

export default function SoftwareDevelopmentAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "software-development-ahmedabad",
        badge: "Software Development Ahmedabad",
        h1: "Top Software Development Company in Ahmedabad for Enterprise Web Apps",
        tldr: "PR Marketing Ventures is Ahmedabad's premier software engineering agency. Located on C.G. Road, we build scalable SaaS platforms, enterprise portals, custom ERPs, and cloud-native web applications.",
        heroSubtitle: "We turn complex operational workflows into intuitive, high-speed, and secure web applications. Engineered with Next.js, React, Node.js, and Python for maximum performance.",
        serviceType: "Software Development Company",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconCode,
            title: "Custom SaaS & Cloud Web Applications",
            desc: "Multi-tenant cloud architectures with subscription billing, user role permissions, and real-time interactive dashboards.",
          },
          {
            icon: IconServer,
            title: "High-Throughput Backend & API Services",
            desc: "Scalable REST and GraphQL microservices built with Node.js, Express, Python FastAPI, and PostgreSQL/MySQL.",
          },
          {
            icon: IconWorkflow,
            title: "Custom ERP & Internal Business Portals",
            desc: "Tailored enterprise software for inventory management, order processing, team scheduling, and financial reporting.",
          },
          {
            icon: IconGauge,
            title: "Legacy Software Modernization & Cloud Migration",
            desc: "Refactoring legacy monolithic PHP/ASP.NET applications into sub-second, auto-scaling modern web stacks.",
          },
        ],
        faqs: [
          {
            q: "Why choose PR Marketing Ventures for software development in Ahmedabad?",
            a: "We deliver full-stack engineering excellence, modern UI/UX design, 100% intellectual property ownership, and comprehensive post-launch cloud support.",
          },
          {
            q: "Which tech stacks do you specialize in?",
            a: "Next.js, React, TypeScript, Node.js, Python (FastAPI/Django), PHP/Laravel, PostgreSQL, MySQL, Redis, Docker, and AWS cloud.",
          },
        ],
      }}
    />
  );
}
