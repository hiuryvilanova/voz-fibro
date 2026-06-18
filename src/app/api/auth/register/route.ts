import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";
import { isStrongPassword, validateProfile } from "@/lib/profile-validation";
import { jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").toLowerCase().trim();
    const password = String(body.password ?? "");
    const profile = validateProfile(body);

    if (body.acceptTerms !== true) return jsonError("É necessário aceitar a Política de Privacidade.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return jsonError("Informe um e-mail válido.");
    if (profile.error || !profile.data) return jsonError(profile.error ?? "Dados inválidos.");
    if (!isStrongPassword(password)) return jsonError("A senha deve ter 10 caracteres, incluindo maiúscula, minúscula, número e símbolo.");
    if (password !== body.confirmPassword) return jsonError("As senhas não coincidem.");

    const [existingEmail, existingCpf] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { cpfHash: profile.data.cpfHash } }),
    ]);
    if (existingEmail) return jsonError("E-mail já cadastrado.", 409);
    if (existingCpf) return jsonError("CPF já cadastrado.", 409);

    const user = await prisma.user.create({
      data: {
        email,
        name: profile.data.name,
        password: await hashPassword(password),
        authProvider: "local",
        profileComplete: true,
        state: profile.data.state,
        city: profile.data.city,
        phone: profile.data.phone,
        profession: profile.data.profession,
        cpfHash: profile.data.cpfHash,
        cpfLast4: profile.data.cpfLast4,
      },
    });

    await createSession({ id: user.id, email: user.email, name: user.name, role: user.role, state: user.state, profileComplete: true });
    return jsonOk({ user: { id: user.id, email: user.email, name: user.name, role: user.role, state: user.state, profileComplete: true } });
  } catch (error) {
    console.error("register_error", error);
    const code = typeof error === "object" && error !== null && "code" in error ? String(error.code) : "";
    if (code === "P2002") return jsonError("Este e-mail ou CPF já está cadastrado.", 409);
    if (code.startsWith("P1") || code.startsWith("P2")) {
      return jsonError("Não foi possível acessar o cadastro agora. Tente novamente em alguns instantes.", 503);
    }
    return jsonError("O cadastro não pôde ser concluído. Atualize a página e tente novamente.", 500);
  }
}
