"use client";

import { useEffect, useState } from "react";

interface Location {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  state: string;
  city: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  description: string | null;
  verified: boolean;
}

interface TypeOption {
  value: string;
  label: string;
}

export function MapaApp() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [types, setTypes] = useState<TypeOption[]>([]);
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (type) params.set("type", type);
    const res = await fetch(`/api/mapa?${params}`);
    const data = await res.json();
    setLocations(data.locations ?? []);
    setStates(data.states ?? []);
    setTypes(data.types ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [state, type]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="rounded-lg border border-border px-3 py-2 text-sm"
          aria-label="Filtrar por estado"
        >
          <option value="">Todos os estados</option>
          {states.map((uf) => (
            <option key={uf} value={uf}>
              {uf}
            </option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-border px-3 py-2 text-sm"
          aria-label="Filtrar por tipo"
        >
          <option value="">Todos os tipos</option>
          {types.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-muted">
        Locais informativos — não constituem indicação médica. Parcerias
        comerciais são identificadas quando aplicável.
      </p>

      {loading ? (
        <p className="text-muted">Carregando mapa...</p>
      ) : locations.length === 0 ? (
        <p className="text-muted">Nenhum local encontrado com esses filtros.</p>
      ) : (
        <ul className="space-y-4">
          {locations.map((loc) => (
            <li
              key={loc.id}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-semibold">{loc.name}</h3>
                <div className="flex gap-2">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {loc.typeLabel}
                  </span>
                  {loc.verified && (
                    <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary">
                      Verificado
                    </span>
                  )}
                </div>
              </div>
              <p className="mt-1 text-sm text-muted">
                {loc.city}, {loc.state}
              </p>
              {loc.address && (
                <p className="mt-2 text-sm">{loc.address}</p>
              )}
              {loc.description && (
                <p className="mt-2 text-sm text-muted">{loc.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                {loc.phone && <span>📞 {loc.phone}</span>}
                {loc.website && (
                  <a
                    href={loc.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Site
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
