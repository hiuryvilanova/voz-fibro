export const DF_STATE = "DF";

/** Regiões administrativas do Distrito Federal (GDF). */
export const DF_ADMIN_REGIONS = [
  "Águas Claras",
  "Arniqueira",
  "Arapoanga",
  "Brazlândia",
  "Candangolândia",
  "Ceilândia",
  "Cruzeiro",
  "Fercal",
  "Gama",
  "Guará",
  "Itapoã",
  "Jardim Botânico",
  "Lago Norte",
  "Lago Sul",
  "Núcleo Bandeirante",
  "Paranoá",
  "Park Way",
  "Plano Piloto",
  "Planaltina",
  "Recanto das Emas",
  "Riacho Fundo",
  "Riacho Fundo II",
  "Samambaia",
  "Santa Maria",
  "São Sebastião",
  "SCIA/Estrutural",
  "SIA",
  "Sobradinho",
  "Sobradinho II",
  "Sol Nascente/Pôr do Sol",
  "Sudoeste/Octogonal",
  "Taguatinga",
  "Varjão",
  "Vicente Pires",
] as const;

export type DfAdminRegion = (typeof DF_ADMIN_REGIONS)[number];

/** Agrupamentos usados na página do mapa para orientar a busca local. */
export const DF_MACRO_AREAS = [
  "Plano Piloto e entorno",
  "Taguatinga e Ceilândia",
  "Samambaia e Recanto das Emas",
  "Gama, Santa Maria e São Sebastião",
  "Águas Claras e Vicente Pires",
  "Sobradinho, Planaltina e Brazlândia",
  "Guará, Núcleo Bandeirante e Cruzeiro",
  "Lago Sul, Lago Norte e Sudoeste",
] as const;

export function isDfAdminRegion(value: string): value is DfAdminRegion {
  return (DF_ADMIN_REGIONS as readonly string[]).includes(value);
}
