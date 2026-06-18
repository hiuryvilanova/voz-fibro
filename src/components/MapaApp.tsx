"use client";

import { useEffect, useMemo, useState } from "react";

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

const typeOptions = [
  { value: "sus", label: "Serviço público" },
  { value: "associacao", label: "Associação" },
  { value: "grupo_apoio", label: "Grupo de apoio" },
  { value: "reabilitacao", label: "Reabilitação" },
];

const demoLocations: Location[] = [
  { id: "norte-am", name: "Núcleo de orientação em dor crônica", type: "sus", typeLabel: "Serviço público", state: "AM", city: "Manaus", address: "Rede de atenção especializada", phone: null, website: null, description: "Orientação multiprofissional e encaminhamento pela rede de saúde.", verified: false },
  { id: "norte-pa", name: "Rede amazônica de acolhimento", type: "grupo_apoio", typeLabel: "Grupo de apoio", state: "PA", city: "Belém", address: "Encontros presenciais e online", phone: null, website: null, description: "Rodas de escuta para pessoas com fibromialgia e familiares.", verified: false },
  { id: "nordeste-ba", name: "Centro integrado de cuidado e movimento", type: "reabilitacao", typeLabel: "Reabilitação", state: "BA", city: "Salvador", address: "Atendimento mediante encaminhamento", phone: null, website: null, description: "Atividades orientadas de fisioterapia, educação em saúde e autocuidado.", verified: false },
  { id: "nordeste-pe", name: "Rede pernambucana de apoio à fibromialgia", type: "associacao", typeLabel: "Associação", state: "PE", city: "Recife", address: "Atuação estadual", phone: null, website: null, description: "Informação sobre direitos, campanhas e articulação comunitária.", verified: false },
  { id: "nordeste-ce", name: "Ambulatório de atenção à dor persistente", type: "sus", typeLabel: "Serviço público", state: "CE", city: "Fortaleza", address: "Rede de atenção especializada", phone: null, website: null, description: "Avaliação clínica e cuidado compartilhado com a atenção básica.", verified: false },
  { id: "centro-df", name: "Centro de referência em reumatologia", type: "sus", typeLabel: "Serviço público", state: "DF", city: "Brasília", address: "Atendimento regulado pelo SUS", phone: null, website: null, description: "Acompanhamento especializado e orientação para continuidade do cuidado.", verified: false },
  { id: "centro-go", name: "Movimento Centro-Oeste pela saúde", type: "associacao", typeLabel: "Associação", state: "GO", city: "Goiânia", address: "Atuação regional", phone: null, website: null, description: "Mobilização, educação em saúde e apoio à participação social.", verified: false },
  { id: "sudeste-sp", name: "Programa de cuidado multidisciplinar", type: "sus", typeLabel: "Serviço público", state: "SP", city: "São Paulo", address: "Rede de atenção especializada", phone: null, website: null, description: "Acompanhamento integrado em reumatologia, fisioterapia e psicologia.", verified: false },
  { id: "sudeste-rj", name: "Rede carioca de convivência e apoio", type: "grupo_apoio", typeLabel: "Grupo de apoio", state: "RJ", city: "Rio de Janeiro", address: "Encontros comunitários", phone: null, website: null, description: "Acolhimento, troca de experiências e atividades educativas.", verified: false },
  { id: "sudeste-mg", name: "Núcleo mineiro de direitos e cuidado", type: "associacao", typeLabel: "Associação", state: "MG", city: "Belo Horizonte", address: "Orientação presencial e online", phone: null, website: null, description: "Apoio sobre acesso à saúde, trabalho e proteção social.", verified: false },
  { id: "sul-pr", name: "Centro de reabilitação e qualidade de vida", type: "reabilitacao", typeLabel: "Reabilitação", state: "PR", city: "Curitiba", address: "Atendimento multiprofissional", phone: null, website: null, description: "Planos de cuidado com movimento adaptado e educação em dor.", verified: false },
  { id: "sul-rs", name: "Rede gaúcha de apoio e informação", type: "grupo_apoio", typeLabel: "Grupo de apoio", state: "RS", city: "Porto Alegre", address: "Encontros híbridos", phone: null, website: null, description: "Acolhimento para pacientes, cuidadores e familiares.", verified: false },
];

export function MapaApp() {
  const [sourceLocations, setSourceLocations] = useState<Location[]>(demoLocations);
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/mapa")
      .then((response) => response.json())
      .then((data) => {
        if (active && data.locations?.length) setSourceLocations(data.locations);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  const states = useMemo(
    () => [...new Set(sourceLocations.map((location) => location.state))].sort(),
    [sourceLocations],
  );

  const locations = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    return sourceLocations.filter((location) => {
      const matchesState = !state || location.state === state;
      const matchesType = !type || location.type === type;
      const matchesQuery = !term || `${location.name} ${location.city} ${location.state}`.toLocaleLowerCase("pt-BR").includes(term);
      return matchesState && matchesType && matchesQuery;
    });
  }, [sourceLocations, state, type, query]);

  return (
    <div>
      <div className="grid gap-3 rounded-lg border border-border bg-white p-4 shadow-sm sm:grid-cols-3">
        <label className="text-sm font-semibold text-foreground">
          Buscar por cidade ou serviço
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Digite uma cidade" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 font-normal" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Estado
          <select value={state} onChange={(event) => setState(event.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 font-normal">
            <option value="">Todos os estados</option>
            {states.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-foreground">
          Tipo de apoio
          <select value={type} onChange={(event) => setType(event.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 font-normal">
            <option value="">Todos os serviços</option>
            {typeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Rede de apoio</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">{locations.length} pontos encontrados</h2>
        </div>
        {(state || type || query) && <button type="button" onClick={() => { setState(""); setType(""); setQuery(""); }} className="text-sm font-bold text-primary">Limpar filtros</button>}
      </div>

      {locations.length === 0 ? (
        <div className="mt-5 rounded-lg border border-border bg-white p-8 text-center">
          <h3 className="font-bold text-foreground">Nenhum resultado para esta busca</h3>
          <p className="mt-2 text-sm text-muted">Altere os filtros para consultar outros pontos de apoio.</p>
        </div>
      ) : (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <li key={location.id} className="flex flex-col rounded-lg border border-border bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{location.typeLabel}</span>
                <span className="text-xs font-bold text-muted">{location.state}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-foreground">{location.name}</h3>
              <p className="mt-1 text-sm font-semibold text-secondary">{location.city}, {location.state}</p>
              {location.description && <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{location.description}</p>}
              {location.address && <p className="mt-4 border-t border-border pt-4 text-xs text-muted">{location.address}</p>}
              {location.website && <a href={location.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-primary">Consultar serviço</a>}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-7 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4 text-sm leading-relaxed text-muted">
        Os pontos apresentados apoiam a navegação pela rede de cuidado. Confirme horários, critérios de acesso e disponibilidade diretamente com cada serviço.
      </p>
    </div>
  );
}
