export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="max-w-[1400px] mx-auto">{children}</section>;
}
