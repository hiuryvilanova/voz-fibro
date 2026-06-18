import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-2">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-foreground">Voz da Fibro</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Ecossistema digital de acolhimento, conhecimento e mobilização
              para pessoas com fibromialgia no Brasil.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Ajuda imediata</p>
            <ul className="mt-2 space-y-1 text-sm text-muted">
              <li>
                <strong className="text-foreground">CVV:</strong> 188 (24h)
              </li>
              <li>
                <strong className="text-foreground">SAMU:</strong> 192
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted leading-relaxed max-w-xl">
            Voz da Fibro oferece suporte, educação e orientação. Não substitui
            consulta, diagnóstico ou tratamento médico.
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link href="/pilares" className="hover:text-primary">
              Sobre o projeto
            </Link>
            <span>Versão piloto — 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
