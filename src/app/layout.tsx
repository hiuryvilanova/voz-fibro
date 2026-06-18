import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Voz da Fibro — Comunidade, Cuidado e Direitos",
    template: "%s | Voz da Fibro",
  },
  description:
    "Ecossistema digital nacional de acolhimento, informação confiável e mobilização social para pessoas com fibromialgia no Brasil.",
  keywords: [
    "fibromialgia",
    "Voz da Fibro",
    "dor crônica",
    "saúde",
    "comunidade",
    "direitos",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased pb-16 lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
