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
}

export function RodasApp() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data.events ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRegister(event: Event) {
    setMessage("");
    const method = event.isRegistered ? "DELETE" : "POST";
    const res = await fetch(`/api/events/${event.id}/register`, { method });
    const data = await res.json();
    if (res.ok) {
      load();
    } else {
      setMessage(data.error ?? "Erro na inscrição.");
    }
  }

  if (loading) return <p className="text-muted">Carregando agenda...</p>;

  return (
    <div className="space-y-6">
      {message && (
        <p className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-950">
          {message}{" "}
          {message.includes("login") && (
            <Link href="/entrar" className="underline font-medium">
              Entrar
            </Link>
          )}
        </p>
      )}

      {events.length === 0 ? (
        <p className="text-muted">Nenhuma roda agendada no momento.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {event.specialty}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{event.title}</h3>
                  <p className="mt-1 text-sm text-muted">{event.description}</p>
                </div>
              </div>

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted">Especialista</dt>
                  <dd className="font-medium">{event.specialist}</dd>
                </div>
                <div>
                  <dt className="text-muted">Data e hora</dt>
                  <dd className="font-medium">
                    {new Date(event.date).toLocaleString("pt-BR", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Duração</dt>
                  <dd>{event.durationMin} minutos</dd>
                </div>
                <div>
                  <dt className="text-muted">Vagas</dt>
                  <dd>
                    {event.registeredCount}/{event.maxAttendees} inscritos
                  </dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleRegister(event)}
                  disabled={!event.isRegistered && event.spotsLeft <= 0}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold ${
                    event.isRegistered
                      ? "border border-border text-muted hover:text-accent"
                      : "bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
                  }`}
                >
                  {event.isRegistered
                    ? "Cancelar inscrição"
                    : event.spotsLeft <= 0
                      ? "Lotado"
                      : "Inscrever-se"}
                </button>
                {event.isRegistered && event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Link da roda
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
