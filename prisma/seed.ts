import { config } from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";
import { DF_ADMIN_REGIONS } from "../src/lib/df-regions";

config({ path: ".env.local" });
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL não configurada");
const url = new URL(databaseUrl);
const adapter = new PrismaMariaDb({ host: url.hostname, port: Number(url.port || 3306), user: decodeURIComponent(url.username), password: decodeURIComponent(url.password), database: url.pathname.slice(1), connectionLimit: 2 });
const prisma = new PrismaClient({ adapter });

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
      slug: "plano-piloto",
      name: "Grupo Plano Piloto",
      description: "Comunidade local para quem vive no coração de Brasília.",
      category: "regiao",
      state: "Plano Piloto",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "taguatinga",
      name: "Grupo Taguatinga",
      description: "Rede de apoio para pessoas com fibromialgia em Taguatinga.",
      category: "regiao",
      state: "Taguatinga",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "ceilandia",
      name: "Grupo Ceilândia",
      description: "Conexão comunitária para moradores de Ceilândia.",
      category: "regiao",
      state: "Ceilândia",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "samambaia",
      name: "Grupo Samambaia",
      description: "Espaço de acolhimento e informação em Samambaia.",
      category: "regiao",
      state: "Samambaia",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "aguas-claras",
      name: "Grupo Águas Claras",
      description: "Rede local para Águas Claras e entorno.",
      category: "regiao",
      state: "Águas Claras",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "gama",
      name: "Grupo Gama",
      description: "Comunidade para trocar experiências no Gama.",
      category: "regiao",
      state: "Gama",
      rules: "Indicações de serviços devem ser verificáveis.",
    },
    {
      slug: "sobradinho-planaltina",
      name: "Grupo Sobradinho e Planaltina",
      description: "Articulação comunitária nas regiões do extremo norte do DF.",
      category: "regiao",
      state: "Sobradinho",
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
      name: "Hospital Universitário de Brasília — Reumatologia",
      type: "sus",
      state: "DF",
      city: "Plano Piloto",
      description: "Atendimento especializado pelo SUS no Distrito Federal.",
      verified: true,
    },
    {
      name: "Rede de atenção básica — Taguatinga",
      type: "sus",
      state: "DF",
      city: "Taguatinga",
      description: "Primeiro contato com a rede pública e encaminhamento para especialistas.",
      verified: true,
    },
    {
      name: "Grupo de acolhimento Ceilândia",
      type: "grupo_apoio",
      state: "DF",
      city: "Ceilândia",
      description: "Encontros presenciais e online para pacientes e familiares.",
      verified: true,
    },
    {
      name: "Associação de pacientes — Samambaia",
      type: "associacao",
      state: "DF",
      city: "Samambaia",
      description: "Informação sobre direitos, campanhas e articulação comunitária.",
      verified: true,
    },
    {
      name: "Núcleo de reabilitação e movimento",
      type: "academia",
      state: "DF",
      city: "Águas Claras",
      description: "Exercício supervisionado para dor crônica.",
      verified: false,
    },
    {
      name: "Ambulatório de atenção à dor persistente",
      type: "sus",
      state: "DF",
      city: "Gama",
      description: "Avaliação clínica e cuidado compartilhado com a atenção básica.",
      verified: true,
    },
    {
      name: "Rede de convivência Sobradinho",
      type: "grupo_apoio",
      state: "DF",
      city: "Sobradinho",
      phone: "(61) 3000-0000",
      description: "Encontros mensais presenciais e online.",
      verified: true,
    },
    {
      name: "Clínica integrada de dor crônica",
      type: "clinica",
      state: "DF",
      city: "Lago Sul",
      address: "Atendimento multidisciplinar",
      description: "Fisioterapia, psicologia e nutrição.",
      verified: false,
    },
    {
      name: "Farmácia Popular — Planaltina",
      type: "farmacia",
      state: "DF",
      city: "Planaltina",
      description: "Medicamentos com preços reduzidos pelo programa federal.",
      verified: true,
    },
    {
      name: "Movimento Planaltina pela saúde",
      type: "associacao",
      state: "DF",
      city: "Planaltina",
      description: "Mobilização, educação em saúde e apoio à participação social.",
      verified: false,
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
        state: DF_ADMIN_REGIONS[i % DF_ADMIN_REGIONS.length],
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
