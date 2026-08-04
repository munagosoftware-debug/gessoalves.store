import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicesData, getServiceBySlug } from '@/lib/servicesData';
import styles from './page.module.css';

// Generate dynamic metadata based on the service
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

// Generate static params for SSG
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
    <main className={styles.container}>
      <h1 className={styles.title}>{service.title}</h1>
      
      <img 
        src={service.placeholderImg} 
        alt={`Foto do serviço de ${service.title}`} 
        className={styles.heroImage}
      />

      <div className={styles.content}>
        <p className={styles.description}>{service.description}</p>
        
        <h2 className={styles.featuresTitle}>Diferenciais e Acabamentos</h2>
        <ul className={styles.featuresList}>
          {service.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <div className={styles.ctaBox}>
          <h3>Gostou desse serviço?</h3>
          <p>Solicite um orçamento rápido e sem compromisso para o seu ambiente.</p>
          <Link href="https://wa.me/5511937086879" target="_blank" className="btn-3d">
            Orçamento pelo WhatsApp
          </Link>
        </div>
      </div>
    </main>
  );
}
