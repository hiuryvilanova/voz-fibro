import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { PilarCard } from "@/components/PilarCard";

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-primary/8 to-background px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Uma iniciativa da Cralit
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Você não está sozinha
          </h1>
          <p className="mt-6 text-lg text-muted leading-relaxed text-pretty">
            Voz da Fibro é um ecossistema digital de acolhimento, conhecimento
            e mobilização para pessoas com fibromialgia no Brasil — e para
            familiares, profissionais de saúde e instituições parceiras.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/biblioteca"
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto"
            >
              Explorar biblioteca
            </Link>
            <Link
              href="/diario"
              className="w-full rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 sm:w-auto"
            >
              Abrir diário de sintomas
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <Disclaimer />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">
            Por que este projeto existe
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            A fibromialgia afeta cerca de{" "}
            <strong className="text-foreground">3% da população brasileira</strong>
            , segundo o Ministério da Saúde. Muitas pessoas convivem com dor,
            fadiga, ansiedade e incompreensão — ouvindo que &ldquo;é frescura&rdquo; ou
            &ldquo;é psicológico&rdquo;. Este espaço existe para dizer:{" "}
            <strong className="text-foreground">
              existe informação, existe comunidade, existem direitos e existe
              rede de apoio.
            </strong>
          </p>
        </div>
      </section>

      <section className="bg-surface-2 px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-foreground">
            Os três pilares
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            Governança é o cuidado principal. Sem ela, seria mais um app de
            &ldquo;dicas de saúde&rdquo;.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <PilarCard
              titulo="Acolhimento"
              descricao="Comunidade moderada, escuta ativa e rodas de conversa com especialistas."
              itens={[
                "Grupos por tema e região",
                "Moderação com regras claras",
                "Rodas mensais com especialistas",
              ]}
              cor="primary"
              href="/pilares"
            />
            <PilarCard
              titulo="Conhecimento"
              descricao="Conteúdo validado por especialistas e ferramentas práticas de cuidado."
              itens={[
                "Biblioteca curada",
                "Diário de sintomas",
                "Orientação sobre direitos",
              ]}
              cor="secondary"
              href="/biblioteca"
            />
            <PilarCard
              titulo="Mobilização"
              descricao="Dados agregados, campanhas e articulação com políticas públicas."
              itens={[
                "Pesquisa com consentimento",
                "Relatório Retrato Fibro Brasil",
                "Defesa de direitos",
              ]}
              cor="accent"
              href="/pilares"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground">
          Módulos da plataforma
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              nome: "Biblioteca",
              desc: "15+ artigos revisados sobre fibromialgia, direitos e cuidado.",
              href: "/biblioteca",
              status: "Disponível",
            },
            {
              nome: "Diário de sintomas",
              desc: "Registre dor, sono, fadiga e leve relatório à consulta.",
              href: "/diario",
              status: "Disponível",
            },
            {
              nome: "Comunidade segura",
              desc: "Grupos moderados por tema, cidade e interesse.",
              href: "/comunidade",
              status: "Disponível",
            },
            {
              nome: "Rodas de conversa",
              desc: "Encontros online com reumatologistas, psicólogos e mais.",
              href: "/rodas",
              status: "Disponível",
            },
            {
              nome: "Mapa de apoio",
              desc: "Associações, SUS, eventos e serviços por região.",
              href: "/mapa",
              status: "Disponível",
            },
            {
              nome: "Mobilização social",
              desc: "Pesquisa e relatório Retrato Fibro Brasil.",
              href: "/mobilizacao",
              status: "Disponível",
            },
            {
              nome: "Benefícios",
              desc: "Cupons e parcerias com transparência.",
              href: "/beneficios",
              status: "Disponível",
            },
          ].map((modulo) => (
            <Link
              key={modulo.nome}
              href={modulo.href}
              className="rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground">{modulo.nome}</h3>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    modulo.status === "Disponível"
                      ? "bg-secondary/15 text-secondary"
                      : "bg-muted/15 text-muted"
                  }`}
                >
                  {modulo.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted">{modulo.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary px-4 py-14 text-white sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold">Versão piloto</h2>
          <p className="mt-4 leading-relaxed text-white/90">
            Estamos reunindo especialistas em reumatologia, psicologia,
            fisioterapia, nutrição, direito e representantes de pacientes para
            construir uma solução segura, humana e tecnicamente responsável.
          </p>
          <Link
            href="/pilares"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Conheça o projeto
          </Link>
        </div>
      </section>
    </>
  );
}
