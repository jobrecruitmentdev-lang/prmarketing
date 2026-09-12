import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Google Review QR Code Generator | PR Marketing",
  description:
    "Generate direct Google Review QR codes and short links for your business. Collect 5-star customer reviews fast and boost local SEO with PR Marketing Ventures.",
  alternates: {
    canonical: "/tools/google-review-qr-generator/",
  },
};

export default function GoogleReviewQrGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
