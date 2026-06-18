type DisclaimerVariant = "default" | "compact" | "article" | "diario";

const messages: Record<DisclaimerVariant, string> = {
  default:
    "Voz da Fibro oferece suporte, educação e orientação. Não substitui consulta, diagnóstico ou tratamento médico. Em crise emocional: CVV 188. Emergência médica: SAMU 192.",
  compact:
    "Não substitui atendimento médico.",
  article:
    "Conteúdo revisado para fins educativos. Converse com seu médico antes de mudar qualquer tratamento.",
  diario:
    "Seus registros são pessoais. O relatório é ferramenta de apoio à consulta — não é diagnóstico.",
};

interface DisclaimerProps {
  variant?: DisclaimerVariant;
  className?: string;
}

export function Disclaimer({
  variant = "default",
  className = "",
}: DisclaimerProps) {
  return (
    <aside
      role="note"
      className={`rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 leading-relaxed ${className}`}
    >
      <span className="mr-1.5 font-semibold" aria-hidden>
        ⚠
      </span>
      {messages[variant]}
    </aside>
  );
}
