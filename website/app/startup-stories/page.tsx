import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { multiBreadcrumbSchema } from "@/lib/seo";
import { IconSparkles } from "@/components/icons";
import StoriesFilterView, { StoryItem } from "@/components/StoriesFilterView";

export const metadata: Metadata = {
  title: "Startup Stories & Founder Case Studies | PR Marketing",
  description:
    "Read actionable startup success stories, growth marketing case studies, and bootstrapping lessons curated by PR Marketing Ventures in Ahmedabad. Learn today!",
  alternates: { canonical: "/startup-stories/" },
  openGraph: {
    title: "Startup Stories & Growth Intelligence | PR Marketing Ventures",
    description:
      "Exclusive startup growth blueprints, venture scaling strategies, and B2B growth frameworks.",
  },
};

const initialStories: StoryItem[] = [
  {
    "slug": "instaastro-raises-12-mn-series-a-to-scale-ai-led-astrology-and-spiritual-commerce",
    "title": "InstaAstro Raises $12 Mn Series A to Scale AI-Led Astrology and Spiritual Commerce",
    "desc": "The latest funding follows InstaAstro's earlier ₹3.2 crore seed round in 2021 and a ₹18.5 crore pre-Series A round in 2024, both backed by Artha Venture Fund.",
    "tag": "Venture Scale",
    "category": "Startup & Innovation",
    "readTime": "5 min read",
    "image": "/images/guides/instaastro-raises-12-mn-series-a-to-scale-ai-led-astrology-and-spiritual-commerce-clean-2026.jpg?t=1788344026"
  },
  {
    "slug": "from-4000-in-facebook-ads-to-a-14790-crore-ipo-the-urban-company-story",
    "title": "From ₹4,000 In Facebook Ads To A ₹14,790 Crore IPO: The Urban Company Story",
    "desc": "Urban Company serves 13 million customers across 59 cities in four countries. How three founders built India's largest home-services marketplace with relentless quality focus.",
    "tag": "Unicorn Scale",
    "category": "Startup & Innovation",
    "readTime": "9 min read",
    "image": "/images/guides/urban-company-founders-clean-2026.jpg?t=1788339300"
  },
  {
    "slug": "shadowfax-success-story-how-four-iit-delhi-alumni-built-indias-largest-crowdsourced-logistics-network",
    "title": "Shadowfax Success Story: How Four IIT Delhi Alumni Built India\u2019s Largest Crowdsourced Logistics Network",
    "desc": "Shadowfax's capital history spans 12 funding rounds and $247 million in total raised across 32 investors. There is a name thatAbhishek BansalandVaibhav Khandelwalchose for their logistics startup in 2015 that says something about how they were thinking at the time. Shadowfax i...",
    "tag": "Logistics Tech",
    "category": "Startup & Innovation",
    "readTime": "9 min read",
    "image": "/images/guides/shadowfax-founders-clean-2026.jpg?t=1788339300"
  },
  {
    "slug": "pee-safe-the-brand-that-started-with-a-uti-and-is-now-rewriting-indias-hygiene-story",
    "title": "Pee Safe: The Brand That Started With A UTI And Is Now Rewriting India\u2019s Hygiene Story",
    "desc": "India had 150 million women getting UTIs every year. Nobody had made a product for them. Then one founder did, from scratch, with \u20b950,000, and built a business that just raised $32 million. Nobody builds a hygiene company by accident. But sometimes, the accident comes first.",
    "tag": "D2C Brand",
    "category": "Marketing Strategy",
    "readTime": "9 min read",
    "image": "/images/guides/peesafe-founders-clean-2026.jpg?t=1788339300"
  },
  {
    "slug": "genoconnect-how-this-kerala-startup-is-bringing-dna-testing-out-of-the-lab-and-into-everyday-life",
    "title": "GenoConnect: How This Kerala Startup Is Bringing DNA Testing Out of the Lab and Into Everyday Life",
    "desc": "Your DNA predispositions are like a loaded gun. The trigger is your lifestyle. Whether it fires or not is entirely in your hands. Most people will never walk into a genetic testing lab unless a doctor tells them to.Digil Vinoy, co-founder ofGenoConnect, thinks that is exactly ...",
    "tag": "HealthTech",
    "category": "Startup & Innovation",
    "readTime": "9 min read",
    "image": "/images/guides/genoconnect-founders-clean-2026.jpg?t=1788339300"
  },
  {
    "slug": "how-sekar-vembu-is-taking-on-global-data-protection-giants-without-external-funding",
    "title": "How Sekar Vembu Is Taking On Global Data Protection Giants Without External Funding",
    "desc": "Vembu Technologies serves 10,000 active customers across more than 100 countries, competes directly with Veeam, Commvault, Veritas, and Acronis, operates with around 120 people, and has never raised a rupee in external funding. Sekar Vembudoes not particularly want to be writt...",
    "tag": "Bootstrapped SaaS",
    "category": "Startup & Innovation",
    "readTime": "9 min read",
    "image": "/images/guides/sekar-vembu-founders-clean-2026.jpg?t=1788339300"
  }
];

export default function StartupStoriesHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            multiBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Startup Stories", path: "/startup-stories/" },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Startup Stories & Growth Intelligence",
              description: metadata.description,
              url: "https://prmarketingventures.com/startup-stories/",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: initialStories.map((s, idx) => ({
                  "@type": "ListItem",
                  position: idx + 1,
                  url: `https://prmarketingventures.com/startup-stories/${s.slug}/`,
                  name: s.title,
                })),
              },
            },
          ]),
        }}
      />

      <section className="bg-gradient-to-b from-[#f9f6f0] via-white to-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
                <IconSparkles width={14} height={14} />
                VENTURE INSIGHTS & STRATEGY
              </span>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink sm:text-5xl">
                Startup Stories & Growth Intelligence
              </h1>
              <p className="mt-4 text-base text-slate-600 sm:text-lg">
                Explore in-depth venture blueprints, AI innovation models, high-velocity talent strategies, and unit economics breakdowns authored by the growth engineers at PR Marketing Ventures.
              </p>
            </div>
          </Reveal>

          {/* Interactive Live Database Synchronized View */}
          <StoriesFilterView stories={initialStories} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
