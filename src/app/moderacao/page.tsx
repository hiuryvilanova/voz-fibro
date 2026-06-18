import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession, isModerator } from "@/lib/auth";
import { ModeracaoApp } from "@/components/ModeracaoApp";

export const metadata: Metadata = {
  title: "Moderação",
  description: "Painel de moderação da comunidade.",
};

export default async function ModeracaoPage() {
  const session = await getSession();
  if (!session || !isModerator(session.role)) {
    redirect("/entrar");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold">Moderação</h1>
      <p className="mt-3 text-muted">
        Painel para equipe de moderação — revisar e gerenciar publicações.
      </p>
      <div className="mt-8">
        <ModeracaoApp />
      </div>
    </div>
  );
}
