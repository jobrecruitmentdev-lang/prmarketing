import Link from "next/link";

/* Brand mark — compass ring + rising phoenix + growth coin, per the
   PR Marketing Ventures brand guideline sheet (brand/logo/). Gold #D4AF37
   on transparent/dark; charcoal #1C1C1E is the paired dark brand color. */

export function LogoMark({
  size = 40,
  variant = "gold",
}: {
  size?: number;
  /** gold: default brand mark. inverse: white, for photo/busy or brand-color backgrounds. mono: currentColor. */
  variant?: "gold" | "inverse" | "mono";
}) {
  const fg =
    variant === "inverse" ? "#FFFFFF" : variant === "mono" ? "currentColor" : "#D4AF37";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      {/* Compass ring + cardinal ticks */}
      <circle cx="32" cy="32" r="27" stroke={fg} strokeWidth="1.75" opacity="0.55" />
      <g stroke={fg} strokeWidth="1.75" opacity="0.55" strokeLinecap="round">
        <path d="M32 3v6M32 55v6M3 32h6M55 32h6" />
      </g>

      {/* Phoenix — wings rising into a peak, tail sweeping down */}
      <path
        d="M32 12
           C27 20 20 22 14 20
           C19 26 24 28 29 27
           L20 40
           C26 37 30 33 32 28
           C34 33 38 37 44 40
           L35 27
           C40 28 45 26 50 20
           C44 22 37 20 32 12 Z"
        fill={fg}
      />
      {/* Rising tail feather, doubles as an upward growth stroke */}
      <path
        d="M32 28 L32 50"
        stroke={fg}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M25 47 C28 43 30 40 32 37 C34 40 36 43 39 47"
        stroke={fg}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Growth coin badge, bottom-right */}
      <circle
        cx="47"
        cy="47"
        r="10.5"
        fill={variant === "inverse" ? "#1C1C1E" : "#FFFFFF"}
        stroke={fg}
        strokeWidth="1.75"
      />
      <path
        d="M42 50 L45 46 L48 48.5 L52 43"
        stroke={fg}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M49 43h3v3" stroke={fg} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({
  dark = false,
  tagline = false,
}: {
  dark?: boolean;
  /** Show the "PROSPERITY RISING" tagline line beneath the wordmark — full lockup only, not the compact header size. */
  tagline?: boolean;
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="PR Marketing Ventures — home"
    >
      <LogoMark variant={dark ? "inverse" : "gold"} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-lg font-bold tracking-tight ${dark ? "text-white" : "text-ink"}`}
        >
          <span className={dark ? "text-accent-bright" : "text-accent-dark"}>PR</span>{" "}
          Marketing
        </span>
        <span
          className={`mt-1 text-[0.65rem] font-medium tracking-[0.35em] ${dark ? "text-slate-400" : "text-slate-500"}`}
        >
          VENTURES
        </span>
        {tagline && (
          <span
            className={`mt-1.5 flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.25em] ${dark ? "text-accent-bright" : "text-accent-dark"}`}
          >
            <span className={`h-px w-3 ${dark ? "bg-slate-600" : "bg-slate-300"}`} />
            PROSPERITY RISING
            <span className={`h-px w-3 ${dark ? "bg-slate-600" : "bg-slate-300"}`} />
          </span>
        )}
      </span>
    </Link>
  );
}
