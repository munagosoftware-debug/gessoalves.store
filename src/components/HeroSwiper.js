'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';

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

export default function HeroSwiper() {
  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(27, 42, 92, 0.25)', border: '1px solid rgba(255,255,255,0.2)' }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        style={{ width: '100%', height: '600px' }}
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
                alignItems: 'flex-start',
                padding: '3rem 3.5rem 4.5rem 3.5rem',
                overflow: 'hidden'
              }}
            >
              {/* Background Image with slight scale for premium feel */}
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
              
              {/* Complex Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(110deg, rgba(12, 19, 41, 0.95) 0%, rgba(27, 42, 92, 0.8) 50%, rgba(0, 0, 0, 0.15) 100%)',
                  zIndex: 1
                }}
              />
              
              {/* Content Container */}
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '100%', animation: 'fadeInUp 1s ease-out' }}>
                <h1
                  style={{
                    fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
                    fontWeight: '800',
                    color: '#ffffff',
                    marginBottom: '1rem',
                    lineHeight: '1.2',
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.01em',
                    maxWidth: '90%'
                  }}
                >
                  {slide.title}
                </h1>
                <p
                  style={{
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                    color: '#e2e8f0',
                    maxWidth: '85%',
                    marginBottom: '2rem',
                    lineHeight: '1.5',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    fontWeight: '400'
                  }}
                >
                  {slide.subtitle}
                </p>
                <Link 
                  href={slide.ctaUrl} 
                  target={slide.ctaUrl.startsWith('http') ? '_blank' : '_self'} 
                  className="btn-3d"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '1rem',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: 'linear-gradient(145deg, var(--color-navy), #121c3d)',
                    boxShadow: '0 8px 20px rgba(27, 42, 92, 0.5), inset 0 1px 1px rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    color: '#ffffff'
                  }}
                >
                  {slide.ctaText}
                  <span style={{ fontSize: '1.1rem' }}>→</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Keyframes and global styles for this component */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Custom Pagination */
        .swiper-pagination {
          bottom: 1.5rem !important;
        }
        .swiper-pagination-bullet {
          background-color: #cbd5e1 !important;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #ffffff !important;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }

        /* Mobile padding adjustment */
        @media (max-width: 768px) {
          .swiper-slide > div {
            padding: 2.5rem 2rem 4rem 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
