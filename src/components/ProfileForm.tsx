"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/UserAvatar";
import { DF_ADMIN_REGIONS, DF_STATE } from "@/lib/df-regions";

interface ProfileData {
  name: string;
  email: string;
  cpf: string;
  state: string;
  city: string;
  phone: string;
  profession: string;
  avatarUrl: string | null;
}

function digits(value: string) { return value.replace(/\D/g, ""); }

function maskPhone(value: string) {
  const number = digits(value).slice(0, 11);
  if (!number) return "";
  if (number.length < 3) return `(${number}`;
  if (number.length < 7) return `(${number.slice(0, 2)}) ${number.slice(2)}`;
  if (number.length <= 10) return `(${number.slice(0, 2)}) ${number.slice(2, 6)}-${number.slice(6)}`;
  return `(${number.slice(0, 2)}) ${number.slice(2, 7)}-${number.slice(7)}`;
}

export function ProfileForm({ initialData }: { initialData: ProfileData }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: initialData.name,
    state: initialData.state,
    city: initialData.city,
    phone: maskPhone(initialData.phone),
    profession: initialData.profession,
  });
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputClass = "mt-1.5 w-full rounded-md border border-border bg-white px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";
  const lockedClass = "mt-1.5 w-full cursor-not-allowed rounded-md border border-border bg-surface-2 px-4 py-3 text-base text-muted";

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  async function selectPhoto(file?: File) {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/") || file.size > 8 * 1024 * 1024) {
      setError("Escolha uma imagem de até 8 MB.");
      return;
    }
    try {
      const url = URL.createObjectURL(file);
      const image = new window.Image();
      image.src = url;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas indisponível");
      const scale = Math.max(256 / image.width, 256 / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (256 - width) / 2, (256 - height) / 2, width, height);
      URL.revokeObjectURL(url);
      setAvatarUrl(canvas.toDataURL("image/jpeg", 0.82));
      setMessage("Foto pronta. Salve as alterações para confirmar.");
    } catch {
      setError("Não foi possível preparar esta imagem. Escolha outra foto.");
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, state: DF_STATE, avatarUrl }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Não foi possível salvar as alterações.");
        return;
      }
      setMessage("Perfil atualizado com sucesso.");
      router.refresh();
    } catch {
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border border-border bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-7 flex flex-col gap-4 rounded-lg border border-border bg-surface-2 p-5 sm:flex-row sm:items-center">
        <UserAvatar name={form.name} src={avatarUrl} size="lg" />
        <div>
          <h2 className="text-xl font-bold text-foreground">Foto do perfil</h2>
          <p className="mt-1 text-sm text-muted">Use uma foto nítida. Ela será reduzida para deixar o site leve.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark">Escolher foto<input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => void selectPhoto(event.target.files?.[0])} /></label>
            {avatarUrl && <button type="button" onClick={() => { setAvatarUrl(null); setMessage("Foto removida. Salve as alterações para confirmar."); }} className="min-h-11 rounded-md border border-border bg-white px-4 py-2 text-sm font-bold text-muted hover:border-primary hover:text-primary">Remover foto</button>}
          </div>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2"><label htmlFor="profile-name" className="font-bold">Nome completo</label><input id="profile-name" required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} className={inputClass} /></div>
        <div><label htmlFor="profile-email" className="font-bold">E-mail</label><input id="profile-email" value={initialData.email} readOnly aria-readonly="true" className={lockedClass} /><p className="mt-1.5 text-sm text-muted">O e-mail da conta não pode ser alterado.</p></div>
        <div><label htmlFor="profile-cpf" className="font-bold">CPF</label><input id="profile-cpf" value={initialData.cpf} readOnly aria-readonly="true" className={lockedClass} /><p className="mt-1.5 text-sm text-muted">O CPF permanece protegido e não pode ser alterado.</p></div>
        <div><label htmlFor="profile-state" className="font-bold">Distrito Federal</label><input id="profile-state" readOnly value="Distrito Federal (DF)" className={lockedClass} /></div>
        <div><label htmlFor="profile-city" className="font-bold">Região administrativa</label><select id="profile-city" required value={form.city} onChange={(event) => { event.currentTarget.setCustomValidity(""); update("city", event.target.value); }} onInvalid={(event) => event.currentTarget.setCustomValidity("Selecione sua região administrativa para continuar.")} className={inputClass}><option value="">Selecione</option>{DF_ADMIN_REGIONS.map((ra) => <option key={ra} value={ra}>{ra}</option>)}</select></div>
        <div><label htmlFor="profile-phone" className="font-bold">Telefone com DDD</label><input id="profile-phone" required type="tel" inputMode="numeric" autoComplete="tel" maxLength={15} placeholder="(00) 00000-0000" value={form.phone} onChange={(event) => update("phone", maskPhone(event.target.value))} className={inputClass} /></div>
        <div><label htmlFor="profile-profession" className="font-bold">Profissão ou ocupação</label><input id="profile-profession" required autoComplete="organization-title" value={form.profession} onChange={(event) => update("profession", event.target.value)} className={inputClass} /></div>
      </div>

      {message && <p role="status" className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 font-semibold text-secondary">{message}</p>}
      {error && <p role="alert" className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-semibold text-accent">{error}</p>}
      <button type="submit" disabled={loading} className="mt-7 rounded-md bg-primary px-7 py-3.5 text-base font-bold text-white transition hover:bg-primary-dark disabled:opacity-60">{loading ? "Salvando..." : "Salvar alterações"}</button>
    </form>
  );
}
