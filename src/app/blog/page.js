import BlogClient from '@/components/BlogClient';

export const metadata = {
  title: 'Blog & Tendências em Drywall e Gesso | Gessoalves São Paulo',
  description: 'Dicas práticas, guias completos de instalação de drywall, isolamento acústico, sancas decorativas e soluções em gesso para sua reforma em SP.',
  openGraph: {
    title: 'Blog & Tendências em Drywall e Gesso | Gessoalves',
    description: 'Dicas práticas e guias completos sobre drywall, sancas, forros e isolamento acústico na Zona Sul de SP.',
    url: 'https://gessoalves.store/blog',
    siteName: 'Gesso Alves',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}

