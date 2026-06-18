import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { PageHero } from "@/components/PageHero";
import { PilarCard } from "@/components/PilarCard";
import { ServiceIcon } from "@/components/ServiceIcon";

export const metadata: Metadata = { title: "Sobre o projeto", description: "Conheça os pilares e a governança da Voz da Fibro." };

export default function PilaresPage() {
  return (
    <div className="bg-background">
      <PageHero eyebrow="Compromisso público" title="Sobre a Voz da Fibro" description="Uma plataforma nacional que reúne informação, acolhimento, ferramentas de cuidado e participação social para pessoas com fibromialgia, familiares e redes parceiras." />
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-13">
        <Disclaimer />
        <section className="mt-12">
          <p className="text-sm font-extrabold uppercase tracking-wider text-primary">Nossa atuação</p>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground">Três pilares que trabalham juntos</h2>
          <div className="mt-7 grid gap-6 lg:grid-cols-3">
            <PilarCard titulo="Acolhimento" descricao="Reduzir o isolamento e criar pertencimento por meio de espaços seguros." itens={["Comunidade moderada", "Rodas com especialistas", "Apoio a familiares", "Escuta com respeito"]} cor="primary" />
            <PilarCard titulo="Conhecimento" descricao="Oferecer informação acessível e ferramentas práticas para o cuidado." itens={["Biblioteca revisada", "Diário de sintomas", "Orientação sobre direitos", "Mapa de serviços"]} cor="secondary" />
            <PilarCard titulo="Mobilização" descricao="Transformar vivências em evidências para fortalecer direitos e políticas públicas." itens={["Pesquisa com consentimento", "Retrato Fibro Brasil", "Dados agregados", "Participação social"]} cor="accent" />
          </div>
        </section>

        <section className="mt-14 grid overflow-hidden rounded-lg bg-[#18324a] text-white shadow-md lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <p className="text-sm font-extrabold uppercase tracking-wider text-sky-200">Governança e segurança</p>
            <h2 className="mt-3 text-3xl font-extrabold !text-white">Cuidado também significa responsabilidade</h2>
            <p className="mt-4 text-lg leading-relaxed text-sky-50">A plataforma combina curadoria, moderação, privacidade e participação de pacientes para evitar desinformação, automedicação e uso indevido de dados.</p>
          </div>
          <ul className="grid gap-px bg-white/15 sm:grid-cols-2">
            {["Revisão por especialistas", "Moderação com protocolo", "Proteção de dados desde o cadastro", "Consentimento claro e revogável"].map((item) => <li key={item} className="flex items-center gap-3 bg-[#21415d] p-6 text-lg font-semibold"><ServiceIcon name="check" className="h-5 w-5 shrink-0 text-sky-200" />{item}</li>)}
          </ul>
        </section>

        <section className="mt-12 rounded-lg border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <h2 className="text-3xl font-extrabold text-foreground">Conheça os serviços da plataforma</h2>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">Acesse conteúdos, registre sintomas, participe da comunidade e encontre redes de apoio em diferentes regiões.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/biblioteca" className="rounded-md bg-primary px-6 py-3 font-bold text-white">Explorar a biblioteca</Link>
            <Link href="/diario" className="rounded-md border border-primary bg-white px-6 py-3 font-bold text-primary">Conhecer o diário</Link>
            <Link href="/mapa" className="rounded-md border border-primary bg-white px-6 py-3 font-bold text-primary">Consultar o mapa</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
