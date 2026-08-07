import PortfolioClient from '@/components/PortfolioClient';

export const metadata = {
  title: 'Portfólio de Obras e Projetos em Gesso & Drywall | Gessoalves',
  description: 'Confira nossa galeria de obras concluídas na Zona Sul e Grande SP: forros de gesso acartonado, sancas iluminadas, paredes em drywall e molduras de alto padrão.',
  openGraph: {
    title: 'Portfólio de Obras em Gesso e Drywall | Gessoalves',
    description: 'Galeria com mais de 1.200 projetos entregues com precisão e acabamento impecável em São Paulo.',
    url: 'https://gessoalves.store/portfolio',
  },
};

export default function Portfolio() {
  return <PortfolioClient />;
}

