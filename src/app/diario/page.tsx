import type { Metadata } from "next";
import { DiarioApp } from "@/components/DiarioApp";

export const metadata: Metadata = {
  title: "Diário de sintomas",
  description:
    "Registre dor, sono, fadiga e humor. Gere relatório para levar à consulta médica.",
};

export default function DiarioPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold text-foreground">Diário de sintomas</h1>
      <p className="mt-3 text-muted leading-relaxed">
        Registre como você se sente cada dia. Com o tempo, você terá um histórico
        organizado para compartilhar com seu médico na consulta.
      </p>
      <div className="mt-8">
        <DiarioApp />
      </div>
    </div>
  );
}
