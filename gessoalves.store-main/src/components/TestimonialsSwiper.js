'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Carlos Mendes',
    bairro: 'Morumbi, SP',
    text: 'A equipe da Gessoalves transformou minha sala com o teto rebaixado e iluminação de LED embutida. Trabalho muito limpo, pontual e rápido!',
    rating: 5,
    date: 'Há 2 semanas',
  },
  {
    name: 'Fernanda Costa',
    bairro: 'Chácara Santo Antônio, SP',
    text: 'Fizemos as divisórias do nosso escritório corporativo em drywall. A agilidade e a qualidade do isolamento acústico superaram nossas expectativas.',
    rating: 5,
    date: 'Há 1 mês',
  },
  {
    name: 'Roberto Silva',
    bairro: 'Campo Belo, SP',
    text: 'Atendimento impecável do orçamento à entrega. A sanca aberta de gesso na varanda gourmet ficou espetacular. Super recomendo a Gessoalves!',
    rating: 5,
    date: 'Há 3 semanas',
  },
  {
    name: 'Mariana Oliveira',
    bairro: 'Moema, SP',
    text: 'Excelente custo-benefício e profissionais extremamente organizados. Protegeram todos os móveis e entregaram no prazo combinado.',
    rating: 5,
    date: 'Há 2 meses',
  },
];

export default function TestimonialsSwiper() {
  // Gerar JSON-LD de AggregateRating e Reviews
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Gessoalves",
    "image": "https://gessoalves.store/logo.png",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": testimonials.length.toString()
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "datePublished": "2023-10-01", // Placeholder
      "reviewBody": t.text,
      "reviewRating": {
        "@type": "Rating",
        "bestRating": "5",
        "ratingValue": t.rating.toString(),
        "worstRating": "1"
      }
    }))
  };

  return (
    <div style={{ width: '100%', padding: '1rem 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        style={{ paddingBottom: '3.5rem' }}
      >
        {testimonials.map((t, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="metallic-card"
              style={{
                padding: '2rem 1.8rem',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div className="metallic-screw screw-tl" />
              <div className="metallic-screw screw-tr" />
              <div className="metallic-screw screw-bl" />
              <div className="metallic-screw screw-br" />

              <div>
                {/* Estrelas */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem', color: '#f59e0b' }}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#444', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "{t.text}"
                </p>
              </div>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-silver-light)', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', margin: 0 }}>
                  {t.name}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#777', marginTop: '2px' }}>
                  <span>{t.bairro}</span>
                  <span>{t.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
