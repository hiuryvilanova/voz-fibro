"use client";

import { useState } from "react";
import Link from "next/link";

const ESTADOS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

function EscalaField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <label htmlFor={name}>{label}</label>
        <span className="text-muted">{value}/10</span>
      </div>
      <input
        id={name}
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-primary"
      />
    </div>
  );
}

export function PesquisaMobilizacao() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    consentGiven: false,
    state: "",
    yearsSinceDiagnosis: 3,
    susDifficulty: 5,
    workImpact: 5,
    emotionalImpact: 5,
    treatmentAccess: 5,
    mainDifficulties: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consentGiven) {
      setError("É necessário consentir com o uso dos dados agregados.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await fetch("/api/mobilizacao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) setSubmitted(true);
    else setError(data.error ?? "Erro ao enviar.");
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 text-center">
        <p className="font-semibold text-secondary">
          Obrigada por participar!
        </p>
        <p className="mt-2 text-sm text-muted">
          Sua contribuição ajuda a construir o Retrato Fibro Brasil.
        </p>
        <Link
          href="/mobilizacao/relatorio"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          Ver relatório agregado →
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
      <label className="flex gap-3 text-sm leading-relaxed">
        <input
          type="checkbox"
          checked={form.consentGiven}
          onChange={(e) =>
            setForm({ ...form, consentGiven: e.target.checked })
          }
          className="mt-1 h-4 w-4 accent-primary"
          required
        />
        <span>
          Autorizo o uso dos meus dados de forma <strong>agregada e anônima</strong>{" "}
          para relatórios e mobilização social. Posso retirar o consentimento
          entrando em contato com a equipe Voz da Fibro.
        </span>
      </label>

      <div>
        <label htmlFor="state" className="text-sm font-medium">
          Estado
        </label>
        <select
          id="state"
          required
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm"
        >
          <option value="">Selecione</option>
          {ESTADOS.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="years" className="text-sm font-medium">
          Anos desde o diagnóstico (ou suspeita)
        </label>
        <input
          id="years"
          type="number"
          min={0}
          max={50}
          value={form.yearsSinceDiagnosis}
          onChange={(e) =>
            setForm({
              ...form,
              yearsSinceDiagnosis: Number(e.target.value),
            })
          }
          className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm"
        />
      </div>

      <EscalaField
        label="Dificuldade de acesso no SUS"
        name="sus"
        value={form.susDifficulty}
        onChange={(v) => setForm({ ...form, susDifficulty: v })}
      />
      <EscalaField
        label="Impacto no trabalho"
        name="work"
        value={form.workImpact}
        onChange={(v) => setForm({ ...form, workImpact: v })}
      />
      <EscalaField
        label="Impacto emocional"
        name="emotional"
        value={form.emotionalImpact}
        onChange={(v) => setForm({ ...form, emotionalImpact: v })}
      />
      <EscalaField
        label="Acesso a tratamento"
        name="treatment"
        value={form.treatmentAccess}
        onChange={(v) => setForm({ ...form, treatmentAccess: v })}
      />

      <div>
        <label htmlFor="difficulties" className="text-sm font-medium">
          Principal dificuldade (opcional)
        </label>
        <textarea
          id="difficulties"
          rows={3}
          value={form.mainDifficulties}
          onChange={(e) =>
            setForm({ ...form, mainDifficulties: e.target.value })
          }
          placeholder="Ex.: demora no diagnóstico, falta de especialista..."
          className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm resize-y"
        />
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar pesquisa"}
      </button>
    </form>
  );
}
