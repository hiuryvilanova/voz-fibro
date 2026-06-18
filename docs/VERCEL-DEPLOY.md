# Deploy na Vercel

O projeto usa Next.js 16, Node.js 22, Prisma 7 e MySQL/MariaDB externo. As fotos de perfil são comprimidas no navegador e armazenadas no banco, portanto não dependem do sistema de arquivos temporário da Vercel.

## Variáveis obrigatórias

Cadastre em **Project Settings > Environment Variables**. Para dados reais e OAuth, marque **Production**. Use ambientes separados para Preview/Development quando houver outro banco disponível:

- `DATABASE_URL`
- `SESSION_SECRET`
- `CPF_HASH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

- `GOOGLE_REDIRECT_URI=https://vozdafibro.avorytech.com.br/api/auth/google/callback`

Gere `SESSION_SECRET` e `CPF_HASH_SECRET` diferentes, aleatórios e longos. Nunca copie os valores do ambiente local para documentação, commits ou capturas de tela.

## Google Cloud

Em **APIs e serviços > Credenciais > Cliente OAuth 2.0**, adicione:

- Origem JavaScript: `https://vozdafibro.avorytech.com.br`
- URI de redirecionamento: `https://vozdafibro.avorytech.com.br/api/auth/google/callback`

O domínio temporário `vercel.app` também precisa ser cadastrado se for usado para testar login. Como URLs de Preview mudam, prefira validar OAuth no domínio fixo de produção.

## Banco Hostinger

O banco MySQL deve aceitar conexões externas da infraestrutura da Vercel. A migração-base e a coluna de foto de perfil já estão registradas. Em alterações futuras de schema, execute `npm run db:deploy` em um ambiente controlado antes de publicar a versão correspondente.

Não execute migrações automaticamente em cada build da Vercel: builds de Preview podem ocorrer em paralelo. O comando de build executa apenas `prisma generate` e `next build`.

## Configuração do projeto

- Framework Preset: **Next.js**
- Production Branch: **main**
- Node.js: **22.x**
- Install Command: `npm ci`
- Build Command: `npm run vercel-build`
- Output Directory: deixe em branco
- Região das funções: `gru1`, configurada em `vercel.json`

## Domínio

1. Adicione `vozdafibro.avorytech.com.br` em **Settings > Domains**.
2. Copie os registros DNS indicados pela Vercel para a Hostinger.
3. Aguarde o certificado HTTPS ficar ativo.
4. Só então valide o login Google no domínio final.

## Ordem segura de publicação

```bash
npm ci
npm run deploy:check
npm run db:deploy
```

Depois, envie o código ao GitHub e importe o repositório na Vercel. Não execute `db:seed` em produção sem revisar os dados demonstrativos.

## Verificação após o deploy

- Abra `/api/health` e confirme `{"status":"ok","database":"connected"}`.
- Crie uma conta local e faça login novamente.
- Teste o login Google e a conclusão do cadastro.
- Atualize a foto do perfil e confirme no cabeçalho e nas publicações.
- Crie, edite e remova um registro do diário.
- Envie a pesquisa e confira o relatório agregado.
- Teste celular, tablet e desktop.
