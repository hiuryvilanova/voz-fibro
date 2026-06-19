import type { Metadata } from "next";
import { BeneficiosApp } from "@/components/BeneficiosApp";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Benefícios", description: "Parcerias responsáveis para membros Voz da Fibro em Brasília." };

export default function BeneficiosPage() {
  return <div className="bg-background">
    <PageHero eyebrow="Rede de cuidado" title="Benefícios responsáveis" description="Parcerias locais apresentadas com transparência, critérios claros e respeito às decisões individuais de cuidado no Distrito Federal." />
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-13"><BeneficiosApp /></div>
  </div>;
}
