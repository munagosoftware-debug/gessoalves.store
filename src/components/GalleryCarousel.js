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
    <div className="w-full relative py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          Nossos Projetos
        </h2>
        <p className="text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Confira a qualidade do nosso acabamento e inspire-se com os ambientes transformados.
        </p>
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1.2}
          centeredSlides={true}
          breakpoints={{ 
            640: { slidesPerView: 2.2, centeredSlides: false }, 
            1024: { slidesPerView: 3.5, centeredSlides: false },
            1280: { slidesPerView: 4.2, centeredSlides: false }
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop
          className="pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="transition-transform duration-300 hover:-translate-y-2 pt-4">
              <div className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-md ring-1 ring-slate-200 dark:ring-white/10 flex flex-col cursor-pointer aspect-[4/3]">
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={slide.url}
                    alt={`${slide.service} - ${slide.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Glassmorphism gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                  
                  {/* Content over image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                    {slide.service && (
                      <span className="inline-flex mb-3 items-center rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-inset ring-white/30 shadow-sm">
                        {slide.service}
                      </span>
                    )}
                    <h3 className="text-white font-bold text-lg sm:text-xl leading-tight mb-2 truncate">
                      {slide.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-200 text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 delay-75">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{slide.bairro}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Custom styles for Swiper pagination to match the design system */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #94a3b8 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #4f46e5 !important;
          opacity: 1;
        }
        .dark .swiper-pagination-bullet-active {
          background-color: #6366f1 !important;
        }
      `}</style>
    </div>
  );
}
