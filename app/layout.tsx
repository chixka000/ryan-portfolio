import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryan Canseco | Web Developer Portfolio",
  description:
    "Portfolio for Ryan Canseco, a React, Next.js, TypeScript, and backend developer.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
