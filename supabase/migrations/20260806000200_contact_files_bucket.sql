-- Bucket de armazenamento para anexos do formulário de contato (/api/contact),
-- hoje ausente do schema apesar de o código depender dele.
INSERT INTO storage.buckets (id, name, public)
VALUES ('contact_files', 'contact_files', true)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read contact files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'contact_files');

-- Upload feito só pelo backend (service_role) em /api/contact — sem policy de INSERT pra anon.
