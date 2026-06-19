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
  { id: "pp-hub", name: "Centro de referência em reumatologia", type: "sus", typeLabel: "Serviço público", state: "DF", city: "Plano Piloto", address: "Hospital Universitário de Brasília", phone: null, website: null, description: "Acompanhamento especializado e orientação para continuidade do cuidado pelo SUS.", verified: true },
  { id: "tag-ubs", name: "Rede de atenção básica — Taguatinga", type: "sus", typeLabel: "Serviço público", state: "DF", city: "Taguatinga", address: "Unidades de saúde da família", phone: null, website: null, description: "Primeiro contato com a rede pública e encaminhamento para especialistas.", verified: false },
  { id: "ceil-grupo", name: "Grupo de acolhimento Ceilândia", type: "grupo_apoio", typeLabel: "Grupo de apoio", state: "DF", city: "Ceilândia", address: "Encontros presenciais e online", phone: null, website: null, description: "Rodas de escuta para pessoas com fibromialgia e familiares.", verified: false },
  { id: "sam-assoc", name: "Associação de pacientes — Samambaia", type: "associacao", typeLabel: "Associação", state: "DF", city: "Samambaia", address: "Atuação comunitária local", phone: null, website: null, description: "Informação sobre direitos, campanhas e articulação comunitária.", verified: false },
  { id: "aguas-reab", name: "Núcleo de reabilitação e movimento", type: "reabilitacao", typeLabel: "Reabilitação", state: "DF", city: "Águas Claras", address: "Atendimento mediante encaminhamento", phone: null, website: null, description: "Atividades orientadas de fisioterapia, educação em saúde e autocuidado.", verified: false },
  { id: "gama-sus", name: "Ambulatório de atenção à dor persistente", type: "sus", typeLabel: "Serviço público", state: "DF", city: "Gama", address: "Rede de atenção especializada", phone: null, website: null, description: "Avaliação clínica e cuidado compartilhado com a atenção básica.", verified: false },
  { id: "sobr-grupo", name: "Rede de convivência Sobradinho", type: "grupo_apoio", typeLabel: "Grupo de apoio", state: "DF", city: "Sobradinho", address: "Encontros comunitários", phone: null, website: null, description: "Acolhimento, troca de experiências e atividades educativas.", verified: false },
  { id: "plan-assoc", name: "Movimento Planaltina pela saúde", type: "associacao", typeLabel: "Associação", state: "DF", city: "Planaltina", address: "Atuação local", phone: null, website: null, description: "Mobilização, educação em saúde e apoio à participação social.", verified: false },
  { id: "guara-reab", name: "Centro integrado de cuidado", type: "reabilitacao", typeLabel: "Reabilitação", state: "DF", city: "Guará", address: "Atendimento multiprofissional", phone: null, website: null, description: "Planos de cuidado com movimento adaptado e educação em dor.", verified: false },
  { id: "recanto-grupo", name: "Acolhimento Recanto das Emas", type: "grupo_apoio", typeLabel: "Grupo de apoio", state: "DF", city: "Recanto das Emas", address: "Encontros híbridos", phone: null, website: null, description: "Acolhimento para pacientes, cuidadores e familiares.", verified: false },
  { id: "lago-sus", name: "Programa de cuidado multidisciplinar", type: "sus", typeLabel: "Serviço público", state: "DF", city: "Lago Sul", address: "Rede de atenção especializada", phone: null, website: null, description: "Acompanhamento integrado em reumatologia, fisioterapia e psicologia.", verified: false },
  { id: "braz-assoc", name: "Rede de apoio Brazlândia", type: "associacao", typeLabel: "Associação", state: "DF", city: "Brazlândia", address: "Orientação presencial e online", phone: null, website: null, description: "Apoio sobre acesso à saúde, trabalho e proteção social.", verified: false },
];

export function MapaApp() {
  const [sourceLocations, setSourceLocations] = useState<Location[]>(demoLocations);
  const [region, setRegion] = useState("");
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

  const regions = useMemo(
    () => [...new Set(sourceLocations.map((location) => location.city))].sort((a, b) => a.localeCompare(b, "pt-BR")),
    [sourceLocations],
  );

  const locations = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    return sourceLocations.filter((location) => {
      const matchesRegion = !region || location.city === region;
      const matchesType = !type || location.type === type;
      const matchesQuery = !term || `${location.name} ${location.city}`.toLocaleLowerCase("pt-BR").includes(term);
      return matchesRegion && matchesType && matchesQuery;
    });
  }, [sourceLocations, region, type, query]);

  return (
    <div>
      <div className="grid gap-3 rounded-lg border border-border bg-white p-4 shadow-sm sm:grid-cols-3">
        <label className="text-sm font-semibold text-foreground">
          Buscar por serviço ou endereço
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Digite um serviço ou região" className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 font-normal" />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Região administrativa
          <select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 font-normal">
            <option value="">Todas as regiões</option>
            {regions.map((ra) => <option key={ra} value={ra}>{ra}</option>)}
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
          <p className="text-sm font-bold uppercase tracking-wider text-primary">Rede de apoio no DF</p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">{locations.length} pontos encontrados</h2>
        </div>
        {(region || type || query) && <button type="button" onClick={() => { setRegion(""); setType(""); setQuery(""); }} className="text-sm font-bold text-primary">Limpar filtros</button>}
      </div>

      {locations.length === 0 ? (
        <div className="mt-5 rounded-lg border border-border bg-white p-8 text-center">
          <h3 className="font-bold text-foreground">Nenhum resultado para esta busca</h3>
          <p className="mt-2 text-sm text-muted">Altere os filtros para consultar outros pontos de apoio em Brasília.</p>
        </div>
      ) : (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <li key={location.id} className="flex flex-col rounded-lg border border-border bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{location.typeLabel}</span>
                <span className="text-xs font-bold text-muted">DF</span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug text-foreground">{location.name}</h3>
              <p className="mt-1 text-sm font-semibold text-secondary">{location.city}</p>
              {location.description && <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{location.description}</p>}
              {location.address && <p className="mt-4 border-t border-border pt-4 text-xs text-muted">{location.address}</p>}
              {location.website && <a href={location.website} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex text-sm font-bold text-primary">Consultar serviço</a>}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-7 rounded-lg border border-sky-200 bg-sky-50 px-5 py-4 text-sm leading-relaxed text-muted">
        Os pontos apresentados apoiam a navegação pela rede de cuidado em Brasília. Confirme horários, critérios de acesso e disponibilidade diretamente com cada serviço.
      </p>
    </div>
  );
}
