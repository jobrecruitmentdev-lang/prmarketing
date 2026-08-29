import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconCode, IconServer, IconGauge, IconCheck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Website Development Company in Ahmedabad | Next.js & Custom Web Coding | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a top website development agency in Ahmedabad. Full-stack custom coding, Next.js web applications, headless CMS, and secure backend architectures.",
  alternates: { canonical: "/website-development-ahmedabad/" },
};

export default function WebsiteDevelopmentAhmedabadPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "website-development-ahmedabad",
        badge: "Website Development Ahmedabad",
        h1: "Custom Website Development Company in Ahmedabad",
        tldr: "PR Marketing Ventures provides full-stack custom website development services in Ahmedabad. We code sub-second web applications, dynamic portals, and scalable corporate websites on Next.js, React, Node.js, and PHP.",
        heroSubtitle: "We build websites with clean code, robust security, and seamless API integrations. Engineered to load in milliseconds and convert traffic on C.G. Road, Ahmedabad.",
        serviceType: "Website Development Company",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconCode,
            title: "Custom Full-Stack Web Development",
            desc: "Custom-coded web applications with secure user authentication, dynamic databases, and third-party API webhooks.",
          },
          {
            icon: IconServer,
            title: "Enterprise Headless CMS Integration",
            desc: "Easy-to-use content management systems (Sanity, Strapi, WordPress Headless) allowing non-technical teams to edit content effortlessly.",
          },
          {
            icon: IconGauge,
            title: "Performance & Security Hardening",
            desc: "SSL certificates, Cloudflare DDoS defense, secure HTTP headers, and strict database query sanitization.",
          },
          {
            icon: IconCheck,
            title: "Continuous Maintenance & Support",
            desc: "Dedicated SLA support, daily cloud backups, uptime monitoring, and proactive code updates in Ahmedabad.",
          },
        ],
        faqs: [
          {
            q: "Do you build custom websites or use pre-made templates?",
            a: "We build 100% custom-coded web architectures tailored to your business requirements for superior speed, security, and search rankings.",
          },
          {
            q: "Will my website be mobile-friendly and work on all browsers?",
            a: "Yes. Every website undergoes multi-device and cross-browser testing across Chrome, Safari, Edge, Firefox, iOS, and Android.",
          },
        ],
      }}
    />
  );
}
