"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import LeadCaptureModal, { LeadData } from "@/components/LeadCaptureModal";
import { IconCheck, IconMessageCircle, IconLightbulb, IconCopy, IconExternalLink, IconQrCode } from "@/components/icons";

const messageTemplates = [
  "Hi, I want a free quotation for my business marketing.",
  "Hello! I saw your website and would like to book a consultation.",
  "Hi, please send me your pricing brochure and service details.",
  "Hello, I am looking for software/web development support.",
];

export default function WhatsAppLinkGeneratorPage() {
  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Hi, I want to inquire about your services.");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeAction, setActiveAction] = useState<"code" | "qr" | "copy">("copy");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const fullPhone = `${countryCode}${cleanPhone}`;
  const encodedMsg = encodeURIComponent(message.trim());
  const generatedUrl = cleanPhone
    ? `https://wa.me/${fullPhone}${encodedMsg ? `?text=${encodedMsg}` : ""}`
    : "https://wa.me/918160666408";

  useEffect(() => {
    QRCode.toDataURL(generatedUrl, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 280,
      color: { dark: "#000000", light: "#ffffff" },
    }).then(setQrDataUrl).catch(console.error);
  }, [generatedUrl]);

  const embedHtmlCode = `<!-- PR Marketing Ventures WhatsApp Chat Widget -->
<a href="${generatedUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:8px;background-color:#25D366;color:#ffffff;padding:12px 20px;border-radius:28px;text-decoration:none;font-family:sans-serif;font-weight:bold;font-size:14px;box-shadow:0 4px 12px rgba(37,211,102,0.3);">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/></svg>
  Chat on WhatsApp
</a>`;

  const handleCopyLink = () => {
    if (!isUnlocked) {
      setActiveAction("copy");
      setShowModal(true);
      return;
    }
    navigator.clipboard.writeText(generatedUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    if (!isUnlocked) {
      setActiveAction("code");
      setShowModal(true);
      return;
    }
    navigator.clipboard.writeText(embedHtmlCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleUnlockSuccess = (lead: LeadData) => {
    setIsUnlocked(true);
    setShowModal(false);
    if (activeAction === "code") {
      navigator.clipboard.writeText(embedHtmlCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } else {
      navigator.clipboard.writeText(generatedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDE4D8]">
      {/* Hero Header — Clean White Background with Sharp Black Text */}
      <section className="relative overflow-hidden border-b border-[#D8CBB9] bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            <IconMessageCircle className="w-3.5 h-3.5 text-primary" /> 100% Free WhatsApp Direct Chat & QR Link Builder
          </div>
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            WhatsApp Direct Click-to-Chat Link Generator
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Create one-click direct WhatsApp chat links with pre-filled messages and scannable QR codes for your Instagram bio, Google Ads, website buttons, and business cards.
          </p>
        </div>
      </section>

      {/* Main Workspace — Dark Cream Background with Luxury Dark Charcoal Cards */}
      <section className="relative bg-[#EDE4D8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 lg:gap-10 lg:grid-cols-12">
          {/* Controls (Left) */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded-3xl border border-[#3d2719] bg-[#1f140e] p-5 sm:p-8 shadow-xl">
              <h2 className="font-heading text-xl font-bold text-[#fdfbf7]">
                1. Enter WhatsApp Number & Message
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#d9cebe]">
                    Country Code & Phone Number
                  </label>
                  <div className="mt-1.5 flex flex-col sm:flex-row gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full sm:w-32 rounded-xl border border-[#4a3424] bg-[#271a12] px-3 py-3 text-sm text-[#fdfbf7] focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="91">+91 (India)</option>
                      <option value="1">+1 (US/CA)</option>
                      <option value="44">+44 (UK)</option>
                      <option value="971">+971 (UAE)</option>
                      <option value="61">+61 (Australia)</option>
                      <option value="65">+65 (Singapore)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 w-full rounded-xl border border-[#4a3424] bg-[#271a12] px-4 py-3 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                  <span className="mt-1 block text-[11px] text-[#b5a898]">
                    Include only digits without zero or special characters.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#d9cebe]">
                    Pre-filled Default Chat Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Hi, I am interested in your products..."
                    className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#271a12] p-3.5 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                {/* Templates */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-[#d4af37]">
                    <IconLightbulb className="w-3.5 h-3.5 text-[#d4af37]" /> Quick Message Templates:
                  </label>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {messageTemplates.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setMessage(t)}
                        className="rounded-lg border border-[#4a3424] bg-[#271a12] px-2.5 py-1 text-[11px] text-[#d9cebe] hover:border-[#d4af37] hover:text-[#fdfbf7] transition-colors"
                      >
                        {t.substring(0, 32)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases */}
            <div className="rounded-3xl border border-[#3d2719] bg-[#1a110a] p-6 text-xs text-[#d9cebe] space-y-2">
              <h3 className="font-heading text-sm font-semibold text-[#fdfbf7]">
                Best Places to Use Your Direct WhatsApp Link:
              </h3>
              <p>• <strong>Instagram Bio & Stories:</strong> Convert followers directly into WhatsApp chat leads.</p>
              <p>• <strong>Google Ads & Meta Ads:</strong> Use as target destination URL for high-converting Click-to-WhatsApp ads.</p>
              <p>• <strong>Print Media:</strong> Auto-rickshaws, flyers, and visiting cards via the scannable QR code.</p>
            </div>
          </div>

          {/* Generated Result (Right) */}
          <div className="space-y-6 lg:col-span-6">
            <div className="rounded-3xl border border-[#3d2719] bg-[#1f140e] p-5 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-bold text-[#fdfbf7]">
                  2. Your Generated WhatsApp Link
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#2d1e15] border border-[#d4af37]/40 px-2.5 py-1 text-xs font-semibold text-[#e5c07b]">
                  Ready to Share
                </span>
              </div>

              {/* URL Display */}
              <div className="mt-5 rounded-2xl border border-[#4a3424] bg-[#180e08] p-4">
                <span className="text-[11px] font-semibold text-[#b5a898] uppercase tracking-wider">
                  Direct Clickable Link
                </span>
                <p className="mt-1 break-all font-mono text-xs text-[#e5c07b] selection:bg-[#d4af37]/30">
                  {generatedUrl}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#d4af37] py-3.5 text-sm font-bold text-[#140d09] shadow-md hover:bg-[#c5a059] transition-all cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <IconCheck className="w-4 h-4 text-[#140d09]" /> Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <IconCopy className="w-4 h-4 text-[#140d09]" /> Copy Direct Link
                    </>
                  )}
                </button>
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-[#4a3424] bg-[#2a1d15] py-3.5 text-sm font-bold text-[#fdfbf7] hover:border-[#d4af37] hover:bg-[#33231a] transition-all"
                >
                  <IconExternalLink className="w-4 h-4 text-[#d4af37]" /> Test Link in WhatsApp
                </a>
              </div>

              {/* QR Code & Embed Code Block */}
              <div className="mt-6 border-t border-[#382415] pt-6">
                <h3 className="font-heading text-sm font-semibold text-[#fdfbf7]">
                  3. Scannable QR Code & Website Button Widget
                </h3>

                <div className="mt-4 flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-[#3d2719] bg-[#180e08] p-4">
                  {/* QR Image */}
                  <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-white p-2 flex items-center justify-center border border-[#4a3424]">
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="WhatsApp Direct QR Code"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="text-[10px] text-slate-400">Loading QR...</div>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <p className="text-xs text-[#d9cebe] font-medium">
                      High-Resolution WhatsApp QR code ready for brochures, standees, and visiting cards.
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl border border-[#4a3424] bg-[#271a12] px-4 py-2 text-xs font-semibold text-[#fdfbf7] hover:border-[#d4af37] transition-colors cursor-pointer text-center"
                    >
                      {copiedCode ? (
                        <>
                          <IconCheck className="w-3.5 h-3.5 text-[#22c55e]" /> Widget Code Copied!
                        </>
                      ) : (
                        <>
                          <IconCopy className="w-3.5 h-3.5 text-[#d4af37]" /> Copy HTML Button Widget Code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleUnlockSuccess}
        toolName="WhatsApp Direct Link Generator"
        toolActionTitle="Unlock Full Widget Code & High-Res QR"
        initialWebsiteUrl={phone}
        initialBusinessName={`WhatsApp Lead (${phone})`}
      />
    </div>
  );
}
