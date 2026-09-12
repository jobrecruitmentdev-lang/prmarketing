import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconTrendingUp, IconSparkles } from "./icons";

interface PrSeoHeroCardProps {
  className?: string;
}

export default function PrSeoHeroCard({ className = "" }: PrSeoHeroCardProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Ambient background glow matching PR Marketing Ventures branding */}
      <div
        className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-amber-300/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Link
        href="/services/seo/"
        aria-label="Explore PR and Technical SEO Services at PR Marketing Ventures"
        title="Click to explore PR & SEO Growth Services"
        className="group relative block rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 cursor-pointer"
      >
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 px-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-accent-dark">
            <IconTrendingUp width={14} height={14} /> PR &amp; SEO Growth
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
            Explore SEO &amp; PR <IconArrowRight width={13} height={13} />
          </span>
        </div>

        {/* Hero Visual Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 shadow-inner">
          <Image
            src="/images/pr-seo-consultant.webp"
            alt="PR and Technical SEO Growth Consultant at PR Marketing Ventures Ahmedabad"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
            priority
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* Subtle bottom shadow gradient on image */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Top-left chip: Rank #1 Goal */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-ink/85 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Top Agency Ahmedabad
          </div>

          {/* Bottom badge overlay: PR & SEO Authority */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between rounded-lg bg-white/95 backdrop-blur-md px-3 py-2 shadow-md">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Growth Engineered
              </p>
              <p className="font-heading text-xs sm:text-sm font-bold text-ink">
                Technical SEO &amp; Media PR
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
              <IconSparkles width={12} height={12} /> +340% ROI
            </span>
          </div>
        </div>

        {/* 3 Metrics Band */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-slate-50 p-2.5 text-center">
            <p className="font-heading text-base sm:text-lg font-bold text-primary">
              90+
            </p>
            <p className="text-[11px] text-slate-500">PageSpeed</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 text-center">
            <p className="font-heading text-base sm:text-lg font-bold text-primary">
              #1 Rank
            </p>
            <p className="text-[11px] text-slate-500">Google Maps</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-2.5 text-center">
            <p className="font-heading text-base sm:text-lg font-bold text-primary">
              24/7
            </p>
            <p className="text-[11px] text-slate-500">AI Citation</p>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-2.5 flex items-center justify-center gap-1.5 pt-2 border-t border-slate-100 text-xs font-semibold text-primary group-hover:text-primary-light">
          <span>Click to see our PR &amp; SEO Case Studies</span>
          <IconArrowRight
            width={13}
            height={13}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </Link>
    </div>
  );
}
