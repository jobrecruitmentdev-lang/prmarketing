export const site = {
  name: "PR Marketing Ventures",
  legalName: "PR Marketing Ventures",
  tagline: "Global AI-Powered Growth Agency, Performance Marketing & SEO",
  // TODO: replace with the live domain once purchased/connected
  url: "https://prmarketingventures.com",
  // TODO: replace with the real business email + phone before launch
  email: "contact@prmarketingventures.com",
  phoneDisplay: "+91 8160666408",
  whatsappNumber: "918160666408",
  whatsappUrl:
    "https://wa.me/918160666408?text=Hey%20PR%20Marketing%20Ventures!%20%F0%9F%91%8B%20I%20need%20help%20with%20your%20services.%20Can%20we%20connect%3F",
  location: "B-903, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Shital Kunj Society, Vasant Vihar, Navrangpura, Ahmedabad, Gujarat 380009, India",
  description:
    "PR Marketing Ventures is a global growth engineering and marketing agency. We engineer full-funnel performance marketing, technical SEO, international SEO, AI search optimization (GEO/AEO), high-speed web apps, and automated CRM pipelines that scale revenue worldwide.",
  founder: {
    name: "Omear Memon",
    role: "Owner & Founder",
    jobTitle: "Founder & Principal Growth Engineer",
    linkedin: "https://in.linkedin.com/in/omear-memon-647281365",
  },
  rating: {
    ratingValue: "4.9",
    bestRating: "5",
    reviewCount: "87",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Tools", href: "/tools/" },
  { label: "Startup Stories", href: "/startup-stories/" },
  { label: "Pricing", href: "/pricing/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Contact", href: "/contact/" },
] as const;

export const industries = [
  "Recruitment",
  "Healthcare",
  "Real Estate",
  "Automobile",
  "Education",
  "Manufacturing",
  "Restaurants",
  "Hotels",
  "Retail",
  "Law Firms",
  "Finance",
  "Travel",
  "Construction",
  "Interior Design",
  "Jewellery",
  "Textile",
  "Pharmaceutical",
  "IT Companies",
] as const;
