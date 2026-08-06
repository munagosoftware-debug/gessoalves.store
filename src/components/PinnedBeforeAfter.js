'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const samples = [
  {
    title: 'Rebaixamento de Teto em Drywall com Sanca',
    subtitle: 'Estruturação perfeita com iluminação embutida em LED',
    beforeImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Divisória Corporativa Acústica',
    subtitle: 'Isolamento de ruídos e otimização de espaços empresariais',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    afterImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function PinnedBeforeAfter() {
  const pinSectionRef = useRef(null);
  const clipRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const pinEl = pinSectionRef.current;
    const clipEl = clipRef.current;

    if (!pinEl || !clipEl) return;

    // Pin timeline
    const st = ScrollTrigger.create({
      trigger: pinEl,
      start: 'top top',
      end: '+=1500',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        // revelar imagem depois de 0% a 100%
        if (clipEl) {
          clipEl.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const current = samples[activeIdx];

  return (
    <section
      ref={pinSectionRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1b2a5c',
        color: '#fff',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', zIndex: 10, padding: '0 1rem' }}>
        <span
          style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-block',
          }}
        >
          Transformação Real (Scroll Interativo)
        </span>
        <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: '#fff', marginTop: '0.8rem', lineHeight: '1.2' }}>
          {current.title}
        </h2>
        <p style={{ color: 'var(--color-silver-light)', fontSize: 'clamp(0.85rem, 3vw, 1rem)', marginTop: '0.5rem' }}>
          {current.subtitle} <br className="mobile-break" style={{ display: 'none' }}/> (Faça o scroll para revelar o resultado)
        </p>

        {/* Tabs switcher */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                background: activeIdx === idx ? 'var(--color-silver-light)' : 'transparent',
                color: activeIdx === idx ? 'var(--color-navy)' : '#fff',
                border: '1px solid var(--color-silver-light)',
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: '600',
              }}
            >
              Exemplo {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Frame Comparativo Antes / Depois */}
      <div
        className="metallic-card"
        style={{
          width: '100%',
          maxWidth: '960px',
          height: 'clamp(250px, 50vw, 450px)',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        <div className="metallic-screw screw-tl" />
        <div className="metallic-screw screw-tr" />
        <div className="metallic-screw screw-bl" />
        <div className="metallic-screw screw-br" />

        {/* Imagem ANTES (Background) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${current.beforeImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
            }}
          >
            ANTES
          </span>
        </div>

        {/* Imagem DEPOIS (Clipped com clipPath) */}
        <div
          ref={clipRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${current.afterImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'inset(0 50% 0 0)',
            transition: 'clip-path 0.1s ease-out',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'var(--color-navy)',
              color: '#fff',
              padding: '6px 14px',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              border: '1px solid var(--color-silver-light)',
            }}
          >
            DEPOIS (GESSOALVES)
          </span>
        </div>
      </div>
    </section>
  );
}
