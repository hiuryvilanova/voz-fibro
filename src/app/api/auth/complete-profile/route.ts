import { prisma } from "@/lib/prisma";
import { createSession, requireSession } from "@/lib/auth";
import { validateProfile } from "@/lib/profile-validation";
import { jsonError, jsonOk } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const session = await requireSession(false);
    const body = await request.json();
    if (body.acceptTerms !== true) return jsonError("É necessário aceitar a Política de Privacidade.");
    const profile = validateProfile(body);
    if (profile.error || !profile.data) return jsonError(profile.error ?? "Dados inválidos.");

    const duplicate = await prisma.user.findFirst({ where: { cpfHash: profile.data.cpfHash, NOT: { id: session.id } } });
    if (duplicate) return jsonError("CPF já cadastrado.", 409);

    const user = await prisma.user.update({
      where: { id: session.id },
      data: { name: profile.data.name, state: profile.data.state, city: profile.data.city, phone: profile.data.phone, profession: profile.data.profession, cpfHash: profile.data.cpfHash, cpfLast4: profile.data.cpfLast4, profileComplete: true },
    });
    await createSession({ id: user.id, email: user.email, name: user.name, role: user.role, state: user.state, profileComplete: true });
    return jsonOk({ ok: true });
  } catch {
    return jsonError("Faça login novamente para completar o cadastro.", 401);
  }
}
