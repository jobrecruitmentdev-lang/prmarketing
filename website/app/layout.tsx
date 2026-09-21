import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3, Space_Grotesk } from "next/font/google";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";
import { site } from "@/lib/site";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Top Digital Marketing Agency Ahmedabad | PR Marketing",
    template: "%s",
  },
  description:
    "PR Marketing Ventures is Ahmedabad's premier full-service marketing company. We combine performance marketing, technical SEO. Call: +91 8160666408.",
  keywords: [
    "pr marketing",
    "pr marketing ahmedabad",
    "pr marketing ventures",
    "pr marketing ventures ahmedabad",
    "top 10 marketing agency in ahmedabad",
    "top 10 digital marketing agencies in ahmedabad",
    "top 10 marketing company in ahmedabad",
    "best digital marketing agency in ahmedabad",
    "best marketing agency in ahmedabad",
    "best marketing company in ahmedabad",
    "digital agency ahmedabad",
    "digital marketing company",
    "digital marketing company in ahmedabad",
    "digital marketing agency ahmedabad",
    "top digital marketing agency in ahmedabad",
    "seo agency ahmedabad",
    "performance marketing agency",
    "google ads agency ahmedabad",
    "social media marketing agency ahmedabad",
    "web development company ahmedabad",
    "b2b lead generation ahmedabad",
    "local seo services ahmedabad",
    "ai seo agency ahmedabad",
    "prmarketingventures",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Top Digital Marketing Agency Ahmedabad | PR Marketing",
    description:
      "PR Marketing Ventures is Ahmedabad's premier full-service marketing company. We combine performance marketing, technical SEO. Call: +91 8160666408.",
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Digital Marketing Agency Ahmedabad | PR Marketing",
    description:
      "PR Marketing Ventures is Ahmedabad's premier full-service marketing company. We combine performance marketing, technical SEO. Call: +91 8160666408.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: ["google1c9d8b5c6dcf337b", "googlef9ade8711e36f380"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1E",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MarketingAgency", "LocalBusiness", "ProfessionalService"],
  name: site.name,
  alternateName: ["PR Marketing", "PR Marketing Ahmedabad", "PR Marketing Ventures Ahmedabad"],
  disambiguatingDescription:
    "PR Marketing Ventures is an AI-powered growth engineering and digital marketing agency based at B-903 Fairdeal House, C.G. Road, Navrangpura, Ahmedabad. It is a premier digital marketing company, completely distinct and unrelated to legacy air conditioning (AC) or home appliance sales/repair businesses in Ahmedabad.",
  url: site.url,
  logo: `${site.url}/logo-mark.png`,
  description: site.description,
  email: site.email,
  telephone: site.phoneDisplay,
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.jobTitle,
    url: site.founder.linkedin,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating.ratingValue,
    bestRating: site.rating.bestRating,
    ratingCount: site.rating.reviewCount,
  },
  sameAs: [
    site.founder.linkedin,
    "https://twitter.com/prmarketingv",
    "https://www.instagram.com/prmarketingventures",
  ],
  priceRange: "₹₹ - ₹₹₹₹",
  hasMap: "https://maps.google.com/?q=Fairdeal+House+CG+Road+Ahmedabad",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.036506,
    longitude: 72.561111,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "City", name: "Navrangpura" },
    { "@type": "City", name: "C.G. Road" },
    { "@type": "City", name: "SG Highway" },
    { "@type": "City", name: "Prahladnagar" },
    { "@type": "City", name: "Bodakdev" },
    { "@type": "City", name: "Satellite" },
    { "@type": "City", name: "Vastrapur" },
    { "@type": "City", name: "Sindhu Bhavan Road" },
    { "@type": "City", name: "Ellisbridge" },
    { "@type": "City", name: "Thaltej" },
    { "@type": "City", name: "Bopal" },
    { "@type": "City", name: "Gota" },
    { "@type": "City", name: "Maninagar" },
    { "@type": "City", name: "Chandkheda" },
    { "@type": "City", name: "Naroda" },
    { "@type": "City", name: "Nikol" },
    { "@type": "City", name: "Ambawadi" },
    { "@type": "City", name: "GIFT City Gandhinagar" },
    { "@type": "AdministrativeArea", name: "Gujarat" },
    { "@type": "Country", name: "India" },
  ],
  knowsAbout: [
    "Digital Marketing",
    "Performance Marketing",
    "Search Engine Optimization (SEO)",
    "Generative Engine Optimization (GEO)",
    "Answer Engine Optimization (AEO)",
    "Custom CRM Software Development",
    "WhatsApp Automation & Meta Cloud API",
    "Web Application Engineering",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Shital Kunj Society, Vasant Vihar, Navrangpura",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    postalCode: "380009",
    addressCountry: "IN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${site.url}/?s={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${lexend.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgSchema, websiteSchema]),
          }}
        />
        <SiteLayoutWrapper>{children}</SiteLayoutWrapper>
      </body>
    </html>
  );
}
