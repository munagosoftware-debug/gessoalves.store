import Link from 'next/link';
import { servicesData } from '@/lib/servicesData';
import styles from './page.module.css';
import GsapProvider from '@/components/GsapProvider';
import HeroSwiper from '@/components/HeroSwiper';
import DrywallHero3D from '@/components/DrywallHero3D';
import ServiceCard3D from '@/components/ServiceCard3D';
import CounterUp from '@/components/CounterUp';
import PinnedBeforeAfter from '@/components/PinnedBeforeAfter';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TestimonialsSwiper from '@/components/TestimonialsSwiper';
import FAQAccordion from '@/components/FAQAccordion';
import CoverageMap from '@/components/CoverageMap';

export const metadata = {
  title: 'Gessoalves | Instalação de Gesso, Drywall e Sancas em SP',
  description: 'Gessoalves: Referência em gesso acartonado, drywall, sancas e iluminação na Zona Sul de São Paulo. Efeitos 3D, agilidade e garantia.',
};

export default function Home() {
  const bairros = ['Morumbi', 'Santo Amaro', 'Granja Julieta', 'Chácara Santo Antônio', 'Saúde', 'Interlagos', 'Campo Belo'];

  return (
    <GsapProvider>
      <main style={{ overflowX: 'hidden' }}>
        {/* HERO SECTION COM SWIPER + ELEMENTO 3D LEVE (THREE.JS) */}
        <section className={styles.heroSection} style={{ padding: '2rem 1.5rem', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div className="gsap-reveal">
              <HeroSwiper />
            </div>
            <div className="gsap-reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DrywallHero3D />
              <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem', textAlign: 'center' }}>
                Modelo 3D interativo • Placa de Gesso Acartonado Gessoalves
              </p>
            </div>
          </div>
        </section>

        {/* CONTADORES NUMÉRICOS ANIMADOS VIA SCROLLTRIGGER */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
          <CounterUp />
        </section>

        {/* SERVIÇOS EM DESTAQUE COM TILT 3D & FLIP 3D CARD */}
        <section className={styles.section} style={{ background: '#ffffff' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="gsap-reveal">
              <span style={{ background: 'var(--color-navy)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                Especialidades
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: '0.5rem' }}>
                Nossos Serviços (Passe o mouse ou toque para girar em 3D)
              </h2>
              <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
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
                />
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO PINADA (STICKY SCROLL) COMPARATIVO ANTES / DEPOIS */}
        <PinnedBeforeAfter />

        {/* CARROSSEL COMPARATIVO ANTES / DEPOIS POR OBRA */}
        <section className={styles.section} style={{ background: '#f6f8fb' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="gsap-reveal">
              <h2 className={styles.sectionTitle}>Antes & Depois Interativo por Obra</h2>
              <p style={{ color: '#666' }}>Arraste o divisor central para comparar a transformação de nossas obras.</p>
            </div>
            <BeforeAfterSlider />
          </div>
        </section>

        {/* POR QUE ESCOLHER A GESSOALVES */}
        <section className={styles.section}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
              Por que a Gessoalves é a melhor escolha?
            </h2>
            <div className="gsap-stagger-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div className="metallic-card" style={{ padding: '2rem' }}>
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />
                <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.8rem' }}>⚡ Pontualidade Rigorosa</h3>
                <p>Cumprimento estrito do cronograma combinado sem atrasos surpresa na sua reforma.</p>
              </div>

              <div className="metallic-card" style={{ padding: '2rem' }}>
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />
                <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.8rem' }}>🛡️ Materiais Certificados</h3>
                <p>Utilização exclusiva de perfis em aço galvanizado e chapas acartonadas padrão ABNT.</p>
              </div>

              <div className="metallic-card" style={{ padding: '2rem' }}>
                <div className="metallic-screw screw-tl" />
                <div className="metallic-screw screw-tr" />
                <div className="metallic-screw screw-bl" />
                <div className="metallic-screw screw-br" />
                <h3 style={{ color: 'var(--color-navy)', marginBottom: '0.8rem' }}>🧹 Obra Organizada & Limpa</h3>
                <p>Proteção integral dos seus móveis e piso com descarte ecológico do entulho.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ÁREA DE ATUAÇÃO COM MAPA VISUAL */}
        <section className={styles.section} style={{ background: '#ffffff' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }} className="gsap-reveal">
            <CoverageMap />
          </div>
        </section>

        {/* DEPOIMENTOS COM ESTRELAS (SWIPER.JS) */}
        <section className={styles.section} style={{ background: '#f6f8fb' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="gsap-reveal">
              <h2 className={styles.sectionTitle}>Depoimentos de Clientes Satisfeitos</h2>
              <p style={{ color: '#666' }}>Veja quem já transformou seu espaço com a Gessoalves.</p>
            </div>
            <TestimonialsSwiper />
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES (FAQ) */}
        <section className={styles.section} style={{ background: '#ffffff' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }} className="gsap-reveal">
              <span style={{ background: 'var(--color-navy)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem' }}>
                Dúvidas
              </span>
              <h2 className={styles.sectionTitle} style={{ marginTop: '0.5rem' }}>Perguntas Frequentes</h2>
              <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto' }}>
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
            <Link
              href="https://wa.me/5511961155049"
              target="_blank"
              className="btn-3d"
              style={{
                fontSize: '1.2rem',
                padding: '16px 36px',
                background: 'linear-gradient(145deg, var(--color-silver-light), #ffffff)',
                color: 'var(--color-navy)',
              }}
            >
              Falar com Especialista no WhatsApp
            </Link>
          </div>
        </section>
      </main>
    </GsapProvider>
  );
}
