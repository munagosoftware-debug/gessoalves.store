import Link from 'next/link';
import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
import CoverageMap from '@/components/CoverageMap';

export const metadata = {
  title: 'Fale Conosco e Solicite seu Orçamento | Gessoalves',
  description: 'Entre em contato com a Gessoalves. Atendemos o Butantã e região de São Paulo. Peça seu orçamento de gesso e drywall pelo WhatsApp ou telefone.',
};

export default function Contato() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Entre em Contato</h1>
      
      <div className={styles.grid}>
        <div className={styles.infoSection}>
          <h2>Fale com nossos especialistas</h2>
          
          <div className={styles.infoItem}>
            <h3>WhatsApp</h3>
            <p><Link href="https://wa.me/5511961155049" target="_blank" style={{color: 'var(--color-primary)'}}>(11) 96115-5049</Link></p>
          </div>
          
          <div className={styles.infoItem}>
            <h3>Telefone Fixo</h3>
            <p>(11) 4213-2271</p>
          </div>
          
          <div className={styles.infoItem}>
            <h3>Área de Atendimento</h3>
            <p>Butantã, Vila Indiana e região (raio de 20km em São Paulo).</p>
          </div>

          <div className={styles.mapContainer}>
            <CoverageMap />
          </div>
        </div>

        <div className={styles.formPlaceholder}>
          <h3>Formulário de Orçamento</h3>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
