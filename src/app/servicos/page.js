import Link from 'next/link';
import { servicesData } from '@/lib/servicesData';
import styles from './page.module.css';

export const metadata = {
  title: 'Nossos Serviços de Gesso e Drywall | Gessoalves',
  description: 'Conheça nossos serviços especializados: Forro de gesso acartonado, drywall, sancas, molduras, rebaixamento e forro modular na Zona Sul de SP.',
};

export default function Servicos() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Nossos Serviços</h1>
      
      <div className={styles.grid}>
        {servicesData.map(service => (
          <div key={service.slug} className={styles.card}>
            <img 
              src={service.placeholderImg} 
              alt={`Imagem representativa de ${service.title}`} 
              className={styles.imagePlaceholder}
            />
            <div className={styles.content}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link href={`/servicos/${service.slug}`} className="btn-3d" style={{ textAlign: 'center' }}>
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
