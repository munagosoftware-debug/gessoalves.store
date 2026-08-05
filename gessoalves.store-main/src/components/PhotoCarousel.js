'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function PhotoCarousel({ photos = [] }) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="carousel-wrapper" style={{ width: '100%', padding: '3rem 0' }}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        speed={9000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="coverflow-swiper"
      >
        {photos.map((item, index) => {
          const imageUrl = (item.image_urls && item.image_urls[0]) || item.url;
          
          return (
            <SwiperSlide key={`${item.id}-${index}`} style={{ width: '320px', height: '420px' }}>
              <div className="carousel-card">
                <img 
                  src={imageUrl} 
                  alt={`Obra de ${item.client_name}`}
                  className="carousel-image"
                  loading="lazy"
                />
                <div className="carousel-overlay">
                  <h3 className="carousel-title">{item.service_type}</h3>
                  <div className="carousel-meta">
                    <span>{item.client_name}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      📍 {item.bairro}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <style jsx global>{`
        /* Movimento contínuo linear sem pausas */
        .coverflow-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .carousel-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .coverflow-swiper {
          width: 100%;
          padding-bottom: 3rem !important; /* espaço pra paginação */
          --swiper-theme-color: var(--color-navy);
        }
        
        .carousel-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #f1f5f9;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          /* Fix para bordas vazando no Safari/iOS durante animação 3D */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          -webkit-mask-image: -webkit-radial-gradient(white, black);
        }

        .carousel-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        /* Degradê na Base da Imagem */
        .carousel-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 80px 1.5rem 1.5rem;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .carousel-title {
          font-size: 1.3rem;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
          color: #ffffff; /* Forçando branco, pois estava puxando azul do h3 global */
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .carousel-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: #cbd5e1;
          font-weight: 500;
          text-shadow: 0 1px 3px rgba(0,0,0,0.8);
        }

        .swiper-pagination-bullet-active {
          background: var(--color-navy) !important;
        }
      `}</style>
    </div>
  );
}
