import Link from 'next/link';
import { servicesData } from '@/lib/servicesData';
import styles from './page.module.css';
import GsapProvider from '@/components/GsapProvider';
import HeroSwiper from '@/components/HeroSwiper';
import ServiceCard3D from '@/components/ServiceCard3D';
import CounterUp from '@/components/CounterUp';
import PinnedBeforeAfter from '@/components/PinnedBeforeAfter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TestimonialsSwiper from '@/components/TestimonialsSwiper';
import FAQAccordion from '@/components/FAQAccordion';
import CoverageMap from '@/components/CoverageMap';
import PhotoCarousel from '@/components/PhotoCarousel';
import MarqueeBanner from '@/components/MarqueeBanner';
import WhatsAppCTAButton from '@/components/WhatsAppCTAButton';

const MOCK_PHOTOS = [
  {
    id: 1,
    image_urls: ['https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80'],
    client_name: 'João Carlos',
    service_type: 'Sanca de Gesso',
    bairro: 'Vila Mariana'
  },
  {
    id: 2,
    image_urls: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'],
    client_name: 'Mariana Silva',
    service_type: 'Forro Acartonado',
    bairro: 'Itaim Bibi'
  },
  {
    id: 3,
    image_urls: ['https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&q=80'],
    client_name: 'Roberto Nunes',
    service_type: 'Parede de Drywall',
    bairro: 'Moema'
  },
  {
    id: 4,
    image_urls: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'],
    client_name: 'Amanda Costa',
    service_type: 'Molduras de Gesso',
    bairro: 'Pinheiros'
  },
  {
    id: 5,
    image_urls: ['https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80'],
    client_name: 'Carlos Mendes',
    service_type: 'Forro Modular',
    bairro: 'Santo Amaro'
  },
  {
    id: 6,
    image_urls: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80'],
    client_name: 'Luciana Farias',
    service_type: 'Rebaixamento de Teto',
    bairro: 'Tatuapé'
  },
  {
    id: 7,
    image_urls: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'],
    client_name: 'Paulo Gustavo',
    service_type: 'Projeto de Iluminação Embutida',
    bairro: 'Vila Madalena'
  },
  {
    id: 8,
    image_urls: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
    client_name: 'Empresa Alpha',
    service_type: 'Forro Comercial Acartonado',
    bairro: 'Av. Paulista'
  },
  {
    id: 9,
    image_urls: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'],
    client_name: 'Camila Rodrigues',
    service_type: 'Sanca Invertida com LED',
    bairro: 'Jardins'
  },
  {
    id: 10,
    image_urls: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'],
    client_name: 'Pedro Álvares',
    service_type: 'Acabamento Liso em Gesso',
    bairro: 'Morumbi'
  }
];

export const metadata = {
  title: 'Gessoalves | Instalação de Gesso, Drywall e Sancas em SP',
  description: 'Gessoalves: Referência em gesso acartonado, drywall, sancas e iluminação na Zona Sul de São Paulo. Efeitos 3D, agilidade e garantia.',
};

