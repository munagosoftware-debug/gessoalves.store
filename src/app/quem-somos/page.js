import AboutClient from '@/components/AboutClient';

export const metadata = {
  title: 'Quem Somos | Gessoalves - Gesso e Drywall na Zona Sul de SP',
  description: 'Conheça a Gessoalves: mais de 12 anos transformando ambientes na Zona Sul de São Paulo com gesso acartonado, drywall, sancas e forros com garantia de 5 anos.',
  openGraph: {
    title: 'Quem Somos | Gessoalves',
    description: 'Empresa referência em gesso e drywall na Zona Sul de SP. Equipe própria, materiais certificados e garantia de 5 anos.',
    url: 'https://gessoalves.store/quem-somos',
  },
};

export default function QuemSomos() {
  return <AboutClient />;
}

