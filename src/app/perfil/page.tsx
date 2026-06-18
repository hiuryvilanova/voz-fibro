import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { ProfileForm } from "@/components/ProfileForm";
import { getSession, getUserFromDb } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Meu perfil",
  description: "Consulte e atualize seus dados pessoais na Voz da Fibro.",
};

export default async function PerfilPage() {
  const session = await getSession();
  if (!session) redirect("/entrar");

  const user = await getUserFromDb(session.id);
  if (!user) redirect("/entrar");

  const last4 = user.cpfLast4 ?? "••••";
  const maskedCpf = last4.length === 4 ? `***.***.${last4.slice(0, 2)}-${last4.slice(2)}` : "CPF protegido";

  return (
    <div className="bg-background">
      <PageHero eyebrow="Área pessoal" title="Meu perfil" description="Mantenha seus dados atualizados para receber informações e encontrar serviços adequados à sua região." />
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:py-13">
        <ProfileForm initialData={{
          name: user.name,
          email: user.email,
          cpf: maskedCpf,
          state: user.state ?? "",
          city: user.city ?? "",
          phone: user.phone ?? "",
          profession: user.profession ?? "",
          avatarUrl: user.avatarUrl,
        }} />
      </div>
    </div>
  );
}
