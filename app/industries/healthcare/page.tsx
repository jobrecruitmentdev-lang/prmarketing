import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconSparkles, IconMapPin, IconWorkflow, IconGauge } from "@/components/icons";

export const metadata: Metadata = {
  title: "Healthcare Digital Marketing & SEO Agency in Ahmedabad | PR Marketing Ventures",
  description:
    "PR Marketing Ventures is a specialized healthcare digital marketing agency in Ahmedabad. We help clinics, multi-specialty hospitals, doctors, and diagnostics labs attract verified patient appointments.",
  alternates: { canonical: "/industries/healthcare/" },
};

export default function HealthcareIndustryPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "industries/healthcare",
        badge: "Healthcare Marketing Ahmedabad",
        h1: "Healthcare Digital Marketing & Patient Acquisition Agency in Ahmedabad",
        tldr: "PR Marketing Ventures helps clinics, multi-specialty hospitals, dental practices, IVF centers, and diagnostics chains in Ahmedabad scale patient bookings through Google Maps Local SEO, healthcare Google Ads, and automated WhatsApp appointment scheduling.",
        heroSubtitle: "Generate consistent, high-intent patient inquiries and OPD bookings. We combine medical SEO compliance, Google Business Profile optimization, and sub-second booking funnels tailored for healthcare providers.",
        serviceType: "Healthcare Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconMapPin,
            title: "Local Google Maps 3-Pack for Clinics & Hospitals",
            desc: "Dominating 'near me' searches in Ahmedabad for specialized treatments, dental clinics, IVF centers, and orthopedic surgeons.",
          },
          {
            icon: IconSparkles,
            title: "Medical SEO & E-E-A-T Doctor Profiles",
            desc: "Structuring doctor bio pages with medical schema (MedicalBusiness, Physician) to build high Google trust and search rankings.",
          },
          {
            icon: IconWorkflow,
            title: "Automated WhatsApp Patient Booking & Reminders",
            desc: "Frictionless 24/7 appointment scheduling and automated reminder messages that reduce clinic no-show rates by 40%.",
          },
          {
            icon: IconGauge,
            title: "High-ROAS Google Ads for Super-Specialties",
            desc: "Targeting high-intent treatment searches (IVF, cosmetic surgery, joint replacement, hair transplant) with compliant ad copy.",
          },
        ],
        faqs: [
          {
            q: "How does digital marketing help clinics and hospitals in Ahmedabad?",
            a: "Digital marketing places your doctors and clinics at the top of Google Maps and search results when patients search for symptoms or specialists, driving direct calls and OPD appointments.",
          },
          {
            q: "Are your healthcare marketing campaigns compliant with medical advertising guidelines?",
            a: "Yes. We strictly adhere to medical ethical codes and Google healthcare advertising policies, avoiding misleading claims and prioritizing authentic patient education.",
          },
          {
            q: "How quickly can a medical practice see new patient appointments in Ahmedabad?",
            a: "Google Ads generate direct appointment calls within 48 hours, while Local 3-Pack Google Maps SEO establishes steady long-term patient volume within 30 to 60 days.",
          },
        ],
      }}
    />
  );
}
