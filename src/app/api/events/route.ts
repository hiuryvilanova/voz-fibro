import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { jsonOk } from "@/lib/api";

export async function GET() {
  const session = await getSession();
  const now = new Date();

  const events = await prisma.event.findMany({
    where: { date: { gte: now } },
    orderBy: { date: "asc" },
    include: {
      _count: { select: { registrations: true } },
      registrations: session
        ? { where: { userId: session.id }, select: { id: true } }
        : false,
    },
  });

  return jsonOk({
    events: events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      specialist: e.specialist,
      specialty: e.specialty,
      date: e.date.toISOString(),
      durationMin: e.durationMin,
      link: e.link,
      maxAttendees: e.maxAttendees,
      registeredCount: e._count.registrations,
      isRegistered: session ? e.registrations.length > 0 : false,
      spotsLeft: e.maxAttendees - e._count.registrations,
    })),
  });
}
