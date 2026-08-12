'use client';

import { Camera, ShieldCheck, Heart } from 'lucide-react';

export default function GalleryInfoCards() {
  const cards = [
    {
      icon: <Camera size={32} color="var(--color-cyan)" />,
      title: 'Mostre seu Ambiente',
      text: 'Compartilhe o antes e depois, e como o gesso transformou o seu espaço.'
    },
    {
      icon: <ShieldCheck size={32} color="#10B981" />,
      title: '100% Seguro',
      text: 'Seus dados de contato ficam privados. Exibimos apenas seu nome e o bairro.'
    },
    {
      icon: <Heart size={32} color="#ef476f" />,
      title: 'Inspire Outras Pessoas',
      text: 'Sua obra pode ser a inspiração que falta para o projeto de outro cliente!'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      maxWidth: '100%',
      margin: '0',
      padding: '0',
      position: 'relative',
      zIndex: 10
    }}>
      {cards.map((card, idx) => (
        <div 
          key={idx}
          style={{
            flex: '1 1 140px',
            background: 'var(--color-graphite)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: '1.5rem 1rem',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem auto',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {card.icon}
          </div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '8px', color: '#ffffff' }}>{card.title}</h3>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: '1.4' }}>{card.text}</p>
        </div>
      ))}
    </div>
  );
}
