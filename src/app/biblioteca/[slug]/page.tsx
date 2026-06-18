import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Disclaimer } from "@/components/Disclaimer";
import {
  artigos,
  CATEGORIAS,
  getArtigoBySlug,
} from "@/data/artigos";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = getArtigoBySlug(slug);
  if (!artigo) return { title: "Artigo não encontrado" };
  return {
    title: artigo.titulo,
    description: artigo.resumo,
  };
}

function renderParagrafo(texto: string) {
  if (texto.startsWith("**") && texto.includes("**")) {
    const parts = texto.split(/\*\*(.+?)\*\*/g);
    return (
      <p className="leading-relaxed text-foreground">
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i}>{part}</strong>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </p>
    );
  }
  return <p className="leading-relaxed text-foreground">{texto}</p>;
}

export default async function ArtigoPage({ params }: PageProps) {
  const { slug } = await params;
  const artigo = getArtigoBySlug(slug);
  if (!artigo) notFound();

  const categoria = CATEGORIAS[artigo.categoria];
  const dataFormatada = new Date(artigo.atualizadoEm).toLocaleDateString(
    "pt-BR",
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/biblioteca"
        className="text-sm font-medium text-primary hover:underline"
      >
        ← Voltar à biblioteca
      </Link>

      <header className="mt-6">
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {categoria.label}
        </span>
        <h1 className="mt-4 text-3xl font-bold text-foreground text-balance">
          {artigo.titulo}
        </h1>
        <p className="mt-4 text-lg text-muted leading-relaxed">
          {artigo.resumo}
        </p>
        <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
          <div>
            <dt className="inline font-medium text-foreground">
              Tempo de leitura:{" "}
            </dt>
            <dd className="inline">{artigo.tempoLeitura} min</dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">
              Atualizado em:{" "}
            </dt>
            <dd className="inline">{dataFormatada}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground">
              Revisado por:{" "}
            </dt>
            <dd className="inline">{artigo.revisadoPor}</dd>
          </div>
        </dl>
      </header>

      <Disclaimer variant="article" className="mt-8" />

      <div className="prose-custom mt-8 space-y-4">
        {artigo.conteudo.map((paragrafo, i) => (
          <div key={i}>{renderParagrafo(paragrafo)}</div>
        ))}
      </div>

      <footer className="mt-12 rounded-xl border border-border bg-surface-2 p-6">
        <p className="text-sm font-medium text-foreground">
          Ferramenta relacionada
        </p>
        <p className="mt-2 text-sm text-muted">
          Registre seus sintomas no diário e leve um relatório à sua próxima
          consulta.
        </p>
        <Link
          href="/diario"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Abrir diário de sintomas →
        </Link>
      </footer>
    </article>
  );
}
