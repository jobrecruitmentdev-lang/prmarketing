import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconTarget, IconTrendingUp, IconWorkflow, IconBuilding } from "@/components/icons";

export const metadata: Metadata = {
  title: "Education Digital Marketing Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures helps coaching institutes, private universities, study abroad consultancies, and schools in Ahmedabad scale student admissions with high-converting digital campaigns.",
  alternates: { canonical: "/industries/education/" },
};

export default function EducationIndustryPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "industries/education",
        badge: "Education Marketing Ahmedabad",
        h1: "Education & Coaching Institute Digital Marketing in Ahmedabad",
        tldr: "PR Marketing Ventures helps schools, colleges, competitive coaching institutes (JEE, NEET, CAT, UPSC), IELTS/visa consultants, and EdTech platforms in Ahmedabad maximize student admissions through hyper-targeted Google/Meta Ads and automated lead counseling pipelines.",
        heroSubtitle: "Fill your admission batches every season. We combine hyper-local demographic targeting, student success video storytelling, and automated WhatsApp counseling funnels.",
        serviceType: "Education Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconTarget,
            title: "Admission Season Meta & Google Ads Funnels",
            desc: "Hyper-targeted campaigns reaching parents and students across Ahmedabad with scholarship test registrations and counseling forms.",
          },
          {
            icon: IconBuilding,
            title: "Local Google Maps SEO for Institute Branches",
            desc: "Dominating local coaching searches near Navrangpura, Satellite, Vastrapur, Bopal, and Maninagar education hubs.",
          },
          {
            icon: IconWorkflow,
            title: "Automated WhatsApp Lead Counseling",
            desc: "Instant automated delivery of fee structures, syllabus brochures, and demo class booking links via WhatsApp.",
          },
          {
            icon: IconTrendingUp,
            title: "High-Converting Landing Pages for Entrance Exams",
            desc: "Fast, mobile-optimized registration pages with OTP verification that eliminate fake student inquiries.",
          },
        ],
        faqs: [
          {
            q: "How does digital marketing increase student admissions in Ahmedabad?",
            a: "By targeting parents and students during key decision windows (board exam results, entrance exam seasons) with compelling success stories, demo classes, and instant registration forms.",
          },
          {
            q: "Can you help overseas education and IELTS consultancies in Gujarat?",
            a: "Yes. We have specialized lead generation funnels for study visa consultancies targeting students across Ahmedabad, Vadodara, and Gujarat.",
          },
        ],
      }}
    />
  );
}
