import styles from './page.module.css';
import ContactForm from '@/components/ContactForm';
import CoverageMap from '@/components/CoverageMap';
import { ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Fale Conosco e Solicite seu Orçamento | Gessoalves',
  description: 'Entre em contato com a Gessoalves. Atendemos o Butantã e região de São Paulo num raio de até 20km. Peça seu orçamento gratuito de gesso e drywall.',
};

export default function Contato() {
  return (
    <main className={styles.pageWrapper}>
      {/* Header / Hero da Página */}
      <section className={styles.heroSection}>
        <div className={styles.badge}>
          <Sparkles size={16} />
          <span>Atendimento Personalizado</span>
        </div>
        <h1 className={styles.title}>Solicite seu Orçamento</h1>
        <p className={styles.subtitle}>
          Conte com a excelência da Gessoalves para transformar seu ambiente com projetos de gesso, drywall e iluminação sob medida.
        </p>
      </section>

      {/* Grid Principal 50/50 em Toda a Largura */}
      <section className={styles.contentSection}>
        <div className={styles.mainGrid}>
          {/* Coluna Esquerda: Área de Atuação e Localização */}
          <div className={styles.leftColumn}>
            <div className={styles.locationCard}>
              <CoverageMap />
            </div>

            {/* Destaques de Confiança */}
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4>Garantia & Qualidade</h4>
                  <p>Materiais de 1ª linha e mão de obra qualificada.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4>Resposta Ágil</h4>
                  <p>Orçamentos rápidos e atendimento sem compromisso.</p>
                </div>
              </div>

              <div className={styles.trustItem}>
                <div className={styles.trustIcon}>
                  <Award size={22} />
                </div>
                <div>
                  <h4>Tradição em SP</h4>
                  <p>Atuação sólida no Butantã e bairros vizinhos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Orçamento */}
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2>Formulário de Orçamento</h2>
                <p>Preencha os campos abaixo e entraremos em contato com a sua proposta.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

