import { NextResponse } from 'next/server';
import { createAdminClient, supabase } from '@/lib/supabase';
import { checkRateLimit } from '@/lib/rateLimit';

const RATE_LIMIT_WINDOW_SECONDS = 60 * 60; // 1 hora
const MAX_SUBMISSIONS_PER_IP = 3;

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  // ── Rate Limiting (durável, via Supabase) ──
  const allowed = await checkRateLimit(ip, 'gallery_submit', {
    windowSeconds: RATE_LIMIT_WINDOW_SECONDS,
    max: MAX_SUBMISSIONS_PER_IP,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 1 hora.' },
      { status: 429 }
    );
  }

  const formData = await request.formData();

  // ── Honeypot anti-spam ──
  const honeypot = formData.get('website');
  if (honeypot) {
    // Bot preencheu o campo oculto — fingir sucesso
    return NextResponse.json({ success: true });
  }

  const name = formData.get('name')?.trim();
  const contact = formData.get('contact')?.trim() || null;
  const service = formData.get('service');
  const bairro = formData.get('bairro')?.trim();
  const authorized = formData.get('authorized');
  const images = formData.getAll('images');

  // ── Validações ──
  if (!name || !service || !bairro) {
    return NextResponse.json({ error: 'Campos obrigatórios incompletos.' }, { status: 400 });
  }
  if (!authorized || authorized !== 'true') {
    return NextResponse.json({ error: 'Autorização de publicação é obrigatória.' }, { status: 400 });
  }
  if (images.length === 0 || images.length > 5) {
    return NextResponse.json({ error: 'Envie entre 1 e 5 arquivos.' }, { status: 400 });
  }

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
  const MAX_SIZE_MB = 100;

  try {
    const adminClient = createAdminClient();
    const imageUrls = [];

    for (const image of images) {
      if (!ALLOWED_TYPES.includes(image.type)) {
        return NextResponse.json({ error: 'Apenas JPG, PNG, WebP, MP4 e WEBM são aceitos.' }, { status: 400 });
      }
      if (image.size > MAX_SIZE_MB * 1024 * 1024) {
        return NextResponse.json({ error: `Arquivo muito grande. Máximo ${MAX_SIZE_MB}MB por envio.` }, { status: 400 });
      }

      const fileBuffer = Buffer.from(await image.arrayBuffer());
      const ext = image.type.split('/')[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await adminClient.storage
        .from('gallery')
        .upload(fileName, fileBuffer, { contentType: image.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = adminClient.storage.from('gallery').getPublicUrl(fileName);
      imageUrls.push(urlData.publicUrl);
    }

    // ── Salvar no banco como 'pending' ──
    const { error: dbError } = await adminClient.from('gallery_submissions').insert({
      name,
      contact,
      service,
      bairro,
      image_urls: imageUrls,
      ip_address: ip,
      status: 'pending',
    });

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Gallery submit error:', err);
    return NextResponse.json({ error: 'Erro interno ao processar envio.' }, { status: 500 });
  }
}
