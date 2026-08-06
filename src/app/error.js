'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('App Error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(135deg, var(--color-beige-light) 0%, #ffffff 100%)'
    }}>
      <div style={{
        background: '#fff',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(27, 42, 92, 0.08)',
        border: '1px solid var(--color-silver-light)',
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

        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          color: '#e11d48', // subtle red for error
          margin: '0',
          lineHeight: '1.2',
        }}>
          Oops! Algo deu errado.
        </h1>
        <p style={{
          color: '#666',
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
    </div>
  );
}
