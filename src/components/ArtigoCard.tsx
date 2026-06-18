import Link from "next/link";
import type { Artigo } from "@/data/artigos";
import { CATEGORIAS } from "@/data/artigos";

interface ArtigoCardProps {
  artigo: Artigo;
}

export function ArtigoCard({ artigo }: ArtigoCardProps) {
  const categoria = CATEGORIAS[artigo.categoria];
  const categoryStyle = {
    fundamentos: "bg-sky-100 text-sky-800",
    sintomas: "bg-amber-100 text-amber-900",
    tratamento: "bg-emerald-100 text-emerald-800",
    "vida-cotidiana": "bg-teal-100 text-teal-800",
    direitos: "bg-primary/10 text-primary",
    seguranca: "bg-red-100 text-red-800",
  }[artigo.categoria];

  return (
    <Link
      href={`/biblioteca/${artigo.slug}`}
      className="group flex min-h-56 flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${categoryStyle}`}>
        {categoria.label}
      </span>
      <h3 className="mt-4 text-xl font-extrabold leading-snug text-foreground group-hover:text-primary">
        {artigo.titulo}
      </h3>
      <p className="mt-3 flex-1 text-base leading-relaxed text-muted line-clamp-3">
        {artigo.resumo}
      </p>
      <p className="mt-5 border-t border-border pt-4 text-sm font-semibold text-muted">
        {artigo.tempoLeitura} min de leitura
      </p>
    </Link>
  );
}
