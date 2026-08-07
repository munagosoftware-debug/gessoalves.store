'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function PhotoCarousel({ photos = [] }) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="carousel-wrapper">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        coverflowEffect={{
          rotate: 18,
          stretch: 50,
          depth: 140,
          modifier: 1,
          slideShadows: true,
        }}
        speed={8000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="coverflow-swiper"
      >
        {photos.map((item, index) => {
          const imageUrl = (item.image_urls && item.image_urls[0]) || item.url;
          
          return (
            <SwiperSlide key={`${item.id}-${index}`} className="carousel-slide">
              <div className="carousel-card">
                <Image 
                  src={imageUrl} 
                  alt={`Obra de ${item.client_name}`}
                  className="carousel-image"
                  fill
                  sizes="(max-width: 768px) 260px, 360px"
                  style={{ objectFit: 'cover' }}
                />
                <div className="carousel-overlay">
                  <h3 className="carousel-title">{item.service_type}</h3>
                  <div className="carousel-meta">
                    <span className="carousel-client">{item.client_name}</span>
                    <span className="carousel-bairro">
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
          padding: 2.5rem 0 1.5rem;
        }

        .coverflow-swiper {
          width: 100%;
          padding-bottom: 2rem !important;
          --swiper-theme-color: var(--color-navy);
        }

        .carousel-slide {
          width: 340px !important;
          height: 440px !important;
          transition: all 0.3s ease;
        }

        .carousel-card {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: var(--color-graphite);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
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
          padding: 70px 1.25rem 1.25rem;
          background: linear-gradient(to top, rgba(10, 15, 36, 0.95) 0%, rgba(10, 15, 36, 0.6) 50%, rgba(10, 15, 36, 0) 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .carousel-title {
          font-size: 1.2rem;
          margin: 0 0 0.4rem 0;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 2px 6px rgba(0,0,0,0.9);
          line-height: 1.25;
        }

        .carousel-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #cbd5e1;
          font-weight: 500;
          text-shadow: 0 1px 4px rgba(0,0,0,0.9);
        }

        .carousel-client {
          color: #f1f5f9;
          font-weight: 600;
        }

        .carousel-bairro {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #93c5fd;
        }

        /* RESPONSIVO MOBILE */
        @media (max-width: 768px) {
          .carousel-wrapper {
            padding: 1rem 0;
          }

          .carousel-slide {
            width: 240px !important;
            height: 320px !important;
          }

          .carousel-overlay {
            padding: 40px 1rem 1rem;
          }

          .carousel-title {
            font-size: 1rem;
            margin-bottom: 0.25rem;
          }

          .carousel-meta {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 420px) {
          .carousel-slide {
            width: 215px !important;
            height: 290px !important;
          }

          .carousel-overlay {
            padding: 30px 0.85rem 0.85rem;
          }

          .carousel-title {
            font-size: 0.92rem;
          }

          .carousel-meta {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
