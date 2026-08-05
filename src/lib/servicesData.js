export const servicesData = [
  {
    slug: 'forro-de-gesso-acartonado',
    title: 'Forro de Gesso Acartonado',
    description: 'Instalação rápida e limpa de forros de gesso acartonado (drywall). Ideal para embutir iluminação, esconder fiações e criar um teto nivelado com excelente acabamento e resistência.',
    features: [
      'Acabamento perfeitamente liso e uniforme',
      'Permite projetos luminotécnicos embutidos',
      'Instalação ágil com mínima sujeira',
      'Ótimo conforto térmico e acústico'
    ],
    placeholderImg: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Forro+Acartonado'
  },
  {
    slug: 'parede-de-drywall',
    title: 'Parede de Drywall',
    description: 'Divisão de ambientes com paredes de drywall. Uma solução inteligente, leve e versátil que substitui a alvenaria tradicional, economizando tempo e dinheiro em sua reforma.',
    features: [
      'Execução muito mais rápida que alvenaria',
      'Espessura menor, ganhando área útil no ambiente',
      'Pode receber isolamento acústico interno (lã de vidro/rocha)',
      'Fácil manutenção e passagem de tubulações'
    ],
    placeholderImg: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Parede+Drywall'
  },
  {
    slug: 'sanca-de-gesso',
    title: 'Sanca de Gesso',
    description: 'Sancas de gesso abertas, fechadas ou invertidas para valorizar seu ambiente. Trazem um toque de modernidade e sofisticação, permitindo brincar com iluminação indireta.',
    features: [
      'Sanca Fechada: visual clean e iluminação em spots',
      'Sanca Aberta: iluminação indireta aconchegante',
      'Sanca Invertida: efeito de teto flutuante',
      'Valoriza o pé-direito do ambiente'
    ],
    placeholderImg: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Sanca+de+Gesso'
  },
  {
    slug: 'rebaixamento-de-teto-com-gesso',
    title: 'Rebaixamento de Teto com Gesso',
    description: 'Serviço especializado de rebaixamento de teto para corrigir imperfeições da laje, esconder vigas aparentes e criar uma estética moderna e contínua.',
    features: [
      'Oculta vigas, tubulações e imperfeições',
      'Base perfeita para projetos de arquitetura',
      'Estrutura metálica resistente e segura',
      'Acabamento pronto para receber pintura'
    ],
    placeholderImg: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Rebaixamento+Teto'
  },
  {
    slug: 'molduras-de-gesso',
    title: 'Molduras de Gesso',
    description: 'Molduras clássicas ou modernas (linhas retas) para o encontro entre parede e teto. Um detalhe sutil que faz toda a diferença na decoração clássica ou contemporânea.',
    features: [
      'Diversos modelos: do clássico arredondado ao liso moderno',
      'Rodatetos que disfarçam irregularidades',
      'Instalação rápida e acabamento detalhista',
      'Excelente custo-benefício para decoração'
    ],
    placeholderImg: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Molduras'
  },
  {
    slug: 'forro-modular',
    title: 'Forro Modular',
    description: 'Solução prática para ambientes corporativos, comerciais e industriais. O forro modular permite fácil acesso ao entreforro para manutenções constantes.',
    features: [
      'Ideal para escritórios, lojas e galpões',
      'Acesso total e imediato à infraestrutura (fios, dutos)',
      'Placas removíveis com diversas opções de isolamento acústico',
      'Visual técnico e organizado'
    ],
    placeholderImg: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Forro+Modular'
  }
];

export function getServiceBySlug(slug) {
  return servicesData.find(service => service.slug === slug);
}
