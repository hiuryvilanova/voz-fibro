import type { Metadata } from "next";
import { ArtigoCard } from "@/components/ArtigoCard";
import { Disclaimer } from "@/components/Disclaimer";
import { artigos, CATEGORIAS, type ArtigoCategoria } from "@/data/artigos";

export const metadata: Metadata = {
  title: "Biblioteca",
  description:
    "Conteúdos curados e revisados sobre fibromialgia, direitos, tratamento e cuidado.",
};

export default function BibliotecaPage() {
  const categorias = Object.keys(CATEGORIAS) as ArtigoCategoria[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold text-foreground">Biblioteca</h1>
      <p className="mt-3 max-w-2xl text-muted leading-relaxed">
        Conteúdos revisados por especialistas, com linguagem acessível. Para fins
        educativos — converse com seu médico antes de mudar qualquer tratamento.
      </p>

      <Disclaimer variant="article" className="mt-6" />

      {categorias.map((cat) => {
        const lista = artigos.filter((a) => a.categoria === cat);
        if (lista.length === 0) return null;
        const info = CATEGORIAS[cat];
        return (
          <section key={cat} className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">
              {info.label}
            </h2>
            <p className="mt-1 text-sm text-muted">{info.descricao}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {lista.map((artigo) => (
                <ArtigoCard key={artigo.slug} artigo={artigo} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
