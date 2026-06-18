import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Crie sua conta ou entre na Voz da Fibro.",
};

export default function EntrarPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-bold text-center">Bem-vinda à Voz da Fibro</h1>
      <p className="mt-3 text-center text-muted">
        Crie sua conta para participar da comunidade, inscrever-se nas rodas e
        sincronizar seu diário na nuvem.
      </p>
      <div className="mt-8">
        <AuthForm />
      </div>
      <Disclaimer variant="compact" className="mt-8" />
    </div>
  );
}
