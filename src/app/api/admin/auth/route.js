import { NextResponse } from 'next/server';
import { signAdminSession, COOKIE_NAME, SESSION_DURATION_SECONDS } from '@/lib/adminAuth';
import { checkRateLimit } from '@/lib/rateLimit';

const LOGIN_RATE_LIMIT_WINDOW_SECONDS = 15 * 60; // 15 minutos
const MAX_LOGIN_ATTEMPTS = 5;

// Rota de autenticação do painel admin (valida email/senha via env vars)
export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  const allowed = await checkRateLimit(ip, 'admin_auth', {
    windowSeconds: LOGIN_RATE_LIMIT_WINDOW_SECONDS,
    max: MAX_LOGIN_ATTEMPTS,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
      { status: 429 }
    );
  }

  const { email, password } = await request.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_SESSION_SECRET;

  if (!adminEmail || !adminPassword || !sessionSecret) {
    return NextResponse.json({ error: 'Configuração de admin incompleta.' }, { status: 500 });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: 'Credenciais inválidas.' }, { status: 401 });
  }

  const token = await signAdminSession();

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
  return response;
}
