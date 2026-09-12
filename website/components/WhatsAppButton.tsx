"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  /* Auto-open after 5s — only once per session */
  useEffect(() => {
    if (sessionStorage.getItem("wa_popup_closed")) return;
    const t = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(t);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  function handleClose(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    setOpen(false);
    sessionStorage.setItem("wa_popup_closed", "1");
  }

  function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    setOpen((prev) => !prev);
  }

  return (
    <aside
      ref={popupRef}
      aria-label="WhatsApp quick contact"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 print:hidden flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* ── Responsive Popup Chat Card ── */}
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Chat with PR Marketing Ventures on WhatsApp"
          className="w-[calc(100vw-32px)] max-w-[340px] sm:w-[360px] sm:max-w-none max-h-[calc(100vh-120px)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] overflow-hidden border border-slate-200/90 flex flex-col bg-white animate-[fadeSlideUp_0.25s_ease-out]"
          style={{ animation: "fadeSlideUp 0.25s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3.5 bg-[#075E54] px-4 py-3.5 shrink-0">
            {/* Avatar */}
            <div className="relative shrink-0 h-11 w-11 rounded-full bg-[#25D366] flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="white" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.26 15.01 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.4 9.73 14.83 12.16 15.88C14.18 16.75 14.59 16.58 15.04 16.54C15.48 16.5 16.48 15.94 16.69 15.36C16.9 14.77 16.9 14.27 16.84 14.16C16.78 14.06 16.61 14 16.36 13.88C16.11 13.75 14.9 13.16 14.67 13.08C14.45 13 14.28 12.96 14.11 13.21C13.95 13.46 13.47 14.06 13.33 14.23C13.18 14.39 13.04 14.41 12.79 14.29C12.54 14.16 11.74 13.9 10.79 13.05C10.05 12.39 9.55 11.58 9.4 11.33C9.26 11.08 9.39 10.95 9.51 10.82C9.62 10.71 9.76 10.53 9.89 10.38C10.01 10.23 10.06 10.13 10.14 9.96C10.22 9.8 10.18 9.65 10.12 9.53C10.06 9.4 9.58 8.23 9.38 7.75C9.19 7.28 8.99 7.35 8.84 7.34C8.7 7.33 8.53 7.33 8.53 7.33Z" />
              </svg>
              {/* Online indicator badge */}
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[15px] leading-tight truncate">PR Marketing Ventures</p>
              <p className="text-[#b2dfdb] text-xs mt-0.5 font-medium flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Online now
              </p>
            </div>
            {/* Close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close WhatsApp chat popup"
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:text-white hover:bg-white/15 active:bg-white/25 transition-colors shrink-0"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="bg-[#ECE5DD] p-4 overflow-y-auto">
            {/* Chat bubble */}
            <div className="relative max-w-[90%] rounded-2xl rounded-tl-none bg-white p-3.5 shadow-sm">
              {/* WhatsApp speech bubble arrow */}
              <span className="absolute -left-2 top-0 h-0 w-0 border-b-[8px] border-r-[10px] border-b-transparent border-r-white" aria-hidden="true" />
              <p className="text-[14px] text-slate-800 leading-relaxed">
                Hey! 👋 Need help with <strong className="text-slate-900 font-semibold">PR marketing</strong>,{" "}
                <strong className="text-slate-900 font-semibold">SEO</strong>, or{" "}
                <strong className="text-slate-900 font-semibold">website development</strong>?{" "}
                We&rsquo;d love to help you scale. Chat with us now!
              </p>
              <p className="mt-1.5 text-right text-[11px] text-slate-400 font-medium select-none flex items-center justify-end gap-1">
                <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                <span className="text-[#34B7F1]">✓✓</span>
              </p>
            </div>
          </div>

          {/* Footer CTA */}
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open WhatsApp chat with PR Marketing Ventures"
            className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20BA56] active:bg-[#1caa4d] transition-all px-4 py-3.5 text-white font-bold text-[15px] shadow-sm shrink-0"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.26 15.01 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.4 9.73 14.83 12.16 15.88C14.18 16.75 14.59 16.58 15.04 16.54C15.48 16.5 16.48 15.94 16.69 15.36C16.9 14.77 16.9 14.27 16.84 14.16C16.78 14.06 16.61 14 16.36 13.88C16.11 13.75 14.9 13.16 14.67 13.08C14.45 13 14.28 12.96 14.11 13.21C13.95 13.46 13.47 14.06 13.33 14.23C13.18 14.39 13.04 14.41 12.79 14.29C12.54 14.16 11.74 13.9 10.79 13.05C10.05 12.39 9.55 11.58 9.4 11.33C9.26 11.08 9.39 10.95 9.51 10.82C9.62 10.71 9.76 10.53 9.89 10.38C10.01 10.23 10.06 10.13 10.14 9.96C10.22 9.8 10.18 9.65 10.12 9.53C10.06 9.4 9.58 8.23 9.38 7.75C9.19 7.28 8.99 7.35 8.84 7.34C8.7 7.33 8.53 7.33 8.53 7.33Z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* ── Floating Button (Enlarged across Mobile, Tablet, Laptop, Desktop) ── */}
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleToggle}
        aria-label={open ? "Close WhatsApp chat" : "Chat with PR Marketing Ventures on WhatsApp"}
        aria-expanded={open}
        title="Chat with us on WhatsApp"
        className={`group relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#25D366] to-[#20BA56] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_36px_rgba(37,211,102,0.65)] active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 select-none ${
          open
            ? "w-[60px] h-[60px] sm:w-[60px] sm:h-[60px] p-0"
            : "w-[60px] h-[60px] p-0 sm:w-auto sm:h-auto sm:px-6 sm:py-3.5 sm:gap-3"
        }`}
      >
        {/* Ambient radar ping — only when popup is closed */}
        {!open && (
          <span
            className="absolute -inset-1.5 -z-10 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* WhatsApp icon / Morphing Close X icon */}
        {open ? (
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 rotate-90"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:rotate-6 sm:w-7 sm:h-7"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.44 19.66L5.27 16.62L5.07 16.31C4.26 15.01 3.81 13.48 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.4 9.73 14.83 12.16 15.88C14.18 16.75 14.59 16.58 15.04 16.54C15.48 16.5 16.48 15.94 16.69 15.36C16.9 14.77 16.9 14.27 16.84 14.16C16.78 14.06 16.61 14 16.36 13.88C16.11 13.75 14.9 13.16 14.67 13.08C14.45 13 14.28 12.96 14.11 13.21C13.95 13.46 13.47 14.06 13.33 14.23C13.18 14.39 13.04 14.41 12.79 14.29C12.54 14.16 11.74 13.9 10.79 13.05C10.05 12.39 9.55 11.58 9.4 11.33C9.26 11.08 9.39 10.95 9.51 10.82C9.62 10.71 9.76 10.53 9.89 10.38C10.01 10.23 10.06 10.13 10.14 9.96C10.22 9.8 10.18 9.65 10.12 9.53C10.06 9.4 9.58 8.23 9.38 7.75C9.19 7.28 8.99 7.35 8.84 7.34C8.7 7.33 8.53 7.33 8.53 7.33Z" />
          </svg>
        )}

        {/* Text Label on Tablet / Laptop / Desktop (hidden when open) */}
        {!open && (
          <span className="hidden sm:inline font-bold text-base tracking-wide select-none">
            Chat with us
          </span>
        )}

        {/* Pulsing Live Dot on Tablet / Desktop */}
        {!open && (
          <span className="relative hidden sm:flex h-2.5 w-2.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
        )}
      </a>

      {/* Animation keyframes */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </aside>
  );
}
