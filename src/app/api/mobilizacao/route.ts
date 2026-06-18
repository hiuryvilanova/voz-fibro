import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

const ESTADOS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

export async function GET() {
  const responses = await prisma.surveyResponse.findMany({
    where: { consentGiven: true },
  });

  const byState: Record<string, number> = {};
  let totalDiagnosisYears = 0;
  let totalSus = 0;
  let totalWork = 0;
  let totalEmotional = 0;
  let totalTreatment = 0;
  const difficulties: Record<string, number> = {};

  for (const r of responses) {
    byState[r.state] = (byState[r.state] ?? 0) + 1;
    if (r.yearsSinceDiagnosis) totalDiagnosisYears += r.yearsSinceDiagnosis;
    if (r.susDifficulty) totalSus += r.susDifficulty;
    if (r.workImpact) totalWork += r.workImpact;
    if (r.emotionalImpact) totalEmotional += r.emotionalImpact;
    if (r.treatmentAccess) totalTreatment += r.treatmentAccess;
    if (r.mainDifficulties) {
      difficulties[r.mainDifficulties] =
        (difficulties[r.mainDifficulties] ?? 0) + 1;
    }
  }

  const n = responses.length || 1;

  const topDifficulties = Object.entries(difficulties)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([text, count]) => ({ text, count }));

  return jsonOk({
    totalResponses: responses.length,
    byState: ESTADOS.map((uf) => ({
      state: uf,
      count: byState[uf] ?? 0,
    })).filter((s) => s.count > 0),
    averages: {
      yearsSinceDiagnosis: (totalDiagnosisYears / n).toFixed(1),
      susDifficulty: (totalSus / n).toFixed(1),
      workImpact: (totalWork / n).toFixed(1),
      emotionalImpact: (totalEmotional / n).toFixed(1),
      treatmentAccess: (totalTreatment / n).toFixed(1),
    },
    topDifficulties,
    generatedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    if (!body.consentGiven) {
      return jsonError("É necessário consentir com o uso dos dados agregados.");
    }
    if (!body.state) {
      return jsonError("Informe seu estado.");
    }

    await prisma.surveyResponse.create({
      data: {
        userId: session?.id ?? null,
        consentGiven: true,
        state: body.state,
        yearsSinceDiagnosis: body.yearsSinceDiagnosis
          ? Number(body.yearsSinceDiagnosis)
          : null,
        susDifficulty: body.susDifficulty ? Number(body.susDifficulty) : null,
        workImpact: body.workImpact ? Number(body.workImpact) : null,
        emotionalImpact: body.emotionalImpact
          ? Number(body.emotionalImpact)
          : null,
        treatmentAccess: body.treatmentAccess
          ? Number(body.treatmentAccess)
          : null,
        mainDifficulties: body.mainDifficulties?.trim() || null,
      },
    });

    return jsonOk({ submitted: true });
  } catch {
    return jsonError("Erro ao enviar pesquisa.", 500);
  }
}
