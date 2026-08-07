'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import Link from 'next/link';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: 'Transforme seu ambiente com a excelência do Gesso e Drywall',
    subtitle: 'Soluções completas em forro acartonado, divisórias acústicas e projetos de iluminação na Zona Sul de SP.',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Solicitar Orçamento no WhatsApp',
    ctaUrl: 'https://wa.me/5511961155049',
  },
  {
    title: 'Divisórias Inteligentes & Isolamento Acústico Premium',
    subtitle: 'Agilidade de montagem, obra limpa e otimização total de espaço residencial e comercial.',
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Ver Nossos Serviços',
    ctaUrl: '/servicos',
  },
  {
    title: 'Sancas de Gesso & Projetos Lumitécnicos Personalizados',
    subtitle: 'Sofisticação e acabamento impecável com quem tem mais de 15 anos de tradição no mercado.',
    bg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Conheça Nossos Trabalhos',
    ctaUrl: '/portfolio',
  },
];

export default function HeroSwiper() {
  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        style={{ width: '100%', height: '480px' }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to right, rgba(27, 42, 92, 0.85), rgba(43, 46, 56, 0.7)), url(${slide.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '3rem 4rem',
                color: '#fff',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: '700',
                  color: '#fff',
                  maxWidth: '750px',
                  marginBottom: '1rem',
                  lineHeight: '1.25',
                }}
              >
                {slide.title}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: 'var(--color-silver-light)',
                  maxWidth: '650px',
                  marginBottom: '2rem',
                }}
              >
                {slide.subtitle}
              </p>
              <Link href={slide.ctaUrl} target={slide.ctaUrl.startsWith('http') ? '_blank' : '_self'} className="btn-3d">
                {slide.ctaText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
