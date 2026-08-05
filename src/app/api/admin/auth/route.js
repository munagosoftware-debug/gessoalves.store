import { NextResponse } from 'next/server';

// Rota de autenticação do painel admin (valida email/senha via env vars)
export async function POST(request) {
  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!adminEmail || !adminPassword || !serviceKey) {
    return NextResponse.json({ error: 'Configuração de admin incompleta.' }, { status: 500 });
  }

  if (email === adminEmail && password === adminPassword) {
    return NextResponse.json({ token: serviceKey });
  }

  return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
}
