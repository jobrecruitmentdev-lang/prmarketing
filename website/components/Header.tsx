"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { IconMenu, IconX } from "./icons";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close mobile menu on route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop / Laptop Navigation (Visible on lg: 1024px+) */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 xl:gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-lg px-2 xl:px-3.5 py-1.5 xl:py-2 text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                isActive(item.href)
                  ? "bg-primary-soft text-primary font-semibold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="ml-1.5 xl:ml-3 rounded-lg bg-primary px-3 xl:px-4 py-2 xl:py-2.5 text-xs xl:text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-primary-light whitespace-nowrap"
          >
            Get a Free Audit
          </Link>
        </nav>

        {/* Mobile & Tablet Hamburger Toggle (Visible up to lg: 1023px) */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="cursor-pointer rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-slate-200 bg-white px-4 pb-6 pt-2 lg:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto shadow-2xl"
        >
          <div className="space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`block rounded-xl px-3.5 py-2.5 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-soft text-primary font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-xl bg-primary px-4 py-3 text-center text-base font-semibold text-white shadow-md hover:bg-primary-light transition-colors"
          >
            Get a Free Audit
          </Link>
        </nav>
      )}
    </header>
  );
}
