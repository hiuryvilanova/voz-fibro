import { ServiceIcon } from "@/components/ServiceIcon";

type DisclaimerVariant = "default" | "compact" | "article" | "diario";

const messages: Record<DisclaimerVariant, string> = {
  default: "Este conteúdo é educativo e não substitui consulta, diagnóstico ou tratamento. Em crise emocional, ligue 188. Em emergência médica, ligue 192.",
  compact: "As atividades complementam, mas não substituem, o acompanhamento realizado por profissionais de saúde.",
  article: "Converse com sua equipe de saúde antes de iniciar ou alterar qualquer tratamento.",
  diario: "O diário organiza informações para a consulta e não realiza diagnóstico.",
};

interface DisclaimerProps { variant?: DisclaimerVariant; className?: string }

export function Disclaimer({ variant = "default", className = "" }: DisclaimerProps) {
  const compact = variant === "compact";
  return (
    <aside role="note" className={`flex items-start gap-4 rounded-lg border border-amber-300 bg-amber-50 px-5 py-5 leading-relaxed text-amber-950 shadow-sm ${compact ? "text-base" : "text-lg"} ${className}`}>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-amber-300 bg-white text-amber-700"><ServiceIcon name={variant === "default" ? "alert" : "info"} className="h-6 w-6" /></span>
      <p><strong className="text-foreground">Informação importante:</strong> {messages[variant]}</p>
    </aside>
  );
}
