import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#eaf0f4]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white"><Image src="/images/voz.png" alt="" fill sizes="40px" className="object-cover" /></span>
              <div>
                <h2 className="text-lg font-bold text-foreground">Voz da Fibro</h2>
                <p className="text-xs text-muted">Comunidade, Cuidado e Direitos</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">Informação, acolhimento e participação social para pessoas com fibromialgia em todo o Brasil.</p>
          </div>

          <div>
            <h2 className="text-base font-bold text-foreground">Serviços</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><Link href="/biblioteca" className="hover:text-primary">Biblioteca</Link></li>
              <li><Link href="/diario" className="hover:text-primary">Diário de sintomas</Link></li>
              <li><Link href="/mapa" className="hover:text-primary">Mapa de apoio</Link></li>
              <li><Link href="/rodas" className="hover:text-primary">Rodas de conversa</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-foreground">Participação</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><Link href="/comunidade" className="hover:text-primary">Comunidade</Link></li>
              <li><Link href="/mobilizacao" className="hover:text-primary">Mobilização social</Link></li>
              <li><Link href="/pilares" className="hover:text-primary">Sobre o projeto</Link></li>
              <li><Link href="/entrar" className="hover:text-primary">Acessar minha conta</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-bold text-foreground">Ajuda imediata</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li><strong className="text-foreground">CVV 188</strong><br />Apoio emocional 24 horas</li>
              <li><strong className="text-foreground">SAMU 192</strong><br />Urgências médicas</li>
              <li><strong className="text-foreground">Disque Saúde 136</strong><br />Informações sobre o SUS</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-300 pt-7">
          <p className="max-w-4xl text-sm leading-relaxed text-muted"><strong className="text-foreground">Aviso:</strong> o conteúdo da plataforma é educativo e não substitui consulta, diagnóstico ou tratamento realizado por profissional de saúde.</p>
          <div className="mt-6 text-xs text-muted">
            <p>© 2026 Voz da Fibro. Uma iniciativa Cralit.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
