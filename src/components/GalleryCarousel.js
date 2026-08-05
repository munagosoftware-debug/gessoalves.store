'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function GalleryCarousel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/gallery/approved?limit=10')
      .then(r => r.json())
      .then(({ data }) => setItems(data || []))
      .catch(() => {});
  }, []);

  // Achatar: cada imagem vira um slide
  const slides = items.flatMap(item =>
    item.image_urls.map(url => ({ url, name: item.name, service: item.service, bairro: item.bairro }))
  );

  if (slides.length === 0) return null;

  return (
    <div style={{ width: '100%' }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{ 640: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        style={{ paddingBottom: '2rem' }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
              <img
                src={slide.url}
                alt={`${slide.service} - ${slide.name}`}
                style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div style={{ padding: '8px 10px' }}>
                <p style={{ color: '#ccc', fontSize: '0.75rem', margin: 0 }}>{slide.name}</p>
                <p style={{ color: '#aaa', fontSize: '0.7rem', margin: 0 }}>📍 {slide.bairro}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
