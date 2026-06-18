import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

config({ path: ".env.local" });
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL não configurada");
const url = new URL(databaseUrl);
const adapter = new PrismaMariaDb({ host: url.hostname, port: Number(url.port || 3306), user: decodeURIComponent(url.username), password: decodeURIComponent(url.password), database: url.pathname.slice(1), connectionLimit: 2 });
const prisma = new PrismaClient({ adapter });

const ESTADOS = ["SP", "RJ", "PE", "DF", "MG", "RS", "BA", "PR", "SC", "GO"];

async function main() {
  const groups = [
    {
      slug: "mulheres-com-fibromialgia",
      name: "Mulheres com fibromialgia",
      description:
        "Espaço de acolhimento para mulheres que convivem com fibromialgia. Compartilhe experiências com respeito.",
      category: "tema",
      state: null,
      rules:
        "Sem automedicação. Sem promessa de cura. Respeito e escuta ativa.",
    },
    {
      slug: "fibromialgia-e-trabalho",
      name: "Fibromialgia e trabalho",
      description:
        "Troca de experiências sobre impacto profissional, adaptações e direitos no trabalho.",
      category: "tema",
      state: null,
      rules: "Não substitui orientação jurídica ou médica.",
    },
    {
      slug: "saude-mental",
      name: "Fibromialgia e saúde mental",
      description:
        "Ansiedade, depressão e impacto emocional da dor crônica. Em crise: CVV 188.",
      category: "tema",
      state: null,
      rules: "Sem julgamentos. Em crise emocional, procure CVV 188.",
    },
    {
      slug: "familiares",
      name: "Família de pessoas com fibromialgia",
      description:
        "Para familiares e cuidadores que querem compreender e apoiar melhor.",
      category: "tema",
      state: null,
      rules: "Escuta e empatia. Não minimize a dor alheia.",
    },
    {
      slug: "pernambuco",
      name: "Grupo de Pernambuco",
      description: "Conexão local para pessoas com fibromialgia em Pernambuco.",
      category: "regiao",
      state: "PE",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "sao-paulo",
      name: "Grupo de São Paulo",
      description: "Rede de apoio para pessoas com fibromialgia em São Paulo.",
      category: "regiao",
      state: "SP",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "distrito-federal",
      name: "Grupo do Distrito Federal",
      description: "Comunidade local para o DF e entorno.",
      category: "regiao",
      state: "DF",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
  ];

  for (const g of groups) {
    await prisma.group.upsert({
      where: { slug: g.slug },
      update: {},
      create: g,
    });
  }

  const now = new Date();
  const events = [
    {
      title: "Roda com reumatologista: entendendo o diagnóstico",
      description:
        "Tire dúvidas sobre critérios diagnósticos, exames e acompanhamento.",
      specialist: "Dra. Ana Reumatologia",
      specialty: "Reumatologia",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 19, 0),
      link: "https://meet.google.com/exemplo-reumatologia",
    },
    {
      title: "Roda com psicóloga: dor crônica e saúde mental",
      description:
        "Estratégias de manejo emocional e importância do apoio psicológico.",
      specialist: "Dra. Carla Psicologia",
      specialty: "Psicologia",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21, 19, 0),
      link: "https://meet.google.com/exemplo-psicologia",
    },
    {
      title: "Roda sobre direitos previdenciários",
      description:
        "Orientações gerais sobre benefícios e encaminhamentos jurídicos.",
      specialist: "Dr. Roberto Direito",
      specialty: "Direito previdenciário",
      date: new Date(now.getFullYear(), now.getMonth() + 1, 5, 19, 0),
      link: "https://meet.google.com/exemplo-direitos",
    },
    {
      title: "Roda de acolhimento entre pacientes",
      description:
        "Espaço mediado para compartilhar vivências com escuta e respeito.",
      specialist: "Mediadora Voz da Fibro",
      specialty: "Acolhimento",
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 18, 0),
      link: "https://meet.google.com/exemplo-acolhimento",
    },
  ];

  const existingEvents = await prisma.event.count();
  if (existingEvents === 0) {
    await prisma.event.createMany({ data: events });
  }

  const locations = [
    {
      name: "Associação Brasileira de Fibromialgia e Dor Crônica",
      type: "associacao",
      state: "SP",
      city: "São Paulo",
      website: "https://www.abfdc.org.br",
      description: "Articulação nacional de pacientes e campanhas.",
      verified: true,
    },
    {
      name: "Hospital das Clínicas — Ambulatório de Reumatologia",
      type: "sus",
      state: "SP",
      city: "São Paulo",
      address: "Av. Dr. Enéas de Carvalho Aguiar, 255",
      description: "Referência em reumatologia pelo SUS.",
      verified: true,
    },
    {
      name: "Centro de Referência em Fibromialgia — PE",
      type: "sus",
      state: "PE",
      city: "Recife",
      description: "Atendimento especializado na rede estadual.",
      verified: true,
    },
    {
      name: "Hospital Universitário de Brasília — Reumatologia",
      type: "sus",
      state: "DF",
      city: "Brasília",
      description: "Atendimento pelo SUS no Distrito Federal.",
      verified: true,
    },
    {
      name: "Projeto Movimento e Dor — Hidroginástica",
      type: "academia",
      state: "RJ",
      city: "Rio de Janeiro",
      description: "Exercício supervisionado para dor crônica.",
      verified: false,
    },
    {
      name: "Grupo de Apoio FibroVida",
      type: "grupo_apoio",
      state: "MG",
      city: "Belo Horizonte",
      phone: "(31) 3000-0000",
      description: "Encontros mensais presenciais e online.",
      verified: true,
    },
    {
      name: "Clínica Integrada de Dor Crônica",
      type: "clinica",
      state: "RS",
      city: "Porto Alegre",
      address: "Centro — atendimento multidisciplinar",
      description: "Fisioterapia, psicologia e nutrição.",
      verified: false,
    },
    {
      name: "Farmácia Popular — Unidade Centro",
      type: "farmacia",
      state: "BA",
      city: "Salvador",
      description: "Medicamentos com preços reduzidos pelo programa federal.",
      verified: true,
    },
  ];

  const existingLocations = await prisma.supportLocation.count();
  if (existingLocations === 0) {
    await prisma.supportLocation.createMany({ data: locations });
  }

  const benefits = [
    {
      title: "10% em consulta de fisioterapia",
      partner: "Rede FisioBem",
      description: "Desconto em primeira consulta para membros Voz da Fibro.",
      category: "fisioterapia",
      discount: "10%",
      code: "FIBRO10",
      link: "#",
    },
    {
      title: "Aula experimental de pilates",
      partner: "Studio Equilíbrio",
      description: "Uma aula gratuita com agendamento prévio.",
      category: "pilates",
      discount: "Aula grátis",
      code: "CRALITPILATES",
      link: "#",
    },
    {
      title: "Desconto em cesta de alimentos saudáveis",
      partner: "Mercado VidaLeve",
      description: "5% em compras acima de R$ 100.",
      category: "alimentacao",
      discount: "5%",
      code: "VIDAFIBRO",
      link: "#",
    },
    {
      title: "Sessão de psicologia com valor social",
      partner: "Instituto Mente em Rede",
      description: "Vagas limitadas por mês para membros.",
      category: "psicologia",
      discount: "Valor social",
      code: "MENTEREDE",
      link: "#",
    },
  ];

  const existingBenefits = await prisma.benefit.count();
  if (existingBenefits === 0) {
    await prisma.benefit.createMany({ data: benefits });
  }

  // Respostas de pesquisa fictícias para o painel
  const existingSurveys = await prisma.surveyResponse.count();
  if (existingSurveys === 0) {
    const samples = [];
    for (let i = 0; i < 40; i++) {
      samples.push({
        consentGiven: true,
        state: ESTADOS[i % ESTADOS.length],
        yearsSinceDiagnosis: (i % 15) + 1,
        susDifficulty: (i % 8) + 3,
        workImpact: (i % 9) + 2,
        emotionalImpact: (i % 10) + 1,
        treatmentAccess: (i % 8) + 2,
        mainDifficulties:
          i % 3 === 0
            ? "Demora no diagnóstico e falta de especialista"
            : i % 3 === 1
              ? "Dificuldade no trabalho e preconceito"
              : "Acesso limitado a fisioterapia e psicologia",
      });
    }
    await prisma.surveyResponse.createMany({ data: samples });
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
