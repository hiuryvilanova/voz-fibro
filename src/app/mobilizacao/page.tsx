import type { Metadata } from "next";
import Link from "next/link";
import { PesquisaMobilizacao } from "@/components/PesquisaMobilizacao";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Mobilização social",
  description:
    "Participe da pesquisa e contribua para o Retrato Fibro Brasil.",
};

export default function MobilizacaoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold">Mobilização social</h1>
      <p className="mt-3 text-muted leading-relaxed">
        Sua voz importa. Com seu consentimento, dados agregados e anônimos
        ajudam a mostrar a realidade da fibromialgia no Brasil — para campanhas,
        audiências e políticas públicas.
      </p>

      <Link
        href="/mobilizacao/relatorio"
        className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
      >
        Ver relatório Retrato Fibro Brasil →
      </Link>

      <Disclaimer className="mt-6" />

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Pesquisa nacional (piloto)</h2>
        <PesquisaMobilizacao />
      </div>
    </div>
  );
}
