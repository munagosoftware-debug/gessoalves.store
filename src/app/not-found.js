'use client';

import Link from 'next/link';

export default function NotFound() {
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
          fontSize: 'clamp(4rem, 8vw, 6rem)',
          fontWeight: '800',
          color: 'var(--color-navy)',
          margin: '0',
          lineHeight: '1',
          textShadow: '0 4px 12px rgba(27, 42, 92, 0.1)'
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: '1.5rem',
          color: 'var(--color-graphite)',
          marginTop: '1rem',
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          Página não encontrada
        </h2>
        <p style={{
          color: '#666',
          marginBottom: '2rem',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Parece que o projeto ou página que você está procurando não existe mais ou foi movido.
        </p>
        
        <Link href="/" className="btn-3d" style={{ padding: '12px 28px', fontSize: '1.1rem' }}>
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
