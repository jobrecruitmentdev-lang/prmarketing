import React from "react";
import { IconSparkles, IconShield, IconCheck } from "./icons";

interface AeoDefinitionCardProps {
  term: string;
  definition: string;
  category?: string;
  keyPoints?: string[];
  className?: string;
}

export default function AeoDefinitionCard({
  term,
  definition,
  category = "AI Search & Executive Summary",
  keyPoints,
  className = "",
}: AeoDefinitionCardProps) {
  return (
    <aside
      id="definition-block"
      aria-label={`Definition of ${term}`}
      className={`relative my-8 overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 p-5 sm:p-6 shadow-sm transition-all hover:shadow-md ${className}`}
    >
      {/* Top accent badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-100">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent-dark">
          <IconSparkles width={15} height={15} className="text-primary animate-pulse" />
          <span>{category}</span>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
          <IconShield width={13} height={13} />
          <span>Verified Entity Definition</span>
        </div>
      </div>

      {/* Main 40-60 Word Definition Block */}
      <div className="mt-3.5">
        <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-slate-500">
          What is {term}?
        </h3>
        <p className="mt-1.5 text-base sm:text-lg font-medium leading-relaxed text-slate-800">
          <strong className="font-bold text-ink">{term}</strong> {definition}
        </p>
      </div>

      {/* Key points if available */}
      {keyPoints && keyPoints.length > 0 && (
        <div className="mt-4 pt-3 border-t border-amber-100/70">
          <div className="grid gap-2 sm:grid-cols-3">
            {keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                <IconCheck width={15} height={15} className="mt-0.5 shrink-0 text-emerald-600" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
