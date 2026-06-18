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

  if (loading) return <div className="rounded-lg border border-border bg-white p-8 text-lg font-semibold text-muted">Consultando benefícios disponíveis...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-amber-300 bg-amber-50 px-5 py-4 text-base leading-relaxed text-amber-950">
        {disclaimer}
      </div>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b) => (
          <li
            key={b.id}
            className="rounded-lg border border-border bg-white p-6 shadow-sm"
          >
            <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary">
              {b.categoryLabel}
            </span>
            <h3 className="mt-3 text-xl font-extrabold">{b.title}</h3>
            <p className="mt-1 text-base font-semibold text-muted">{b.partner}</p>
            <p className="mt-3 text-base leading-relaxed">{b.description}</p>
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
