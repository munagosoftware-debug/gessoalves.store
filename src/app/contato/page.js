import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Fale Conosco e Solicite seu Orçamento | Gessoalves',
  description: 'Entre em contato com a Gessoalves. Atendemos toda a Zona Sul de SP. Peça seu orçamento de gesso e drywall pelo WhatsApp ou telefone.',
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
            <p><Link href="https://wa.me/5511937086879" target="_blank" style={{color: 'var(--color-primary)'}}>(11) 93708-6879</Link></p>
          </div>
          
          <div className={styles.infoItem}>
            <h3>Telefone Fixo</h3>
            <p>(11) 4213-2271</p>
          </div>
          
          <div className={styles.infoItem}>
            <h3>Área de Atendimento</h3>
            <p>Morumbi, Santo Amaro, Granja Julieta, Chácara Santo Antônio, Saúde e bairros vizinhos (Zona Sul SP).</p>
          </div>

          <div className={styles.mapContainer}>
            <p>[Mapa da Zona Sul será renderizado aqui na Etapa 6]</p>
          </div>
        </div>

        <div className={styles.formPlaceholder}>
          <h3>Formulário de Orçamento</h3>
          <p style={{ color: 'var(--color-text)', marginBottom: '1.5rem' }}>
            O formulário interativo de contato será implementado na Etapa 6.
          </p>
          <Link href="https://wa.me/5511937086879" target="_blank" className="btn-3d">
            Fale conosco pelo WhatsApp enquanto isso
          </Link>
        </div>
      </div>
    </main>
  );
}
