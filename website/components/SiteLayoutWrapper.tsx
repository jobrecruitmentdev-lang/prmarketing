'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // If user is inside CRM portal (/crm) or hosted career pages (/c/*), suppress marketing header, footer, and whatsapp button
  const isCrmOrCareer = pathname?.startsWith('/crm') || pathname?.startsWith('/c/');

  if (isCrmOrCareer) {
    return <main className="flex-1 min-h-screen bg-transparent">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
