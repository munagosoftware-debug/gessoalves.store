import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultAssets = [
  // HeroSwiper
  {
    section: 'hero',
    title: 'Transforme seu ambiente com a excelência do Gesso e Drywall',
    image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    order_index: 0
  },
  {
    section: 'hero',
    title: 'Divisórias Inteligentes & Isolamento Acústico',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    order_index: 1
  },
  {
    section: 'hero',
    title: 'Sancas de Gesso & Projetos Luminotécnicos',
    image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    order_index: 2
  },

  // Portfolio / Obras Recentes (from page.js)
  { section: 'portfolio', title: 'Sanca de Gesso Iluminada', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', order_index: 0 },
  { section: 'portfolio', title: 'Forro Acartonado Clean', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', order_index: 1 },
  { section: 'portfolio', title: 'Parede Drywall Acústica', image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', order_index: 2 },
  { section: 'portfolio', title: 'Molduras & Cortineiro', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', order_index: 3 },
  { section: 'portfolio', title: 'Forro Modular Comercial', image_url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80', order_index: 4 },
  { section: 'portfolio', title: 'Rebaixamento de Teto', image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', order_index: 5 },
  
  // Servicos (from servicesData.js)
  { section: 'services', title: 'Forro de Gesso Acartonado', image_url: '/servicos/forro-acartonado.webp', order_index: 0 },
  { section: 'services', title: 'Parede de Drywall & Divisórias', image_url: '/servicos/parede-drywall.webp', order_index: 1 },
  { section: 'services', title: 'Sanca de Gesso & Iluminação Indireta', image_url: '/servicos/sanca-gesso.webp', order_index: 2 },
  { section: 'services', title: 'Cortineiro Iluminado e Invisível', image_url: '/servicos/cortineiro.webp', order_index: 3 },
  { section: 'services', title: 'Molduras e Acabamentos 3D', image_url: '/servicos/gesso-3d.webp', order_index: 4 },
  { section: 'services', title: 'Isolamento Termoacústico', image_url: '/servicos/isolamento-acustico.webp', order_index: 5 }
];

async function seed() {
  console.log('Verificando se já existem mídias no banco de dados...');
  const { data: existing, error: countErr } = await supabase.from('site_assets').select('id').limit(1);
  if (countErr) {
    console.error('Erro ao verificar mídias:', countErr);
    return;
  }
  
  if (existing.length > 0) {
    console.log('O banco de dados já possui mídias cadastradas. Ignorando seed.');
    return;
  }
  
  console.log('Inserindo mídias padrão no banco de dados...');
  for (const asset of defaultAssets) {
    const { error } = await supabase.from('site_assets').insert([asset]);
    if (error) {
      console.error(`Erro ao inserir ${asset.title}:`, error);
    } else {
      console.log(`Inserido com sucesso: ${asset.title}`);
    }
  }
  
  console.log('Concluído!');
}

seed();
