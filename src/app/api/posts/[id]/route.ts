import { prisma } from "@/lib/prisma";
import { requireSession, isModerator } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const session = await requireSession();
    if (!isModerator(session.role)) {
      return jsonError("Sem permissão.", 403);
    }

    const { id } = await params;
    const { status } = await request.json();

    if (!["approved", "rejected", "flagged"].includes(status)) {
      return jsonError("Status inválido.");
    }

    await prisma.post.update({ where: { id }, data: { status } });
    return jsonOk({ ok: true });
  } catch {
    return jsonError("Erro na moderação.", 500);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const session = await requireSession();
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!post) return jsonError("Publicação não encontrada.", 404);

    const canDelete =
      isModerator(session.role) || post.userId === session.id;

    if (!canDelete) return jsonError("Sem permissão.", 403);

    await prisma.post.delete({ where: { id } });
    return jsonOk({ ok: true });
  } catch {
    return jsonError("Erro ao remover.", 500);
  }
}
