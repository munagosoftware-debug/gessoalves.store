-- Executar isso no SQL Editor do Supabase

-- Tabela para gerenciar avaliações (depoimentos) de clientes
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  service text,
  rating integer DEFAULT 5,
  text text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabela para gerenciar mídias/assets do site (imagens do carrossel, vídeos, etc)
CREATE TABLE IF NOT EXISTS public.site_assets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL, -- Ex: 'hero', 'about', 'services'
  title text,
  image_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) para as tabelas (Leitura pública, escrita apenas via backend com service_role)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials são públicos para leitura"
  ON public.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Assets são públicos para leitura"
  ON public.site_assets FOR SELECT
  USING (true);
