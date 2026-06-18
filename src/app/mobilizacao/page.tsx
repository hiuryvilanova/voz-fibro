import type { Metadata } from "next";
import Link from "next/link";
import { PesquisaMobilizacao } from "@/components/PesquisaMobilizacao";
import { Disclaimer } from "@/components/Disclaimer";
import { PageHero } from "@/components/PageHero";
import { getSession } from "@/lib/auth";
import { ServiceIcon, type ServiceIconName } from "@/components/ServiceIcon";

export const metadata: Metadata = { title: "Mobilização social", description: "Participe da pesquisa e contribua para o Retrato Fibro Brasil." };

const impacts = [
  { icon: "participation" as ServiceIconName, title: "Produzir evidências", text: "Reunir dados agregados sobre diagnóstico, acesso ao cuidado e impacto na vida cotidiana." },
  { icon: "institution" as ServiceIconName, title: "Apoiar políticas públicas", text: "Transformar experiências em informações úteis para debates, campanhas e decisões públicas." },
  { icon: "megaphone" as ServiceIconName, title: "Ampliar a voz", text: "Dar visibilidade nacional às necessidades de pessoas com fibromialgia e suas famílias." },
];

export default async function MobilizacaoPage() {
  const session = await getSession();
  return (
    <div className="bg-background">
      <PageHero
        eyebrow="Participação cidadã"
        title="Mobilização social"
        description="Sua experiência pode ajudar a revelar os desafios da fibromialgia no Brasil e orientar ações de cuidado, garantia de direitos e participação social."
        actions={<Link href="/mobilizacao/relatorio" className="rounded-md border border-primary bg-white px-6 py-3 font-bold text-primary hover:bg-surface-2">Consultar o Retrato Fibro Brasil</Link>}
      />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-13">
        <div className="grid gap-5 md:grid-cols-3">
          {impacts.map((item) => (
            <article key={item.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-info"><ServiceIcon name={item.icon} /></span>
              <h2 className="mt-4 text-xl font-extrabold text-foreground">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{item.text}</p>
            </article>
          ))}
        </div>

        <Disclaimer className="mt-10" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section>
            <p className="text-sm font-extrabold uppercase tracking-wider text-primary">Levantamento nacional</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground">Envie sua contribuição</h2>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">O preenchimento leva poucos minutos. As respostas são analisadas de forma agregada para evitar a identificação individual.</p>

            <div className="mt-7">
              {session?.profileComplete ? <PesquisaMobilizacao /> : (
                <div className="rounded-lg border-2 border-primary/25 bg-white p-6 shadow-sm sm:p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-info"><ServiceIcon name="lock" /></span>
                  <h3 className="mt-4 text-2xl font-extrabold text-foreground">Entre para validar sua participação</h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">Uma conta validada protege a qualidade da pesquisa, evita respostas duplicadas e permite exercer seus direitos sobre os dados enviados.</p>
                  <Link href="/entrar" className="mt-6 inline-flex rounded-md bg-primary px-7 py-3.5 text-lg font-bold text-white hover:bg-primary-dark">Entrar ou criar conta</Link>
                </div>
              )}
            </div>
          </section>

          <aside className="h-fit rounded-lg bg-[#18324a] p-6 text-white shadow-md lg:sticky lg:top-24">
            <p className="text-sm font-extrabold uppercase tracking-wider text-sky-200">Transparência</p>
            <h2 className="mt-2 text-2xl font-extrabold !text-white">Como os dados são tratados</h2>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-sky-50">
              <li className="flex gap-3"><ServiceIcon name="check" className="mt-1 h-5 w-5 shrink-0 text-sky-200"/><span>Consentimento explícito antes do envio</span></li>
              <li className="flex gap-3"><ServiceIcon name="check" className="mt-1 h-5 w-5 shrink-0 text-sky-200"/><span>Resultados divulgados de forma agregada</span></li>
              <li className="flex gap-3"><ServiceIcon name="check" className="mt-1 h-5 w-5 shrink-0 text-sky-200"/><span>Proteção contra respostas duplicadas</span></li>
              <li className="flex gap-3"><ServiceIcon name="check" className="mt-1 h-5 w-5 shrink-0 text-sky-200"/><span>Direitos garantidos pela LGPD</span></li>
            </ul>
            <Link href="/privacidade" className="mt-7 inline-flex rounded-md bg-white px-5 py-3 font-bold text-primary">Conhecer a política de privacidade</Link>
          </aside>
        </div>
      </section>
    </div>
  );
}
