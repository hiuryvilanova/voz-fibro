import { prisma } from "@/lib/prisma";
import {
  createSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, state } = body;

    if (!email || !name || !password) {
      return jsonError("Nome, e-mail e senha são obrigatórios.");
    }
    if (password.length < 6) {
      return jsonError("Senha deve ter pelo menos 6 caracteres.");
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return jsonError("E-mail já cadastrado.", 409);
    }

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        password: await hashPassword(password),
        state: state || null,
      },
    });

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      state: user.state,
    });

    return jsonOk({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        state: user.state,
      },
    });
  } catch {
    return jsonError("Erro ao criar conta.", 500);
  }
}
