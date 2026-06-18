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

export function ComunidadeApp() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/groups")
      .then((r) => r.json())
      .then((d) => setGroups(d.groups ?? []))
      .finally(() => setLoading(false));
  }, []);

  const tematicos = groups.filter((g) => g.category === "tema");
  const regionais = groups.filter((g) => g.category === "regiao");

  if (loading) {
    return <p className="text-muted">Carregando grupos...</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-lg font-semibold">Grupos temáticos</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {tematicos.map((g) => (
            <GroupCard key={g.slug} group={g} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Grupos por região</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {regionais.map((g) => (
            <GroupCard key={g.slug} group={g} />
          ))}
        </div>
      </section>
    </div>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <Link
      href={`/comunidade/${group.slug}`}
      className="block rounded-2xl border border-border bg-surface p-5 transition-all hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground">{group.name}</h3>
        {group.isMember && (
          <span className="shrink-0 rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary">
            Membro
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted line-clamp-2">{group.description}</p>
      <p className="mt-3 text-xs text-muted">
        {group.memberCount} membros · {group.postCount} publicações
        {group.state && ` · ${group.state}`}
      </p>
    </Link>
  );
}
