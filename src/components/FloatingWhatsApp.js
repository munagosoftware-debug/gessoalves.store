'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { openWhatsAppModal } = useWhatsAppModal();
  const [message, setMessage] = useState('Olá! Gostaria de um orçamento para o meu projeto.');

  useEffect(() => {
    if (!pathname) return;

    if (pathname.includes('/sanca-de-gesso')) {
      setMessage('Olá! Gostaria de saber mais sobre Sanca de Gesso e solicitar um orçamento.');
    } else if (pathname.includes('/parede-de-drywall')) {
      setMessage('Olá! Gostaria de um orçamento para instalação de Parede de Drywall.');
    } else if (pathname.includes('/forro-de-gesso')) {
      setMessage('Olá! Tenho interesse em Forro de Gesso Acartonado, podem me ajudar com um orçamento?');
    } else if (pathname.includes('/portfolio')) {
      setMessage('Olá! Vi os projetos no portfólio de vocês e gostaria de fazer algo parecido.');
    } else if (pathname.includes('/blog')) {
      setMessage('Olá! Li um artigo no blog de vocês e gostaria de tirar algumas dúvidas/fazer um orçamento.');
    } else {
      setMessage('Olá! Vim pelo site da Gessoalves e gostaria de solicitar um orçamento.');
    }
  }, [pathname]);

  return (
    <>
      <button
        onClick={() => openWhatsAppModal(message)}
        className="floating-whatsapp"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="wa-svg"
          fill="currentColor"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-23.2-115-67.1-157zM223.9 414.7c-33 0-65.3-8.9-93.7-25.6l-6.7-4-69.6 18.2 18.6-67.9-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.4 82.5-183.9 184-183.9 49.2 0 95.4 19.2 130.1 53.9 34.7 34.7 53.9 80.9 53.9 130.1 0 101.5-82.6 183.9-184.2 183.9h-.1zm100.8-138.4c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.7z"/>
        </svg>
      </button>

      <style jsx>{`
        .floating-whatsapp {
          position: fixed;
          bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          right: calc(20px + env(safe-area-inset-right, 0px));
          width: 58px;
          height: 58px;
          background-color: #25D366;
          color: #FFF;
          border-radius: 50%;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
          z-index: 999;
          cursor: pointer;
          animation: pulse-wa 2.5s infinite;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .wa-svg {
          width: 32px;
          height: 32px;
        }

        .floating-whatsapp:hover {
          transform: scale(1.1);
          animation: none;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6);
        }

        .floating-whatsapp:active {
          transform: scale(0.95);
        }

        @keyframes pulse-wa {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @media (max-width: 768px) {
          .floating-whatsapp {
            bottom: calc(16px + env(safe-area-inset-bottom, 0px));
            right: calc(16px + env(safe-area-inset-right, 0px));
            width: 52px;
            height: 52px;
          }
          .wa-svg {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
    </>
  );
}
