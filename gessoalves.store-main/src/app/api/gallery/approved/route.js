import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

// GET /api/gallery/approved — retorna fotos aprovadas (paginação via ?limit=&offset=)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('gallery_submissions')
      .select('id, name, service, bairro, image_urls, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    console.error('Gallery fetch error:', err);
    return NextResponse.json({ data: [] });
  }
}
