import Link from "next/link";
import Logo from "./Logo";
import { IconMail, IconMapPin, IconPhone } from "./icons";
import { site } from "@/lib/site";

const serviceLinks = [
  { label: "Website Design & Development", href: "/services/#web" },
  { label: "Ecommerce Development", href: "/services/#web" },
  { label: "SEO & Technical SEO", href: "/services/#seo" },
  { label: "Local SEO & Google Business", href: "/services/#seo" },
  { label: "AI SEO (GEO / AEO)", href: "/services/#seo" },
  { label: "Marketing Automation", href: "/services/#automation" },
];

const companyLinks = [
  { label: "About Us", href: "/about/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Services", href: "/services/" },
  { label: "Contact", href: "/contact/" },
];

function FooterNavList({
  label,
  title,
  links,
}: {
  label: string;
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={label}>
      <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="transition-colors duration-200 hover:text-accent-bright"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark tagline />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            {site.tagline}. We engineer websites, SEO and automation systems
            that help businesses in {`Ahmedabad`} rank, convert and scale.
          </p>
        </div>

        <FooterNavList label="Services" title="Services" links={serviceLinks} />
        <FooterNavList label="Company" title="Company" links={companyLinks} />

        <div>
          <h2 className="font-heading text-sm font-semibold tracking-wide text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <IconMail width={18} height={18} className="mt-0.5 shrink-0 text-accent-bright" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-accent-bright"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconPhone width={18} height={18} className="mt-0.5 shrink-0 text-accent-bright" />
              <span>{site.phoneDisplay}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <IconMapPin width={18} height={18} className="mt-0.5 shrink-0 text-accent-bright" />
              <span>{site.location}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
