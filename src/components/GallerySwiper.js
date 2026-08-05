'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function GallerySwiper({ images = [] }) {
  const defaultImages = [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', caption: 'Forro Rebaixado com Iluminação Embutida' },
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80', caption: 'Sanca Aberta com Fita LED Warm Light' },
    { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80', caption: 'Divisória Drywall em Escritório Comercial' },
    { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80', caption: 'Acabamento de Alto Padrão em Gesso Smooth' },
  ];

  const list = images.length > 0 ? images : defaultImages;

  return (
    <div style={{ width: '100%', padding: '1rem 0' }}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        style={{ paddingBottom: '3rem' }}
      >
        {list.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="metallic-card"
              style={{
                height: '280px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '14px',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${img.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(27,42,92,0.9))',
                  color: '#fff',
                  padding: '1.2rem 1rem 0.8rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                }}
              >
                {img.caption}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
