import Reveal from "./Reveal";
import type { SVGProps } from "react";

export type Feature = {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

/* Icon + title + desc card on a dark surface — shared by the Home
   "differentiators" section and About "values" section. */
export default function DarkFeatureGrid({
  items,
  columns = 2,
}: {
  items: readonly Feature[];
  columns?: 2;
}) {
  return (
    <ul
      className={`mt-12 grid gap-6 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={(i % columns) * 90}>
          <div className="flex h-full gap-4 rounded-2xl bg-ink-2 p-6">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-bright">
              <item.icon />
            </span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.desc}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
