import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { Disclaimer } from "@/components/Disclaimer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = { title: "Entrar", description: "Crie sua conta ou entre na Voz da Fibro." };

export default async function EntrarPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const oauthError = error === "google_not_configured" ? "O acesso pelo Google aguarda a configuração das credenciais do projeto." : error?.startsWith("google_") ? "Não foi possível entrar com o Google. Tente novamente." : "";
  return <div className="bg-background">
    <PageHero eyebrow="Acesso seguro" title="Entre na Voz da Fibro" description="Crie sua conta para participar da comunidade, inscrever-se em rodas, responder pesquisas e acessar recursos personalizados." />
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 lg:py-13">
      <AuthForm initialError={oauthError} />
      <Disclaimer variant="compact" className="mt-8" />
    </div>
  </div>;
}
