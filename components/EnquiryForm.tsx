"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { IconArrowRight } from "./icons";

/* Static site: submission composes a pre-filled email in the visitor's mail
   client. Swap handleSubmit for a Formspree/n8n webhook POST when ready. */

const serviceOptions = [
  "Website Design & Development",
  "Ecommerce Development",
  "SEO / Technical SEO",
  "Local SEO & Google Business Profile",
  "AI SEO (GEO / AEO)",
  "Marketing & CRM Automation",
  "AI Chatbots & Agents",
  "Hosting & Domains",
  "Not sure yet — need guidance",
];

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Enquiry: ${data.get("service")} — ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Service: ${data.get("service")}`,
      "",
      `${data.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-ink placeholder:text-slate-400 transition-colors duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Your name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Full name"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 …"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
            What do you need? <span className="text-red-600">*</span>
          </label>
          <select id="service" name="service" required className={inputCls} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Tell us about your project <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Your business, your goals, and anything currently holding you back…"
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-lg sm:w-auto"
      >
        Send Enquiry
        <IconArrowRight width={20} height={20} />
      </button>

      {sent && (
        <p role="status" className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-accent-dark">
          Your email app should have opened with the enquiry pre-filled — just
          press send. If it didn&rsquo;t, email us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold underline">
            {site.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
