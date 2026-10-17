"use client";

import React, { useState, useEffect, useCallback } from "react";
import { site } from "@/lib/site";
import { IconX, IconCheck, IconZap, IconMapPin } from "./icons";

export default function InquiryPopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Close handler for the current view
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // 3-second delay trigger on every page load/reload
  useEffect(() => {
    try {
      sessionStorage.removeItem("prm_inquiry_popup_closed");
    } catch {
      // Ignore if storage is restricted
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // 3 seconds trigger on every reload

    return () => clearTimeout(timer);
  }, []);

  // Keyboard Escape listener & background scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const whatsappInquiryUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    "Hi PR Marketing Ventures! I would like to inquire about your digital marketing services for my business. Please share details and pricing."
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border-2 border-[#d4af37] bg-white p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.25)] text-slate-900"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close inquiry popup"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-black hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
        >
          <IconX className="h-4 w-4" />
        </button>

        {/* Top Tag & Title */}
        <div className="pr-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/60 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-amber-900 uppercase">
            <IconZap className="h-3 w-3 text-[#d4af37]" /> Ahmedabad&apos;s #1 Growth Agency
          </span>
          <h2
            id="inquiry-popup-title"
            className="mt-2 font-heading text-lg sm:text-xl font-bold text-slate-950 leading-snug"
          >
            Scale Your Business &amp; Get 3X Inquiries
          </h2>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Full-funnel Google &amp; Meta Ads, #1 SEO rankings, and automated WhatsApp CRM pipelines engineered for verified ROI.
          </p>
        </div>

        {/* 3 Compact Bullets (Clean & No Scroll) */}
        <div className="mt-3.5 space-y-1.5 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100/90 text-[#b48a1e] border border-amber-300/60">
              <IconCheck className="h-3 w-3" />
            </span>
            <span><strong className="text-black font-semibold">Free 360° Growth &amp; Competitor Audit</strong> (Worth ₹15,000)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100/90 text-[#b48a1e] border border-amber-300/60">
              <IconCheck className="h-3 w-3" />
            </span>
            <span><strong className="text-black font-semibold">Verified ROI Guarantee</strong> — High-intent buyer leads, zero vanity metrics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100/90 text-[#b48a1e] border border-amber-300/60">
              <IconCheck className="h-3 w-3" />
            </span>
            <span><strong className="text-black font-semibold">15-Min Strategy Response</strong> directly via WhatsApp</span>
          </div>
        </div>

        {/* Primary CTA Button: Inquiry Now on WhatsApp */}
        <div className="mt-4">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-3 text-sm sm:text-base font-bold text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.26 15.01 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.4 9.73 14.83 12.16 15.88C14.18 16.75 14.59 16.58 15.04 16.54C15.48 16.5 16.48 15.94 16.69 15.36C16.9 14.77 16.9 14.27 16.84 14.16C16.78 14.06 16.61 14 16.36 13.88C16.11 13.75 14.9 13.16 14.67 13.08C14.45 13 14.28 12.96 14.11 13.21C13.95 13.46 13.47 14.06 13.33 14.23C13.18 14.39 13.04 14.41 12.79 14.29C12.54 14.16 11.74 13.9 10.79 13.05C10.05 12.39 9.55 11.58 9.4 11.33C9.26 11.08 9.39 10.95 9.51 10.82C9.62 10.71 9.76 10.53 9.89 10.38C10.01 10.23 10.06 10.13 10.14 9.96C10.22 9.8 10.18 9.65 10.12 9.53C10.06 9.4 9.58 8.23 9.38 7.75C9.19 7.28 8.99 7.35 8.84 7.34C8.7 7.33 8.53 7.33 8.53 7.33Z" />
            </svg>
            <span>Inquiry Now on WhatsApp &rarr;</span>
          </a>
        </div>

        {/* Office & Dismiss Footer (Single Compact Line) */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1.5 truncate mr-2">
            <IconMapPin className="h-3 w-3 text-[#d4af37] shrink-0" />
            <span className="truncate font-medium">B-903, Fairdeal House, C.G. Road, Ahmedabad</span>
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-500 hover:text-black underline cursor-pointer shrink-0"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
