# Prompts para o Antigravity — Site Gessoalves

**Como usar:** cole o **Prompt 0** primeiro (uma única vez, no início do projeto). Depois cole os prompts de **1 a 6 em sequência**, um de cada vez — revise o resultado de cada etapa antes de colar o próximo, para o Antigravity não perder qualidade tentando fazer tudo de uma vez só. Anexe o arquivo `logo-gesso-alves.png` ao projeto antes de começar.

---

## Prompt 0 — Contexto do projeto (colar primeiro)

```
Vamos construir, em várias etapas, o site institucional da Gessoalves. Guarde este contexto e reutilize em todas as etapas seguintes deste projeto (se possível, salve como um arquivo de contexto/README na raiz do projeto).

NEGÓCIO
- Nome: Gessoalves
- Domínio: gessoalves.store
- Segmento: instalação de forro de gesso acartonado, drywall e acabamentos em gesso
- Área de atuação: Zona Sul de São Paulo (Morumbi, Santo Amaro, Granja Julieta, Chácara Santo Antônio, Saúde e bairros vizinhos)
- Telefone fixo: (11) 4213-2271
- WhatsApp: (11) 93708-6879 — link direto https://wa.me/5511937086879
- Serviços: Forro de Gesso Acartonado, Parede de Drywall, Sanca de Gesso, Rebaixamento de Teto com Gesso, Molduras de Gesso, Forro Modular
- Missão: oferecer aos clientes e parceiros comerciais total tranquilidade em logística, gestão e execução de cada projeto, com foco na satisfação do cliente
- Diferenciais: rapidez de instalação, materiais de alta qualidade com garantia, atendimento em toda Zona Sul, orçamento sem compromisso
- Redes sociais: Facebook, Instagram, YouTube

IDENTIDADE VISUAL
- Logo: arquivo logo-gesso-alves.png (anexado) — monograma "GA" (G em cinza-chumbo se funde com uma placa de drywall 3D prata/metálica com parafusos visíveis, formando o A; perna do A em azul-marinho) + wordmark "GESSO" (grafite) "ALVES" (azul-marinho) + tagline "EMPRESA DE GESSO E DRYWALL"
- Cor principal do site: bege claro/areia (~#F1E9DC a #E8DCC8) combinado com branco (#FFFFFF), alternando entre seções para dar ritmo visual — evite branco puro isolado em todas as seções
- Cores de apoio (do logo): cinza-chumbo/grafite escuro (~#2B2E38) e azul-marinho profundo (~#1B2A5C) para textos, títulos, botões e ícones; prata/metálico em degradê (~#C9CDD3 a #8A8F98) para acabamentos 3D em relevo
- O arquivo de logo tem fundo branco sólido: gere também uma versão com fundo transparente (para usar sobre seções bege/coloridas) e recorte só o monograma "GA" para favicon e ícone de app
- O acabamento 3D "chapa com parafusos" do ícone deve inspirar o acabamento dos cards e elementos 3D do site (bisel metálico, sombra leve, rebites sutis)

OBJETIVO GERAL
Site institucional moderno, com bastante animação de scroll, efeitos 3D e carrosséis, focado em gerar leads via WhatsApp e formulário de orçamento. É a evolução de um site antigo mais simples (estático, sem animações) — o novo site deve parecer premium e atual.

STACK RECOMENDADA
- Frontend: HTML5/CSS3/JS moderno (ou React/Next.js se preferir componentização)
- Animações de scroll e 3D: GSAP + ScrollTrigger
- Carrosséis: Swiper.js
- 3D avançado opcional: Three.js (com fallback leve para mobile)
- Backend leve (necessário por causa do formulário e da galeria de clientes, ver Prompt 5): Node.js/Express, PHP ou um BaaS (Supabase/Firebase) + storage de imagens (Cloudinary/S3)
- Mobile-first, respeitar prefers-reduced-motion, boas práticas de acessibilidade e performance em todas as etapas

Confirme que entendeu o contexto e aguarde o próximo prompt com a primeira etapa de construção.
```

---

## Prompt 1 — Fundação do projeto

