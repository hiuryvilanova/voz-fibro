"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ServiceIcon } from "@/components/ServiceIcon";
import { DF_ADMIN_REGIONS, DF_STATE } from "@/lib/df-regions";

const emptyForm = { email: "", password: "", confirmPassword: "", name: "", state: DF_STATE, city: "", phone: "", profession: "", cpf: "", acceptTerms: false };

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
function validCpf(value: string) { const cpf = digits(value); if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; for (let digit = 9; digit < 11; digit++) { let sum = 0; for (let index = 0; index < digit; index++) sum += Number(cpf[index]) * (digit + 1 - index); if (((sum * 10) % 11) % 10 !== Number(cpf[digit])) return false; } return true; }

function GoogleLogo() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.09-1.92 3.27-4.76 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.29-2.65l-3.57-2.77c-.98.66-2.24 1.06-3.72 1.06-2.87 0-5.3-1.94-6.17-4.54H2.15v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.83 14.1A6.6 6.6 0 0 1 5.48 12c0-.73.13-1.43.35-2.1V7.06H2.15A11 11 0 0 0 1 12c0 1.77.42 3.44 1.15 4.94l3.68-2.84Z" />
      <path fill="#EA4335" d="M12 5.36c1.62 0 3.06.56 4.2 1.64l3.17-3.17A10.63 10.63 0 0 0 12 1a11 11 0 0 0-9.85 6.06L5.83 9.9C6.7 7.3 9.13 5.36 12 5.36Z" />
    </svg>
  );
}