export default function Home() {
  const bairros = ['Morumbi', 'Santo Amaro', 'Granja Julieta', 'Chácara Santo Antônio', 'Saúde', 'Interlagos', 'Campo Belo'];
  const photos = MOCK_PHOTOS;

  const bannerItemsDark = [
    'ORÇAMENTO RÁPIDO',
    'QUALIDADE PREMIUM',
    'DRYWALL',
    'SANCAS DE GESSO',
    'ILUMINAÇÃO DECORATIVA',
    'PROJETOS 3D'
  ];

  const bannerItemsLight = [
    'TRANSFORME SEU AMBIENTE',
    'ATENDIMENTO VIA WHATSAPP',
    'OBRA LIMPA E ORGANIZADA',
    'MATERIAIS CERTIFICADOS',
    'PONTUALIDADE'
  ];

  return (
    <GsapProvider>
      <main style={{ overflowX: 'hidden' }}>
        {/* HERO SECTION COM SWIPER */}
        <section className={styles.heroSection} style={{ width: '100vw', margin: 0, padding: 0 }}>
          <div className="gsap-reveal" style={{ display: 'flex', width: '100%' }}>
            <HeroSwiper />
          </div>
        </section>

        {/* CONTADORES NUMÉRICOS ANIMADOS VIA SCROLLTRIGGER */}
        <section style={{ width: '100%', padding: '0' }}>
          <CounterUp />
        </section>

        {/* FAIXA HORIZONTAL - LETREIRO ANIMADO (DARK) */}
        <MarqueeBanner items={bannerItemsDark} variant="dark" />

        {/* CARROSSEL DE FOTOS EM DESTAQUE */}
        {photos && photos.length > 0 && (
          <section style={{ padding: '4rem 0 2rem 0', background: 'var(--color-navy)' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', overflow: 'hidden' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="gsap-reveal">
                <h2 className={styles.sectionTitle} style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Nossas Obras Recentes</h2>
                <p style={{ color: 'var(--color-silver-light)' }}>Deslize para ver detalhes dos nossos acabamentos premium.</p>
              </div>
              <PhotoCarousel photos={photos} />
            </div>
          </section>
        )}

        {/* SERVIÇOS EM DESTAQUE COM TILT 3D & FLIP 3D CARD */}
        <section className={styles.section} style={{ background: 'var(--color-graphite)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="gsap-reveal">
              <span style={{ background: 'var(--color-navy)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid var(--color-silver-dark)' }}>
                Especialidades
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: '0.5rem', color: '#fff' }}>
                Nossos Serviços (Passe o mouse ou toque para girar em 3D)
              </h2>
              <p style={{ color: 'var(--color-silver-light)', maxWidth: '600px', margin: '0 auto' }}>
                Conheça nossas soluções completas com acabamento metálico de alta durabilidade e isolamento acústico.
              </p>
            </div>

            <div className="gsap-stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {servicesData.map((service, idx) => (
                <ServiceCard3D
                  key={service.slug}
                  title={service.title}
                  description={service.description}
                  iconIndex={idx}
                  slug={service.slug}
                  image={service.placeholderImg}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO PINADA (STICKY SCROLL) COMPARATIVO ANTES / DEPOIS */}
        <PinnedBeforeAfter />

        {/* CARROSSEL COMPARATIVO ANTES / DEPOIS POR OBRA */}
        <section className={styles.section} style={{ background: 'var(--color-navy)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="gsap-reveal">
              <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Antes & Depois Interativo por Obra</h2>
              <p style={{ color: 'var(--color-silver-light)' }}>Arraste o divisor central para comparar a transformação de nossas obras.</p>
            </div>
            <BeforeAfterSlider />
          </div>
        </section>

        {/* POR QUE ESCOLHER A GESSOALVES */}
        <section className={styles.section} style={{ background: 'var(--color-graphite)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center', color: '#fff' }}>
              Por que a Gessoalves é a melhor escolha?
            </h2>
            <div className="gsap-stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="metallic-card" style={{ padding: '2rem' }}>
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />
                <h3 style={{ color: '#fff', marginBottom: '0.8rem' }}>⚡ Pontualidade Rigorosa</h3>
                <p style={{ color: 'var(--color-silver-light)' }}>Cumprimento estrito do cronograma combinado sem atrasos surpresa na sua reforma.</p>
              </div>

              <div className="metallic-card" style={{ padding: '2rem' }}>
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />
                <h3 style={{ color: '#fff', marginBottom: '0.8rem' }}>🛡️ Materiais Certificados</h3>
                <p style={{ color: 'var(--color-silver-light)' }}>Utilização exclusiva de perfis em aço galvanizado e chapas acartonadas padrão ABNT.</p>
              </div>

              <div className="metallic-card" style={{ padding: '2rem' }}>
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />
                <h3 style={{ color: '#fff', marginBottom: '0.8rem' }}>🧹 Obra Organizada & Limpa</h3>
                <p style={{ color: 'var(--color-silver-light)' }}>Proteção integral dos seus móveis e piso com descarte ecológico do entulho.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ÁREA DE ATUAÇÃO COM MAPA VISUAL */}
        <section className={styles.section} style={{ background: 'var(--color-navy)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }} className="gsap-reveal">
            <CoverageMap />
          </div>
        </section>

        {/* FAIXA HORIZONTAL - LETREIRO ANIMADO (LIGHT) */}
        <MarqueeBanner items={bannerItemsLight} variant="light" />

        {/* DEPOIMENTOS COM ESTRELAS (SWIPER.JS) */}
        <section className={styles.section} style={{ background: 'var(--color-graphite)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="gsap-reveal">
              <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Depoimentos de Clientes Satisfeitos</h2>
              <p style={{ color: 'var(--color-silver-light)' }}>Veja quem já transformou seu espaço com a Gessoalves.</p>
            </div>
            <TestimonialsSwiper />
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section className={styles.section} style={{ background: 'var(--color-navy)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="gsap-reveal">
              <span style={{ background: 'var(--color-graphite)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid var(--color-silver-dark)' }}>
                Dúvidas
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: '0.5rem', color: '#fff' }}>Perguntas Frequentes</h2>
              <p style={{ color: 'var(--color-silver-light)', maxWidth: '500px', margin: '0 auto' }}>
                Tira suas dúvidas sobre gesso, drywall e nossos serviços antes de solicitar um orçamento.
              </p>
            </div>
            <FAQAccordion />
          </div>
        </section>

        {/* CTA FINAL */}
        <section
          style={{
            background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-graphite) 100%)',
            color: '#fff',
            padding: '4rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }} className="gsap-reveal">
            <h2 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '1rem' }}>
              Pronto para dar vida ao seu projeto de Gesso ou Drywall?
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-silver-light)', marginBottom: '2rem' }}>
              Receba um atendimento personalizado com orçamento rápido diretamente pelo WhatsApp.
            </p>
            <WhatsAppCTAButton
              message="Olá! Gostaria de falar com um especialista e solicitar um orçamento."
              className="btn-3d"
              style={{
                fontSize: '1.2rem',
                padding: '16px 36px',
                background: 'linear-gradient(145deg, var(--color-silver-light), #ffffff)',
                color: 'var(--color-navy)',
                cursor: 'pointer',
                border: 'none',
                fontWeight: '600',
              }}
            >
              Falar com Especialista no WhatsApp
            </WhatsAppCTAButton>
          </div>
        </section>
      </main>
    </GsapProvider>
  );
}
