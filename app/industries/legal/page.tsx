import type { Metadata } from "next";
import AhmedabadLandingPage from "@/components/AhmedabadLandingPage";
import { IconBuilding, IconSearch, IconTarget, IconMapPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Law Firm & Lawyer Digital Marketing in Ahmedabad | Legal SEO | PR Marketing Ventures",
  description:
    "PR Marketing Ventures helps law firms, advocates, and corporate legal consultants in Ahmedabad build high-trust digital presence and attract corporate and commercial legal clients.",
  alternates: { canonical: "/industries/legal/" },
};

export default function LegalIndustryPage() {
  return (
    <AhmedabadLandingPage
      config={{
        slug: "industries/legal",
        badge: "Legal Marketing Ahmedabad",
        h1: "Law Firm & Legal Digital Marketing in Ahmedabad",
        tldr: "PR Marketing Ventures provides ethical, high-trust digital presence management, legal website development, and organic SEO for corporate law firms, intellectual property attorneys, real estate advocates, and commercial legal advisors in Ahmedabad.",
        heroSubtitle: "Build undisputed legal authority. We help established law practices and senior advocates establish compliant digital trust, publish authoritative legal insights, and attract corporate retainers.",
        serviceType: "Legal Marketing Agency",
        metaDescription: metadata.description as string,
        capabilities: [
          {
            icon: IconSearch,
            title: "Commercial & Corporate Legal SEO",
            desc: "Ranking for high-value legal queries related to corporate compliance, trademark registration, NCLT, and contract arbitration.",
          },
          {
            icon: IconBuilding,
            title: "High-Authority Law Practice Websites",
            desc: "Modern, sophisticated Next.js web architectures showcasing partner credentials, practice areas, and landmark case judgments.",
          },
          {
            icon: IconMapPin,
            title: "Local Google Maps for Law Offices",
            desc: "Optimizing Google Business Profiles for legal offices near Gujarat High Court (Sola), Ashram Road, and C.G. Road.",
          },
          {
            icon: IconTarget,
            title: "Ethical & Bar Council Compliant Messaging",
            desc: "Ensuring all digital publications adhere strictly to legal industry regulatory standards and informational guidelines.",
          },
        ],
        faqs: [
          {
            q: "Is digital marketing permitted for law firms in India?",
            a: "Direct solicitation is prohibited by the Bar Council of India. However, publishing informational websites, legal research articles, directory listings, and thought leadership is 100% permitted.",
          },
          {
            q: "How does legal SEO help a corporate law firm in Ahmedabad?",
            a: "When business owners and startup founders search for trademark filing, merger advisory, or commercial contracts in Gujarat, legal SEO ensures your firm appears as the trusted authority.",
          },
        ],
      }}
    />
  );
}
