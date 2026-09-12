import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free WhatsApp Link Generator Tool | PR Marketing Co.",
  description:
    "Create instant click-to-chat WhatsApp direct links and QR codes with custom pre-filled messages for your campaigns. 100% free with PR Marketing Ventures today!",
  alternates: {
    canonical: "/tools/whatsapp-link-generator/",
  },
};

export default function WhatsAppLinkGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
