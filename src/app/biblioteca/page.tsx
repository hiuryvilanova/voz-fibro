import type { Metadata } from "next";
import { ArtigoCard } from "@/components/ArtigoCard";
import { Disclaimer } from "@/components/Disclaimer";
import { PageHero } from "@/components/PageHero";
import { artigos, CATEGORIAS, type ArtigoCategoria } from "@/data/artigos";

export const metadata: Metadata = { title: "Biblioteca", description: "Conteúdos revisados sobre fibromialgia, direitos, tratamento e cuidado para moradores de Brasília." };

export default function BibliotecaPage() {
  const categorias = Object.keys(CATEGORIAS) as ArtigoCategoria[];
  return (
    <div className="bg-background">
      <PageHero eyebrow="Conhecimento para o cuidado" title="Biblioteca" description="Informação acessível para compreender a fibromialgia, preparar consultas, conhecer direitos e tomar decisões com mais segurança no contexto do Distrito Federal." />
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-13">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm"><strong className="text-3xl text-primary">{artigos.length}</strong><p className="mt-1 text-muted">conteúdos disponíveis</p></div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm"><strong className="text-3xl text-primary">{categorias.length}</strong><p className="mt-1 text-muted">áreas de orientação</p></div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm"><strong className="text-3xl text-primary">100%</strong><p className="mt-1 text-muted">linguagem acessível</p></div>
        </div>
        <Disclaimer variant="article" className="mt-8" />

        <div className="mt-14 space-y-8">
        {categorias.map((cat, index) => {
          const lista = artigos.filter((article) => article.categoria === cat);
          if (!lista.length) return null;
          const info = CATEGORIAS[cat];
          return (
            <section key={cat} className={`rounded-2xl border border-border p-5 sm:p-7 ${index % 3 === 0 ? "bg-white" : index % 3 === 1 ? "bg-[#edf5f8]" : "bg-[#edf7f3]"}`}>
              <p className="text-sm font-extrabold uppercase tracking-wider text-info">Conteúdos por tema</p>
              <h2 className="mt-2 text-3xl font-extrabold text-foreground">{info.label}</h2>
              <p className="mt-2 max-w-3xl text-lg text-muted">{info.descricao}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {lista.map((article) => <ArtigoCard key={article.slug} artigo={article} />)}
              </div>
            </section>
          );
        })}
        </div>
      </div>
    </div>
  );
}
