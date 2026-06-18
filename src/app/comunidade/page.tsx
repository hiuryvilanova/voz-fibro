import type { Metadata } from "next";
import Link from "next/link";
import { ComunidadeApp } from "@/components/ComunidadeApp";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Comunidade",
  description: "Grupos moderados de acolhimento para pessoas com fibromialgia.",
};

export default function ComunidadePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold">Comunidade segura</h1>
      <p className="mt-3 max-w-2xl text-muted leading-relaxed">
        Espaços moderados para compartilhar experiências com respeito. Sem
        automedicação, sem promessa de cura, sem venda irregular.
      </p>

      <Disclaimer className="mt-6" />

      <div className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-sm text-muted">
        <Link href="/entrar" className="font-medium text-primary hover:underline">
          Faça login
        </Link>{" "}
        para participar dos grupos e publicar.
      </div>

      <div className="mt-8">
        <ComunidadeApp />
      </div>
    </div>
  );
}
