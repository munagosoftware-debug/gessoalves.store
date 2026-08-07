'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-graphite) 100%)' 
    }}>
      <div style={{ 
        background: 'var(--color-navy)', 
        padding: '3rem 2rem', 
        borderRadius: '24px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '1px solid var(--color-silver-light)',
        maxWidth: '600px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center'
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
          fontSize: '4rem', 
          fontWeight: '800', 
          color: '#ffffff', 
          margin: '0', 
          lineHeight: '1' 
        }}>404</h1>
        
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: 'var(--color-cyan, #4cc9f0)', 
          marginTop: '1rem', 
          marginBottom: '1rem' 
        }}>Página não encontrada</h2>
        
        <p style={{ 
          color: 'var(--color-silver-light)', 
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
    </main>
  );
}
