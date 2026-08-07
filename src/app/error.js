'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-graphite) 100%)'
    }}>
      <div style={{
        background: 'var(--color-navy)',
        padding: '3rem 2rem',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorator screw */}
        <div className="metallic-screw screw-tl" />
        <div className="metallic-screw screw-tr" />
        <div className="metallic-screw screw-bl" />
        <div className="metallic-screw screw-br" />

        <div style={{ marginBottom: '2rem' }}>
          <div className="logo-highlight" style={{ display: 'inline-block' }}>
            <Image 
              src="/logo-v2.png" 
              alt="Gessoalves Logo" 
              width={240} 
              height={80} 
              style={{ display: 'block', objectFit: 'contain' }}
            />
          </div>
        </div>

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          color: '#ff4d4d', // brighter red for dark theme
          margin: '0',
          lineHeight: '1.2',
        }}>
          Oops! Algo deu errado.
        </h1>
        <p style={{
          color: 'var(--color-silver-light)',
          marginTop: '1rem',
          marginBottom: '2.5rem',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Tivemos um problema inesperado ao tentar carregar esta parte do site. Nossa equipe já foi notificada.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => reset()} 
            className="btn-3d" 
            style={{ 
              padding: '12px 28px', 
              fontSize: '1.1rem',
              background: 'linear-gradient(145deg, var(--color-graphite), #1a1a1a)'
            }}
          >
            Tentar Novamente
          </button>
          
          <Link href="/" className="btn-3d" style={{ padding: '12px 28px', fontSize: '1.1rem' }}>
            Ir para Início
          </Link>
        </div>
      </div>
    </main>
  );
}
