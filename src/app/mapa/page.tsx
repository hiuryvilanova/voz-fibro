import type { Metadata } from "next";
import { MapaApp } from "@/components/MapaApp";
import { DF_MACRO_AREAS } from "@/lib/df-regions";

export const metadata: Metadata = {
  title: "Mapa de apoio",
  description: "Serviços públicos, associações e grupos de apoio por região administrativa em Brasília.",
};

export default function MapaPage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-13 lg:px-10">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Brasília e regiões administrativas</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Mapa de apoio</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            Encontre serviços públicos, associações, grupos de acolhimento e iniciativas de reabilitação nas regiões administrativas do Distrito Federal.
          </p>
          <div className="mt-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DF_MACRO_AREAS.map((area) => (
              <div key={area} className="rounded-md border border-border bg-background px-4 py-3 text-center text-sm font-bold text-foreground">{area}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <MapaApp />
      </div>
    </div>
  );
}