```
Etapa 1 do site Gessoalves: fundação técnica.

Faça:
1. Estruture o projeto na stack definida no contexto (frontend + design tokens).
2. Crie as variáveis/tokens de cor com a paleta definida: bege (~#F1E9DC a #E8DCC8) e branco como cores principais/fundo; grafite (~#2B2E38) e azul-marinho (~#1B2A5C) como cores de texto/destaque; prata em degradê (~#C9CDD3 a #8A8F98) como cor de acabamento 3D.
3. Defina tipografia (fonte moderna, boa legibilidade, pesos bold para títulos condizendo com o wordmark do logo).
4. Construa o header fixo (sticky) com o logo (logo-gesso-alves.png, versão sem fundo se já tiver sido gerada) e menu de navegação com: Início, Quem Somos, Serviços, Portfólio, Blog, Contato — com versão mobile em menu hambúrguer animado.
5. Construa o footer com: links de navegação, redes sociais (Facebook, Instagram, YouTube), telefone e WhatsApp, e um espaço reservado para a seção de "Galeria de Clientes" (será implementada no Prompt 5).
6. Gere o favicon a partir do monograma "GA" do logo.
7. Configure a estrutura de rotas/pastas para todas as páginas do mapa do site: Home, Quem Somos, Serviços (índice + uma página por serviço), Portfólio, Blog, Contato.

Ainda não precisa de conteúdo final nem animações — foco em fundação técnica e visual consistente com a marca.
```

---

## Prompt 2 — Páginas e conteúdo real

```
Etapa 2 do site Gessoalves: conteúdo real de todas as páginas (sem lorem ipsum, use os dados do contexto).

- Home: hero de apresentação, seção de serviços em destaque (os 6 serviços do contexto, cada um linkando para sua página própria), seção "por que escolher a Gessoalves" com os diferenciais, seção de área de atuação (bairros da Zona Sul listados no contexto), seção de depoimentos (pode usar 3-4 depoimentos fictícios plausíveis por enquanto, sinalizados como placeholder para depois trocar por reais), CTA final de orçamento.
- Quem Somos: história da empresa, e a seção Missão/Visão/Valores em formato de abas (mantenha o conceito de abas do site de referência, mas deixe pronta para receber transição animada no Prompt 3). Use a missão do contexto; para visão e valores, redija um texto plausível e condizente com o tom da missão.
- Serviços: página índice listando os 6 serviços com foto e resumo, e uma página individual para cada serviço com: título único, descrição, 3-4 diferenciais/opções de acabamento daquele serviço específico, e CTA de orçamento. Use uma URL única e consistente para todas (ex.: /servicos/forro-de-gesso-acartonado), sem misturar inglês e português nas rotas.
- Portfólio: grade de fotos de obras (pode usar imagens de placeholder por enquanto), preparada para filtro por tipo de serviço.
- Blog: 3 posts iniciais (pode reaproveitar temas como "Drywall x Gesso: qual escolher", "O que é isolamento acústico com drywall", "Como funciona o rebaixamento de teto").
- Contato: página com espaço para o formulário (será detalhado no Prompt 6) e um mapa da área de atuação.

Todas as páginas devem ter title e meta description únicos e bem escritos (nenhuma em branco, nem mesmo a Home) e exatamente um <h1> por página.
```

---

## Prompt 3 — Animações de scroll, efeitos 3D e carrosséis

```
Etapa 3 do site Gessoalves: as animações são o principal diferencial deste site em relação ao antigo (que era estático). Implemente com GSAP + ScrollTrigger e Swiper.js:

SCROLL
- Reveal on scroll (fade + translateY) em todas as seções e cards, com stagger nos grids (serviços, portfólio, depoimentos)
- Parallax sutil no hero e em imagens de seção (camadas em velocidades diferentes)
- Contadores numéricos animados ao entrar na viewport (ex.: "+15 anos de mercado", "+500 obras entregues", "+10.000 m² instalados") — pode usar números plausíveis como placeholder
- Barra de progresso de leitura no topo das páginas de blog
- Seção "pinada" (sticky) durante o scroll para a comparação antes/depois de cada serviço

3D
- Cards de serviço com efeito tilt 3D que segue o mouse/toque
- Cards com flip 3D (frente: ícone + nome do serviço; verso: descrição curta + link) — use o acabamento visual do monograma do logo (bisel metálico, leve sombra, "parafusos" sutis) como inspiração do acabamento desses cards
- Parallax multi-camada no hero simulando profundidade 3D
- Micro-interação 3D nos botões principais (profundidade/sombra ao passar o mouse)
- Se optar por Three.js: um elemento 3D leve no hero (ex.: uma placa de drywall estilizada girando suavemente), sempre com fallback estático para mobile/conexões lentas

CARROSSÉIS (Swiper.js)
- Hero banner
- Galeria de fotos por página de serviço
- Depoimentos com estrelas
- Antes/depois por obra

Importante: todas as animações devem respeitar `prefers-reduced-motion` (reduzir ou desligar quando o usuário tiver essa preferência ativada no sistema) e não podem prejudicar a performance mobile.
```

---

## Prompt 4 — Funcionalidades extras

