import Link from "next/link";
import { ServiceIcon } from "@/components/ServiceIcon";

interface PilarCardProps {
  titulo: string;
  descricao: string;
  itens: string[];
  cor: "primary" | "secondary" | "accent";
  href?: string;
}

const coresBorda = {
  primary: "border-primary/30 bg-primary/8 hover:border-primary/60",
  secondary: "border-secondary/30 bg-secondary/8 hover:border-secondary/60",
  accent: "border-accent/30 bg-accent/8 hover:border-accent/60",
};

const titulosClasses = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
};

export function PilarCard({
  titulo,
  descricao,
  itens,
  cor,
  href,
}: PilarCardProps) {
  const content = (
    <article
      className={`rounded-lg border-2 p-6 transition-all hover:shadow-md ${coresBorda[cor]}`}
    >
      <h3 className={`text-2xl font-bold mb-4 ${titulosClasses[cor]}`}>{titulo}</h3>
      <p className="text-lg text-muted leading-relaxed mb-6">{descricao}</p>
      <ul className="space-y-3">
        {itens.map((item) => (
          <li key={item} className="flex gap-3 text-base text-foreground">
            <span className="shrink-0" style={{ color: `var(--${cor})` }}><ServiceIcon name="check" className="mt-0.5 h-5 w-5" /></span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
