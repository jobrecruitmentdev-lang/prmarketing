export function generateStaticParams() {
  return [{ jobSlug: "default" }];
}

export default function JobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
