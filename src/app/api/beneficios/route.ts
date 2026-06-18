import { prisma } from "@/lib/prisma";
import { jsonOk } from "@/lib/api";

const CATEGORY_LABELS: Record<string, string> = {
  fisioterapia: "Fisioterapia",
  pilates: "Pilates",
  alimentacao: "Alimentação",
  psicologia: "Psicologia",
  farmacia: "Farmácia",
  hidroginastica: "Hidroginástica",
};

export async function GET() {
  const benefits = await prisma.benefit.findMany({
    where: { active: true },
    orderBy: { title: "asc" },
  });

  return jsonOk({
    benefits: benefits.map((b) => ({
      ...b,
      categoryLabel: CATEGORY_LABELS[b.category] ?? b.category,
    })),
    disclaimer:
      "Benefícios informativos. Não constituem recomendação terapêutica. Decisões de saúde com seu profissional.",
  });
}
