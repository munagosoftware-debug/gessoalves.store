import PortfolioClient from '@/components/PortfolioClient';
import { supabase } from '@/lib/supabase';
import { portfolioProjects } from '@/lib/portfolioData';

export const metadata = {
  title: 'Portfólio de Obras e Projetos em Gesso & Drywall | Gessoalves',
  description: 'Confira nossa galeria de obras concluídas na Zona Sul e Grande SP: forros de gesso acartonado, sancas iluminadas, paredes em drywall e molduras de alto padrão.',
  openGraph: {
    title: 'Portfólio de Obras em Gesso e Drywall | Gessoalves',
    description: 'Galeria com mais de 1.200 projetos entregues com precisão e acabamento impecável em São Paulo.',
    url: 'https://gessoalves.store/portfolio',
  },
};

export default async function Portfolio() {
  const { data: dbProjects } = await supabase
    .from('site_assets')
    .select('*')
    .like('section', 'portfolio_proj_%');

  let updatedProjects = portfolioProjects.map(p => ({ ...p }));
  
  if (dbProjects && dbProjects.length > 0) {
    updatedProjects = updatedProjects.map(p => {
      // portfolio_proj_1, portfolio_proj_2, etc
      const dbProj = dbProjects.find(db => db.section === `portfolio_proj_${p.id}`);
      if (dbProj) {
        return {
          ...p,
          img: dbProj.image_url,
          title: dbProj.title || p.title
        };
      }
      return p;
    });
  }

  return <PortfolioClient initialProjects={updatedProjects} />;
}

