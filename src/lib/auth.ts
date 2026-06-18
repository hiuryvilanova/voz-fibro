import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const COOKIE_NAME = "voz-fibro-session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  state: string | null;
  profileComplete: boolean;
}

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET não configurado");
  }
  return new TextEncoder().encode(secret);
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    state: user.state,
    profileComplete: user.profileComplete,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
      state: (payload.state as string | null) ?? null,
      profileComplete: payload.profileComplete !== false,
    };
  } catch {
    return null;
  }
}

export async function requireSession(requireCompleteProfile = true): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Não autenticado");
  }
  if (requireCompleteProfile && !session.profileComplete) {
    throw new Error("Cadastro incompleto");
  }
  return session;
}

export function isModerator(role: string) {
  return role === "moderator" || role === "admin";
}

export async function getUserFromDb(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

const BLOCKED_PATTERNS = [
  /tome\s+\d+/i,
  /compre\s+esse\s+rem[eé]dio/i,
  /cura\s+(garantida|em\s+\d+)/i,
  /automedica/i,
];

export function validatePostContent(content: string): {
  ok: boolean;
  reason?: string;
} {
  const trimmed = content.trim();
  if (trimmed.length < 3) {
    return { ok: false, reason: "Mensagem muito curta." };
  }
  if (trimmed.length > 2000) {
    return { ok: false, reason: "Mensagem muito longa (máx. 2000 caracteres)." };
  }
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        ok: false,
        reason:
          "Conteúdo não permitido: sem prescrição, promessa de cura ou automedicação.",
      };
    }
  }
  return { ok: true };
}
