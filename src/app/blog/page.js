import BlogClient from '@/components/BlogClient';
import { supabase } from '@/lib/supabase';

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

export default async function BlogPage() {
  const { data: dbBlogAssets } = await supabase
    .from('site_assets')
    .select('*')
    .like('section', 'blog_%')
    .order('created_at', { ascending: false });

  let dynamicImages = {};
  if (dbBlogAssets && dbBlogAssets.length > 0) {
    dbBlogAssets.forEach(asset => {
      // If there are duplicates, the first one encountered (newest because of order) is kept
      if (!dynamicImages[asset.section]) {
        dynamicImages[asset.section] = asset.image_url;
      }
    });
  }

  return <BlogClient dynamicImages={dynamicImages} />;
}

