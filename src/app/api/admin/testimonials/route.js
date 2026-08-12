import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { verifyAdminSession, COOKIE_NAME } from '@/lib/adminAuth';

async function isAuthorized(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);
  return !!session;
}

export async function GET(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const service = formData.get('service');
    const rating = formData.get('rating');
    const text = formData.get('text');
    const file = formData.get('file');

    if (!name || !service || !rating || !text) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    let image_url = null;

    if (file && file.size > 0) {
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: 'Formato de arquivo não suportado.' }, { status: 400 });
      }

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const ext = file.type.split('/')[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await adminClient.storage
        .from('gallery')
        .upload(`testimonials/${fileName}`, fileBuffer, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = adminClient.storage.from('gallery').getPublicUrl(`testimonials/${fileName}`);
      image_url = urlData.publicUrl;
    }

    const { data, error } = await adminClient
      .from('testimonials')
      .insert([{ name, service, rating: parseInt(rating), text, image_url }])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const name = formData.get('name');
    const service = formData.get('service');
    const rating = formData.get('rating');
    const text = formData.get('text');
    const file = formData.get('file');
    let image_url = formData.get('image_url'); // Keep existing if no new file

    if (!id || !name || !service || !rating || !text) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes.' }, { status: 400 });
    }

    const adminClient = createAdminClient();

    if (file && file.size > 0) {
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: 'Formato de arquivo não suportado.' }, { status: 400 });
      }

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const ext = file.type.split('/')[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await adminClient.storage
        .from('gallery')
        .upload(`testimonials/${fileName}`, fileBuffer, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = adminClient.storage.from('gallery').getPublicUrl(`testimonials/${fileName}`);
      image_url = urlData.publicUrl;
    }

    const { error } = await adminClient
      .from('testimonials')
      .update({ name, service, rating: parseInt(rating), text, image_url: image_url || null })
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID obrigatório.' }, { status: 400 });

  try {
    const adminClient = createAdminClient();
    
    // Pegar a URL para apagar a imagem no storage (se existir)
    const { data: testimo } = await adminClient.from('testimonials').select('image_url').eq('id', id).single();
    
    if (testimo?.image_url && testimo.image_url.includes('gallery/testimonials/')) {
      const fileName = testimo.image_url.split('/').pop();
      if (fileName) {
        await adminClient.storage.from('gallery').remove([`testimonials/${fileName}`]);
      }
    }

    const { error } = await adminClient
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
