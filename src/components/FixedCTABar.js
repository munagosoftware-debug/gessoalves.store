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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed-cta-bar ${isVisible ? 'visible' : ''}`}>
        <div className="fixed-cta-content">
          <div className="fixed-cta-text">
            Precisa de gesso ou drywall com agilidade e perfeição?
          </div>
          <button
            onClick={() => openWhatsAppModal('Olá! Vim pelo site da Gessoalves e gostaria de solicitar um orçamento agora mesmo.')}
            className="fixed-cta-btn"
          >
            Solicitar Orçamento Agora
          </button>
        </div>
      </div>

      <style jsx>{`
        .fixed-cta-bar {
          position: fixed;
          bottom: -150px;
          left: 0;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.96);
          border-top: 1px solid var(--color-silver-light, #C9CDD3);
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.12);
          padding: 12px 24px calc(12px + env(safe-area-inset-bottom, 0px));
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          pointer-events: none;
          transition: bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
          z-index: 998;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .fixed-cta-bar.visible {
          bottom: 0;
          opacity: 1;
          pointer-events: auto;
        }

        .fixed-cta-content {
          max-width: 1200px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .fixed-cta-text {
          color: var(--color-navy, #1B2A5C);
          font-weight: 700;
          font-size: 1.05rem;
        }

        .fixed-cta-btn {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%);
          color: #ffffff;
          padding: 10px 24px;
          font-weight: 700;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 12px rgba(29, 78, 216, 0.3);
          cursor: pointer;
          font-size: 0.95rem;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          min-height: 44px;
        }

        .fixed-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(29, 78, 216, 0.45);
        }

        .fixed-cta-btn:active {
          transform: translateY(1px);
        }

        @media (max-width: 768px) {
          .fixed-cta-bar {
            padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px));
          }
          .fixed-cta-text {
            display: none;
          }
          .fixed-cta-content {
            justify-content: center;
          }
          .fixed-cta-btn {
            width: 100%;
            text-align: center;
            font-size: 0.95rem;
            padding: 12px 20px;
          }
        }
      `}</style>
    </>
  );
}
