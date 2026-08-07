import Link from 'next/link';
import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
import CoverageMap from '@/components/CoverageMap';
import WhatsAppCTAButton from '@/components/WhatsAppCTAButton';

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
            <p>
              <WhatsAppCTAButton 
                message="Olá! Gostaria de falar com um especialista e solicitar um orçamento." 
                style={{color: 'var(--color-primary)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit'}}
              >
                (11) 96115-5049
              </WhatsAppCTAButton>
            </p>
          </div>
          
          <div className={styles.infoItem}>
            <h3>Telefone Fixo</h3>
            <p>(11) 4213-2271</p>
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
