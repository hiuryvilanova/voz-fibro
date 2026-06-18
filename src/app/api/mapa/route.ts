import { prisma } from "@/lib/prisma";
import { jsonOk } from "@/lib/api";

const TYPE_LABELS: Record<string, string> = {
  associacao: "Associação",
  sus: "SUS",
  clinica: "Clínica",
  grupo_apoio: "Grupo de apoio",
  academia: "Academia / exercício",
  farmacia: "Farmácia",
  evento: "Evento",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const type = searchParams.get("type");
  const city = searchParams.get("city");

  const locations = await prisma.supportLocation.findMany({
    where: {
      ...(state ? { state } : {}),
      ...(type ? { type } : {}),
      ...(city ? { city: { contains: city } } : {}),
    },
    orderBy: [{ state: "asc" }, { city: "asc" }, { name: "asc" }],
  });

  const states = await prisma.supportLocation.findMany({
    select: { state: true },
    distinct: ["state"],
    orderBy: { state: "asc" },
  });

  return jsonOk({
    locations: locations.map((l) => ({
      ...l,
      typeLabel: TYPE_LABELS[l.type] ?? l.type,
    })),
    states: states.map((s) => s.state),
    types: Object.entries(TYPE_LABELS).map(([value, label]) => ({
      value,
      label,
    })),
  });
}
