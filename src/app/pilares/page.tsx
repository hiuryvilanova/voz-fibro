import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { PilarCard } from "@/components/PilarCard";

export const metadata: Metadata = {
  title: "Sobre o projeto",
  description:
    "Conheça os três pilares, a governança e o escopo do piloto Voz da Fibro.",
};

export default function PilaresPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold text-foreground">Sobre o projeto</h1>
      <p className="mt-4 text-lg text-muted leading-relaxed">
        Voz da Fibro — Comunidade, Cuidado e Direitos é um ecossistema digital
        nacional para pessoas com fibromialgia. Não substitui o médico. Não
        promete cura. Oferece suporte, educação, escuta e encaminhamento.
      </p>

      <Disclaimer className="mt-8" />

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          Os três pilares
        </h2>
        <div className="mt-6 space-y-6">
          <PilarCard
            titulo="Acolhimento"
            descricao="Reduzir isolamento e criar pertencimento através de comunidade moderada e rodas de conversa."
            itens={[
              "Comunidade segura com grupos por tema e região",
              "Moderação humana e regras explícitas",
              "Rodas de conversa com especialistas e mediadores",
              "Espaço para familiares e cuidadores",
            ]}
            cor="primary"
          />
          <PilarCard
            titulo="Conhecimento"
            descricao="Informação validada por especialistas, ferramentas práticas e orientação sobre direitos."
            itens={[
              "Biblioteca com curadoria editorial",
              "Diário de sintomas com relatório para consulta",
              "Conteúdos sobre SUS, direitos e segurança",
              "Mapa de apoio (fase 2)",
            ]}
            cor="secondary"
          />
          <PilarCard
            titulo="Mobilização"
            descricao="Transformar vivência em evidência social para campanhas, audiências e políticas públicas."
            itens={[
              "Pesquisa com consentimento explícito (LGPD)",
              "Relatório Retrato Fibro Brasil",
              "Dados apenas agregados e anônimos",
              "Articulação com associações e gestores públicos",
            ]}
            cor="accent"
          />
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-xl font-semibold text-foreground">Governança</h2>
        <p className="mt-3 text-muted leading-relaxed">
          O cuidado principal do projeto é a governança. Um conselho consultivo
          com reumatologistas, psicólogos, fisioterapeutas, nutricionistas,
          advogados e representantes de pacientes valida conteúdos, orienta rodas
          temáticas e garante que a plataforma não vire espaço de dicas soltas
          ou automedicação.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>• Curadoria editorial com revisão por especialistas</li>
          <li>• Moderação da comunidade com protocolo para risco</li>
          <li>• LGPD desde o cadastro</li>
          <li>• Disclaimers permanentes em todos os módulos</li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          Documentação completa em{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs">
            docs/GOVERNANCA.md
          </code>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-foreground">
          Escopo do piloto
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Duração sugerida: 3 a 6 meses. Entregas: biblioteca com ~15 artigos,
          diário de sintomas, 3–5 grupos moderados, 2 rodas mensais e relatório
          Retrato Fibro Brasil com dados agregados.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/biblioteca"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Ver biblioteca
          </Link>
          <Link
            href="/diario"
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary/30"
          >
            Usar diário
          </Link>
        </div>
      </section>
    </div>
  );
}
