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
            a: "We deliver full-stack engineering excellence, modern UI/UX design, 100% intellectual property ownership, and comprehensive post-launch cloud support from our C.G. Road office.",
          },
          {
            q: "Which tech stacks do you specialize in?",
            a: "Next.js, React, TypeScript, Node.js, Python (FastAPI/Django), PHP/Laravel, PostgreSQL, MySQL, Redis, Docker, and AWS cloud.",
          },
          {
            q: "How much does custom software development cost in Ahmedabad?",
            a: "Project costs vary based on scope: tailored MVP SaaS platforms and internal business portals typically range from ₹75,000 to ₹3,50,000+.",
          },
          {
            q: "Do we get full 100% source code ownership?",
            a: "Yes. You retain complete, unrestricted intellectual property rights and full source code ownership upon project completion.",
          },
          {
            q: "What is your development workflow and timeline?",
            a: "We work in 2-week agile sprints: 1) Architecture & DB design, 2) UI/UX prototyping in Figma, 3) Full-stack development, 4) Automated testing, and 5) Cloud deployment.",
          },
          {
            q: "Can you modernize our legacy desktop software into a cloud web app?",
            a: "Yes. We specialize in migrating legacy desktop applications (FoxPro, VB6, Tally add-ons) and monolithic PHP codebases to modern, cloud-native web architectures.",
          },
          {
            q: "Do you provide post-launch maintenance and SLA support in Ahmedabad?",
            a: "Yes. We offer 24/7 server monitoring, database backups, security patching, and ongoing feature enhancement SLAs.",
          },
          {
            q: "How do you protect sensitive company data and intellectual property?",
            a: "We enforce end-to-end encryption, strict role-based access control (RBAC), signed NDAs, and automated daily off-site cloud backups.",
          },
        ],
      }}
    />
  );
}
