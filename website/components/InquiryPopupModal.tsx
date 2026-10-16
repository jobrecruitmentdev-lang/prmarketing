"use client";

import React, { useState, useEffect, useCallback } from "react";
import { site } from "@/lib/site";
import { IconX, IconCheck, IconZap, IconMapPin, IconPhone } from "./icons";

export default function InquiryPopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Close handler with session persistence
  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("prm_inquiry_popup_closed", "true");
    } catch {
      // Ignore in case of restricted private mode
    }
  }, []);

  // 3-second delay trigger on page load
  useEffect(() => {
    try {
      if (sessionStorage.getItem("prm_inquiry_popup_closed") === "true") {
        return;
      }
    } catch {
      // Continue if storage is inaccessible
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // Exactly 3 seconds as requested

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
    "Hi PR Marketing Ventures! I saw your offer on your website and would like to inquire about your digital marketing services for my business. Please share details."
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-[fadeIn_0.25s_ease-out]"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[#d4af37]/35 bg-[#141416] p-5 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.8)] text-[#fbf7ec]"
        onClick={(e) => e.stopPropagation()} // Prevent outside click close when clicking inside
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close inquiry popup"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#232326] text-slate-300 hover:text-white hover:bg-[#323238] border border-white/10 transition-colors cursor-pointer"
        >
          <IconX className="h-5 w-5" />
        </button>

        {/* Top Highlight Badge */}
        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#241c14] px-3.5 py-1 text-[11px] font-semibold tracking-wider text-[#e7c568] uppercase">
            <IconZap className="h-3.5 w-3.5 text-[#d4af37]" /> Ahmedabad&apos;s #1 Growth Marketing Agency
          </span>
          <h2
            id="inquiry-popup-title"
            className="mt-3 font-heading text-xl sm:text-2xl font-bold text-[#fbf7ec] leading-snug"
          >
            Ready to Scale Your Business &amp; Get 3X More Qualified Inquiries?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#d4cfc7] leading-relaxed">
            Stop losing leads to competitors. We build full-funnel performance marketing, top Google SEO rankings,
            and automated WhatsApp CRM pipelines tailored specifically to your industry.
          </p>
        </div>

        {/* 3 Core Value Offerings (Detailed Content) */}
        <div className="mt-5 space-y-2.5">
          <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-[#1c1c20] p-3 sm:p-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2a2418] text-[#d4af37]">
              <IconCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#fbf7ec]">
                Free 360° Growth &amp; Competitor Audit (Worth ₹15,000)
              </h3>
              <p className="text-[11px] sm:text-xs text-[#b5af9f] mt-0.5">
                Complete breakdown of your keyword ranking gaps, ad spend leaks, and conversion bottlenecks — 100% free.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-[#1c1c20] p-3 sm:p-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2a2418] text-[#d4af37]">
              <IconCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#fbf7ec]">
                Proven ROI-Focused Performance Marketing
              </h3>
              <p className="text-[11px] sm:text-xs text-[#b5af9f] mt-0.5">
                Zero vanity impressions. We optimize Meta &amp; Google Ads strictly for verified buyer inquiries and real sales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-[#1c1c20] p-3 sm:p-3.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2a2418] text-[#d4af37]">
              <IconCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#fbf7ec]">
                Instant Strategy &amp; Custom Quotation
              </h3>
              <p className="text-[11px] sm:text-xs text-[#b5af9f] mt-0.5">
                Connect directly with our senior strategist via WhatsApp. Get tailored pricing and execution roadmap within 15 mins.
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA Button: Inquiry Now on WhatsApp */}
        <div className="mt-6">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all duration-200 hover:scale-[1.01] hover:brightness-110 active:scale-[0.99]"
          >
            {/* WhatsApp SVG Icon */}
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.26 15.01 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.4 9.73 14.83 12.16 15.88C14.18 16.75 14.59 16.58 15.04 16.54C15.48 16.5 16.48 15.94 16.69 15.36C16.9 14.77 16.9 14.27 16.84 14.16C16.78 14.06 16.61 14 16.36 13.88C16.11 13.75 14.9 13.16 14.67 13.08C14.45 13 14.28 12.96 14.11 13.21C13.95 13.46 13.47 14.06 13.33 14.23C13.18 14.39 13.04 14.41 12.79 14.29C12.54 14.16 11.74 13.9 10.79 13.05C10.05 12.39 9.55 11.58 9.4 11.33C9.26 11.08 9.39 10.95 9.51 10.82C9.62 10.71 9.76 10.53 9.89 10.38C10.01 10.23 10.06 10.13 10.14 9.96C10.22 9.8 10.18 9.65 10.12 9.53C10.06 9.4 9.58 8.23 9.38 7.75C9.19 7.28 8.99 7.35 8.84 7.34C8.7 7.33 8.53 7.33 8.53 7.33Z" />
            </svg>
            <span>Inquiry Now on WhatsApp &rarr;</span>
          </a>

          {/* Direct Call Alternative */}
          <div className="mt-3 flex items-center justify-center gap-4 text-[11px] sm:text-xs text-[#d4cfc7]">
            <span>Or call us directly:</span>
            <a
              href={`tel:${site.phoneDisplay.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1 font-semibold text-[#e7c568] hover:underline"
            >
              <IconPhone className="h-3 w-3" />
              <span>{site.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Office & Trust Footnote (Strictly B-903) */}
        <div className="mt-5 border-t border-white/10 pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#9a9488]">
          <span className="flex items-center gap-1.5 text-center sm:text-left">
            <IconMapPin className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
            <span>B-903, Fairdeal House, C.G. Road, Navrangpura, Ahmedabad</span>
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-200 underline cursor-pointer shrink-0"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
