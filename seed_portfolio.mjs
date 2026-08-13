import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const portfolioAssets = [
  { section: 'portfolio', title: 'Sanca de Gesso Iluminada', image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', order_index: 0 },
  { section: 'portfolio', title: 'Forro Acartonado Clean', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', order_index: 1 },
  { section: 'portfolio', title: 'Parede Drywall Acústica', image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80', order_index: 2 },
  { section: 'portfolio', title: 'Molduras & Cortineiro', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', order_index: 3 },
  { section: 'portfolio', title: 'Forro Modular Comercial', image_url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80', order_index: 4 },
  { section: 'portfolio', title: 'Rebaixamento de Teto', image_url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', order_index: 5 },
  { section: 'portfolio', title: 'Iluminação Embutida LED', image_url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80', order_index: 6 },
  { section: 'portfolio', title: 'Divisórias Corporativas', image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', order_index: 7 },
];

async function seed() {
  console.log('Deletando portfolio atual...');
  await supabase.from('site_assets').delete().eq('section', 'portfolio');
  
  console.log('Inserindo 8 fotos do portfolio...');
  for (const asset of portfolioAssets) {
    await supabase.from('site_assets').insert([asset]);
    console.log(`Inserido com sucesso: ${asset.title}`);
  }
  
  console.log('Concluído!');
}

seed();
