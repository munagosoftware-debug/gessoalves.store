import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION = '8h';
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET not set');
  return new TextEncoder().encode(secret);
}

// Gera um JWT de sessão admin assinado, payload mínimo, expiração curta.
export async function signAdminSession() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecretKey());
}

// Valida o JWT de sessão admin. Retorna o payload se válido, ou null.
export async function verifyAdminSession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload.role !== 'admin') return null;
    return payload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME, SESSION_DURATION_SECONDS };
