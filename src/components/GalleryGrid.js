'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

export default function GalleryGrid({ items }) {
  const [lightbox, setLightbox] = useState(null); // { imageUrl, name, service, bairro, imgIndex }

  if (!items || items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-silver-light)' }}>
        <p>Ainda não há fotos aprovadas. Seja o primeiro a enviar!</p>
      </div>
    );
  }

  return (
    <>
      <div 
        className="gallery-grid-animate"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: '20px',
        }}
      >
        {items.map((item) =>
          item.image_urls.map((url, imgIdx) => (
            <div
              key={`${item.id}-${imgIdx}`}
              onClick={() => setLightbox({ ...item, currentUrl: url })}
              style={{
                cursor: 'pointer',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.transform = 'translateY(-4px)'; 
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)'; 
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'translateY(0)'; 
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image
                  src={url}
                  alt={`${item.service_type} por ${item.client_name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 300px"
                  style={{ objectFit: 'cover', display: 'block' }}
                />
                {/* Botão Ampliar sempre visível */}
                <div 
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 2
                  }}
                >
                  <ZoomIn size={16} /> Ampliar
                </div>
              </div>
              <div style={{ padding: '16px 14px', background: 'transparent' }}>
                <p style={{ fontWeight: '700', color: '#ffffff', margin: 0, fontSize: '0.95rem' }}>{item.client_name}</p>
                <p style={{ color: 'var(--color-silver-light)', fontSize: '0.8rem', margin: '4px 0 0' }}>
                  {item.service_type} · {item.bairro}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lightbox Dialog */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10000, padding: '20px',
            animation: 'fadeIn 0.2s ease-out forwards'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-graphite)', borderRadius: '16px', overflow: 'hidden',
              maxWidth: '700px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '50vh', minHeight: '300px' }}>
              <Image
                src={lightbox.currentUrl}
                alt={lightbox.service_type}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fff', margin: 0, fontSize: '1.2rem' }}>{lightbox.client_name}</h3>
                <p style={{ color: 'var(--color-silver-light)', margin: '4px 0 0', fontSize: '0.9rem' }}>
                  {lightbox.service_type} · 📍 {lightbox.bairro}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes expandGrid {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .gallery-grid-animate {
          animation: expandGrid 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
