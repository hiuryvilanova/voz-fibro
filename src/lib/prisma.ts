import path from "path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@/generated/prisma/client";

function resolveDatabaseUrl(): string {
  const raw = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
  if (!raw.startsWith("file:")) return raw;
  const filePath = raw.replace(/^file:/, "");
  if (path.isAbsolute(filePath)) return raw;
  const resolved = path.join(process.cwd(), filePath.replace(/^\.\//, ""));
  return `file:${resolved}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
  adapter: PrismaBetterSqlite3;
};

function createClient() {
  const adapter =
    globalForPrisma.adapter ??
    new PrismaBetterSqlite3({ url: resolveDatabaseUrl() });
  if (!globalForPrisma.adapter) {
    globalForPrisma.adapter = adapter;
  }
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
