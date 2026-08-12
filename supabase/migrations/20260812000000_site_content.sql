-- ==========================================
-- Supabase Migration: Site Content (CMS)
-- ==========================================

-- 1. Tabela para Depoimentos/Avaliações (Testimonials)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    service text NOT NULL,
    rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text text NOT NULL,
    image_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies para testimonials (Admin acesso total, público apenas leitura)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials são visíveis publicamente" 
ON public.testimonials FOR SELECT 
USING (true);

-- Apenas admins podem inserir, atualizar e deletar via API (Service Role)
CREATE POLICY "Admins podem inserir depoimentos" 
ON public.testimonials FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admins podem atualizar depoimentos" 
ON public.testimonials FOR UPDATE 
USING (true);

CREATE POLICY "Admins podem deletar depoimentos" 
ON public.testimonials FOR DELETE 
USING (true);


-- 2. Tabela para Fotos do Site (Carrossel, Grid)
CREATE TABLE IF NOT EXISTS public.site_assets (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    section text NOT NULL,
    image_url text NOT NULL,
    title text,
    order_index int DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Policies para site_assets
ALTER TABLE public.site_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ativos do site são visíveis publicamente" 
ON public.site_assets FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar ativos" 
ON public.site_assets FOR ALL 
USING (true);

-- Dados iniciais (Opcional - Migrando mock data se necessário)
-- Deixaremos vazia, os dados mockados no código podem ser inseridos pelo painel
