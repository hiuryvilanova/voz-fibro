"use client";

import { useEffect, useState } from "react";
import { ServiceIcon } from "@/components/ServiceIcon";

type Preferences = { experience: boolean; analytics: boolean };

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({ experience: false, analytics: false });

  useEffect(() => {
    fetch("/api/cookies/consent")
      .then((response) => response.json())
      .then((data) => {
        if (!data.preferences) {
          setVisible(true);
        } else {
          setPreferences({
            experience: Boolean(data.preferences.experience),
            analytics: Boolean(data.preferences.analytics),
          });
        }
      })
      .catch(() => setVisible(true));

    function openManager() {
      setSettings(true);
      setVisible(true);
    }
    window.addEventListener("open-cookie-manager", openManager);
    return () => window.removeEventListener("open-cookie-manager", openManager);
  }, []);

  async function save(next: Preferences) {
    await fetch("/api/cookies/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setPreferences(next);
    setVisible(false);
    setSettings(false);
  }

  if (!visible) {
    return (
      <button type="button" onClick={() => { setSettings(true); setVisible(true); }} className="fixed bottom-4 left-4 z-40 rounded-full border border-border bg-white px-3 py-2 text-xs font-bold text-primary shadow-md hover:bg-surface-2">
        <span className="flex items-center gap-2"><ServiceIcon name="lock" className="h-4 w-4" />Cookies</span>
      </button>
    );
  }

  return (
    <section aria-label="Preferências de cookies" className="fixed inset-x-0 bottom-0 z-[70] border-t border-slate-700 bg-[#18324a] text-white shadow-2xl">
      <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="flex items-center gap-2 text-base font-bold !text-white"><ServiceIcon name="lock" className="h-5 w-5" />Sua privacidade importa</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-200">
              Usamos cookies necessários para o funcionamento da plataforma. Com sua autorização, também podemos lembrar preferências e medir o uso para melhorar os serviços.
            </p>
          </div>

          {settings ? (
            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
              <label className="rounded-md bg-white/10 p-3 text-sm"><input type="checkbox" checked disabled className="mr-2" />Necessários</label>
              <label className="rounded-md bg-white/10 p-3 text-sm"><input type="checkbox" checked={preferences.experience} onChange={(event) => setPreferences((value) => ({ ...value, experience: event.target.checked }))} className="mr-2" />Preferências</label>
              <label className="rounded-md bg-white/10 p-3 text-sm"><input type="checkbox" checked={preferences.analytics} onChange={(event) => setPreferences((value) => ({ ...value, analytics: event.target.checked }))} className="mr-2" />Medição de uso</label>
              <button type="button" onClick={() => save(preferences)} className="rounded-md bg-white px-5 py-2.5 text-sm font-bold text-primary sm:col-span-3">Salvar preferências</button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setSettings(true)} className="rounded-md border border-white/60 px-4 py-2.5 text-sm font-bold hover:bg-white/10">Gerenciar</button>
              <button type="button" onClick={() => save({ experience: false, analytics: false })} className="rounded-md border border-white/60 px-4 py-2.5 text-sm font-bold hover:bg-white/10">Usar apenas necessários</button>
              <button type="button" onClick={() => save({ experience: true, analytics: true })} className="rounded-md bg-white px-4 py-2.5 text-sm font-bold text-primary">Aceitar todos</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