```
Etapa 4 do site Gessoalves: funcionalidades adicionais que aumentam a conversão e a experiência.

1. Slider antes/depois (arraste) para cada serviço, mostrando o resultado do trabalho.
2. Calculadora rápida de orçamento: usuário informa m² aproximado e escolhe o serviço, recebe uma faixa estimada de preço na tela e um botão que já abre o WhatsApp com uma mensagem pré-preenchida citando o serviço e a metragem informada.
3. Botão flutuante de WhatsApp com animação de pulso, sempre visível, com mensagem pré-preenchida diferente por página (ex.: na página de sanca de gesso, a mensagem já cita "sanca de gesso").
4. FAQ em formato accordion na Home e/ou em cada página de serviço, com marcação de dados estruturados FAQPage.
5. Barra de CTA fixa que aparece após o usuário rolar cerca de 50% da página, sempre com "Solicitar Orçamento" levando ao formulário ou ao WhatsApp.
6. Mapa visual (pode ser um mapa estilizado ou embed do Google Maps) destacando os bairros da área de atuação listados no contexto.
7. Transição suave (fade) entre páginas ao navegar.
8. Depoimentos com estrelas usando dados estruturados Review/AggregateRating.
```

---

## Prompt 5 — Galeria de clientes (com moderação)

```
Etapa 5 do site Gessoalves: a funcionalidade da galeria onde os próprios clientes enviam fotos dos trabalhos concluídos.

FORMULÁRIO DE ENVIO (público, acessível pelo rodapé de todas as páginas e por uma página própria "Galeria de Clientes")
- Nome do cliente
- WhatsApp ou e-mail (opcional, uso interno apenas, não exibido publicamente)
- Serviço realizado (dropdown com os 6 serviços do contexto)
- Bairro/cidade
- Upload de 1 a 3 fotos (aceitar apenas jpg/png/webp, limite de tamanho razoável, comprimir automaticamente no upload)
- Checkbox obrigatório: "Autorizo a Gessoalves a publicar minha foto e nome no site"

MODERAÇÃO (não publicar direto)
- Toda foto enviada entra com status "pendente" em um banco de dados
- Crie um painel simples de administração (protegido por login) para listar pendentes e aprovar ou rejeitar cada envio
- Só fotos aprovadas aparecem na galeria pública
- Proteção anti-spam: honeypot no formulário + limite de envios por IP/tempo

EXIBIÇÃO PÚBLICA
- Carrossel (Swiper.js) no rodapé com preview das fotos mais recentes aprovadas
- Página dedicada "Galeria de Clientes" com todas as aprovadas em grid, com lightbox ao clicar (foto ampliada + nome + serviço + bairro)

Como isso exige backend, banco de dados e armazenamento de imagens, implemente com a stack de backend leve definida no contexto (Node/Express, PHP ou Supabase/Firebase + Cloudinary/S3). Se não for viável ter backend agora, implemente como alternativa temporária um formulário que envia e-mail/planilha para revisão manual, deixando a galeria pública alimentada manualmente até a versão com backend ficar pronta.
```

---

## Prompt 6 — Formulário de orçamento, SEO técnico e finalização

```
Etapa 6 (final) do site Gessoalves: formulário principal, SEO técnico e checklist de qualidade.

FORMULÁRIO DE ORÇAMENTO (página Contato e outros pontos do site)
- Campos: nome, e-mail, telefone, assunto, upload de "planta" (arquivo do projeto, opcional), mensagem — todos com validação client-side e server-side
- Proteção anti-spam real: reCAPTCHA v3 invisível ou hCaptcha
- Notificação por e-mail ao ser enviado (e, se possível, aviso interno via WhatsApp Business API)
- Mensagem de sucesso animada após o envio

SEO TÉCNICO (aplicar em todas as páginas)
- Title e meta description únicos e completos em todas as páginas, incluindo a Home
- Exatamente um <h1> por página
- Dados estruturados JSON-LD: LocalBusiness (nome, endereço, telefone, área de atendimento, horário), Service em cada página de serviço, Review/AggregateRating nos depoimentos, FAQPage onde houver FAQ
- Tag canonical em todas as páginas
- Gerar sitemap.xml e robots.txt
- Revisar todas as URLs internas (menu, footer, breadcrumbs, links entre páginas) para garantir que não há nenhum link quebrado ou apontando para domínio errado
- Não usar blocos de palavras-chave escondidas no rodapé — se quiser reforçar SEO local por bairro, crie conteúdo real (posts de blog) em vez disso

CHECKLIST FINAL
- Testar em mobile, tablet e desktop
- Verificar prefers-reduced-motion funcionando em todas as animações
- Verificar contraste de texto sobre os fundos bege/branco (mínimo AA de acessibilidade)
- Verificar performance (imagens em WebP/AVIF, lazy loading, sem travar o scroll por causa das animações)
- Confirmar que logo, paleta de cores e tom de voz estão consistentes em todas as páginas
- Revisar se todos os CTAs (WhatsApp, telefone, formulário) estão funcionando em todas as páginas
```
