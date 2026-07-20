import Link from "next/link";
import Image from "next/image";

/* Official brand mark — compass ring + phoenix + growth coin, sourced from
   the PR Marketing Ventures brand guideline sheet (brand/logo/). Cropped
   directly from the guideline artwork with the background keyed out, per
   guideline rule: "Use the logo files. Do not recreate the logo." */

export function LogoMark({
  size = 40,
  dark = false,
}: {
  size?: number;
  /** Use the white/inverse mark for dark backgrounds, per brand guideline §4 "Logo on Backgrounds". */
  dark?: boolean;
}) {
  return (
    <Image
      src={dark ? "/logo-mark-white.png" : "/logo-mark.png"}
      alt=""
      width={468}
      height={dark ? 501 : 516}
      className="shrink-0"
      style={{ width: size, height: "auto" }}
      priority
    />
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
      <LogoMark dark={dark} />
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
