import type { Metadata, Viewport } from "next";
import { Lexend, Source_Sans_3, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
    default: `${site.name} — Top Marketing Agency in Ahmedabad`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "marketing agency",
    "marketing agency in Ahmedabad",
    "digital marketing agency Ahmedabad",
    "performance marketing agency",
    "best marketing company Ahmedabad",
    "SEO company Ahmedabad",
    "marketing services Ahmedabad",
    "growth marketing agency",
    "website development Ahmedabad",
    "AI SEO",
    "GEO AEO optimization",
    "marketing automation",
    "local SEO Ahmedabad",
    "pr marketing ventures",
    "prmarketingventures",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Top Marketing Agency in Ahmedabad`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Top Marketing Agency in Ahmedabad`,
    description: site.description,
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
  sameAs: [
    "https://prmarketingventures.com",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-910, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road)",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
