'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const projects = [
  {
    title: 'Reforma de Sala Residencial no Morumbi',
    before: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    details: 'Instalação de 85m² de forro de drywall com cortineiro iluminado e sancas decorativas em 3 dias.',
  },
  {
    title: 'Adequação de Escritório Corporativo em Moema',
    before: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    details: 'Divisórias duplas em drywall com lã de rocha para isolamento acústico entre salas de reuniões.',
  },
];

export default function BeforeAfterSlider() {
  const [slidersVal, setSlidersVal] = useState(projects.map(() => 50));

  const handleSliderChange = (idx, val) => {
    const next = [...slidersVal];
    next[idx] = val;
    setSlidersVal(next);
  };

  return (
    <div style={{ width: '100%', padding: '1.5rem 0' }}>
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        style={{ paddingBottom: '3.5rem' }}
      >
        {projects.map((proj, idx) => {
          const percent = slidersVal[idx] !== undefined ? slidersVal[idx] : 50;
          return (
            <SwiperSlide key={idx}>
              <div
                className="metallic-card"
                style={{
                  padding: '1.5rem',
                  borderRadius: '16px',
                }}
              >
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />

                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  {proj.title}
                </h3>
                <p style={{ color: 'var(--color-silver-light)', fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                  {proj.details}
                </p>

                {/* Container comparativo com slider manual */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '380px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    userSelect: 'none',
                  }}
                >
                  {/* ANTES */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${proj.before})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <span style={{ position: 'absolute', top: 15, left: 15, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 10px', borderRadius: 4, fontWeight: 'bold' }}>
                      ANTES
                    </span>
                  </div>

                  {/* DEPOIS */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${proj.after})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      clipPath: `inset(0 ${100 - percent}% 0 0)`,
                    }}
                  >
                    <span style={{ position: 'absolute', top: 15, right: 15, background: 'var(--color-navy)', color: '#fff', padding: '4px 10px', borderRadius: 4, fontWeight: 'bold' }}>
                      DEPOIS
                    </span>
                  </div>

                  {/* Range Slider Overlay */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={percent}
                    onChange={(e) => handleSliderChange(idx, Number(e.target.value))}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'ew-resize',
                      zIndex: 10,
                    }}
                  />

                  {/* Divider line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${percent}%`,
                      width: '3px',
                      background: '#fff',
                      boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                      pointerEvents: 'none',
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--color-navy)',
                        border: '2px solid #fff',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      ↔
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
