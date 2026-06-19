"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Group {
  slug: string;
  name: string;
  description: string;
  category: string;
  state: string | null;
  memberCount: number;
  postCount: number;
  isMember: boolean;
}

const demoGroups: Group[] = [
  { slug: "acolhimento", name: "Acolhimento e primeiros passos", description: "Espaço seguro para dúvidas, escuta e troca de experiências após o diagnóstico.", category: "tema", state: null, memberCount: 1280, postCount: 346, isMember: false },
  { slug: "trabalho-direitos", name: "Trabalho e direitos", description: "Conversas sobre rotina profissional, adaptações e acesso à proteção social.", category: "tema", state: null, memberCount: 864, postCount: 219, isMember: false },
  { slug: "familia-cuidadores", name: "Família e cuidadores", description: "Informação para fortalecer o diálogo e construir redes de apoio no cotidiano.", category: "tema", state: null, memberCount: 612, postCount: 148, isMember: false },
  { slug: "movimento-bem-estar", name: "Movimento e bem-estar", description: "Vivências sobre atividade adaptada, descanso, sono e autocuidado responsável.", category: "tema", state: null, memberCount: 947, postCount: 287, isMember: false },
  { slug: "plano-piloto", name: "Plano Piloto", description: "Rede local para compartilhar serviços, iniciativas e experiências no coração de Brasília.", category: "regiao", state: "Plano Piloto", memberCount: 438, postCount: 96, isMember: false },
  { slug: "taguatinga", name: "Taguatinga", description: "Conexão entre pacientes, familiares e associações da região de Taguatinga.", category: "regiao", state: "Taguatinga", memberCount: 612, postCount: 148, isMember: false },
  { slug: "ceilandia", name: "Ceilândia", description: "Informação local e apoio entre moradores da maior região administrativa do DF.", category: "regiao", state: "Ceilândia", memberCount: 784, postCount: 201, isMember: false },
  { slug: "samambaia", name: "Samambaia", description: "Grupo comunitário para trocar experiências sobre cuidado, SUS e direitos.", category: "regiao", state: "Samambaia", memberCount: 536, postCount: 124, isMember: false },
  { slug: "aguas-claras", name: "Águas Claras", description: "Acolhimento e orientação para quem vive na região de Águas Claras e entorno.", category: "regiao", state: "Águas Claras", memberCount: 492, postCount: 118, isMember: false },
  { slug: "gama", name: "Gama", description: "Espaço para fortalecer a rede de apoio no Gama e regiões vizinhas.", category: "regiao", state: "Gama", memberCount: 401, postCount: 89, isMember: false },
  { slug: "sobradinho-planaltina", name: "Sobradinho e Planaltina", description: "Articulação comunitária nas regiões administrativas do extremo norte do DF.", category: "regiao", state: "Sobradinho", memberCount: 356, postCount: 77, isMember: false },
  { slug: "brasilia-online", name: "Brasília online", description: "Grupo aberto para quem busca acolhimento em qualquer região administrativa do DF.", category: "regiao", state: "DF", memberCount: 1240, postCount: 328, isMember: false },
];

export function ComunidadeApp() {
  const [groups, setGroups] = useState<Group[]>(demoGroups);

  useEffect(() => {
    fetch("/api/groups")
      .then((r) => r.json())
      .then((d) => {
        if (d.groups?.length) setGroups(d.groups);
      })
      .catch(() => undefined);
  }, []);

  const tematicos = groups.filter((g) => g.category === "tema");
  const regionais = groups.filter((g) => g.category === "regiao");

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-bold uppercase tracking-wider text-primary">Por interesse</p>
        <h2 className="mt-1 text-3xl font-extrabold text-foreground">Grupos temáticos</h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">Escolha um assunto para encontrar informação, acolhimento e pessoas com experiências semelhantes.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tematicos.map((g) => (
            <GroupCard key={g.slug} group={g} />
          ))}
        </div>
      </section>

      <section>
        <p className="text-sm font-bold uppercase tracking-wider text-primary">Perto de você</p>
        <h2 className="mt-1 text-3xl font-extrabold text-foreground">Grupos por região administrativa</h2>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">Conecte-se com a rede da sua região em Brasília e acompanhe iniciativas, serviços e encontros locais.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {regionais.map((g) => (
            <GroupCard key={g.slug} group={g} />
          ))}
        </div>
      </section>
    </div>
  );
}

function GroupCard({ group }: { group: Group }) {
  const href = demoGroups.includes(group) ? "/entrar" : `/comunidade/${group.slug}`;
  const members = new Intl.NumberFormat("pt-BR").format(group.memberCount);
  const posts = new Intl.NumberFormat("pt-BR").format(group.postCount);

  return (
    <Link
      href={href}
      className="group relative flex min-h-60 flex-col overflow-hidden rounded-xl border border-border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary"
    >
      <span className={`absolute inset-x-0 top-0 h-1.5 ${group.category === "regiao" ? "bg-secondary" : "bg-info"}`} aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-primary group-hover:text-white ${group.category === "regiao" ? "bg-emerald-100 text-secondary" : "bg-sky-100 text-info"}`} aria-hidden="true">
          <GroupIcon regional={group.category === "regiao"} />
        </span>
        {group.isMember && (
          <span className="shrink-0 rounded-full bg-secondary/15 px-3 py-1 text-xs font-bold text-secondary">
            Membro
          </span>
        )}
      </div>
      <h3 className="mt-4 text-xl font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">{group.name}</h3>
      <p className="mt-2 line-clamp-2 text-base leading-relaxed text-muted">{group.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-foreground">
        <span className="rounded-md bg-surface-2 px-2.5 py-1.5">{members} membros</span>
        <span className="rounded-md bg-surface-2 px-2.5 py-1.5">{posts} publicações</span>
      </div>
      <span className="mt-auto pt-5 font-extrabold text-primary">Acessar grupo</span>
    </Link>
  );
}

function GroupIcon({ regional }: { regional: boolean }) {
  return regional ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 20c.4-4 2.2-6 5.5-6s5.1 2 5.5 6M13.5 15.2c1-.8 2.1-1.2 3.5-1.2 2.8 0 4.2 1.8 4.5 5" />
    </svg>
  );
}
