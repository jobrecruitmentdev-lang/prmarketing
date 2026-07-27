export const site = {
  name: "PR Marketing Ventures",
  legalName: "PR Marketing Ventures",
  tagline: "AI-Powered Growth, SEO & Digital Engineering",
  // TODO: replace with the live domain once purchased/connected
  url: "https://prmarketingventures.com",
  // TODO: replace with the real business email + phone before launch
  email: "contact@prmarketingventures.com",
  phoneDisplay: "+91 8160666408",
  location: "B-910, Fairdeal House, Chimanlal Girdharlal Road (C.G. Road), Near Swastik Cross Road, Shital Kunj Society, Vasant Vihar, Navrangpura, Ahmedabad, Gujarat 380009, India",
  description:
    "AI-powered growth agency in Ahmedabad. We engineer high-performance websites, technical SEO, local SEO, AI search optimization (GEO/AEO) and marketing automation systems that rank, convert and scale.",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
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
