'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const stats = [
  { label: 'Anos de Mercado', value: 15, prefix: '+', suffix: '' },
  { label: 'Obras Entregues', value: 500, prefix: '+', suffix: '' },
  { label: 'm² Instalados', value: 10000, prefix: '+', suffix: '', format: true },
  { label: 'Satisfação dos Clientes', value: 100, prefix: '', suffix: '%' }
];

export default function CounterUp() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counterElements = containerRef.current?.querySelectorAll('.counter-val');
    if (!counterElements || counterElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetVal = parseFloat(el.getAttribute('data-target'));
          const format = el.getAttribute('data-format') === 'true';

          if (prefersReducedMotion) {
            el.innerText = format ? targetVal.toLocaleString('pt-BR') : targetVal;
          } else {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: targetVal,
              duration: 2.5,
              ease: 'power3.out',
              onUpdate: () => {
                const val = Math.floor(obj.value);
                el.innerText = format ? val.toLocaleString('pt-BR') : val;
              },
            });
          }
          // Only animate once
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    counterElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ background: 'var(--color-navy)', padding: '4rem 0' }}>
      <div
        ref={containerRef}
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          padding: '0 1.5rem',
          color: '#fff',
        }}
      >
        {stats.map((stat, idx) => (
          <div key={idx} style={{ 
            textAlign: 'center', 
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              color: '#fbc531',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {idx === 0 && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>}
              {idx === 1 && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>}
              {idx === 2 && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>}
              {idx === 3 && <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>}
            </div>

            <div
              style={{
                fontSize: '3.5rem',
                fontWeight: '700',
                color: '#ffffff',
                fontFamily: 'var(--font-primary)',
                lineHeight: 1,
                letterSpacing: '-1px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '2px',
                marginBottom: '0.5rem'
              }}
            >
              <span style={{ fontSize: '2rem', color: '#fbc531', fontWeight: '500' }}>{stat.prefix}</span>
              <span
                className="counter-val"
                data-target={stat.value}
                data-format={stat.format ? 'true' : 'false'}
              >
                0
              </span>
              <span style={{ fontSize: '2rem', color: '#fbc531', fontWeight: '500' }}>{stat.suffix}</span>
            </div>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-silver-light)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
