import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: RouteParams) {
  try {
    const session = await requireSession();
    const { id } = await params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: { _count: { select: { registrations: true } } },
    });

    if (!event) return jsonError("Evento não encontrado.", 404);

    if (event._count.registrations >= event.maxAttendees) {
      return jsonError("Evento lotado.", 409);
    }

    await prisma.eventRegistration.upsert({
      where: {
        userId_eventId: { userId: session.id, eventId: event.id },
      },
      update: {},
      create: { userId: session.id, eventId: event.id },
    });

    return jsonOk({ registered: true });
  } catch (e) {
    if (e instanceof Error && e.message === "Não autenticado") {
      return jsonError("Faça login para se inscrever.", 401);
    }
    return jsonError("Erro na inscrição.", 500);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const session = await requireSession();
    const { id } = await params;

    await prisma.eventRegistration.deleteMany({
      where: { userId: session.id, eventId: id },
    });

    return jsonOk({ ok: true });
  } catch {
    return jsonError("Erro ao cancelar inscrição.", 500);
  }
}
