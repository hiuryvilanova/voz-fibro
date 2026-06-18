import { createSession, requireSession } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import { prisma } from "@/lib/prisma";
import { validateEditableProfile } from "@/lib/profile-validation";

export async function PATCH(request: Request) {
  try {
    const session = await requireSession();
    const body = await request.json();
    const profile = validateEditableProfile(body);
    if (profile.error || !profile.data) return jsonError(profile.error ?? "Dados inválidos.");
    const avatarUrl = String(body.avatarUrl ?? "").trim() || null;
    const validGoogleImage = avatarUrl?.startsWith("https://lh3.googleusercontent.com/");
    const validUploadedImage = avatarUrl?.startsWith("data:image/jpeg;base64,") && avatarUrl.length <= 350_000;
    if (avatarUrl && !validGoogleImage && !validUploadedImage) return jsonError("A foto de perfil é inválida ou muito grande.");

    const user = await prisma.user.update({
      where: { id: session.id },
      data: { ...profile.data, avatarUrl },
    });

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      state: user.state,
      profileComplete: user.profileComplete,
    });

    return jsonOk({ user: { name: user.name, state: user.state, city: user.city, phone: user.phone, profession: user.profession, avatarUrl: user.avatarUrl } });
  } catch (error) {
    console.error("profile_update_error", error);
    return jsonError("Não foi possível atualizar o perfil. Entre novamente e tente outra vez.", 401);
  }
}
