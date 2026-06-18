import { jsonError, jsonOk } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return jsonOk({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("health_check_error", error);
    return jsonError("Serviço temporariamente indisponível.", 503);
  }
}
