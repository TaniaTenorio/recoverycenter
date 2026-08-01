import type { Metadata } from "next";
import { Reem_Kufi, Roboto, Roboto_Slab } from "next/font/google";
import LoadPromoModal from "@/components/LoadPromoModal";
import OptionalScripts from "@/components/OptionalScripts";
import MobileQuickActions from "@/components/MobileQuickActions";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WhatsAppFab from "@/components/WhatsAppFab";
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
  title: "Recovery Center | Recuperacion de Datos",
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
      <head>
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0"
        />
      </head>
      <body>
        <LoadPromoModal />
        <SiteHeader />
        {children}
        <WhatsAppFab />
        <MobileQuickActions />
        <SiteFooter />
        <OptionalScripts />
      </body>
    </html>
  );
}
