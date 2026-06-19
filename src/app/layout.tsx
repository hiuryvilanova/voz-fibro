import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { PageReturn } from "@/components/PageReturn";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/voz.png",
    shortcut: "/images/voz.png",
    apple: "/images/voz.png",
  },
  title: {
    default: "Voz da Fibro: Comunidade, Cuidado e Direitos",
    template: "%s | Voz da Fibro",
  },
  description: "Plataforma de acolhimento, informação confiável e mobilização social para pessoas com fibromialgia em Brasília e regiões administrativas do DF.",
  keywords: ["fibromialgia", "Voz da Fibro", "dor crônica", "saúde", "comunidade", "direitos"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${publicSans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <ScrollToTop />
        <Header />
        <PageReturn />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
