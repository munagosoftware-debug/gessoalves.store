'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function CaptchaProvider({ children }) {
  // Usa uma chave dummy caso não exista no .env, garantindo que o contexto do React não quebre
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || 'chave_nao_definida';

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
