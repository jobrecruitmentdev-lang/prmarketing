"use client";

import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import LeadCaptureModal, { LeadData } from "@/components/LeadCaptureModal";
import { IconStar, IconCrown, IconGlobe, IconFileText, IconDownload, IconQrCode, IconCheck, IconLightbulb, IconExternalLink, IconSparkles, IconZap } from "@/components/icons";

export default function GoogleReviewQrGeneratorPage() {
  const [businessName, setBusinessName] = useState("PR Marketing Ventures");
  const [reviewUrl, setReviewUrl] = useState("https://www.google.com/maps/search/?api=1&query=PR+Marketing+Ventures+Navrangpura+Ahmedabad");
  const [headline, setHeadline] = useState("Scan to Review Us on Google");
  const [theme, setTheme] = useState<"dark" | "light" | "google">("dark");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute final valid review URL
  const activeTargetUrl = reviewUrl.trim().length > 0
    ? reviewUrl.trim()
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessName || "PR Marketing Ventures Ahmedabad")}`;

  // Helper to auto-create universal Google Maps review search link from business name
  const handleGenerateGoogleUrl = () => {
    if (!businessName.trim()) return;
    const universalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessName.trim() + " Ahmedabad")}`;
    setReviewUrl(universalUrl);
  };

  // Draw Standee on Canvas with 100% Client-Side QR Generation
  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dimensions: 800 x 1100 (Standard printable card ratio)
    canvas.width = 800;
    canvas.height = 1100;

    const renderCardWithQR = async () => {
      // 1. Background
      if (theme === "dark") {
        ctx.fillStyle = "#1a100a"; // Luxury Dark Mocha Brown
        ctx.fillRect(0, 0, 800, 1100);

        // Gold border
        ctx.strokeStyle = "#D4AF37"; // Regal Gold
        ctx.lineWidth = 12;
        ctx.strokeRect(30, 30, 740, 1040);
      } else if (theme === "google") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, 800, 1100);

        // Google 4-color top bar
        ctx.fillStyle = "#4285F4";
        ctx.fillRect(0, 0, 200, 16);
        ctx.fillStyle = "#EA4335";
        ctx.fillRect(200, 0, 200, 16);
        ctx.fillStyle = "#FBBC05";
        ctx.fillRect(400, 0, 200, 16);
        ctx.fillStyle = "#34A853";
        ctx.fillRect(600, 0, 200, 16);

        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 6;
        ctx.strokeRect(25, 25, 750, 1050);
      } else {
        // Light / Warm Minimal Theme
        ctx.fillStyle = "#FCF9F2";
        ctx.fillRect(0, 0, 800, 1100);
        ctx.strokeStyle = "#5C3D28";
        ctx.lineWidth = 10;
        ctx.strokeRect(30, 30, 740, 1040);
      }

      // 2. Business Name
      ctx.textAlign = "center";
      ctx.fillStyle = theme === "dark" ? "#FDFBF7" : "#1A100A";
      ctx.font = "bold 38px sans-serif";
      ctx.fillText(businessName || "Your Business Name", 400, 120);

      // 3. Stars (Rich Gold)
      ctx.fillStyle = "#D4AF37";
      ctx.font = "36px sans-serif";
      ctx.fillText("★ ★ ★ ★ ★", 400, 175);

      // 4. Headline
      ctx.fillStyle = theme === "dark" ? "#FDFBF7" : "#231710";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText(headline || "Scan to Review Us on Google", 400, 235);

      // 5. Draw QR Code Container Box
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(175, 280, 450, 450);
      ctx.strokeStyle = theme === "dark" ? "#D4AF37" : "#CBD5E1";
      ctx.lineWidth = 4;
      ctx.strokeRect(175, 280, 450, 450);

      // 6. Generate QR Code Client-Side directly into data URI (No external API needed)
      try {
        const qrDataUrl = await QRCode.toDataURL(activeTargetUrl, {
          errorCorrectionLevel: "H",
          margin: 1,
          width: 410,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        });

        if (!isMounted) return;

        const qrImg = new Image();
        qrImg.src = qrDataUrl;
        await new Promise((resolve) => {
          qrImg.onload = resolve;
        });

        if (!isMounted) return;
        ctx.drawImage(qrImg, 195, 300, 410, 410);
      } catch (err) {
        console.error("QR Code Generation Error:", err);
      }

      // 7. Footer Instructions
      ctx.fillStyle = theme === "dark" ? "#D9CEBE" : "#5C4A3E";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("1. Open Camera on your Phone", 400, 800);
      ctx.fillText("2. Point at QR code & tap the review link", 400, 845);
      ctx.fillText("3. Share your 5-star experience in 10 seconds!", 400, 890);

      // Footer Accent Brand
      ctx.fillStyle = theme === "dark" ? "#D4AF37" : "#5C3D28";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText("THANK YOU FOR SUPPORTING OUR BUSINESS!", 400, 970);
    };

    renderCardWithQR();

    return () => {
      isMounted = false;
    };
  }, [businessName, reviewUrl, headline, theme, activeTargetUrl]);

  const handleDownload = () => {
    if (!isUnlocked) {
      setShowModal(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${(businessName || "google-review").toLowerCase().replace(/\s+/g, "-")}-standee.png`;
    link.href = dataUrl;
    link.click();
    setDownloadTriggered(true);
  };

  const handleUnlockSuccess = (lead: LeadData) => {
    setIsUnlocked(true);
    setShowModal(false);
    setTimeout(() => {
      handleDownload();
    }, 300);
  };

  const handleAutoFillExample = () => {
    setBusinessName("Taj Skyline Hotel");
    setReviewUrl("https://www.google.com/maps/search/?api=1&query=Taj+Skyline+Sindhu+Bhavan+Road+Ahmedabad");
    setHeadline("Rate Your 5-Star Experience on Google");
  };

  return (
    <div className="min-h-screen bg-[#EDE4D8]">
      {/* Header — Clean White Background with Sharp Black Text */}
      <section className="relative overflow-hidden border-b border-[#D8CBB9] bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            <IconStar className="w-3.5 h-3.5 text-primary" /> 100% Free Tabletop Counter Standee & Direct Review Generator
          </div>
          <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Google Review QR Code & Standee Generator
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Generate printable, high-resolution QR counter standees and direct review links to get 5x more 5-star Google reviews from walk-in clients.
          </p>
        </div>
      </section>

      {/* Main Workspace — Dark Cream Background with Luxury Dark Charcoal Cards */}
      <section className="relative bg-[#EDE4D8] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Controls Form (Left Column) */}
            <div className="space-y-6 lg:col-span-6">
              <div className="rounded-3xl border border-[#3d2719] bg-[#1f140e] p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-xl font-bold text-[#fdfbf7]">
                    1. Customize Your Standee Card
                  </h2>
                  <button
                    type="button"
                    onClick={handleAutoFillExample}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#e5c07b] hover:text-[#d4af37] cursor-pointer"
                  >
                    <IconSparkles className="w-3.5 h-3.5" /> Fill Example
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#d9cebe]">
                      Business / Clinic / Store Name
                    </label>
                    <div className="mt-1.5 flex gap-2">
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Taj Cafe / Apex Hospital"
                        className="flex-1 rounded-xl border border-[#4a3424] bg-[#271a12] px-4 py-3 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateGoogleUrl}
                        title="Auto-build Google Maps link from business name"
                        className="rounded-xl border border-[#4a3424] bg-[#2a1d15] px-3.5 py-2 text-xs font-semibold text-[#e5c07b] hover:border-[#d4af37] hover:bg-[#382415] transition-colors cursor-pointer"
                      >
                        Auto-Link
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d9cebe]">
                      Google Review Direct Link (e.g. g.page/r/... or maps.app.goo.gl/... or Google Maps Link)
                    </label>
                    <input
                      type="text"
                      value={reviewUrl}
                      onChange={(e) => setReviewUrl(e.target.value)}
                      placeholder="Paste your Google Business review link or Google Maps URL"
                      className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#271a12] px-4 py-3 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none"
                    />
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="text-[#b5a898]">
                        Paste short link from Google Profile, or click &quot;Auto-Link&quot; above.
                      </span>
                      {activeTargetUrl && (
                        <a
                          href={activeTargetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#d4af37] hover:underline"
                        >
                          <IconExternalLink className="w-3 h-3" /> Test Link in Google
                        </a>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d9cebe]">
                      Card Headline
                    </label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Scan to Review Us on Google"
                      className="mt-1.5 w-full rounded-xl border border-[#4a3424] bg-[#271a12] px-4 py-3 text-sm text-[#fdfbf7] placeholder-[#8c7b6f] focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#d9cebe]">
                      Choose Standee Theme Style
                    </label>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTheme("dark")}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-2 text-xs font-semibold transition-all cursor-pointer ${
                          theme === "dark"
                            ? "border-[#d4af37] bg-[#382415] text-[#fdfbf7] ring-1 ring-[#d4af37]"
                            : "border-[#4a3424] bg-[#271a12] text-[#d9cebe]"
                        }`}
                      >
                        <IconCrown className="w-3.5 h-3.5 text-[#d4af37]" /> Luxury Gold
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("google")}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-2 text-xs font-semibold transition-all cursor-pointer ${
                          theme === "google"
                            ? "border-[#d4af37] bg-[#382415] text-[#fdfbf7] ring-1 ring-[#d4af37]"
                            : "border-[#4a3424] bg-[#271a12] text-[#d9cebe]"
                        }`}
                      >
                        <IconGlobe className="w-3.5 h-3.5 text-[#d4af37]" /> Google Theme
                      </button>
                      <button
                        type="button"
                        onClick={() => setTheme("light")}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-2 text-xs font-semibold transition-all cursor-pointer ${
                          theme === "light"
                            ? "border-[#d4af37] bg-[#382415] text-[#fdfbf7] ring-1 ring-[#d4af37]"
                            : "border-[#4a3424] bg-[#271a12] text-[#d9cebe]"
                        }`}
                      >
                        <IconFileText className="w-3.5 h-3.5 text-[#d4af37]" /> Clean Minimal
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#d4af37] py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#140d09] shadow-md transition-all hover:bg-[#c5a059] cursor-pointer"
                  >
                    <IconDownload className="w-5 h-5 text-[#140d09]" />
                    <span>Download HD Print-Ready Standee (PNG)</span>
                  </button>
                  <p className="text-center text-[11px] text-[#b5a898]">
                    Ready to print for reception desks, billing counters, tables & visiting cards.
                  </p>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="rounded-3xl border border-[#3d2719] bg-[#1a110a] p-5 sm:p-6 text-xs text-[#d9cebe] space-y-2">
                <h3 className="font-heading text-sm font-semibold text-[#fdfbf7]">
                  Why use a Google Review QR Standee?
                </h3>
                <p>• <strong>Removes Friction:</strong> Customers scan directly to your review modal without searching.</p>
                <p>• <strong>Boosts Local SEO:</strong> Faster Google 5-star review velocity ranks you in the Google Maps 3-Pack.</p>
                <p>• <strong>Builds Trust:</strong> Verified reviews boost walk-in buyer conversions by 270%.</p>
              </div>
            </div>

            {/* Live Standee Preview (Right Column) */}
            <div className="flex flex-col items-center justify-center lg:col-span-6">
              <div className="relative w-full max-w-sm rounded-3xl border border-[#3d2719] bg-[#180e08] p-3 sm:p-4 shadow-2xl">
                <div className="mb-3 flex items-center justify-between px-2 text-xs font-semibold text-[#b5a898]">
                  <span className="flex items-center gap-1.5">
                    <IconQrCode className="w-4 h-4 text-[#d4af37]" /> Live Tabletop Standee Preview
                  </span>
                  <span className="text-[#d4af37] font-bold">800 × 1100 HD</span>
                </div>

                {/* Canvas Preview */}
                <div className="overflow-hidden rounded-2xl border border-[#3d2719] shadow-inner bg-[#140d09] flex justify-center p-1 w-full max-w-full">
                  <canvas
                    ref={canvasRef}
                    className="h-auto w-full max-w-full transition-all duration-300 rounded-xl"
                  />
                </div>

                {downloadTriggered && (
                  <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#2d1e15] border border-[#d4af37]/40 p-2 text-center text-xs font-semibold text-[#e5c07b]">
                    <IconCheck className="w-4 h-4 text-[#d4af37]" /> Standee downloaded successfully! Print on A5 / A4 acrylic standee.
                  </div>
                )}
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
        toolName="Google Review QR Standee"
        toolActionTitle="Download Your HD Print-Ready Standee"
        initialBusinessName={businessName}
        initialWebsiteUrl={reviewUrl}
      />
    </div>
  );
}
