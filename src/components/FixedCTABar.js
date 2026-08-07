'use client';

import { useState, useEffect } from 'react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';

export default function FixedCTABar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openWhatsAppModal } = useWhatsAppModal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Mostrar a barra quando rolar 40% da página ou mais
      if (scrollHeight > 0 && (scrollY / scrollHeight) > 0.4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // checagem inicial
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isVisible ? 0 : '-150px',
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderTop: '1px solid var(--color-silver-light)',
        boxShadow: '0 -4px 15px rgba(0, 0, 0, 0.1)',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        zIndex: 9998,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{ color: 'var(--color-navy)', fontWeight: '600', fontSize: '1.1rem' }}>
          Precisa de gesso ou drywall com agilidade e perfeição?
        </div>
        <button
          onClick={() => openWhatsAppModal('Olá! Vim pelo site da Gessoalves e gostaria de solicitar um orçamento agora mesmo.')}
          className="btn-3d"
          style={{ padding: '10px 24px', fontSize: '0.95rem' }}
        >
          Solicitar Orçamento Agora
        </button>
      </div>
    </div>
  );
}
