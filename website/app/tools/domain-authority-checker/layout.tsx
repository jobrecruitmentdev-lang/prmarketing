import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Domain Authority Checker Tool | PR Marketing Co.",
  description:
    "Check your website domain authority, backlink profile, and SEO health score instantly for free. Uncover high-ranking search wins with PR Marketing Ventures.",
  alternates: {
    canonical: "/tools/domain-authority-checker/",
  },
};

export default function DomainAuthorityCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
