import Link from "next/link";
import { IconArrowRight } from "./icons";

export default function CtaBand({
  title = "Ready to outrank your competition?",
  subtitle = "Get a free website & SEO audit — a clear, prioritized report on what is holding your growth back.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent-bright px-6 py-3.5 font-semibold text-ink shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get a Free Audit
            <IconArrowRight width={20} height={20} />
          </Link>
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3.5 font-semibold text-white transition-colors duration-200 hover:border-slate-400 hover:bg-white/5"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
