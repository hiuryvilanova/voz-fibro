import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return jsonError("E-mail e senha são obrigatórios.");
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.password || !(await verifyPassword(password, user.password))) {
      return jsonError("E-mail ou senha incorretos.", 401);
    }

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      state: user.state,
      profileComplete: user.profileComplete,
    });

    return jsonOk({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        state: user.state,
        profileComplete: user.profileComplete,
      },
    });
  } catch {
    return jsonError("Erro ao entrar.", 500);
  }
}
