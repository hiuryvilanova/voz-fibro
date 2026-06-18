import Image from "next/image";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { HomeCarousel } from "@/components/HomeCarousel";
import { ServiceIcon, type ServiceIconName } from "@/components/ServiceIcon";

const quickAccess: Array<{ icon: ServiceIconName; title: string; description: string; href: string }> = [
  { icon: "book", title: "Informação e cuidado", description: "Conteúdos revisados sobre fibromialgia e qualidade de vida", href: "/biblioteca" },
  { icon: "clipboard", title: "Acompanhar sintomas", description: "Organize seu histórico para conversar com a equipe de saúde", href: "/diario" },
  { icon: "community", title: "Comunidade e acolhimento", description: "Participe de grupos moderados e redes de apoio", href: "/comunidade" },
  { icon: "conversation", title: "Rodas de conversa", description: "Encontros online com profissionais e comunidade", href: "/rodas" },
  { icon: "location", title: "Serviços perto de você", description: "Consulte pontos de apoio em diferentes regiões", href: "/mapa" },
  { icon: "rights", title: "Direitos e benefícios", description: "Orientações sobre trabalho, SUS e proteção social", href: "/biblioteca" },
  { icon: "participation", title: "Participação social", description: "Contribua com pesquisas e ações de mobilização", href: "/mobilizacao" },
  { icon: "institution", title: "Conheça a iniciativa", description: "Saiba como a plataforma organiza cuidado e governança", href: "/pilares" },
];

