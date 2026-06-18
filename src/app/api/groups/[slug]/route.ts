import { prisma } from "@/lib/prisma";
import { getSession, requireSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const session = await getSession();

  const group = await prisma.group.findUnique({
    where: { slug },
    include: {
      _count: { select: { members: true } },
      members: session
        ? { where: { userId: session.id }, select: { id: true } }
        : false,
      posts: {
        where: { status: "approved" },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
          user: { select: { id: true, name: true } },
        },
      },
    },
  });

  if (!group) return jsonError("Grupo não encontrado.", 404);

  return jsonOk({
    group: {
      id: group.id,
      slug: group.slug,
      name: group.name,
      description: group.description,
      category: group.category,
      state: group.state,
      rules: group.rules,
      memberCount: group._count.members,
      isMember: session ? group.members.length > 0 : false,
      posts: group.posts.map((p) => ({
        id: p.id,
        content: p.content,
        createdAt: p.createdAt.toISOString(),
        author: p.user.name,
        authorId: p.user.id,
        canModerate:
          session &&
          (session.role === "moderator" ||
            session.role === "admin" ||
            session.id === p.user.id),
      })),
    },
  });
}

export async function POST(_request: Request, { params }: RouteParams) {
  try {
    const session = await requireSession();
    const { slug } = await params;

    const group = await prisma.group.findUnique({ where: { slug } });
    if (!group) return jsonError("Grupo não encontrado.", 404);

    await prisma.groupMember.upsert({
      where: {
        userId_groupId: { userId: session.id, groupId: group.id },
      },
      update: {},
      create: { userId: session.id, groupId: group.id },
    });

    return jsonOk({ joined: true });
  } catch {
    return jsonError("Faça login para participar do grupo.", 401);
  }
}
