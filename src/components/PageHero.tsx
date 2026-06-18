import type { ReactNode } from "react";

interface PageHeroProps { eyebrow: string; title: string; description: string; actions?: ReactNode }

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-gradient-to-br from-white via-white to-[#eaf3f7]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-13 lg:px-10 lg:py-16">
        <p className="inline-flex rounded-full bg-primary px-4 py-1.5 text-sm font-extrabold uppercase tracking-[0.12em] text-white">{eyebrow}</p>
        <h1 className="mt-3 max-w-5xl text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
