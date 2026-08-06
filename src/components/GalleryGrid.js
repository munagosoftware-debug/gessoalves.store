'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

export default function GalleryGrid({ items }) {
  const [lightbox, setLightbox] = useState(null); // { imageUrl, name, service, bairro, imgIndex }

  const [isExpanded, setIsExpanded] = useState(false);

  if (!items || items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
        <p>Ainda não há fotos aprovadas. Seja o primeiro a enviar!</p>
      </div>
    );
  }

  return (
    <>
      {!isExpanded ? (
        <div style={{ textAlign: 'center', padding: '2rem 0 4rem' }}>
          <button 
            onClick={() => setIsExpanded(true)}
            style={{
              background: 'var(--color-navy)',
              color: '#fff',
              border: 'none',
              padding: '16px 36px',
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 25px rgba(30, 38, 64, 0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(30, 38, 64, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(30, 38, 64, 0.3)';
            }}
          >
            <ZoomIn size={22} /> Clique aqui para expandir
          </button>
        </div>
      ) : (
        <>
          <div 
            className="gallery-grid-animate"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
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
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    background: '#f8f8f8',
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'scale(1.02)'; 
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'scale(1)'; 
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'; 
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
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: 'var(--color-navy)',
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
                  <div style={{ padding: '12px 14px' }}>
                    <p style={{ fontWeight: '700', color: 'var(--color-navy)', margin: 0, fontSize: '0.95rem' }}>{item.client_name}</p>
                    <p style={{ color: '#666', fontSize: '0.8rem', margin: '3px 0 0' }}>
                      {item.service_type} · {item.bairro}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="gallery-grid-animate" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button 
              onClick={() => setIsExpanded(false)}
              style={{
                background: 'transparent',
                color: 'var(--color-navy)',
                border: '2px solid var(--color-navy)',
                padding: '12px 28px',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-navy)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--color-navy)';
              }}
            >
              Recolher Galeria
            </button>
          </div>
        </>
      )}

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
              background: '#fff', borderRadius: '16px', overflow: 'hidden',
              maxWidth: '700px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
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
                <h3 style={{ color: 'var(--color-navy)', margin: 0, fontSize: '1.2rem' }}>{lightbox.client_name}</h3>
                <p style={{ color: '#666', margin: '4px 0 0', fontSize: '0.9rem' }}>
                  {lightbox.service_type} · 📍 {lightbox.bairro}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                style={{ background: 'none', border: '1px solid #ddd', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
