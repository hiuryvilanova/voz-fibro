import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Privacidade", description: "Como a Voz da Fibro protege e utiliza dados pessoais." };

export default function PrivacidadePage() {
  return <article className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-13">
    <p className="text-sm font-bold uppercase tracking-wider text-primary">Proteção de dados</p>
    <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Política de Privacidade</h1>
    <p className="mt-5 text-lg leading-relaxed text-muted">A Voz da Fibro adota princípios de finalidade, necessidade, transparência e segurança previstos na Lei Geral de Proteção de Dados, com foco no atendimento a moradores do Distrito Federal.</p>
    <div className="mt-10 space-y-8 leading-relaxed text-muted">
      <section><h2 className="text-xl font-bold text-foreground">Dados utilizados</h2><p className="mt-2">Nome, e-mail, região administrativa do DF, telefone, profissão e validação de CPF são usados para criar a conta, evitar duplicidades, organizar serviços locais e proteger a integridade das participações.</p></section>
      <section><h2 className="text-xl font-bold text-foreground">Proteção do CPF</h2><p className="mt-2">O número completo não é armazenado. Mantemos apenas um identificador criptográfico irreversível para detectar cadastros duplicados e os quatro últimos dígitos para referência segura.</p></section>
      <section><h2 className="text-xl font-bold text-foreground">Dados de saúde</h2><p className="mt-2">Registros do diário e respostas de pesquisa possuem finalidade específica. Resultados públicos devem ser apresentados de forma agregada, sem identificação individual.</p></section>
      <section><h2 className="text-xl font-bold text-foreground">Seus direitos</h2><p className="mt-2">Você poderá solicitar confirmação, acesso, correção, portabilidade ou exclusão dos seus dados, além de revogar consentimentos opcionais.</p></section>
      <section><h2 className="text-xl font-bold text-foreground">Cookies</h2><p className="mt-2">Cookies necessários mantêm sessão e segurança. Preferências e medição de uso dependem da escolha registrada no gerenciador de cookies.</p></section>
    </div>
  </article>;
}
