"use client";

import { useState } from "react";
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? "bg-primary-soft text-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            className="ml-3 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:bg-primary-light"
          >
            Get a Free Audit
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="cursor-pointer rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 md:hidden"
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-primary-soft text-primary"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact/"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-white"
          >
            Get a Free Audit
          </Link>
        </nav>
      )}
    </header>
  );
}
