import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { jsonOk } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  const groups = await prisma.group.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { members: true, posts: true } },
      members: session
        ? { where: { userId: session.id }, select: { id: true } }
        : false,
    },
  });

  const result = groups.map((g) => ({
    id: g.id,
    slug: g.slug,
    name: g.name,
    description: g.description,
    category: g.category,
    state: g.state,
    memberCount: g._count.members,
    postCount: g._count.posts,
    isMember: session ? g.members.length > 0 : false,
  }));

  return jsonOk({ groups: result });
}
