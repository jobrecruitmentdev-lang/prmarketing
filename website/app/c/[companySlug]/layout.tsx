export function generateStaticParams() {
  return [
    { companySlug: "default" },
    { companySlug: "abc-technologies" }
  ];
}

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
