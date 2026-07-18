import Link from "next/link";
import { IconArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-primary-soft via-white to-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-28 text-center sm:px-6">
        <p className="font-heading text-7xl font-bold text-primary">404</p>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink">
          This page doesn&rsquo;t exist
        </h1>
        <p className="mt-3 max-w-md text-lg text-slate-600">
          The link may be outdated or mistyped. Let&rsquo;s get you back to
          growing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
          >
            Back to Home
            <IconArrowRight width={20} height={20} />
          </Link>
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-ink transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
