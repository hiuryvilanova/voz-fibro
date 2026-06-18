import type { Metadata } from "next";
import { BeneficiosApp } from "@/components/BeneficiosApp";

export const metadata: Metadata = {
  title: "Benefícios",
  description: "Cupons e parcerias responsáveis para membros Voz da Fibro.",
};

export default function BeneficiosPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold">Benefícios responsáveis</h1>
      <p className="mt-3 max-w-2xl text-muted leading-relaxed">
        Cupons e parcerias com transparência. A plataforma informa preços e
        benefícios — nunca prescreve tratamento nem indica medicamentos.
      </p>
      <div className="mt-8">
        <BeneficiosApp />
      </div>
    </div>
  );
}
