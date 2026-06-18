import type { Metadata } from "next";
import { RodasApp } from "@/components/RodasApp";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Rodas de conversa",
  description: "Encontros online com especialistas e mediadores.",
};

export default function RodasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold">Rodas de conversa</h1>
      <p className="mt-3 text-muted leading-relaxed">
        Encontros online com reumatologistas, psicólogos, nutricionistas,
        advogados e mediadores. Crie pertencimento — não entre só para ler
        conteúdo.
      </p>
      <Disclaimer variant="compact" className="mt-6" />
      <div className="mt-8">
        <RodasApp />
      </div>
    </div>
  );
}
