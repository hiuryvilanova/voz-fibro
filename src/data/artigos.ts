export type ArtigoCategoria =
  | "fundamentos"
  | "sintomas"
  | "tratamento"
  | "vida-cotidiana"
  | "direitos"
  | "seguranca";

export interface Artigo {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: ArtigoCategoria;
  tempoLeitura: number;
  revisadoPor: string;
  atualizadoEm: string;
  conteudo: string[];
}

export const CATEGORIAS: Record<
  ArtigoCategoria,
  { label: string; descricao: string }
> = {
  fundamentos: {
    label: "Fundamentos",
    descricao: "O que é fibromialgia e como entender a condição",
  },
  sintomas: {
    label: "Sintomas",
    descricao: "Dor, fadiga, sono e outros sintomas comuns",
  },
  tratamento: {
    label: "Tratamento",
    descricao: "Abordagens farmacológicas e não farmacológicas",
  },
  "vida-cotidiana": {
    label: "Vida cotidiana",
    descricao: "Trabalho, família, alimentação e rotina",
  },
  direitos: {
    label: "Direitos",
    descricao: "Benefícios, SUS e legislação",
  },
  seguranca: {
    label: "Segurança",
    descricao: "Automedicação, golpes e informação confiável",
  },
};

export const artigos: Artigo[] = [
  {
    slug: "o-que-e-fibromialgia",
    titulo: "O que é fibromialgia?",
    resumo:
      "Entenda a condição, sua prevalência no Brasil e por que ela ainda é tão invisibilizada.",
    categoria: "fundamentos",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "A fibromialgia é uma síndrome caracterizada por dor musculoesquelética generalizada, associada frequentemente a fadiga, distúrbios do sono, alterações de memória e atenção, ansiedade e depressão.",
      "Segundo o Ministério da Saúde, citando a Sociedade Brasileira de Reumatologia, cerca de 3% da população brasileira tem fibromialgia, com predominância em mulheres.",
      "A fibromialgia não é 'frescura', 'preguiça' nem 'coisa da cabeça'. É uma condição reconhecida pela medicina que afeta a qualidade de vida de milhões de brasileiras e brasileiros.",
      "O diagnóstico é clínico, feito por profissional de saúde qualificado — geralmente reumatologista — após avaliação dos sintomas e exclusão de outras condições.",
      "Este conteúdo tem finalidade educativa. Se você suspeita ter fibromialgia, procure um profissional de saúde para avaliação adequada.",
    ],
  },
  {
    slug: "sintomas-mais-comuns",
    titulo: "Quais são os sintomas mais comuns?",
    resumo:
      "Dor generalizada, fadiga, sono ruim, ansiedade e outros sinais que muitas pessoas relatam.",
    categoria: "sintomas",
    tempoLeitura: 6,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Os sintomas variam de pessoa para pessoa e podem mudar ao longo do tempo. Os mais frequentemente relatados incluem:",
      "**Dor generalizada** — dores pelo corpo, muitas vezes descritas como queimação, peso ou pontadas, que podem piorar com o estresse ou esforço excessivo.",
      "**Fadiga** — cansaço intenso que não melhora com repouso, frequentemente descrito como 'cansaço de acordar cansada'.",
      "**Distúrbios do sono** — dificuldade para adormecer, sono não reparador, despertares frequentes.",
      "**Alterações cognitivas** — dificuldade de concentração e memória, às vezes chamada de 'fibro fog' (névoa mental).",
      "**Ansiedade e depressão** — comuns e compreensíveis diante da dor crônica e do isolamento.",
      "Registrar seus sintomas em um diário pode ajudar você e seu médico a identificar padrões. A plataforma oferece essa ferramenta no módulo Diário.",
    ],
  },
  {
    slug: "como-preparar-consulta-medica",
    titulo: "Como se preparar para a consulta médica",
    resumo:
      "Dicas práticas para aproveitar melhor seu tempo com o profissional de saúde.",
    categoria: "fundamentos",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Consultas médicas podem ser curtas. Uma boa preparação ajuda você a ser ouvida e a sair com orientações mais claras.",
      "**Antes da consulta:** anote seus sintomas principais, quando começaram e o que piora ou melhora. Leve lista de medicamentos em uso.",
      "**Use o diário de sintomas** — registre dor, sono, fadiga e humor por algumas semanas e leve o relatório impresso.",
      "**Prepare perguntas:** o que pode estar causando meus sintomas? Quais exames são necessários? Quais tratamentos não farmacológicos são indicados para mim?",
      "**Leve alguém de confiança** se achar que vai esquecer informações ou se precisar de apoio emocional.",
      "**Seja honesta sobre o impacto** — dificuldade de trabalhar, tarefas domésticas, relações. Isso ajuda o profissional a entender a gravidade.",
    ],
  },
  {
    slug: "atividade-fisica-e-fibromialgia",
    titulo: "Atividade física e fibromialgia",
    resumo:
      "Por que o exercício aeróbico é parte central do tratamento — sempre com orientação adequada.",
    categoria: "tratamento",
    tempoLeitura: 6,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "A Sociedade Brasileira de Reumatologia destaca o exercício aeróbico como parte central do tratamento da fibromialgia, sempre com orientação adequada.",
      "A atividade física regular pode ajudar na dor, no sono, no humor e na qualidade de vida — mas precisa ser introduzida gradualmente e adaptada à sua realidade.",
      "**Comece devagar.** Caminhadas leves, hidroginástica e alongamentos supervisionados são opções frequentemente indicadas — mas converse com seu médico e, se possível, com fisioterapeuta.",
      "**Respeite seus limites.** O exercício não deve ser punitivo. Dias de crise existem e fazem parte.",
      "**Busque supervisão** quando possível — academias com profissionais preparados, projetos públicos de atividade física ou fisioterapia no SUS.",
      "Nunca inicie um programa de exercícios intenso sem orientação profissional, especialmente em períodos de crise intensa.",
    ],
  },
  {
    slug: "sono-e-fibromialgia",
    titulo: "Sono e fibromialgia",
    resumo:
      "A relação entre sono não reparador, dor e fadiga — e o que pode ajudar.",
    categoria: "sintomas",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Distúrbios do sono são muito comuns na fibromialgia. Muitas pessoas relatam acordar cansadas mesmo após dormir várias horas.",
      "O sono ruim piora a dor, a fadiga e o humor — criando um ciclo difícil de quebrar.",
      "**Higiene do sono:** horários regulares, ambiente escuro e silencioso, evitar telas antes de dormir, cafeína em excesso à tarde.",
      "**Converse com seu médico** sobre distúrbios do sono persistentes. Existem abordagens farmacológicas e não farmacológicas que podem ajudar.",
      "**Registre seu sono no diário** — anotar qualidade e horas de sono ao longo das semanas ajuda a identificar padrões para discutir na consulta.",
      "Se o sono está muito prejudicado, não hesite em buscar ajuda. É um sintoma tratável e importante para o manejo geral da condição.",
    ],
  },
  {
    slug: "saude-mental-e-dor-cronica",
    titulo: "Saúde mental e dor crônica",
    resumo:
      "Ansiedade, depressão e o impacto emocional de viver com dor persistente.",
    categoria: "vida-cotidiana",
    tempoLeitura: 6,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Viver com dor crônica afeta profundamente a saúde mental. Ansiedade e depressão são comuns — e não significam que a dor 'é psicológica' ou inventada.",
      "O sofrimento emocional é uma resposta compreensível à dor persistente, ao isolamento e ao preconceito.",
      "**Buscar apoio psicológico não é fraqueza** — é parte do cuidado integral. Psicoterapia pode ajudar no manejo da dor, do estresse e das emoções.",
      "**CVV — 188** — se você está em crise emocional ou com pensamentos de autolesão, ligue 188 (24h, gratuito).",
      "**SAMU — 192** — em emergências médicas.",
      "Na comunidade Voz da Fibro, você encontrará escuta e acolhimento — mas lembre-se: espaços de apoio complementam, não substituem, o cuidado profissional.",
    ],
  },
  {
    slug: "como-conversar-com-a-familia",
    titulo: "Como conversar com a família",
    resumo:
      "Orientações para ajudar familiares a compreender a fibromialgia.",
    categoria: "vida-cotidiana",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Muitas pessoas com fibromialgia sentem que a família não entende — ou pior, acha que é 'preguiça' ou 'dramatização'.",
      "**Compartilhe informação confiável** — artigos da biblioteca, materiais do Ministério da Saúde ou da Sociedade Brasileira de Reumatologia.",
      "**Explique com exemplos concretos:** 'Hoje acordei com dor em todo o corpo e não consegui fazer tarefas simples' é mais claro do que 'não estou bem'.",
      "**Peça apoio específico:** 'Preciso que você cuide do jantar hoje' funciona melhor do que 'você nunca me ajuda'.",
      "**Convide para rodas de conversa** — a plataforma terá encontros para familiares entenderem a doença.",
      "Se a incompreensão familiar causa sofrimento intenso, considere terapia familiar ou apoio psicológico individual.",
    ],
  },
  {
    slug: "direitos-da-pessoa-com-fibromialgia",
    titulo: "Direitos da pessoa com fibromialgia",
    resumo:
      "Benefícios previdenciários, atendimento prioritário e legislação aplicável.",
    categoria: "direitos",
    tempoLeitura: 7,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Pessoas com fibromialgia têm direitos que muitas vezes desconhecem. Conhecer esses direitos é o primeiro passo para exercê-los.",
      "**Atendimento no SUS** — a fibromialgia é reconhecida e deve ser atendida na rede pública. Busque encaminhamento pela atenção básica para reumatologia quando necessário.",
      "**Benefícios previdenciários** — em casos de incapacidade para o trabalho, pode haver direito a auxílio-doença ou aposentadoria por invalidez. Consulte um advogado previdenciário ou defensoria pública.",
      "**Legislação municipal e estadual** — alguns municípios e estados têm leis de atendimento prioritário. Verifique se há legislação aplicável na sua região.",
      "**Adaptações no trabalho** — a pessoa com fibromialgia pode ter direito a adaptações razoáveis no ambiente de trabalho. Converse com RH, sindicato ou advogado trabalhista.",
      "Este conteúdo é informativo. Para casos específicos, busque orientação jurídica qualificada.",
    ],
  },
  {
    slug: "como-buscar-atendimento-no-sus",
    titulo: "Como buscar atendimento no SUS",
    resumo:
      "Passo a passo para acessar cuidado na rede pública de saúde.",
    categoria: "direitos",
    tempoLeitura: 6,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "O SUS oferece atendimento para fibromialgia, mas o acesso pode variar conforme a região e a disponibilidade de especialistas.",
      "**Passo 1:** procure a unidade básica de saúde (UBS) mais próxima e agende consulta com médico de família ou clínico geral.",
      "**Passo 2:** relate seus sintomas com clareza e peça encaminhamento para reumatologia, se indicado.",
      "**Passo 3:** aguarde o encaminhamento — prazos variam. Mantenha acompanhamento na atenção básica enquanto espera.",
      "**Passo 4:** busque também fisioterapia, psicologia e nutrição pelo SUS — são parte do tratamento integral.",
      "**Dica:** leve o relatório do diário de sintomas para facilitar a comunicação com o profissional.",
      "Se encontrar dificuldades de acesso, procure a ouvidoria do SUS na sua região ou a defensoria pública.",
    ],
  },
  {
    slug: "fibromialgia-e-trabalho",
    titulo: "Fibromialgia e trabalho",
    resumo:
      "Como lidar com as dificuldades profissionais e conhecer seus direitos.",
    categoria: "vida-cotidiana",
    tempoLeitura: 6,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "A fibromialgia pode impactar significativamente a capacidade de trabalho — e isso não é falta de vontade.",
      "Dias de crise, fadiga intensa e dor podem tornar tarefas rotineiras extremamente difíceis.",
      "**Comunique com cautela** — nem todo ambiente de trabalho é acolhedor. Avalie com quem confia antes de se abrir amplamente.",
      "**Documente** — atestados médicos, registros de consultas e impacto funcional podem ser importantes para processos trabalhistas ou previdenciários.",
      "**Adaptações razoáveis** — home office parcial, pausas, ajuste de carga horária ou de tarefas podem ser solicitados. Consulte RH ou sindicato.",
      "**Grupo na comunidade** — o grupo 'Fibromialgia e trabalho' é um espaço para trocar experiências e estratégias.",
    ],
  },
  {
    slug: "alimentacao-e-rotina",
    titulo: "Alimentação e rotina",
    resumo:
      "Orientações gerais sobre hábitos alimentares e organização do dia a dia.",
    categoria: "vida-cotidiana",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Não existe 'dieta da fibromialgia' comprovada cientificamente. Cuidado com promessas de cura através da alimentação.",
      "**Alimentação equilibrada** — frutas, verduras, proteínas e hidratação adequada contribuem para a saúde geral e podem ajudar no bem-estar.",
      "**Rotina regular** — horários de sono, refeições e atividades, mesmo que adaptados, podem trazer alguma previsibilidade em dias difíceis.",
      "**Pacing (ritmo)** — alternar atividade e descanso, sem ir além dos limites nos dias bons para evitar piora nos dias seguintes.",
      "**Consulte nutricionista** — preferencialmente pelo SUS ou convênio — para orientação personalizada.",
      "Evite dietas restritivas extremas ou suplementos vendidos como 'cura' sem evidência e sem orientação profissional.",
    ],
  },
  {
    slug: "diario-de-dor-como-usar",
    titulo: "Como montar um diário de dor",
    resumo:
      "Por que registrar sintomas ajuda você e seu médico — e como usar a ferramenta da plataforma.",
    categoria: "tratamento",
    tempoLeitura: 4,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "A fibromialgia tem sintomas variáveis e subjetivos. Um diário organiza sua experiência em dados que o médico pode usar na consulta.",
      "**O que registrar:** nível de dor (0 a 10), qualidade do sono, fadiga, humor, medicamentos em uso, atividades físicas, crises, gatilhos percebidos e observações.",
      "**Com que frequência:** idealmente diariamente, mesmo que brevemente. Duas semanas de registro já mostram padrões úteis.",
      "**Use o relatório** — a ferramenta Diário da plataforma gera um resumo para imprimir ou levar no celular à consulta.",
      "**Não é diagnóstico** — o relatório é apoio à comunicação, não substitui avaliação médica.",
      "Acesse o Diário pelo menu principal e comece hoje. O histórico ajuda a organizar informações importantes para a consulta.",
    ],
  },
  {
    slug: "evitar-golpes-e-automedicacao",
    titulo: "Como evitar golpes, curas milagrosas e automedicação",
    resumo:
      "Sinais de alerta e como proteger-se de informações e produtos perigosos.",
    categoria: "seguranca",
    tempoLeitura: 6,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "Pessoas com dor crônica são alvo frequente de golpes e promessas de cura milagrosa. Proteger-se é essencial.",
      "**Sinais de alerta:** 'cura em 30 dias', depoimentos emocionais sem evidência, venda de produtos 'secretos', pressão para comprar rápido, crítica a médicos e remédios convencionais.",
      "**Automedicação é perigosa** — tomar medicamentos por conta própria, mudar doses ou misturar substâncias pode causar danos graves.",
      "**Na comunidade Voz da Fibro** — compartilhar experiência é bem-vindo; prescrever tratamento para outros é proibido.",
      "**Desconfie de influenciadores** sem formação em saúde que vendem produtos como solução.",
      "**Em dúvida, pergunte ao seu médico** antes de iniciar qualquer tratamento novo — inclusive 'naturais' e suplementos.",
      "Denuncie golpes ao Procon e, em casos de produtos irregulars, à Vigilância Sanitária (Anvisa).",
    ],
  },
  {
    slug: "medicamentos-informacao-geral",
    titulo: "Medicamentos: o que você precisa saber",
    resumo:
      "Informação geral sobre o uso de medicamentos — sem prescrição.",
    categoria: "tratamento",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "O tratamento da fibromialgia pode envolver medidas farmacológicas e não farmacológicas, conforme avaliação individual do médico.",
      "**Medicamentos são prescritos pelo profissional** — o tipo, dose e duração dependem do seu quadro, comorbidades e resposta ao tratamento.",
      "**Não compare tratamentos** com outras pessoas — o que funciona para uma pode não funcionar para outra.",
      "**Efeitos colaterais** — relate ao médico qualquer efeito indesejado. Não interrompa medicamentos por conta própria.",
      "**Registre no diário** os medicamentos em uso — isso ajuda na consulta e evita esquecimentos.",
      "Esta plataforma **não prescreve, não indica e não vende medicamentos**. Para qualquer decisão sobre medicação, consulte seu médico.",
    ],
  },
  {
    slug: "mobilizacao-e-seus-direitos",
    titulo: "Mobilização social: por que seus dados importam",
    resumo:
      "Como a plataforma usará dados agregados para defender direitos — com seu consentimento.",
    categoria: "direitos",
    tempoLeitura: 5,
    revisadoPor: "Conselho Consultivo Voz da Fibro",
    atualizadoEm: "2026-06-18",
    conteudo: [
      "A Voz da Fibro nasce também como instrumento de mobilização social e política pública.",
      "Com seu consentimento explícito, dados agregados e anônimos podem mostrar a realidade da fibromialgia no Brasil: tempo até diagnóstico, dificuldades no SUS, impacto no trabalho, falta de especialistas.",
      "**O que NÃO fazemos:** vender seus dados, compartilhar informações individuais, usar dados sem consentimento.",
      "**O que fazemos:** produzir relatórios como 'Retrato Fibro Brasil' para campanhas, audiências públicas e propostas de políticas.",
      "**Você controla** — pode participar ou não da pesquisa, e pode retirar o consentimento a qualquer momento.",
      "Transformar vivência em evidência social é um dos pilares mais fortes deste projeto. Sua voz conta — e pode mudar políticas.",
    ],
  },
];

export function getArtigoBySlug(slug: string): Artigo | undefined {
  return artigos.find((a) => a.slug === slug);
}

export function getArtigosByCategoria(categoria: ArtigoCategoria): Artigo[] {
  return artigos.filter((a) => a.categoria === categoria);
}
