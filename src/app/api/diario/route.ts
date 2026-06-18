import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  try {
    const session = await requireSession();
    const entries = await prisma.diaryEntry.findMany({
      where: { userId: session.id },
      orderBy: { date: "desc" },
    });
    return jsonOk({ entries });
  } catch {
    return jsonError("Faça login para sincronizar o diário.", 401);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireSession();
    const { entries } = await request.json();

    if (!Array.isArray(entries)) {
      return jsonError("Formato inválido.");
    }

    for (const e of entries) {
      await prisma.diaryEntry.upsert({
        where: {
          userId_date: { userId: session.id, date: e.date },
        },
        update: {
          dor: e.dor,
          sono: e.sono,
          fadiga: e.fadiga,
          humor: e.humor,
          medicamentos: e.medicamentos ?? "",
          atividadeFisica: e.atividadeFisica ?? "",
          crise: !!e.crise,
          gatilhos: e.gatilhos ?? "",
          alimentacao: e.alimentacao ?? "",
          observacoes: e.observacoes ?? "",
        },
        create: {
          userId: session.id,
          date: e.date,
          dor: e.dor,
          sono: e.sono,
          fadiga: e.fadiga,
          humor: e.humor,
          medicamentos: e.medicamentos ?? "",
          atividadeFisica: e.atividadeFisica ?? "",
          crise: !!e.crise,
          gatilhos: e.gatilhos ?? "",
          alimentacao: e.alimentacao ?? "",
          observacoes: e.observacoes ?? "",
        },
      });
    }

    return jsonOk({ synced: entries.length });
  } catch (e) {
    if (e instanceof Error && e.message === "Não autenticado") {
      return jsonError("Faça login para sincronizar.", 401);
    }
    return jsonError("Erro ao sincronizar.", 500);
  }
}
