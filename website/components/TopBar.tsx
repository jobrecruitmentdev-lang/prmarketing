"use client";

import React from "react";
import { site } from "@/lib/site";
import { IconPhone, IconMail, IconMapPin, IconClock } from "./icons";

export default function TopBar() {
  return (
    <div
      role="region"
      aria-label="Direct Contact Information"
      className="bg-[#1c1c1e] text-[#fbf7ec] border-b border-[#2d2d30] text-[11px] sm:text-xs font-sans tracking-wide transition-colors"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-2">
        {/* Contact links: Phone & Email */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap min-w-0">
          <a
            href={`tel:${site.phoneDisplay.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#d4af37] shrink-0"
            aria-label={`Call PR Marketing Ventures at ${site.phoneDisplay}`}
          >
            <IconPhone className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
            <span className="font-medium">{site.phoneDisplay}</span>
          </a>

          <span className="text-[#4a4a50] hidden xs:inline" aria-hidden="true">
            |
          </span>

          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-[#d4af37] min-w-0"
            aria-label={`Email PR Marketing Ventures at ${site.email}`}
          >
            <IconMail className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
            <span className="font-medium truncate">{site.email}</span>
          </a>
        </div>

        {/* Office Location & Working Hours (Hidden on small mobile, visible on md+) */}
        <div className="hidden md:flex items-center gap-5 text-[#e5dec9]/90 shrink-0">
          <span className="inline-flex items-center gap-1.5">
            <IconMapPin className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
            <span>Navrangpura, Ahmedabad</span>
          </span>
          <span className="text-[#4a4a50]" aria-hidden="true">
            |
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconClock className="h-3.5 w-3.5 text-[#d4af37] shrink-0" />
            <span>Mon–Sat: 9 AM – 8 PM</span>
          </span>
        </div>
      </div>
    </div>
  );
}
