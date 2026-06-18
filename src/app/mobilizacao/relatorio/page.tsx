import type { Metadata } from "next";
import { RelatorioMobilizacao } from "@/components/RelatorioMobilizacao";

export const metadata: Metadata = {
  title: "Retrato Fibro Brasil",
  description: "Relatório agregado com dados da pesquisa nacional piloto.",
};

export default function RelatorioPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <RelatorioMobilizacao />
    </div>
  );
}