function PasswordEye({ visible }: { visible: boolean }) {
  return visible ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.3A10.8 10.8 0 0 1 12 4c5.5 0 9 5 9 5a15.6 15.6 0 0 1-2.1 2.7M6.6 6.6C4.3 8 3 10 3 10s3.5 5 9 5c1 0 2-.2 2.9-.5" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function AuthForm({ initialError = "" }: { initialError?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [form, setForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const passwordChecks = [
    [form.password.length >= 10, "10 ou mais caracteres"],
    [/[A-Z]/.test(form.password) && /[a-z]/.test(form.password), "letras maiúsculas e minúsculas"],
    [/\d/.test(form.password), "um número"],
    [/[^A-Za-z0-9]/.test(form.password), "um símbolo"],
  ] as const;

  function update(field: keyof typeof form, value: string) { setForm((current) => ({ ...current, [field]: value })); }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    if (mode === "register" && (!validCpf(form.cpf) || passwordChecks.some(([ok]) => !ok) || form.password !== form.confirmPassword)) {
      setError(!validCpf(form.cpf) ? "Informe um CPF válido." : form.password !== form.confirmPassword ? "As senhas não coincidem." : "A senha ainda não atende a todos os requisitos.");
      setLoading(false); return;
    }
    try {
      const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(mode === "login" ? { email: form.email, password: form.password } : form) });
      const data = await response.json();
      if (!response.ok) { setError(data.error ?? "Não foi possível continuar."); return; }
      router.push(data.user?.profileComplete === false ? "/completar-cadastro" : "/comunidade");
      router.refresh();
    } catch { setError("Não foi possível conectar. Tente novamente."); } finally { setLoading(false); }
  }

  const inputClass = "mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <div className="mx-auto max-w-2xl">
      <a href="/api/auth/google" className="flex w-full items-center justify-center gap-3 rounded-md border border-border bg-white px-5 py-3 font-bold text-foreground shadow-sm transition-colors hover:border-primary/40 hover:bg-surface-2"><GoogleLogo />Continuar com Google</a>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-border" />ou use seu e-mail<span className="h-px flex-1 bg-border" /></div>
      <div className="flex rounded-lg border border-border bg-surface-2 p-1">
        <button type="button" onClick={() => { setMode("login"); setError(""); }} className={`flex-1 rounded-md py-2.5 text-sm font-bold ${mode === "login" ? "bg-white text-primary shadow-sm" : "text-muted"}`}>Entrar</button>
        <button type="button" onClick={() => { setMode("register"); setError(""); }} className={`flex-1 rounded-md py-2.5 text-sm font-bold ${mode === "register" ? "bg-white text-primary shadow-sm" : "text-muted"}`}>Criar conta</button>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5 rounded-lg border border-border bg-white p-5 shadow-sm sm:p-7">
        {mode === "register" && <>
          <div><label htmlFor="name" className="text-sm font-bold">Nome completo</label><input id="name" required autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} className={inputClass} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="state" className="text-sm font-bold">Distrito Federal</label><input id="state" readOnly value="Distrito Federal (DF)" className={`${inputClass} cursor-not-allowed bg-surface-2 text-muted`} /></div>
            <div><label htmlFor="city" className="text-sm font-bold">Região administrativa</label><select id="city" required value={form.city} onChange={(e) => { e.currentTarget.setCustomValidity(""); update("city", e.target.value); }} onInvalid={(e) => e.currentTarget.setCustomValidity("Selecione sua região administrativa para continuar.")} className={inputClass}><option value="">Selecione</option>{DF_ADMIN_REGIONS.map((ra) => <option key={ra} value={ra}>{ra}</option>)}</select></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="phone" className="text-sm font-bold">Telefone com DDD</label><input id="phone" required type="tel" inputMode="numeric" autoComplete="tel" maxLength={15} placeholder="(00) 00000-0000" value={form.phone} onChange={(e) => update("phone", maskPhone(e.target.value))} className={inputClass} /></div>
            <div><label htmlFor="cpf" className="text-sm font-bold">CPF</label><input id="cpf" required inputMode="numeric" maxLength={14} value={form.cpf} onChange={(e) => update("cpf", maskCpf(e.target.value))} aria-invalid={form.cpf.length === 14 && !validCpf(form.cpf)} className={inputClass} />{form.cpf.length === 14 && <p className={`mt-1 text-xs font-medium ${validCpf(form.cpf) ? "text-secondary" : "text-accent"}`}>{validCpf(form.cpf) ? "CPF válido" : "CPF inválido"}</p>}</div>
          </div>
          <div><label htmlFor="profession" className="text-sm font-bold">Profissão ou ocupação</label><input id="profession" required autoComplete="organization-title" value={form.profession} onChange={(e) => update("profession", e.target.value)} className={inputClass} /></div>
        </>}
        <div><label htmlFor="email" className="text-sm font-bold">E-mail</label><input id="email" type="email" required autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /></div>
        <div><label htmlFor="password" className="text-sm font-bold">Senha</label><div className="relative"><input id="password" type={showPassword ? "text" : "password"} required minLength={mode === "register" ? 10 : 1} autoComplete={mode === "login" ? "current-password" : "new-password"} value={form.password} onChange={(e) => update("password", e.target.value)} className={`${inputClass} pr-12`} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-2 top-[calc(50%+3px)] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-muted transition hover:bg-surface-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary" aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"} aria-pressed={showPassword}><PasswordEye visible={showPassword} /></button></div></div>
        {mode === "register" && <>
          <ul className="grid gap-1.5 text-xs sm:grid-cols-2">{passwordChecks.map(([ok, text]) => <li key={text} className={`flex items-center gap-1.5 ${ok ? "text-secondary" : "text-muted"}`}><span className={`flex h-4 w-4 items-center justify-center rounded-full border ${ok ? "border-secondary bg-emerald-50" : "border-border"}`}>{ok && <ServiceIcon name="check" className="h-3 w-3" />}</span>{text}</li>)}</ul>
          <div><label htmlFor="confirmPassword" className="text-sm font-bold">Confirmar senha</label><div className="relative"><input id="confirmPassword" type={showConfirmation ? "text" : "password"} required autoComplete="new-password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} className={`${inputClass} pr-12`} /><button type="button" onClick={() => setShowConfirmation((visible) => !visible)} className="absolute right-2 top-[calc(50%+3px)] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-muted transition hover:bg-surface-2 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary" aria-label={showConfirmation ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"} aria-pressed={showConfirmation}><PasswordEye visible={showConfirmation} /></button></div></div>
          <label className="flex items-start gap-3 rounded-md bg-surface-2 p-4 text-sm leading-relaxed"><input type="checkbox" required checked={form.acceptTerms} onChange={(e) => setForm((current) => ({ ...current, acceptTerms: e.target.checked }))} className="mt-1 h-4 w-4 accent-primary" /><span>Li e aceito a <a href="/privacidade" target="_blank" className="font-bold text-primary">Política de Privacidade</a> e autorizo o tratamento dos dados para criação e segurança da conta.</span></label>
        </>}
        {error && <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-accent" role="alert">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-md bg-primary py-3 font-bold text-white hover:bg-primary-dark disabled:opacity-60">{loading ? "Validando..." : mode === "login" ? "Entrar" : "Validar e criar conta"}</button>
      </form>
    </div>
  );
}
