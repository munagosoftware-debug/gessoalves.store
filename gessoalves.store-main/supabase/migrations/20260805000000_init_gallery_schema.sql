-- SCRIPT SQL para criar as tabelas e policies no Supabase

-- 1. Tabela principal de submissões da galeria
CREATE TABLE IF NOT EXISTS gallery_submissions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT NOT NULL,
  contact       TEXT,                   -- WhatsApp ou e-mail (uso interno)
  service       TEXT NOT NULL,          -- Dropdown do tipo de serviço
  bairro        TEXT NOT NULL,
  image_urls    TEXT[] NOT NULL,        -- URLs das imagens no Supabase Storage
  status        TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_address    TEXT,                   -- Para rate limiting
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Índice para otimizar consultas por status
CREATE INDEX IF NOT EXISTS idx_gallery_status ON gallery_submissions(status);
CREATE INDEX IF NOT EXISTS idx_gallery_created ON gallery_submissions(created_at DESC);

-- 3. Bucket de armazenamento para imagens da galeria
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT DO NOTHING;

-- 4. Policies de Storage (permitir upload anônimo, leitura pública)
CREATE POLICY "Public read gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can upload gallery images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery');

-- 5. Policies da tabela (anon só lê aprovadas; apenas service_role gerencia tudo)
ALTER TABLE gallery_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved submissions"
  ON gallery_submissions FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can insert submissions"
  ON gallery_submissions FOR INSERT
  WITH CHECK (true);
