'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Layers, Grid, Sparkles, Maximize2, Frame, LayoutGrid } from 'lucide-react';

const icons = [Layers, Grid, Sparkles, Maximize2, Frame, LayoutGrid];

export default function ServiceCard3D({ title, description, iconIndex = 0, slug }) {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [transformStyle, setTransformStyle] = useState('rotateX(0deg) rotateY(0deg)');

  const IconComponent = icons[iconIndex % icons.length] || Layers;

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    setTransformStyle(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('rotateX(0deg) rotateY(0deg)');
  };

  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
    setTransformStyle('rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
      ref={cardRef}
      className={`flip-card ${isFlipped ? 'is-flipped' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleFlip}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="flip-card-inner metallic-card"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : transformStyle,
        }}
      >
        {/* Screw details on metallic corners */}
        <div className="metallic-screw screw-tl" />
        <div className="metallic-screw screw-tr" />
        <div className="metallic-screw screw-bl" />
        <div className="metallic-screw screw-br" />

        {/* FRONT FACE */}
        <div className="flip-card-front">
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, var(--color-navy), var(--color-graphite))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.2rem',
              boxShadow: '0 6px 15px rgba(27, 42, 92, 0.25)',
              border: '2px solid var(--color-silver-light)',
            }}
          >
            <IconComponent size={32} color="#ffffff" />
          </div>
          <h3
            style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: 'var(--color-navy)',
              margin: '0.5rem 0',
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
            Clique ou passe o mouse para detalhes
          </p>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-back">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>{title}</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
            {description}
          </p>
          <Link
            href={`/servicos/${slug}`}
            className="btn-3d"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '0.9rem',
              padding: '8px 18px',
              background: 'linear-gradient(145deg, var(--color-silver-light), #ffffff)',
              color: 'var(--color-navy)',
              border: '1px solid #fff',
            }}
          >
            Ver Detalhes →
          </Link>
        </div>
      </div>
    </div>
  );
}
