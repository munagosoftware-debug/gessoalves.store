import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicesData, getServiceBySlug } from '@/lib/servicesData';
import styles from './page.module.css';
import GallerySwiper from '@/components/GallerySwiper';
import GsapProvider from '@/components/GsapProvider';
import WhatsAppCTAButton from '@/components/WhatsAppCTAButton';

export function generateMetadata({ params }) {
  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    return {
      title: 'Serviço não encontrado | Gessoalves',
    };
  }

  return {
    title: `${service.title} | Gessoalves - Instalação na Zona Sul`,
    description: service.description,
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicoDetalhes({ params }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <GsapProvider>
      <main className={styles.container}>
        <div className="gsap-reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className={styles.title}>{service.title}</h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            {service.description}
          </p>
        </div>

        {/* CARROSSEL DE FOTOS DO SERVIÇO */}
        <section className="gsap-reveal" style={{ marginBottom: '4rem', marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#1e293b', marginBottom: '1.5rem', fontWeight: '700', textAlign: 'center' }}>
            Galeria de Obras e Exemplos
          </h2>
          <GallerySwiper />
        </section>

        <div className={styles.content}>
          <div className="gsap-reveal" style={{ background: '#ffffff', padding: '3rem', borderRadius: '16px', marginBottom: '2rem', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h2 className={styles.featuresTitle}>Diferenciais e Padrão de Qualidade</h2>
            <ul className={styles.featuresList}>
              {service.features.map((feature, index) => (
                <li key={index} style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#475569' }}>
                  <span style={{ color: '#1e293b', fontWeight: 'bold', marginRight: '8px' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="gsap-reveal"
            style={{
              padding: '3.5rem 2rem',
              borderRadius: '16px',
              textAlign: 'center',
              background: '#f8fafc',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
            }}
          >
            <h3 style={{ color: '#1e293b', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: '700' }}>
              Pronto para instalar {service.title.toLowerCase()} no seu imóvel?
            </h3>
            <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Atendimento rápido na Zona Sul de São Paulo com orçamento sob medida e garantia de fábrica.
            </p>
            <WhatsAppCTAButton 
              message={`Olá! Gostaria de saber mais sobre ${service.title} e solicitar um orçamento.`} 
              className={styles.premiumBtn}
            >
              Solicitar Orçamento no WhatsApp
            </WhatsAppCTAButton>
          </div>
        </div>
      </main>
    </GsapProvider>
  );
}
