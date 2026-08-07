import { createAdminClient } from '@/lib/supabase';

/**
 * Rate limit durável via Supabase (tabela rate_limits + função check_rate_limit).
 * Funciona corretamente em ambiente serverless (sem estado em memória).
 *
 * @param {string} ip - IP do requisitante
 * @param {string} route - identificador da rota (ex.: 'gallery_submit', 'admin_auth')
 * @param {{ windowSeconds: number, max: number }} opts
 * @returns {Promise<boolean>} true = permitido, false = excedeu o limite
 */
export async function checkRateLimit(ip, route, { windowSeconds, max }) {
  try {
    const adminClient = createAdminClient();
    const { data, error } = await adminClient.rpc('check_rate_limit', {
      p_ip: ip || 'unknown',
      p_route: route,
      p_window_seconds: windowSeconds,
      p_max: max,
    });
    if (error) {
      console.error(`Rate limit check falhou (${route}), permitindo por segurança de disponibilidade:`, error);
      return true;
    }
    return data === true;
  } catch (err) {
    console.error(`Rate limit check com erro (${route}), permitindo por segurança de disponibilidade:`, err);
    return true;
  }
}
