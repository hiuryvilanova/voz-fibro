"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DF_ADMIN_REGIONS, DF_STATE } from "@/lib/df-regions";
function digits(value: string) { return value.replace(/\D/g, ""); }
function maskCpf(value: string) { return digits(value).slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2"); }
function maskPhone(value: string) {
  const number = digits(value).slice(0, 11);
  if (number.length === 0) return "";
  if (number.length < 3) return `(${number}`;
  if (number.length < 7) return `(${number.slice(0, 2)}) ${number.slice(2)}`;
  if (number.length <= 10) return `(${number.slice(0, 2)}) ${number.slice(2, 6)}-${number.slice(6)}`;
  return `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7)}`;
}

export function CompleteProfileForm({ name }: { name: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ name, state: DF_STATE, city: "", phone: "", profession: "", cpf: "", acceptTerms: false });
  const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const inputClass = "mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";
  async function submit(event: React.FormEvent) { event.preventDefault(); setLoading(true); setError(""); const response = await fetch("/api/auth/complete-profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const data = await response.json(); if (!response.ok) { setError(data.error ?? "Revise os dados informados."); setLoading(false); return; } router.push("/comunidade"); router.refresh(); }
  return <form onSubmit={submit} className="mt-8 space-y-5 rounded-lg border border-border bg-white p-5 shadow-sm sm:p-7">
    <div><label className="text-sm font-bold" htmlFor="complete-name">Nome completo</label><input id="complete-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm font-bold" htmlFor="complete-state">Distrito Federal</label><input id="complete-state" readOnly value="Distrito Federal (DF)" className={`${inputClass} cursor-not-allowed bg-surface-2 text-muted`} /></div><div><label className="text-sm font-bold" htmlFor="complete-city">Região administrativa</label><select id="complete-city" required value={form.city} onChange={(e) => { e.currentTarget.setCustomValidity(""); setForm({ ...form, city: e.target.value }); }} onInvalid={(e) => e.currentTarget.setCustomValidity("Selecione sua região administrativa para continuar.")} className={inputClass}><option value="">Selecione</option>{DF_ADMIN_REGIONS.map((ra) => <option key={ra} value={ra}>{ra}</option>)}</select></div></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm font-bold" htmlFor="complete-phone">Telefone com DDD</label><input id="complete-phone" required type="tel" inputMode="numeric" autoComplete="tel" maxLength={15} placeholder="(00) 00000-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })} className={inputClass} /></div><div><label className="text-sm font-bold" htmlFor="complete-cpf">CPF</label><input id="complete-cpf" required inputMode="numeric" maxLength={14} value={form.cpf} onChange={(e) => setForm({ ...form, cpf: maskCpf(e.target.value) })} className={inputClass} /></div></div>
    <div><label className="text-sm font-bold" htmlFor="complete-profession">Profissão ou ocupação</label><input id="complete-profession" required value={form.profession} onChange={(e) => setForm({ ...form, profession: e.target.value })} className={inputClass} /></div>
    <label className="flex items-start gap-3 rounded-md bg-surface-2 p-4 text-sm leading-relaxed"><input type="checkbox" required checked={form.acceptTerms} onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })} className="mt-1 h-4 w-4 accent-primary" /><span>Li e aceito a <a href="/privacidade" target="_blank" className="font-bold text-primary">Política de Privacidade</a>.</span></label>
    {error && <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-accent">{error}</p>}
    <button disabled={loading} className="w-full rounded-md bg-primary py-3 font-bold text-white disabled:opacity-60">{loading ? "Validando..." : "Concluir cadastro"}</button>
  </form>;
}
