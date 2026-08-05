import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicesData, getServiceBySlug } from '@/lib/servicesData';
import styles from './page.module.css';
import GallerySwiper from '@/components/GallerySwiper';
import GsapProvider from '@/components/GsapProvider';

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
          <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
            {service.description}
          </p>
        </div>

        {/* CARROSSEL DE FOTOS DO SERVIÇO */}
        <section className="gsap-reveal" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--color-navy)', marginBottom: '1rem' }}>
            Galeria de Obras e Exemplos
          </h2>
          <GallerySwiper />
        </section>

        <div className={styles.content}>
          <div className="metallic-card gsap-reveal" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
            <div className="metallic-screw screw-tl" />
            <div className="metallic-screw screw-tr" />
            <div className="metallic-screw screw-bl" />
            <div className="metallic-screw screw-br" />

            <h2 className={styles.featuresTitle}>Diferenciais e Padrão de Qualidade</h2>
            <ul className={styles.featuresList}>
              {service.features.map((feature, index) => (
                <li key={index} style={{ fontSize: '1.05rem', marginBottom: '0.8rem' }}>
                  ✓ {feature}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="metallic-card gsap-reveal"
            style={{
              padding: '2.5rem 2rem',
              borderRadius: '16px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-graphite) 100%)',
              color: '#fff',
            }}
          >
            <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '0.8rem' }}>
              Pronto para instalar {service.title.toLowerCase()} no seu imóvel?
            </h3>
            <p style={{ color: 'var(--color-silver-light)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              Atendimento rápido na Zona Sul de São Paulo com orçamento sob medida e garantia de fábrica.
            </p>
            <Link href="https://wa.me/5511961155049" target="_blank" className="btn-3d">
              Solicitar Orçamento no WhatsApp
            </Link>
          </div>
        </div>
      </main>
    </GsapProvider>
  );
}
