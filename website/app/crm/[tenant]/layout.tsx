export function generateStaticParams() {
  return [
    { tenant: "default" },
    { tenant: "abc-technologies" }
  ];
}

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
