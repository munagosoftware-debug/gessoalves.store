import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const defaultTestimonials = [
  {
    name: 'Carlos Mendes',
    service: 'Morumbi, SP',
    text: 'A equipe da Gessoalves transformou minha sala com o teto rebaixado e iluminação de LED embutida. Trabalho muito limpo, pontual e rápido!',
    rating: 5,
  },
  {
    name: 'Fernanda Costa',
    service: 'Chácara Santo Antônio, SP',
    text: 'Fizemos as divisórias do nosso escritório corporativo em drywall. A agilidade e a qualidade do isolamento acústico superaram nossas expectativas.',
    rating: 5,
  },
  {
    name: 'Roberto Silva',
    service: 'Campo Belo, SP',
    text: 'Atendimento impecável do orçamento à entrega. A sanca aberta de gesso na varanda gourmet ficou espetacular. Super recomendo a Gessoalves!',
    rating: 5,
  },
  {
    name: 'Mariana Oliveira',
    service: 'Moema, SP',
    text: 'Excelente custo-benefício e profissionais extremamente organizados. Protegeram todos os móveis e entregaram no prazo combinado.',
    rating: 5,
  },
];

async function seedTestimonials() {
  console.log('Verificando se já existem avaliações...');
  
  const { data: existing, error: fetchError } = await supabase
    .from('testimonials')
    .select('id');

  if (fetchError) {
    console.error('Erro ao buscar avaliações:', fetchError);
    return;
  }

  if (existing && existing.length > 0) {
    console.log(`Já existem ${existing.length} avaliações no banco. Nenhuma alteração foi feita.`);
    return;
  }

  console.log('Inserindo avaliações padrão...');
  
  const { error: insertError } = await supabase
    .from('testimonials')
    .insert(defaultTestimonials);

  if (insertError) {
    console.error('Erro ao inserir avaliações:', insertError);
  } else {
    console.log('Avaliações inseridas com sucesso!');
  }
}

seedTestimonials();
