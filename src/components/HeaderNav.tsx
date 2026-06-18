"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { SessionUser } from "@/lib/auth";
import { UserAvatar } from "@/components/UserAvatar";
import { ServiceIcon } from "@/components/ServiceIcon";

interface HeaderNavProps {
  user: (SessionUser & { avatarUrl?: string | null }) | null;
}

export function HeaderNav({ user }: HeaderNavProps) {
  const router = useRouter();
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!confirmingLogout) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setConfirmingLogout(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [confirmingLogout]);

  async function logout() {
    setLeaving(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setConfirmingLogout(false);
      router.push("/");
      router.refresh();
    } finally {
      setLeaving(false);
    }
  }

  if (!user) {
    return <Link href="/entrar" className="rounded-md bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">Entrar</Link>;
  }

  return <>
    <div className="flex items-center gap-2 sm:gap-3">
      <Link href="/perfil" className="flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-bold text-foreground transition hover:bg-surface-2 hover:text-primary" aria-label={`Abrir perfil de ${user.name}`}>
        <UserAvatar name={user.name} src={user.avatarUrl} size="sm" />
        <span className="hidden sm:block">Olá, {user.name.split(" ")[0]}</span>
        <span className="sm:hidden">Perfil</span>
      </Link>
      {(user.role === "moderator" || user.role === "admin") && <Link href="/moderacao" className="text-sm font-bold text-accent">Moderação</Link>}
      <button type="button" onClick={() => setConfirmingLogout(true)} className="inline-flex min-h-10 items-center gap-2 rounded-md border border-red-600 bg-red-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:border-red-700 hover:bg-red-700 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-red-600"><ServiceIcon name="logout" className="h-4 w-4" /><span className="hidden sm:inline">Sair</span></button>
    </div>
    {confirmingLogout && createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-5 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !leaving) setConfirmingLogout(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="logout-title" aria-describedby="logout-description" className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl sm:p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-700"><ServiceIcon name="logout" className="h-6 w-6" /></span>
          <h2 id="logout-title" className="mt-4 text-2xl font-extrabold text-foreground">Deseja sair da sua conta?</h2>
          <p id="logout-description" className="mt-2 leading-relaxed text-muted">Você precisará entrar novamente para acessar seu perfil, diário e participação na comunidade.</p>
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setConfirmingLogout(false)} disabled={leaving} autoFocus className="min-h-11 rounded-md border border-border bg-white px-5 py-2.5 font-bold text-foreground hover:bg-surface-2 disabled:opacity-60">Continuar conectado</button>
            <button type="button" onClick={logout} disabled={leaving} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-red-600 px-5 py-2.5 font-bold text-white hover:bg-red-700 disabled:opacity-60"><ServiceIcon name="logout" className="h-5 w-5" />{leaving ? "Saindo..." : "Sim, sair da conta"}</button>
          </div>
        </section>
      </div>,
      document.body,
    )}
  </>;
}
