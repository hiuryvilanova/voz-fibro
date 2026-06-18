import Link from "next/link";

interface PilarCardProps {
  titulo: string;
  descricao: string;
  itens: string[];
  cor: "primary" | "secondary" | "accent";
  href?: string;
}

const cores = {
  primary: "border-primary/20 bg-primary/5",
  secondary: "border-secondary/20 bg-secondary/5",
  accent: "border-accent/20 bg-accent/5",
};

const tituloCores = {
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
      className={`rounded-2xl border p-6 transition-shadow hover:shadow-md ${cores[cor]}`}
    >
      <h3 className={`text-lg font-semibold ${tituloCores[cor]}`}>{titulo}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{descricao}</p>
      <ul className="mt-4 space-y-2">
        {itens.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-foreground">
            <span className="text-primary" aria-hidden>
              •
            </span>
            {item}
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
