"use client";

import { useEffect, useState } from "react";
import {
  type EntradaDiario,
  gerarId,
  gerarRelatorioTexto,
  getEntradas,
  formatarData,
  labelEscala,
  removerEntrada,
  salvarEntrada,
  substituirEntradas,
} from "@/lib/diario-storage";
import { Disclaimer } from "@/components/Disclaimer";

const hoje = () => new Date().toISOString().slice(0, 10);

function entradaVazia(): EntradaDiario {
  return {
    id: gerarId(),
    data: hoje(),
    dor: 5,
    sono: 5,
    fadiga: 5,
    humor: 5,
    medicamentos: "",
    atividadeFisica: "",
    crise: false,
    gatilhos: "",
    alimentacao: "",
    observacoes: "",
  };
}

function EscalaSlider({
  label,
  valor,
  onChange,
}: {
  label: string;
  valor: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm text-muted">
          {valor}/10 — {labelEscala(valor)}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-primary"
        aria-valuenow={valor}
        aria-valuemin={0}
        aria-valuemax={10}
      />
    </div>
  );
}

export function DiarioApp() {
  const [entradas, setEntradas] = useState<EntradaDiario[]>([]);
  const [form, setForm] = useState<EntradaDiario>(entradaVazia());
  const [modo, setModo] = useState<"novo" | "editar">("novo");
  const [mostrarRelatorio, setMostrarRelatorio] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    fetch("/api/diario")
      .then((response) => response.json())
      .then((data) => {
        const cloudEntries: EntradaDiario[] = (data.entries ?? []).map((entry: Record<string, unknown>) => ({ id: String(entry.id), data: String(entry.date), dor: Number(entry.dor), sono: Number(entry.sono), fadiga: Number(entry.fadiga), humor: Number(entry.humor), medicamentos: String(entry.medicamentos ?? ""), atividadeFisica: String(entry.atividadeFisica ?? ""), crise: Boolean(entry.crise), gatilhos: String(entry.gatilhos ?? ""), alimentacao: String(entry.alimentacao ?? ""), observacoes: String(entry.observacoes ?? "") }));
        if (cloudEntries.length > 0) {
          substituirEntradas(cloudEntries);
          setEntradas(cloudEntries);
          return;
        }
        const localEntries = getEntradas();
        setEntradas(localEntries);
        if (localEntries.length > 0) {
          void fetch("/api/diario", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entries: localEntries }) });
        }
      })
      .catch(() => setEntradas(getEntradas()));
  }, []);

  async function saveToAccount(entries: EntradaDiario[]) {
    const response = await fetch("/api/diario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entries }),
    });
    if (!response.ok) throw new Error("Não foi possível salvar o registro.");
  }

  function atualizarForm<K extends keyof EntradaDiario>(
    campo: K,
    valor: EntradaDiario[K],
  ) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setSaveMessage("Salvando...");
    salvarEntrada(form);
    const nextEntries = getEntradas();
    setEntradas(nextEntries);
    try {
      await saveToAccount(nextEntries);
      setForm(entradaVazia());
      setModo("novo");
      setSaveMessage("Registro salvo na sua conta.");
    } catch {
      setSaveMessage("Não foi possível salvar na sua conta. Tente novamente.");
    }
  }

  function handleEditar(entrada: EntradaDiario) {
    setForm(entrada);
    setModo("editar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleRemover(id: string) {
    if (confirm("Remover este registro?")) {
      const entry = entradas.find((item) => item.id === id);
      removerEntrada(id);
      setEntradas(getEntradas());
      if (entry) {
        await fetch("/api/diario", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ date: entry.data }) });
      }
      if (form.id === id) {
        setForm(entradaVazia());
        setModo("novo");
      }
    }
  }

  function handleExportar() {
    const texto = gerarRelatorioTexto(entradas);
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-voz-da-fibro-${hoje()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImprimir() {
    setMostrarRelatorio(true);
    setTimeout(() => window.print(), 100);
  }

  return (
    <div className="space-y-8">
      <Disclaimer variant="diario" />

      <form
        onSubmit={handleSalvar}
        className="rounded-2xl border border-border bg-surface p-6 space-y-5"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {modo === "novo" ? "Novo registro" : "Editar registro"}
          </h2>
          {modo === "editar" && (
            <button
              type="button"
              onClick={() => {
                setForm(entradaVazia());
                setModo("novo");
              }}
              className="text-sm text-primary hover:underline"
            >
              Cancelar edição
            </button>
          )}
        </div>

        <div>
          <label htmlFor="data" className="text-sm font-medium text-foreground">
            Data
          </label>
          <input
            id="data"
            type="date"
            required
            value={form.data}
            onChange={(e) => atualizarForm("data", e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <EscalaSlider
            label="Nível de dor"
            valor={form.dor}
            onChange={(v) => atualizarForm("dor", v)}
          />
          <EscalaSlider
            label="Qualidade do sono"
            valor={form.sono}
            onChange={(v) => atualizarForm("sono", v)}
          />
          <EscalaSlider
            label="Fadiga"
            valor={form.fadiga}
            onChange={(v) => atualizarForm("fadiga", v)}
          />
          <EscalaSlider
            label="Humor"
            valor={form.humor}
            onChange={(v) => atualizarForm("humor", v)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.crise}
            onChange={(e) => atualizarForm("crise", e.target.checked)}
            className="h-4 w-4 rounded accent-primary"
          />
          <span className="font-medium text-foreground">Dia de crise</span>
        </label>

        {(
          [
            ["medicamentos", "Medicamentos em uso", "Ex.: conforme prescrição médica"],
            ["atividadeFisica", "Atividade física", "Ex.: caminhada 20 min"],
            ["gatilhos", "Gatilhos percebidos", "Ex.: estresse, clima frio"],
            ["alimentacao", "Alimentação", "Observações sobre alimentação"],
            ["observacoes", "Observações gerais", "Outras anotações"],
          ] as const
        ).map(([campo, label, placeholder]) => (
          <div key={campo}>
            <label htmlFor={campo} className="text-sm font-medium text-foreground">
              {label}
            </label>
            <textarea
              id={campo}
              rows={2}
              value={form[campo]}
              onChange={(e) => atualizarForm(campo, e.target.value)}
              placeholder={placeholder}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm resize-y"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:w-auto"
        >
          {modo === "novo" ? "Salvar registro" : "Atualizar registro"}
        </button>
        {saveMessage && <p role="status" className="text-sm font-semibold text-muted">{saveMessage}</p>}
      </form>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            Seus registros ({entradas.length})
          </h2>
          {entradas.length > 0 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExportar}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-2"
              >
                Exportar .txt
              </button>
              <button
                type="button"
                onClick={handleImprimir}
                className="rounded-lg bg-secondary px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Imprimir relatório
              </button>
            </div>
          )}
        </div>

        {entradas.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Nenhum registro ainda. Comece registrando como você se sente hoje.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {entradas.map((entrada) => (
              <li
                key={entrada.id}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">
                      {formatarData(entrada.data)}
                      {entrada.crise && (
                        <span className="ml-2 rounded bg-accent/15 px-2 py-0.5 text-xs font-medium text-accent">
                          Crise
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Dor {entrada.dor} · Sono {entrada.sono} · Fadiga{" "}
                      {entrada.fadiga} · Humor {entrada.humor}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditar(entrada)}
                      className="text-sm text-primary hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemover(entrada.id)}
                      className="text-sm text-muted hover:text-accent"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {(mostrarRelatorio || entradas.length > 0) && (
        <div className="hidden print:block print-relatorio">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
            {gerarRelatorioTexto(entradas)}
          </pre>
        </div>
      )}

    </div>
  );
}
