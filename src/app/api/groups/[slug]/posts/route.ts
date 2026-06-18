import { prisma } from "@/lib/prisma";
import { requireSession, validatePostContent, isModerator } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const session = await requireSession();
    const { slug } = await params;
    const { content } = await request.json();

    const validation = validatePostContent(content ?? "");
    if (!validation.ok) return jsonError(validation.reason!);

    const group = await prisma.group.findUnique({ where: { slug } });
    if (!group) return jsonError("Grupo não encontrado.", 404);

    const membership = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: { userId: session.id, groupId: group.id },
      },
    });

    if (!membership) {
      return jsonError("Participe do grupo antes de publicar.", 403);
    }

    const post = await prisma.post.create({
      data: {
        content: content.trim(),
        userId: session.id,
        groupId: group.id,
        status: "approved",
      },
      include: { user: { select: { name: true } } },
    });

    return jsonOk({
      post: {
        id: post.id,
        content: post.content,
        createdAt: post.createdAt.toISOString(),
        author: post.user.name,
        authorId: session.id,
        canModerate: true,
      },
    });
  } catch (e) {
    if (e instanceof Error && e.message === "Não autenticado") {
      return jsonError("Faça login para publicar.", 401);
    }
    return jsonError("Erro ao publicar.", 500);
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const session = await requireSession().catch(() => null);
  const { slug } = await params;

  const group = await prisma.group.findUnique({ where: { slug } });
  if (!group) return jsonError("Grupo não encontrado.", 404);

  const statusFilter =
    session && isModerator(session.role)
      ? undefined
      : { status: "approved" as const };

  const posts = await prisma.post.findMany({
    where: { groupId: group.id, ...statusFilter },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: { select: { id: true, name: true } } },
  });

  return jsonOk({
    posts: posts.map((p) => ({
      id: p.id,
      content: p.content,
      status: p.status,
      createdAt: p.createdAt.toISOString(),
      author: p.user.name,
      authorId: p.user.id,
      canModerate:
        session &&
        (isModerator(session.role) || session.id === p.user.id),
    })),
  });
}
