import ServicesClient from '@/components/ServicesClient';

export const metadata = {
  title: 'Serviços Especializados em Gesso e Drywall na Zona Sul de SP | Gessoalves',
  description: 'Conheça nossos serviços de forro de gesso acartonado, paredes de drywall, sancas abertas/invertidas com LED, rebaixamento de teto, molduras e forro modular em São Paulo com garantia de 5 anos.',
  openGraph: {
    title: 'Serviços Especializados em Gesso e Drywall | Gessoalves',
    description: 'Instalação profissional de drywall, forros e sancas com equipe própria e garantia de 5 anos.',
    url: 'https://gessoalves.store/servicos',
  },
};

export default function Servicos() {
  return <ServicesClient />;
}

