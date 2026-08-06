'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Layers, Grid, Sparkles, Maximize2, Frame, LayoutGrid } from 'lucide-react';

const icons = [Layers, Grid, Sparkles, Maximize2, Frame, LayoutGrid];

export default function ServiceCard3D({ title, description, iconIndex = 0, slug, image }) {
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
      style={{ cursor: 'pointer', minHeight: '400px' }}
    >
      <div
        className="flip-card-inner metallic-card"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : transformStyle,
          transition: 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
          boxShadow: '0 15px 35px rgba(27, 42, 92, 0.1)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.6)'
        }}
      >
        {/* PARAFUSOS MELHORADOS (Mais Sutis) */}
        <div className="metallic-screw screw-tl" style={{ opacity: 0.7 }} />
        <div className="metallic-screw screw-tr" style={{ opacity: 0.7 }} />
        <div className="metallic-screw screw-bl" style={{ opacity: 0.7 }} />
        <div className="metallic-screw screw-br" style={{ opacity: 0.7 }} />

        {/* FRONT FACE */}
        <div className="flip-card-front" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '2rem',
          backgroundImage: image ? `linear-gradient(to bottom, rgba(27, 42, 92, 0.3), rgba(27, 42, 92, 0.95)), url(${image})` : 'linear-gradient(135deg, #ffffff 0%, #f6f8fb 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: image ? '#ffffff' : 'inherit',
          borderRadius: '16px'
        }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: image ? 'rgba(255, 255, 255, 0.15)' : 'linear-gradient(135deg, var(--color-navy) 0%, #2a3f7a 100%)',
              backdropFilter: image ? 'blur(8px)' : 'none',
              WebkitBackdropFilter: image ? 'blur(8px)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: image ? '0 8px 20px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)' : '0 8px 20px rgba(27, 42, 92, 0.3), inset 0 2px 4px rgba(255,255,255,0.2)',
              border: image ? '1px solid rgba(255,255,255,0.3)' : '2px solid #fff',
            }}
          >
            <IconComponent size={34} color="#ffffff" strokeWidth={1.5} />
          </div>
          <h3
            style={{
              fontSize: '1.4rem',
              fontWeight: '800',
              color: image ? '#ffffff' : 'var(--color-navy)',
              margin: '0.5rem 0',
              textAlign: 'center',
              lineHeight: '1.3',
              textShadow: image ? '0 2px 10px rgba(0,0,0,0.8)' : 'none'
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: image ? 'rgba(255, 255, 255, 0.9)' : '#666', marginTop: '1rem', letterSpacing: '0.5px' }}>
            CLIQUE PARA DETALHES ⤵
          </p>
        </div>

        {/* BACK FACE */}
        <div className="flip-card-back" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#fff', fontWeight: '700' }}>{title}</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', color: 'var(--color-silver-light)' }}>
            {description}
          </p>
          <Link
            href={`/servicos/${slug}`}
            className="btn-3d"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: '0.9rem',
              padding: '10px 24px',
              background: 'linear-gradient(145deg, #ffffff, var(--color-silver-light))',
              color: 'var(--color-navy)',
              border: 'none',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            Ver Projeto Completo
          </Link>
        </div>
      </div>
    </div>
  );
}
