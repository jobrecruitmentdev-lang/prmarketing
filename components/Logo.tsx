import Link from "next/link";

/* Inline mark (from brand/logo/logo-mark.svg) + HTML wordmark so the
   wordmark always renders in the site's loaded fonts. */

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="pmvGrad"
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6366F1" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#pmvGrad)" />
      <rect x="16" y="36" width="7" height="12" rx="3.5" fill="#fff" fillOpacity="0.55" />
      <rect x="28.5" y="28" width="7" height="20" rx="3.5" fill="#fff" fillOpacity="0.8" />
      <rect x="41" y="18" width="7" height="30" rx="3.5" fill="#fff" />
      <path
        d="M15 33 L28 26 L37 31 L49 16"
        stroke="#34D399"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M43 15.5 L50 14.5 L49 21.5"
        stroke="#34D399"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="PR Marketing Ventures — home"
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-lg font-bold tracking-tight ${dark ? "text-white" : "text-ink"}`}
        >
          <span className={dark ? "text-indigo-300" : "text-primary"}>PR</span>{" "}
          Marketing
        </span>
        <span
          className={`mt-1 text-[0.65rem] font-medium tracking-[0.35em] ${dark ? "text-slate-400" : "text-slate-500"}`}
        >
          VENTURES
        </span>
      </span>
    </Link>
  );
}
