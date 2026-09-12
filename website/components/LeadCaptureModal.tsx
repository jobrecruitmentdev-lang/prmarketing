"use client";

import React, { useState } from "react";
import { IconCheck, IconPhone, IconMail, IconGlobe, IconZap, IconLock, IconAlertTriangle } from "@/components/icons";

export interface LeadData {
  fullName: string;
  phoneNumber: string;
  whatsappNumber?: string;
  websiteName: string;
  websiteUrl: string;
  businessStage: string;
  toolUsed: string;
  meta?: Record<string, any>;
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSuccess: (lead: LeadData) => void;
  toolName: string;
  toolActionTitle?: string;
  initialWebsiteUrl?: string;
  initialBusinessName?: string;
}

const businessStages = [
  "Early-Stage Startup (< 2 Years)",
  "Established Business / SME",
  "Local Clinic / Hospital / Doctor",
  "Real Estate Developer / Broker",
  "Retail Store / Restaurant / Cafe",
  "E-Commerce / D2C Brand",
  "Corporate / Enterprise",
  "Freelancer / Individual Professional",
];

export default function LeadCaptureModal({
  isOpen,
  onClose,
  onSuccess,
  toolName,
  toolActionTitle = "Unlock Full Report & High-Res Download",
  initialWebsiteUrl = "",
  initialBusinessName = "",
}: LeadCaptureModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteName, setWebsiteName] = useState(initialBusinessName);
  const [websiteUrl, setWebsiteUrl] = useState(initialWebsiteUrl);
  const [businessStage, setBusinessStage] = useState(businessStages[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName.trim()) {
      setErrorMsg("Please enter your Full Name.");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      setErrorMsg("Please enter a valid 10-digit Phone / WhatsApp Number.");
      return;
    }

    setIsSubmitting(true);

    const leadPayload: LeadData = {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: phoneNumber.trim(),
      websiteName: websiteName.trim() || "N/A",
      websiteUrl: websiteUrl.trim() || initialWebsiteUrl || "N/A",
      businessStage,
      toolUsed: toolName,
    };

    try {
      const res = await fetch("/api/leads.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Lead captured:", data);
      }
    } catch (err) {
      console.warn("Lead storage notice:", err);
    } finally {
      setIsSubmitting(false);
      onSuccess(leadPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0805]/85 p-3 sm:p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-[#4a3424] bg-[#1a110a] p-5 sm:p-8 shadow-2xl text-[#fdfbf7]">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#2d1e15] px-3.5 py-1 text-xs font-semibold tracking-wider text-[#e5c07b] uppercase">
            <IconZap className="w-3.5 h-3.5 text-[#d4af37]" /> 100% Free Instant Access
          </span>
          <h3 className="mt-3 font-heading text-2xl font-bold text-[#fdfbf7]">
            {toolActionTitle}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#d9cebe] leading-relaxed">
            Enter your business details below to instantly view your complete analysis, export HD printable standees, and receive priority growth insights.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl border border-red-800/40 bg-red-950/40 p-3 text-xs font-medium text-red-300">
              <IconAlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#d9cebe]">
              Full Name <span className="text-[#d4af37]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Shah"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#251912] px-4 py-2.5 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#d9cebe]">
                Phone / WhatsApp Number <span className="text-[#d4af37]">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#251912] px-4 py-2.5 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d9cebe]">
                Business / Brand Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Realty / Care Clinic"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#251912] px-4 py-2.5 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-[#d9cebe]">
                Website / Domain URL
              </label>
              <input
                type="text"
                placeholder="e.g. yourbusiness.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#251912] px-4 py-2.5 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d9cebe]">
                Business Category / Stage
              </label>
              <select
                value={businessStage}
                onChange={(e) => setBusinessStage(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#251912] px-3 py-2.5 text-xs text-[#fdfbf7] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
              >
                {businessStages.map((stage) => (
                  <option key={stage} value={stage} className="bg-[#1a110a] text-white">
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] py-3.5 text-sm font-bold text-[#140d09] shadow-md transition-all hover:bg-[#c5a059] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-[#140d09]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Unlocking Results...
              </span>
            ) : (
              <span>Unlock Complete Report & Downloads Now →</span>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-[#b5a898]">
            <IconLock className="w-3.5 h-3.5 text-[#d4af37]" /> Your data is 100% confidential. No spam, ever.
          </p>
        </form>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-[#b5a898] hover:text-[#fdfbf7] transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
