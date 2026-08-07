Você é um agente de desenvolvimento trabalhando no repositório do site institucional da **Gessoalves** (Next.js 14, App Router, Supabase, Resend, reCAPTCHA v3, GSAP, Three.js). Este arquivo já está no repositório — leia-o inteiro antes de começar. Execute as fases abaixo **em ordem**, uma de cada vez, e siga também as regras já definidas em `.agents/AGENTS.md` deste projeto.

## Regras gerais (valem para todas as fases)

1. Crie um branch novo antes de começar (`git checkout -b fix/security-content-performance`) e um commit por item ou por sub-fase, com mensagem clara.
2. Depois de cada fase, rode `npm run build` (e `npm run lint` assim que existir — ver Fase 4.1) e só avance se passar sem erro.
3. **Nunca** faça commit de `.env.local` ou de qualquer segredo real. Toda credencial nova deve virar variável de ambiente documentada em `.env.example` com valor de exemplo (nunca o valor real).
4. **Nunca** rode `git push`, `vercel deploy` ou qualquer comando de envio/publicação sem antes me mostrar o resumo do que mudou e pedir minha confirmação explícita — isso já é uma regra do projeto (ver `.env.example`).
5. Onde este prompt disser "PARE E PERGUNTE", pare de fato e me pergunte antes de prosseguir — não tome a decisão sozinho.
6. Ao final de cada fase, me dê um resumo curto do que mudou e o que precisa ser testado manualmente.

---

## FASE 1 — Segurança (prioridade máxima, fazer antes de qualquer deploy público)

**1.1 Remover o vazamento da `service_role key` para o navegador.**
Hoje `src/app/api/admin/auth/route.js` devolve `SUPABASE_SERVICE_ROLE_KEY` como token, e `src/app/admin/galeria/page.js` guarda isso em `sessionStorage`, reenviando como `Authorization: Bearer` em `src/app/api/admin/gallery/route.js`. Substitua por sessão própria:
- Adicione a dependência `jose` (JWT, sem deps nativas).
- Crie `ADMIN_SESSION_SECRET` (string aleatória longa) em `.env.example`/`.env.local`.
- Em `src/lib/adminAuth.js`, crie `signAdminSession()` e `verifyAdminSession(token)` usando `jose`, payload mínimo (`{ role: 'admin', iat, exp }`), expiração curta (ex.: 8h).
- Em `POST /api/admin/auth`: após validar e-mail/senha, gerar o JWT e devolvê-lo via cookie `httpOnly`, `secure`, `sameSite=lax` (não no corpo JSON). Nunca devolver `SUPABASE_SERVICE_ROLE_KEY` na resposta.
- Em `src/app/api/admin/gallery/route.js`: trocar `isAuthorized()` para ler o cookie e validar com `verifyAdminSession`. O `createAdminClient()` (service role) continua sendo chamado só no servidor, como já é hoje — a diferença é que o cliente nunca mais vê essa chave.
- Em `src/app/admin/galeria/page.js`: remover todo uso de `sessionStorage`/`Authorization: Bearer`; os `fetch` passam a contar com o cookie automaticamente (mesma origem). Adicione um botão "Sair" que chama uma nova rota `POST /api/admin/logout` para limpar o cookie.
- PARE E PERGUNTE: depois de implementar, peça pra eu testar manualmente o login/logout do admin antes de seguir pra próxima fase.

**1.2 Rate limit no login admin.** Em `/api/admin/auth`, adicione limite de tentativas por IP (reaproveite/adapte a lógica de `src/app/api/gallery/submit/route.js`, já usando o store durável do item 1.6).

**1.3 Remover policy de upload anônimo no Storage.** Em `supabase-schema.sql` e `supabase/migrations/20260805000000_init_gallery_schema.sql`, remova a policy `"Anyone can upload gallery images"` (INSERT anônimo no bucket `gallery`). Mantenha só a policy de leitura pública. Gere uma nova migration em `supabase/migrations/` fazendo o `DROP POLICY`.

**1.4 Validar tipo/tamanho de arquivo em `/api/contact`.** Aplique em `src/app/api/contact/route.js` a mesma validação de `ALLOWED_TYPES` (jpeg/png/webp/pdf/doc/docx conforme o `accept` do input) e `MAX_SIZE_MB` já usada em `src/app/api/gallery/submit/route.js`.

**1.5 Criar o bucket `contact_files` no schema.** Adicione em `supabase-schema.sql` (e numa nova migration) a criação do bucket `contact_files` e suas policies, hoje ausentes apesar de o código depender dele.

**1.6 Rate limiting durável.** Troque o `Map` em memória de `src/app/api/gallery/submit/route.js` (e o novo do item 1.2) por uma tabela no Supabase (ex.: `rate_limits(ip, route, count, window_start)`) ou outro store persistente — o `Map` atual não funciona de forma confiável em ambiente serverless.

**1.7 Usar o client anônimo nas rotas públicas.** Em `src/app/api/gallery/approved/route.js`, troque `createAdminClient()` pelo client `supabase` (anon) já exportado em `src/lib/supabase.js` — a RLS já permite leitura de `status = 'approved'`. Mantenha `createAdminClient()` só nas rotas realmente administrativas.

---

## FASE 2 — Conteúdo e dados de negócio

**2.1 PARE E PERGUNTE antes de tocar neste item:** existe conflito entre o endereço/área cadastrados no JSON-LD (`src/app/layout.js`) e no rodapé (`src/components/Footer.js`) — "Rua Inquiririm, 687, Vila Indiana, Butantã" — e a área de atuação descrita em `src/app/contato/page.js` e no `README.md` — "Zona Sul" (Morumbi, Santo Amaro, Granja Julieta, Chácara Santo Antônio, Saúde). Me pergunte qual é o dado correto antes de editar, e só então aplique o valor certo em `layout.js` (schema `LocalBusiness`), `Footer.js`, `contato/page.js` e `README.md`, deixando os quatro idênticos.

