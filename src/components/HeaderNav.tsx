"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { SessionUser } from "@/lib/auth";

interface HeaderNavProps {
  user: SessionUser | null;
}

const links = [
  { href: "/biblioteca", label: "Biblioteca" },
  { href: "/comunidade", label: "Comunidade" },
  { href: "/rodas", label: "Rodas" },
  { href: "/diario", label: "Diário" },
  { href: "/mapa", label: "Mapa" },
  { href: "/mobilizacao", label: "Mobilização" },
];

export function HeaderNav({ user }: HeaderNavProps) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <nav aria-label="Navegação principal" className="hidden lg:block">
        <ul className="flex items-center gap-0.5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-muted transition-colors hover:bg-primary/8 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {user ? (
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted sm:block">
            {user.name.split(" ")[0]}
          </span>
          {(user.role === "moderator" || user.role === "admin") && (
            <Link
              href="/moderacao"
              className="rounded-lg bg-accent/10 px-2 py-1.5 text-xs font-medium text-accent"
            >
              Moderação
            </Link>
          )}
          <button
            type="button"
            onClick={logout}
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted hover:text-foreground"
          >
            Sair
          </button>
        </div>
      ) : (
        <Link
          href="/entrar"
          className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Entrar
        </Link>
      )}
    </div>
  );
}

export function MobileNav() {
  return (
    <nav
      aria-label="Navegação mobile"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-sm lg:hidden"
    >
      <ul className="flex justify-around px-1 py-2">
        {[
          { href: "/", label: "Início", icon: "⌂" },
          { href: "/comunidade", label: "Comunidade", icon: "◉" },
          { href: "/diario", label: "Diário", icon: "▤" },
          { href: "/mapa", label: "Mapa", icon: "◎" },
          { href: "/entrar", label: "Conta", icon: "○" },
        ].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium text-muted"
            >
              <span aria-hidden className="text-base">
                {item.icon}
              </span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
