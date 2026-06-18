"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  description: string;
  specialist: string;
  specialty: string;
  date: string;
  durationMin: number;
  link: string | null;
  registeredCount: number;
  maxAttendees: number;
  isRegistered: boolean;
  spotsLeft: number;
  demo?: boolean;
}

const demoEvents: Event[] = [
  { id: "demo-acolhimento", title: "Acolhimento para quem recebeu o diagnóstico", description: "Uma conversa segura sobre dúvidas, mudanças na rotina e construção de uma rede de apoio.", specialist: "Marina Lopes", specialty: "Acolhimento", date: "2026-07-02T19:00:00-03:00", durationMin: 60, link: null, registeredCount: 22, maxAttendees: 35, isRegistered: false, spotsLeft: 13, demo: true },
  { id: "demo-reumatologia", title: "Fibromialgia sem mistério", description: "Diagnóstico, sintomas e acompanhamento explicados em linguagem simples e acolhedora.", specialist: "Dra. Helena Martins", specialty: "Reumatologia", date: "2026-07-09T19:30:00-03:00", durationMin: 75, link: null, registeredCount: 41, maxAttendees: 60, isRegistered: false, spotsLeft: 19, demo: true },
  { id: "demo-psicologia", title: "Dor crônica e saúde emocional", description: "Estratégias possíveis para lidar com sobrecarga, culpa, ansiedade e incompreensão.", specialist: "Paula Nascimento", specialty: "Psicologia", date: "2026-07-16T19:00:00-03:00", durationMin: 60, link: null, registeredCount: 28, maxAttendees: 40, isRegistered: false, spotsLeft: 12, demo: true },
  { id: "demo-direitos", title: "Direitos no trabalho e acesso a benefícios", description: "Orientações gerais sobre documentos, adaptações e caminhos para buscar apoio especializado.", specialist: "Ricardo Alves", specialty: "Direito previdenciário", date: "2026-07-23T19:30:00-03:00", durationMin: 75, link: null, registeredCount: 33, maxAttendees: 50, isRegistered: false, spotsLeft: 17, demo: true },
  { id: "demo-fisioterapia", title: "Movimento possível em dias difíceis", description: "Cuidados com o corpo, adaptação de atividades e construção gradual de uma rotina de movimento.", specialist: "Camila Freire", specialty: "Fisioterapia", date: "2026-07-30T18:30:00-03:00", durationMin: 60, link: null, registeredCount: 19, maxAttendees: 35, isRegistered: false, spotsLeft: 16, demo: true },
  { id: "demo-familia", title: "Como familiares podem oferecer apoio", description: "Um encontro aberto para melhorar o diálogo, reduzir julgamentos e dividir responsabilidades.", specialist: "Equipe Voz da Fibro", specialty: "Família e rede de apoio", date: "2026-08-06T19:00:00-03:00", durationMin: 60, link: null, registeredCount: 24, maxAttendees: 45, isRegistered: false, spotsLeft: 21, demo: true },
];

export function RodasApp({ authenticated = false }: { authenticated?: boolean }) {
  const [events, setEvents] = useState<Event[]>(demoEvents);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => {
        if (active && data.events?.length) setEvents(data.events);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  async function toggleRegister(event: Event) {
    setMessage("");

    if (event.demo) {
      if (!authenticated) {
        setMessage("Entre na sua conta para validar a inscrição nesta roda.");
        return;
      }
      setMessage(`Interesse registrado em “${event.title}”.`);
      return;
    }

    const method = event.isRegistered ? "DELETE" : "POST";
    const response = await fetch(`/api/events/${event.id}/register`, { method });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Não foi possível concluir a inscrição.");
      return;
    }

    const refreshed = await fetch("/api/events").then((res) => res.json());
    if (refreshed.events?.length) setEvents(refreshed.events);
  }

  return (
    <div>
      <div className="mb-7 flex flex-col justify-between gap-3 border-b border-border pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Próximos encontros</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">Agenda de rodas online</h2>
        </div>
        <p className="text-sm text-muted">{loading ? "Atualizando agenda" : `${events.length} encontros disponíveis`}</p>
      </div>

      {message && (
        <p role="status" className="mb-6 rounded-lg border border-secondary/30 bg-secondary/10 px-5 py-4 text-sm font-medium text-foreground">
          {message}{" "}
          {(message.includes("login") || message.includes("conta")) && <Link href="/entrar" className="font-bold text-primary">Entrar ou criar conta</Link>}
        </p>
      )}

      <ul className="grid gap-5 md:grid-cols-2">
        {events.map((event) => (
          <li key={event.id} className="flex flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition hover:border-primary/40 hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{event.specialty}</span>
              <span className="text-xs font-semibold text-secondary">{event.spotsLeft} vagas</span>
            </div>
            <h3 className="mt-4 text-xl font-bold leading-snug text-foreground">{event.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{event.description}</p>
            <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4 text-sm">
              <div>
                <dt className="text-xs text-muted">Data e horário</dt>
                <dd className="mt-1 font-semibold text-foreground">
                  {new Date(event.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long" })}, {new Date(event.date).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Duração</dt>
                <dd className="mt-1 font-semibold text-foreground">{event.durationMin} minutos</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-muted">Condução</dt>
                <dd className="mt-1 font-semibold text-foreground">{event.specialist}</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-xs text-muted">{event.registeredCount} pessoas inscritas</span>
              <button
                type="button"
                onClick={() => toggleRegister(event)}
                disabled={!event.isRegistered && event.spotsLeft <= 0}
                className={`rounded-md px-4 py-2.5 text-sm font-bold transition ${event.isRegistered ? "border border-border text-muted hover:border-accent/40 hover:text-accent" : "bg-primary text-white hover:bg-primary-dark disabled:opacity-50"}`}
              >
                {!authenticated ? "Entrar para participar" : event.isRegistered ? "Cancelar inscrição" : event.spotsLeft <= 0 ? "Lotado" : "Quero participar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
