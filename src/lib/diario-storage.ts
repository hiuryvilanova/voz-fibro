export interface EntradaDiario {
  id: string;
  data: string;
  dor: number;
  sono: number;
  fadiga: number;
  humor: number;
  medicamentos: string;
  atividadeFisica: string;
  crise: boolean;
  gatilhos: string;
  alimentacao: string;
  observacoes: string;
}

const STORAGE_KEY = "voz-da-fibro-diario";

export function getEntradas(): EntradaDiario[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EntradaDiario[];
  } catch {
    return [];
  }
}

export function salvarEntrada(entrada: EntradaDiario): void {
  const entradas = getEntradas();
  const index = entradas.findIndex((e) => e.id === entrada.id);
  if (index >= 0) {
    entradas[index] = entrada;
  } else {
    entradas.unshift(entrada);
  }
  entradas.sort((a, b) => b.data.localeCompare(a.data));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entradas));
}

export function removerEntrada(id: string): void {
  const entradas = getEntradas().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entradas));
}

export function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatarData(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function labelEscala(valor: number): string {
  if (valor <= 2) return "Leve";
  if (valor <= 5) return "Moderado";
  if (valor <= 7) return "Intenso";
  return "Muito intenso";
}

export function gerarRelatorioTexto(entradas: EntradaDiario[]): string {
  const linhas: string[] = [
    "RELATÓRIO DE SINTOMAS — Voz da Fibro",
    "Gerado em: " + new Date().toLocaleDateString("pt-BR"),
    "",
    "AVISO: Este relatório é uma ferramenta de apoio para consulta médica.",
    "Não substitui diagnóstico ou avaliação profissional.",
    "",
    `Total de registros: ${entradas.length}`,
    "",
  ];

  if (entradas.length > 0) {
    const media = (campo: keyof EntradaDiario) => {
      const nums = entradas.map((e) => e[campo] as number);
      return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
    };
    linhas.push("MÉDIAS DO PERÍODO:");
    linhas.push(`  Dor: ${media("dor")}/10`);
    linhas.push(`  Sono (qualidade): ${media("sono")}/10`);
    linhas.push(`  Fadiga: ${media("fadiga")}/10`);
    linhas.push(`  Humor: ${media("humor")}/10`);
    linhas.push(
      `  Dias com crise: ${entradas.filter((e) => e.crise).length}`,
    );
    linhas.push("");
  }

  linhas.push("REGISTROS DETALHADOS:");
  linhas.push("─".repeat(50));

  for (const e of entradas) {
    linhas.push("");
    linhas.push(`Data: ${formatarData(e.data)}`);
    linhas.push(`  Dor: ${e.dor}/10 | Sono: ${e.sono}/10 | Fadiga: ${e.fadiga}/10 | Humor: ${e.humor}/10`);
    if (e.crise) linhas.push("  ⚠ Dia de crise");
    if (e.medicamentos) linhas.push(`  Medicamentos: ${e.medicamentos}`);
    if (e.atividadeFisica) linhas.push(`  Atividade física: ${e.atividadeFisica}`);
    if (e.gatilhos) linhas.push(`  Gatilhos: ${e.gatilhos}`);
    if (e.alimentacao) linhas.push(`  Alimentação: ${e.alimentacao}`);
    if (e.observacoes) linhas.push(`  Observações: ${e.observacoes}`);
  }

  linhas.push("");
  linhas.push("─".repeat(50));
  linhas.push("Voz da Fibro — Comunidade, Cuidado e Direitos");
  linhas.push("vozdafibro.org.br (piloto)");

  return linhas.join("\n");
}
