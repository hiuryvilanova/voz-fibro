import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { CompleteProfileForm } from "@/components/CompleteProfileForm";

export default async function CompletarCadastroPage() {
  const session = await getSession();
  if (!session) redirect("/entrar");
  if (session.profileComplete) redirect("/comunidade");

  return <div className="mx-auto max-w-2xl px-5 py-10 sm:px-8 sm:py-13">
    <p className="text-sm font-bold uppercase tracking-wider text-primary">Última etapa</p>
    <h1 className="mt-2 text-3xl font-bold text-foreground">Complete seu cadastro</h1>
    <p className="mt-4 leading-relaxed text-muted">Precisamos dessas informações para validar sua conta, organizar serviços por região e manter um cadastro por pessoa.</p>
    <CompleteProfileForm name={session.name} />
  </div>;
}
