'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import Link from 'next/link';
import { Zap, ShieldCheck, Ruler, Lightbulb, ArrowRight } from 'lucide-react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import styles from './HeroSwiper.module.css';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    title: 'Transforme seu ambiente com a excelência do Gesso e Drywall',
    subtitle: 'Soluções completas em forro acartonado, divisórias acústicas e projetos de iluminação na Zona Sul de SP.',
    bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Solicitar Orçamento Grátis',
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
    title: 'Sancas de Gesso & Projetos Luminotécnicos',
    subtitle: 'Sofisticação e acabamento impecável com quem tem mais de 15 anos de tradição no mercado.',
    bg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Nossos Trabalhos',
    ctaUrl: '/portfolio',
  },
];

const features = [
  { icon: <Ruler size={20} />, text: 'Gesso & Drywall' },
  { icon: <ShieldCheck size={20} />, text: 'Divisórias Acústicas' },
  { icon: <Lightbulb size={20} />, text: 'Sancas & Iluminação' },
  { icon: <Zap size={20} />, text: 'Instalação Rápida' },
];

export default function HeroSwiper() {
  const { openWhatsAppModal } = useWhatsAppModal();

  return (
    <section className={styles.heroWrapper} aria-label="Apresentação Principal">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1200}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        className={styles.swiperContainer}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.slideContent}>
              {/* Background Image */}
              <div
                className={styles.slideBg}
                style={{ backgroundImage: `url(${slide.bg})` }}
              />
              
              {/* Overlay Gradient */}
              <div className={styles.slideOverlay} />
              
              {/* Content Box */}
              <div className={styles.innerContent}>
                <h1 className={styles.heroTitle}>
                  {slide.title}
                </h1>
                <p className={styles.heroSubtitle}>
                  {slide.subtitle}
                </p>
                <div className={styles.ctaGroup}>
                  {slide.ctaUrl.includes('wa.me') ? (
                    <button
                      onClick={() => openWhatsAppModal('Olá! Gostaria de um orçamento para o meu projeto de gesso/drywall.')}
                      className={styles.btnPrimary}
                      aria-label="Solicitar orçamento pelo WhatsApp"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <Link 
                      href={slide.ctaUrl} 
                      className={styles.btnPrimary}
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight size={18} />
                    </Link>
                  )}
                  <Link 
                    href="/portfolio" 
                    className={styles.btnSecondary}
                  >
                    Ver Portfólio
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Desktop Features Bar - Overlaid at the bottom */}
      <div className={styles.featuresBar}>
        <div className={styles.featuresList}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <span className={styles.featureText}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Features Strip - Below the hero fold to prevent overlap */}
      <div className={styles.mobileFeaturesStrip}>
        <div className={styles.mobileFeaturesGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.mobileFeatureItem}>
              <div className={styles.mobileFeatureIcon}>
                {feature.icon}
              </div>
              <span className={styles.mobileFeatureText}>{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx global>{`
        .swiper-pagination {
          bottom: 6.5rem !important;
          z-index: 15 !important;
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

        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
