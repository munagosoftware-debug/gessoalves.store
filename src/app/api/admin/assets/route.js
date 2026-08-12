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

  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');

  try {
    const adminClient = createAdminClient();
    let query = adminClient.from('site_assets').select('*').order('order_index', { ascending: true }).order('created_at', { ascending: false });
    
    if (section) {
      query = query.eq('section', section);
    }

    const { data, error } = await query;

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
    const section = formData.get('section');
    const title = formData.get('title') || '';
    const file = formData.get('file');

    if (!section || !file) {
      return NextResponse.json({ error: 'Seção e arquivo são obrigatórios.' }, { status: 400 });
    }

    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: 'Formato de arquivo não suportado.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const ext = file.type.split('/')[1];
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Faz o upload para o bucket 'gallery' ou cria um bucket 'site_assets'. Vamos usar 'gallery' por enquanto.
    const { error: uploadError } = await adminClient.storage
      .from('gallery')
      .upload(`assets/${fileName}`, fileBuffer, { contentType: file.type, upsert: false });

    if (uploadError) throw uploadError;

    const { data: urlData } = adminClient.storage.from('gallery').getPublicUrl(`assets/${fileName}`);
    const image_url = urlData.publicUrl;

    const { data, error: dbError } = await adminClient
      .from('site_assets')
      .insert([{ section, title, image_url }])
      .select();

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Upload asset error:', err);
    return NextResponse.json({ error: 'Erro ao fazer upload do arquivo.' }, { status: 500 });
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
    
    // Pegar a URL para apagar o arquivo no storage
    const { data: asset } = await adminClient.from('site_assets').select('image_url').eq('id', id).single();
    
    const { error } = await adminClient.from('site_assets').delete().eq('id', id);
    if (error) throw error;

    // Tenta apagar do storage se possível
    if (asset && asset.image_url) {
      const urlParts = asset.image_url.split('/gallery/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await adminClient.storage.from('gallery').remove([filePath]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const id = formData.get('id');
    const section = formData.get('section');
    const title = formData.get('title') || '';
    const file = formData.get('file');

    if (!id || !section) {
      return NextResponse.json({ error: 'ID e Seção são obrigatórios.' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    let image_url = formData.get('image_url'); // mantem a imagem atual caso não envie um novo arquivo

    if (file && file.size > 0) {
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: 'Formato de arquivo não suportado.' }, { status: 400 });
      }

      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const ext = file.type.split('/')[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await adminClient.storage
        .from('gallery')
        .upload(`assets/${fileName}`, fileBuffer, { contentType: file.type, upsert: false });

      if (uploadError) throw uploadError;

      const { data: urlData } = adminClient.storage.from('gallery').getPublicUrl(`assets/${fileName}`);
      image_url = urlData.publicUrl;
      
      // Apagar imagem antiga
      const { data: oldAsset } = await adminClient.from('site_assets').select('image_url').eq('id', id).single();
      if (oldAsset && oldAsset.image_url) {
        const urlParts = oldAsset.image_url.split('/gallery/');
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          await adminClient.storage.from('gallery').remove([filePath]);
        }
      }
    }

    const { data, error: dbError } = await adminClient
      .from('site_assets')
      .update({ section, title, image_url })
      .eq('id', id)
      .select();

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    console.error('Update asset error:', err);
    return NextResponse.json({ error: 'Erro ao atualizar a mídia.' }, { status: 500 });
  }
}
