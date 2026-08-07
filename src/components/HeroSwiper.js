'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import { Zap, ShieldCheck, Ruler, Lightbulb } from 'lucide-react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: 'Transforme seu ambiente com a excelência do Gesso e Drywall',
    subtitle: 'Soluções completas em forro acartonado, divisórias acústicas e projetos de iluminação na Zona Sul de SP.',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Solicitar Orçamento',
    ctaUrl: 'https://wa.me/5511961155049',
  },
  {
    title: 'Divisórias Inteligentes & Isolamento Acústico',
    subtitle: 'Agilidade de montagem, obra limpa e otimização total de espaço residencial e comercial.',
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Ver Nossos Serviços',
    ctaUrl: '/servicos',
  },
  {
    title: 'Sancas de Gesso & Projetos Lumitécnicos',
    subtitle: 'Sofisticação e acabamento impecável com quem tem mais de 15 anos de tradição no mercado.',
    bg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Nossos Trabalhos',
    ctaUrl: '/portfolio',
  },
];

const features = [
  { icon: <Ruler size={24} />, text: 'Gesso & Drywall' },
  { icon: <ShieldCheck size={24} />, text: 'Divisórias Acústicas' },
  { icon: <Lightbulb size={24} />, text: 'Sancas & Iluminação' },
  { icon: <Zap size={24} />, text: 'Instalação Rápida' },
];

export default function HeroSwiper() {
  const { openWhatsAppModal } = useWhatsAppModal();

  return (
    <div style={{ position: 'relative', width: '100vw', overflow: 'hidden' }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        style={{ width: '100%', height: '100vh' }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 2rem',
                overflow: 'hidden'
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `url(${slide.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: 'scale(1.05)',
                  zIndex: 0
                }}
              />
              
              {/* Refined Transparent Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(to top, rgba(10, 15, 36, 0.95) 0%, rgba(27, 42, 92, 0.5) 50%, rgba(10, 15, 36, 0.4) 100%)',
                  zIndex: 1
                }}
              />
              
              {/* Content Container */}
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', animation: 'fadeInUp 1s ease-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: '800',
                    color: '#ffffff',
                    marginBottom: '1.5rem',
                    lineHeight: '1.2',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                    color: '#e2e8f0',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    fontWeight: '400',
                    maxWidth: '800px'
                  }}
                >
                  {slide.subtitle}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {slide.ctaUrl.includes('wa.me') ? (
                    <button
                      onClick={() => openWhatsAppModal('Olá! Gostaria de um orçamento para o meu projeto de gesso/drywall.')}
                      className="btn-3d"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        padding: '14px 32px',
                        borderRadius: '12px',
                        background: 'linear-gradient(145deg, #1d4ed8, #1e3a8a)',
                        boxShadow: '0 10px 25px rgba(29, 78, 216, 0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                        color: '#ffffff',
                        cursor: 'pointer'
                      }}
                    >
                      {slide.ctaText}
                      <span style={{ fontSize: '1.2rem' }}>→</span>
                    </button>
                  ) : (
                    <Link 
                      href={slide.ctaUrl} 
                      className="btn-3d"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        padding: '14px 32px',
                        borderRadius: '12px',
                        background: 'linear-gradient(145deg, #1d4ed8, #1e3a8a)',
                        boxShadow: '0 10px 25px rgba(29, 78, 216, 0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.3s ease',
                        color: '#ffffff',
                        textDecoration: 'none'
                      }}
                    >
                      {slide.ctaText}
                      <span style={{ fontSize: '1.2rem' }}>→</span>
                    </Link>
                  )}
                  <Link 
                    href="/portfolio" 
                    className="btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      padding: '14px 32px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      color: '#ffffff',
                      textDecoration: 'none'
                    }}
                  >
                    Ver Portfólio
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Features Bar - Overlaid at the bottom */}
      <div 
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          zIndex: 10,
          background: 'linear-gradient(to top, rgba(10, 15, 36, 1) 0%, rgba(10, 15, 36, 0.8) 70%, transparent 100%)',
          padding: '2rem 1rem 1.5rem',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', width: '100%' }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#fff' }}>
              <div style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                width: '48px', height: '48px', borderRadius: '12px', 
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(5px)', color: '#60a5fa'
              }}>
                {feature.icon}
              </div>
              <span style={{ fontWeight: '600', fontSize: '1.05rem', letterSpacing: '0.5px' }}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Keyframes and global styles for this component */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Custom Pagination */
        .swiper-pagination {
          bottom: 7rem !important;
        }
        .swiper-pagination-bullet {
          background-color: #cbd5e1 !important;
          opacity: 0.4;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #ffffff !important;
          opacity: 1;
          width: 30px;
          border-radius: 4px;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
        }

        /* Mobile padding adjustment */
        @media (max-width: 768px) {
          .swiper-slide > div {
            padding: 2.5rem 1.5rem 6rem 1.5rem !important;
          }
          .swiper-pagination {
            bottom: 6rem !important;
          }
        }
      `}</style>
    </div>
  );
}
