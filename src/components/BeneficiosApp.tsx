"use client";

import { useEffect, useState } from "react";

interface Benefit {
  id: string;
  title: string;
  partner: string;
  description: string;
  categoryLabel: string;
  discount: string | null;
  code: string | null;
  link: string | null;
}

export function BeneficiosApp() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/beneficios")
      .then((r) => r.json())
      .then((d) => {
        setBenefits(d.benefits ?? []);
        setDisclaimer(d.disclaimer ?? "");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted">Carregando benefícios...</p>;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        {disclaimer}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {benefits.map((b) => (
          <li
            key={b.id}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary">
              {b.categoryLabel}
            </span>
            <h3 className="mt-2 font-semibold">{b.title}</h3>
            <p className="mt-1 text-sm text-muted">{b.partner}</p>
            <p className="mt-2 text-sm">{b.description}</p>
            {b.discount && (
              <p className="mt-2 text-sm font-medium text-primary">
                {b.discount}
              </p>
            )}
            {b.code && (
              <p className="mt-2 rounded-lg bg-surface-2 px-3 py-2 text-sm font-mono">
                Código: {b.code}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
