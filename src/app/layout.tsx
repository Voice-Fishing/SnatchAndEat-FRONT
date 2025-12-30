'use client';

import "./globals.css";
import Header from "@/components/common/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();


  const hideHeaderPaths = ['/', '/login', '/signup'];
  const shouldShowHeader = !hideHeaderPaths.includes(pathname);

  return (
    <html lang="en">
      <body>
        {shouldShowHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
