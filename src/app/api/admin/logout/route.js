import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/adminAuth';

// POST /api/admin/logout — limpa o cookie de sessão admin
export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
