import type { Metadata } from "next";
import { RodasApp } from "@/components/RodasApp";
import { Disclaimer } from "@/components/Disclaimer";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Rodas de conversa",
  description: "Encontros online com especialistas e mediadores.",
};

export default async function RodasPage() {
  const session = await getSession();
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-13">
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Encontros online</p>
          <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Rodas de conversa</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
            Conversas ao vivo com profissionais e pessoas que convivem com a fibromialgia em Brasília. Um espaço para aprender, compartilhar experiências e fortalecer sua rede de apoio no DF.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Disclaimer variant="compact" />
        <div className="mt-10">
          <RodasApp authenticated={Boolean(session?.profileComplete)} />
        </div>
      </div>
    </div>
  );
}
