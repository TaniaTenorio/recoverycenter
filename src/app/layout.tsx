import type { Metadata } from "next";
import { Reem_Kufi, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";

const reemKufi = Reem_Kufi({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Recovery Center | Data Recovery",
  description:
    "Next.js migration baseline generated from a WordPress Elementor homepage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${reemKufi.variable} ${roboto.variable} ${robotoSlab.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