const highlights = [
  {
    image: "/images/portal/consulta.jpg",
    category: "Saúde",
    title: "Como se preparar para uma consulta sobre dor crônica",
    description: "Veja o que registrar e quais informações ajudam a tornar a conversa mais objetiva.",
    href: "/biblioteca",
  },
  {
    image: "/images/portal/acolhimento.jpg",
    category: "Comunidade",
    title: "Acolhimento também faz parte do cuidado",
    description: "Conheça os espaços moderados para trocar experiências com respeito e segurança.",
    href: "/comunidade",
  },
  {
    image: "/images/portal/bem-estar.jpg",
    category: "Direitos",
    title: "Onde buscar orientação e apoio perto de você",
    description: "Consulte associações, serviços públicos, eventos e iniciativas por região.",
    href: "/mapa",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeCarousel />

      <section aria-label="Canais de atendimento imediato" className="bg-[#18324a] text-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-6 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)] md:items-stretch lg:px-10">
          <div className="flex flex-col justify-center"><p className="text-sm font-extrabold uppercase tracking-wider text-sky-200">Utilidade pública</p><h2 className="mt-1 text-xl font-extrabold !text-white">Precisa de ajuda agora?</h2></div>
          <div className="flex min-h-24 flex-col justify-center rounded-md bg-white/10 px-4 py-3"><strong className="text-xl">188</strong><p className="text-sm text-sky-100">CVV, apoio emocional</p></div>
          <div className="flex min-h-24 flex-col justify-center rounded-md bg-white/10 px-4 py-3"><strong className="text-xl">192</strong><p className="text-sm text-sky-100">SAMU, emergência médica</p></div>
          <div className="flex min-h-24 flex-col justify-center rounded-md bg-white/10 px-4 py-3"><strong className="text-xl">136</strong><p className="text-sm text-sky-100">Disque Saúde, informações do SUS</p></div>
        </div>
      </section>

      <section aria-labelledby="acesso-rapido" className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Caminhos da plataforma</p>
            <h2 id="acesso-rapido" className="mt-2 text-3xl font-bold text-foreground">Como podemos ajudar?</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">Escolha uma opção para encontrar informação, acompanhamento ou apoio de forma simples.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickAccess.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group min-h-44 rounded-lg border border-border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-info transition-colors group-hover:bg-primary group-hover:text-white">
                  <ServiceIcon name={item.icon} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground group-hover:text-primary">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border section-green">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:px-10 lg:py-14">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wider text-primary">Alcance nacional</p>
            <h2 className="mt-2 text-3xl font-extrabold text-foreground">Uma plataforma pensada para diferentes realidades do Brasil</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">Informação e participação precisam chegar a capitais, cidades do interior e pessoas com diferentes níveis de acesso digital.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ value: "5", label: "regiões contempladas" }, { value: "27", label: "unidades federativas" }, { value: "24h", label: "acesso à informação" }, { value: "LGPD", label: "proteção desde o cadastro" }].map((item) => (
              <div key={item.label} className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm"><strong className="text-3xl font-extrabold text-secondary">{item.value}</strong><p className="mt-2 font-semibold text-muted">{item.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="destaques" className="section-neutral">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mb-9 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Informação em destaque</p>
            <h2 id="destaques" className="mt-2 text-3xl font-bold text-foreground">Conteúdos para viver com mais informação</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">Orientações práticas, notícias da comunidade e caminhos para exercer seus direitos.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={item.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{item.category}</p>
                  <h3 className="mt-2 text-xl font-bold leading-snug text-foreground">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.description}</p>
                  <Link href={item.href} className="mt-5 inline-flex items-center gap-2 font-bold text-primary hover:text-primary-dark">
                    Saiba mais
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">Sobre a fibromialgia</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Informação confiável muda a jornada de cuidado</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Dor, fadiga e alterações no sono podem afetar a rotina, o trabalho e as relações. Informação clara ajuda a reconhecer necessidades, conversar com profissionais e buscar apoio sem julgamento.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/biblioteca" className="rounded-md bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark">Entenda a fibromialgia</Link>
              <Link href="/pilares" className="rounded-md border border-primary px-5 py-3 font-bold text-primary transition hover:bg-primary/5">Sobre o projeto</Link>
            </div>
          </div>

          <aside className="rounded-lg border-l-4 border-secondary bg-secondary/8 p-7 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-wider text-secondary">Nosso compromisso</p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">Cuidado com governança</h3>
            <ul className="mt-6 space-y-4 text-foreground">
              {["Comunidade com moderação e regras claras", "Conteúdo revisado por especialistas", "Privacidade e consentimento no uso de dados", "Participação de pessoas com fibromialgia"].map((item) => (
                <li key={item} className="flex gap-3">
                  <ServiceIcon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-blue">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { number: "01", title: "Acolhimento", text: "Escuta, comunidade e espaços seguros para compartilhar experiências." },
              { number: "02", title: "Conhecimento", text: "Conteúdo acessível para apoiar decisões e conversas sobre cuidado." },
              { number: "03", title: "Mobilização", text: "Participação social, dados responsáveis e defesa de direitos." },
            ].map((pillar) => (
              <article key={pillar.title} className="border-t-4 border-primary bg-white p-7 shadow-sm">
                <span className="text-sm font-bold text-primary/70">{pillar.number}</span>
                <h3 className="mt-2 text-2xl font-bold text-foreground">{pillar.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
          <Disclaimer />
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
          <p className="text-sm font-extrabold uppercase tracking-wider text-primary">Agenda de participação</p>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground">Próximas ações</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">Acompanhe encontros, pesquisas e atividades que fortalecem a rede nacional de apoio.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { icon: "conversation" as ServiceIconName, title: "Rodas de conversa", text: "Encontros online sobre diagnóstico, saúde emocional, direitos e rede de apoio.", href: "/rodas", action: "Consultar agenda" },
              { icon: "participation" as ServiceIconName, title: "Pesquisa nacional", text: "Contribua para o Retrato Fibro Brasil e ajude a qualificar o debate público.", href: "/mobilizacao", action: "Participar da pesquisa" },
              { icon: "community" as ServiceIconName, title: "Comunidade moderada", text: "Grupos temáticos e regionais para acolhimento e troca de experiências.", href: "/comunidade", action: "Conhecer os grupos" },
            ].map((item) => <article key={item.title} className="rounded-lg border border-border bg-white p-6"><span className="flex h-12 w-12 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-info"><ServiceIcon name={item.icon} /></span><h3 className="mt-4 text-2xl font-extrabold text-foreground">{item.title}</h3><p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p><Link href={item.href} className="mt-6 inline-flex rounded-md bg-primary px-5 py-3 font-bold text-white">{item.action}</Link></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-200 section-green">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Faça parte da rede</p>
            <h2 className="mt-2 text-3xl font-bold text-foreground">Informação e acolhimento ficam mais fortes quando circulam</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">Participe das rodas, acompanhe conteúdos e ajude outras pessoas a encontrarem caminhos de cuidado e defesa de direitos.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/rodas" className="rounded-md bg-primary px-6 py-3 font-bold text-white transition hover:bg-primary-dark">Ver próximas rodas</Link>
            <Link href="/comunidade" className="rounded-md border border-primary bg-white px-6 py-3 font-bold text-primary transition hover:bg-primary/5">Entrar na comunidade</Link>
          </div>
        </div>
      </section>
    </>
  );
}
