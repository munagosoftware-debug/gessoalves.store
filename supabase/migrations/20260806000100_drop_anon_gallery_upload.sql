-- Remove a policy que permitia upload anônimo direto no bucket 'gallery'.
-- Uploads passam a acontecer só via backend (service_role), em /api/gallery/submit.
DROP POLICY IF EXISTS "Anyone can upload gallery images" ON storage.objects;
