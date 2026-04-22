import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "From Silos to Ecosystem — What Better Taught Us",
  description:
    "A horizontal, parallax timeline of what a year with Better.com taught us about connecting channels, teams, and ideas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
