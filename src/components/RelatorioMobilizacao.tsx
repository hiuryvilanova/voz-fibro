"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Report {
  totalResponses: number;
  byState: { state: string; count: number }[];
  averages: {
    yearsSinceDiagnosis: string;
    susDifficulty: string;
    workImpact: string;
    emotionalImpact: string;
    treatmentAccess: string;
  };
  topDifficulties: { text: string; count: number }[];
  generatedAt: string;
}

export function RelatorioMobilizacao() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mobilizacao")
      .then((r) => r.json())
      .then(setReport)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted">Carregando relatório...</p>;
  if (!report) return <p className="text-accent">Erro ao carregar dados.</p>;

  const maxStateCount = Math.max(...report.byState.map((s) => s.count), 1);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-xl font-bold">Retrato Fibro Brasília</h2>
        <p className="mt-2 text-sm text-muted">
          Dados agregados e anônimos · {report.totalResponses} respostas ·
          Atualizado em{" "}
          {new Date(report.generatedAt).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            label: "Anos desde diagnóstico (média)",
            value: report.averages.yearsSinceDiagnosis,
          },
          {
            label: "Dificuldade no SUS (0-10)",
            value: report.averages.susDifficulty,
          },
          {
            label: "Impacto no trabalho (0-10)",
            value: report.averages.workImpact,
          },
          {
            label: "Impacto emocional (0-10)",
            value: report.averages.emotionalImpact,
          },
          {
            label: "Acesso a tratamento (0-10)",
            value: report.averages.treatmentAccess,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <p className="text-xs text-muted">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-lg font-semibold">Participantes por região administrativa</h3>
        <ul className="mt-4 space-y-2">
          {report.byState.map((s) => (
            <li key={s.state} className="flex items-center gap-3">
              <span className="w-8 text-sm font-medium">{s.state}</span>
              <div className="flex-1 h-6 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary/70"
                  style={{
                    width: `${(s.count / maxStateCount) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-muted w-8 text-right">
                {s.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {report.topDifficulties.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold">Principais dificuldades relatadas</h3>
          <ul className="mt-4 space-y-2">
            {report.topDifficulties.map((d) => (
              <li
                key={d.text}
                className="flex justify-between rounded-lg bg-surface-2 px-4 py-3 text-sm"
              >
                <span>{d.text}</span>
                <span className="font-medium text-muted">{d.count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
        Estes dados são agregados e não identificam indivíduos. Usados para
        campanhas, audiências públicas e propostas de políticas.
      </div>

      <Link
        href="/mobilizacao"
        className="inline-block text-sm font-semibold text-primary hover:underline"
      >
        Participar da pesquisa
      </Link>
    </div>
  );
}
