import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DiarioApp } from "@/components/DiarioApp";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Diário de sintomas",
  description: "Registre dor, sono, fadiga e humor e prepare um histórico para a consulta no SUS ou na rede privada em Brasília.",
};

export default async function DiarioPage() {
  const session = await getSession();
  if (session && !session.profileComplete) redirect("/completar-cadastro");

  return (
    <div className="bg-background">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-13">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Acompanhamento pessoal</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Diário de sintomas</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            Registre como você se sente, acompanhe mudanças ao longo do tempo e leve um histórico organizado para conversar com sua equipe de saúde.
          </p>
          <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {["Registro simples", "Histórico organizado", "Relatório para consulta"].map((item) => (
              <div key={item} className="rounded-md border border-border bg-background px-4 py-3 text-center text-sm font-bold text-foreground">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        {session ? <DiarioApp /> : (
          <section className="rounded-lg border border-border bg-white p-6 shadow-sm sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Recurso protegido</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground">Entre para criar e validar seus registros</h2>
            <p className="mt-3 leading-relaxed text-muted">Você pode conhecer a ferramenta nesta página, mas o preenchimento, o histórico e a geração de relatórios ficam disponíveis após entrar na sua conta.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Dor e fadiga", "Sono e humor", "Medicamentos e atividades", "Relatório para consulta"].map((item) => <div key={item} className="rounded-md bg-surface-2 px-4 py-3 text-sm font-semibold text-muted">{item}</div>)}
            </div>
            <Link href="/entrar" className="mt-7 inline-flex rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary-dark">Entrar ou criar conta</Link>
          </section>
        )}
      </div>
    </div>
  );
}
