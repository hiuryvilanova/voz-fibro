# Voz da Fibro: Comunidade, Cuidado e Direitos

Ecossistema digital nacional de acolhimento, informação confiável e mobilização social para pessoas com fibromialgia no Brasil.

## Os três pilares

| Pilar | Foco |
|-------|------|
| **Acolhimento** | Comunidade moderada, rodas de conversa, escuta ativa |
| **Conhecimento** | Biblioteca curada, diário de sintomas, direitos |
| **Mobilização** | Dados agregados, campanhas, políticas públicas |

## Módulos disponíveis

| Módulo | Rota | Descrição |
|--------|------|-----------|
| Biblioteca | `/biblioteca` | 15 artigos curados |
| Diário | `/diario` | Registros protegidos na conta e relatório para consulta |
| Comunidade | `/comunidade` | Grupos moderados com publicações |
| Rodas | `/rodas` | Agenda de encontros com especialistas |
| Mapa | `/mapa` | Associações, SUS e serviços por região |
| Mobilização | `/mobilizacao` | Pesquisa com consentimento LGPD |
| Relatório | `/mobilizacao/relatorio` | Retrato Fibro Brasil (dados agregados) |
| Benefícios | `/beneficios` | Cupons e parcerias responsáveis |
| Moderação | `/moderacao` | Painel para equipe (moderador/admin) |

## Documentação

- [docs/VISAO.md](docs/VISAO.md) — Visão e missão
- [docs/PILOTO.md](docs/PILOTO.md) — Escopo do piloto
- [docs/GOVERNANCA.md](docs/GOVERNANCA.md) — Governança e LGPD
- [docs/APRESENTACAO-CRALIT.md](docs/APRESENTACAO-CRALIT.md) — Apresentação institucional

## Tecnologias

- Next.js 16 (App Router)
- TypeScript + Tailwind CSS 4
- Prisma 7 + MySQL/MariaDB
- Autenticação com JWT em cookie httpOnly
- Login local e Google OAuth 2.0
- Deploy preparado para Vercel com banco Hostinger

## Como executar

```bash
npm install
npm run db:deploy   # aplica migrações pendentes
npm run db:seed     # opcional: popula dados demonstrativos
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) ou a porta informada pelo terminal.

### Build de produção

```bash
npm run build
npm start
```

Configure `SESSION_SECRET` e `DATABASE_URL` no `.env` para produção.

### Deploy na Vercel

1. Cadastre todas as variáveis descritas em [`.env.example`](.env.example) nas configurações do projeto.
2. Execute `npm run db:deploy` contra o banco de produção antes de publicar alterações de schema.
3. Configure o domínio e o callback do Google com HTTPS.
4. Use `npm run deploy:check` para validar a entrega localmente.

O procedimento completo está em [docs/VERCEL-DEPLOY.md](docs/VERCEL-DEPLOY.md).

## Disclaimer

Voz da Fibro oferece suporte, educação e orientação. **Não substitui consulta, diagnóstico ou tratamento médico.**

Em crise emocional: **CVV 188**. Emergência médica: **SAMU 192**.
