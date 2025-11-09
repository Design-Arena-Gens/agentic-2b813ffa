import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marketplace Growth Copilot",
  description:
    "AI-driven assistant to optimise Facebook Marketplace listings, generate keyword tags, and collaborate in real-time."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
