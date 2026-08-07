-- SCRIPT SQL para criar as tabelas e policies no Supabase
-- Execute este script no Editor SQL do painel do Supabase (SQL Editor → New Query)

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
-- (Também pode criar pelo painel: Storage → New bucket → "gallery")
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true)
ON CONFLICT DO NOTHING;

-- 4. Policies de Storage (leitura pública; upload feito só pelo backend com service_role)
CREATE POLICY "Public read gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

-- 5. Policies da tabela (anon só lê aprovadas; apenas service_role gerencia tudo)
ALTER TABLE gallery_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved submissions"
  ON gallery_submissions FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can insert submissions"
  ON gallery_submissions FOR INSERT
  WITH CHECK (true);

-- service_role (admin) tem acesso total via service_role_key, sem RLS

-- 6. Bucket de armazenamento para anexos do formulário de contato
INSERT INTO storage.buckets (id, name, public)
VALUES ('contact_files', 'contact_files', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read contact files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'contact_files');

-- Upload feito só pelo backend (service_role), sem policy de INSERT pra anon

-- 7. Rate limiting durável (substitui Map em memória, funciona em ambiente serverless)
CREATE TABLE IF NOT EXISTS rate_limits (
  ip            TEXT NOT NULL,
  route         TEXT NOT NULL,
  count         INTEGER NOT NULL DEFAULT 1,
  window_start  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (ip, route)
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
-- Sem policies: só acessível via service_role (bypassa RLS), anon/authenticated não têm acesso.

-- Função atômica: incrementa contador da janela e diz se a requisição é permitida.
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_ip TEXT,
  p_route TEXT,
  p_window_seconds INT,
  p_max INT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INT;
  v_window_start TIMESTAMPTZ;
BEGIN
  SELECT count, window_start INTO v_count, v_window_start
  FROM rate_limits
  WHERE ip = p_ip AND route = p_route
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO rate_limits (ip, route, count, window_start)
    VALUES (p_ip, p_route, 1, NOW());
    RETURN TRUE;
  END IF;

  IF NOW() - v_window_start > (p_window_seconds || ' seconds')::INTERVAL THEN
    UPDATE rate_limits SET count = 1, window_start = NOW()
    WHERE ip = p_ip AND route = p_route;
    RETURN TRUE;
  END IF;

  IF v_count >= p_max THEN
    RETURN FALSE;
  END IF;

  UPDATE rate_limits SET count = count + 1
  WHERE ip = p_ip AND route = p_route;
  RETURN TRUE;
END;
$$;
