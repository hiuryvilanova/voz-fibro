import type { Metadata } from "next";
import Link from "next/link";
import { ComunidadeApp } from "@/components/ComunidadeApp";

export const metadata: Metadata = {
  title: "Comunidade",
  description: "Grupos moderados de acolhimento para pessoas com fibromialgia.",
};

export default function ComunidadePage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-13 lg:px-10">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Participação e acolhimento</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Uma comunidade para todo o Brasil</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            Espaços moderados para compartilhar experiências, encontrar informação e construir relações de apoio com respeito e segurança.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/entrar" className="rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary-dark">Participar da comunidade</Link>
            <Link href="/pilares" className="rounded-md border border-primary px-6 py-3 font-bold text-primary hover:bg-primary/5">Conhecer as regras</Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-13 lg:px-10">
        <ComunidadeApp />
      </div>
    </div>
  );
}