**2.2 Remover link quebrado.** `Footer.js` linka "Visualize Gesso em RA (Novo)" para `/ra`, rota inexistente. Remova esse item do rodapé (ou comente com um `TODO` claro) até a página existir.

**2.3 Renderizar o mapa real em `/contato`.** Troque o texto `[Mapa da Zona Sul será renderizado aqui na Etapa 6]` em `src/app/contato/page.js` pelo componente `<CoverageMap />` (já existe em `src/components/CoverageMap.js` e já é usado em `src/app/page.js`).

**2.4 Atualizar o README** com o telefone/WhatsApp reais usados no site (hoje o README tem um número diferente do resto do código).

**2.5 Corrigir `datePublished` fake no JSON-LD de depoimentos** em `src/components/TestimonialsSwiper.js` — usar a data real de cada depoimento (peça a data real se não estiver disponível) ou remover o campo.

**2.6 Sinalizar imagens placeholder.** Em `src/app/portfolio/page.js` e `src/app/blog/page.js`, as imagens vêm de `via.placeholder.com`. Não é algo pra você resolver sozinho (depende de fotos reais que só o cliente tem) — apenas deixe um comentário `// TODO: substituir por foto real antes do lançamento` em cada item e me avise no resumo da fase.

---

## FASE 3 — Performance

**3.1 Otimizar as imagens de `/public`.**
`logo.png` (916 KB, exibido a 180×60px), as 6 imagens de `/public/servicos/*.png` (630–790 KB cada) e `footer-wireframe.png` (719 KB) estão muito acima do necessário.
- Instale `sharp` como devDependency.
- Crie `scripts/optimize-images.mjs`: para cada imagem em `/public` e `/public/servicos`, redimensione para uma largura máxima sensata (logo: ~360px @2x; imagens de serviço/rodapé: ~1000px) e gere `.webp` com qualidade ~80, mantendo o arquivo original como fallback se necessário.
- Rode o script e reporte o tamanho antes/depois.
- Atualize as referências (`src/lib/servicesData.js`, `Header.js`, `Footer.js`) para os novos arquivos otimizados.

**3.2 Migrar `<img>` para `next/image`.** Nos arquivos `Footer.js`, `servicos/page.js`, `portfolio/page.js`, `blog/page.js`, `blog/[slug]/page.js`, `ClientGalleryForm.js`, `GalleryCarousel.js` e `admin/galeria/page.js`, troque `<img>` por `next/image` (para URLs remotas do Supabase, `next.config.mjs` já tem `remotePatterns` configurado). Confirme visualmente que nada quebrou o layout depois da troca.

**3.3 Ajustar o hero video.** Em `src/components/HeroVideo.js`, adicione um `poster` (gere um frame estático a partir do vídeo, ex. com `ffmpeg -i public/hero-video.mp4 -ss 00:00:00.5 -vframes 1 public/hero-video-poster.jpg`) e `preload="metadata"`.

---

## FASE 4 — Qualidade de código

**4.1 Configurar ESLint.** Instale `eslint` + `eslint-config-next` (versão compatível com Next 14), gere `.eslintrc.json` padrão do Next e adicione o script `"lint": "next lint"` no `package.json`. Rode e corrija os erros/avisos que aparecerem.

**4.2 Padronizar estilos.** Migre os estilos inline (`style={{...}}`) de `ContactForm.js`, `src/app/admin/galeria/page.js` e `Footer.js` para CSS Modules, seguindo o padrão já usado em `Header.module.css`/`Footer.module.css`.

**4.3 Unificar o schema de validação do formulário de contato.** Extraia o schema `zod` duplicado entre `ContactForm.js` e `src/app/api/contact/route.js` para `src/lib/schemas.js` e importe dos dois lados.

**4.4 Completar o `.env.example`.** Adicione `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` (criado na Fase 1.1), todos ausentes hoje apesar de serem exigidos pelo código.

**4.5 Completar o `sitemap.js`.** Gere entradas dinâmicas para `/blog/[slug]` e `/servicos/[slug]` a partir de `servicesData` e da lista de posts do blog, além de incluir `/blog` e `/galeria-de-clientes`, que faltam hoje.

---

## FASE 5 — Acessibilidade

**5.1** Em `ContactForm.js` e `ClientGalleryForm.js`, associe cada `<label>` ao `<input>` correspondente via `htmlFor`/`id`, e ligue as mensagens de erro aos campos com `aria-describedby` + `role="alert"`.

**5.2** Adicione `aria-hidden="true"` no container do canvas em `src/components/DrywallHero3D.js` (elemento puramente decorativo).

---

## Checklist final (rode antes de considerar tudo pronto)

- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem erros
- [ ] Login/logout do admin testado manualmente, sem token sensível visível no `sessionStorage`/`localStorage` (checar DevTools → Application)
- [ ] Formulário de contato: envio com e sem anexo, anexo de tipo/tamanho inválido é rejeitado
- [ ] Formulário de galeria de clientes: envio normal, rate limit, honeypot
- [ ] Nenhum link quebrado (checar `/ra` removido ou implementado)
- [ ] Endereço/telefone/área de atuação idênticos em `layout.js`, `Footer.js`, `contato/page.js` e `README.md`
- [ ] Lighthouse (mobile) antes/depois da Fase 3 — reportar a diferença de Performance/LCP
- [ ] Resumo final do que foi feito, o que ficou pendente (ex.: fotos reais de portfólio/blog) e o que precisa de decisão minha
