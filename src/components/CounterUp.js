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
    gsap.registerPlugin(ScrollTrigger);

    const counterElements = containerRef.current?.querySelectorAll('.counter-val');
    if (!counterElements) return;

    counterElements.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute('data-target'));
      const format = el.getAttribute('data-format') === 'true';

      if (prefersReducedMotion) {
        el.innerText = format ? targetVal.toLocaleString('pt-BR') : targetVal;
        return;
      }

      const obj = { value: 0 };
      gsap.to(obj, {
        value: targetVal,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          const val = Math.floor(obj.value);
          el.innerText = format ? val.toLocaleString('pt-BR') : val;
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '3rem 1.5rem',
        background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-graphite) 100%)',
        borderRadius: '16px',
        color: '#fff',
        margin: '3rem 0',
        boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
      }}
    >
      {stats.map((stat, idx) => (
        <div key={idx} style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '2.8rem',
              fontWeight: '700',
              color: 'var(--color-silver-light)',
              fontFamily: 'var(--font-primary)',
              lineHeight: 1.2,
            }}
          >
            <span>{stat.prefix}</span>
            <span
              className="counter-val"
              data-target={stat.value}
              data-format={stat.format ? 'true' : 'false'}
            >
              0
            </span>
            <span>{stat.suffix}</span>
          </div>
          <p
            style={{
              fontSize: '1rem',
              color: '#d0d4dc',
              marginTop: '0.5rem',
              fontWeight: '500',
            }}
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
