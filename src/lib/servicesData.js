export const servicesData = [
  {
    slug: 'forro-de-gesso-acartonado',
    title: 'Forro de Gesso Acartonado',
    badge: 'Mais Pedido',
    idealFor: 'Apartamentos, residências e escritórios',
    description: 'Instalação rápida e limpa de forros de gesso acartonado (drywall). Ideal para embutir iluminação, esconder fiações e criar um teto nivelado com excelente acabamento e resistência.',
    features: [
      'Acabamento perfeitamente liso e uniforme sem trincas',
      'Permite projetos luminotécnicos embutidos e cortineiros',
      'Instalação ágil com mínima sujeira e sem entulho pesado',
      'Ótimo conforto térmico e acústico com lã mineral opcional'
    ],
    placeholderImg: '/servicos/forro-acartonado.webp',
    avgTime: '2 a 4 dias',
    warranty: '5 anos'
  },
  {
    slug: 'parede-de-drywall',
    title: 'Parede de Drywall & Divisórias',
    badge: 'Obra Rápida',
    idealFor: 'Divisão de salas, dormitórios e escritórios corporativos',
    description: 'Divisão de ambientes com paredes de drywall. Uma solução inteligente, leve e versátil que substitui a alvenaria tradicional, economizando tempo e dinheiro em sua reforma.',
    features: [
      'Execução até 60% mais rápida que alvenaria tradicional',
      'Espessura menor, ampliando a área útil interna dos cômodos',
      'Isolamento acústico com lã de rocha de alta densidade',
      'Fácil passagem de conduítes elétricos e tubulações hidráulicas'
    ],
    placeholderImg: '/servicos/parede-drywall.webp',
    avgTime: '1 a 3 dias',
    warranty: '5 anos'
  },
  {
    slug: 'sanca-de-gesso',
    title: 'Sanca de Gesso & Iluminação Indireta',
    badge: 'Design & Sofisticação',
    idealFor: 'Salas de estar, salas de jantar e suítes master',
    description: 'Sancas de gesso abertas, fechadas ou invertidas para valorizar seu ambiente. Trazem um toque de modernidade e sofisticação, permitindo brincar com iluminação indireta aconchegante.',
    features: [
      'Sanca Fechada: visual clean e distribuição perfeita de spots LED',
      'Sanca Aberta: luz indireta acolhedora e agradável para descanso',
      'Sanca Invertida: efeito moderno de teto flutuante',
      'Valorização estética e imobiliária imediata do imóvel'
    ],
    placeholderImg: '/servicos/sanca-gesso.webp',
    avgTime: '2 a 3 dias',
    warranty: '5 anos'
  },
  {
    slug: 'rebaixamento-de-teto-com-gesso',
    title: 'Rebaixamento de Teto com Gesso',
    badge: 'Nivelamento Perfeito',
    idealFor: 'Correção de desníveis e embutimento de ar-condicionado',
    description: 'Serviço especializado de rebaixamento de teto para corrigir imperfeições da laje, esconder vigas aparentes e criar uma estética moderna e contínua.',
    features: [
      'Oculta vigas estruturais, tubulações de ar e imperfeições da laje',
      'Base perfeita para projetos luminotécnicos de arquitetura',
      'Estrutura em aço galvanizado anticorrosão de alta segurança',
      'Acabamento ultra liso pronto para receber pintura premium'
    ],
    placeholderImg: '/servicos/rebaixamento-teto.webp',
    avgTime: '2 a 4 dias',
    warranty: '5 anos'
  },
  {
    slug: 'molduras-de-gesso',
    title: 'Molduras & Rodateto Decorativo',
    badge: 'Acabamento Fino',
    idealFor: 'Encontros de teto e parede, quartos e salas clássicas',
    description: 'Molduras clássicas ou modernas (linhas retas) para o encontro entre parede e teto. Um detalhe sutil que faz toda a diferença na decoração clássica ou contemporânea.',
    features: [
      'Diversos modelos: do clássico esculpido ao minimalista reto',
      'Rodatetos que disfarçam irregularidades no encontro de paredes',
      'Instalação rápida com cola gesso de altíssima fixação',
      'Excelente custo-benefício para transformar a estética do cômodo'
    ],
    placeholderImg: '/servicos/molduras.webp',
    avgTime: '1 a 2 dias',
    warranty: '5 anos'
  },
  {
    slug: 'forro-modular',
    title: 'Forro Modular Removível',
    badge: 'Corporativo & Comercial',
    idealFor: 'Empresas, galpões, clínicas e lojas comerciais',
    description: 'Solução prática para ambientes corporativos, comerciais e industriais. O forro modular permite fácil acesso ao entreforro para manutenções constantes.',
    features: [
      'Ideal para escritórios corporativos, clínicas, lojas e consultórios',
      'Acesso total e imediato à infraestrutura de fiação e ar-condicionado',
      'Placas removíveis termoacústicas e resistentes ao fogo',
      'Visual técnico, padronizado e de manutenção descomplicada'
    ],
    placeholderImg: '/servicos/forro-modular.webp',
    avgTime: '1 a 3 dias',
    warranty: '5 anos'
  }
];

export function getServiceBySlug(slug) {
  return servicesData.find(service => service.slug === slug);
}
