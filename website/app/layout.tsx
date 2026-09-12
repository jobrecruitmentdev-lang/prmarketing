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
    "Scale your business with PR Marketing Ventures, the top digital marketing agency in Ahmedabad. High-ROI performance ads, SEO, and web growth. Call today!",
  keywords: [
    "top 10 marketing agency in ahmedabad",
    "top 10 digital marketing agencies in ahmedabad",
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
    "pr marketing ventures",
    "prmarketingventures",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Top Digital Marketing Agency Ahmedabad | PR Marketing",
    description:
      "Scale your business with PR Marketing Ventures, the top digital marketing agency in Ahmedabad. High-ROI performance ads, SEO, and web growth. Call today!",
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Digital Marketing Agency Ahmedabad | PR Marketing",
    description:
      "Scale your business with PR Marketing Ventures, the top digital marketing agency in Ahmedabad. High-ROI performance ads, SEO, and web growth. Call today!",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1C1C1E",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MarketingAgency"],
  name: site.name,
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road)",
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
