import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { verifyAdminSession, COOKIE_NAME } from '@/lib/adminAuth';

// Autenticação via cookie httpOnly de sessão admin (JWT assinado).
async function isAuthorized(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const session = await verifyAdminSession(token);
  return !!session;
}

// GET /api/admin/gallery — listar submissões pendentes
export async function GET(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'pending';

  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient
      .from('gallery_submissions')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH /api/admin/gallery — aprovar ou rejeitar
export async function PATCH(request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const { id, status } = await request.json();
  if (!id || !['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Parâmetros inválidos.' }, { status: 400 });
  }

  try {
    const adminClient = createAdminClient();
    const { error } = await adminClient
      .from('gallery_submissions')
      .update({ status })
      .eq('id', id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
