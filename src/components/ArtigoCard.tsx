import Link from "next/link";
import type { Artigo } from "@/data/artigos";
import { CATEGORIAS } from "@/data/artigos";

interface ArtigoCardProps {
  artigo: Artigo;
}

export function ArtigoCard({ artigo }: ArtigoCardProps) {
  const categoria = CATEGORIAS[artigo.categoria];

  return (
    <Link
      href={`/biblioteca/${artigo.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
        {categoria.label}
      </span>
      <h3 className="mt-3 text-base font-semibold text-foreground group-hover:text-primary">
        {artigo.titulo}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
        {artigo.resumo}
      </p>
      <p className="mt-3 text-xs text-muted">
        {artigo.tempoLeitura} min de leitura
      </p>
    </Link>
  );
}
