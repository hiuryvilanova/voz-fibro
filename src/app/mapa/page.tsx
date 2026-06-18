import type { Metadata } from "next";
import { MapaApp } from "@/components/MapaApp";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Mapa de apoio",
  description: "Associações, SUS, grupos de apoio e serviços por região.",
};

export default function MapaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold">Mapa de apoio</h1>
      <p className="mt-3 max-w-2xl text-muted leading-relaxed">
        Associações, serviços públicos, grupos de apoio, clínicas e outros
        pontos de referência. Informação — não indicação médica paga sem
        transparência.
      </p>
      <Disclaimer variant="compact" className="mt-6" />
      <div className="mt-8">
        <MapaApp />
      </div>
    </div>
  );
}
