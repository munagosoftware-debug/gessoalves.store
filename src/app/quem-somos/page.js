'use client';

import { useState } from 'react';
import { Target, Eye, Gem, Instagram, Facebook } from 'lucide-react';
import styles from './page.module.css';

// Meta data should ideally be in a layout or a separate server component when using 'use client'
// but for simplicity in Next.js 13+ App router, we can put it in a layout.js for this specific folder 
// or export it if we separate the client component. 
// Since we need interactivity for tabs, I'll use 'use client'.
// Note: To have metadata and 'use client' on the same page, we actually need to separate them.
// Let me refactor this to a standard functional component and handle the tabs state.

export default function QuemSomos() {
  const [activeTab, setActiveTab] = useState('missao');

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Quem Somos</h1>
      
      <div className={styles.history}>
        <p>A Gessoalves nasceu com o propósito de transformar ambientes na Zona Sul de São Paulo. Com anos de experiência no mercado de construção a seco (drywall) e acabamentos em gesso, nos destacamos pelo compromisso com a qualidade e o cumprimento rigoroso dos prazos.</p>
        <br/>
        <p>Nossa equipe é formada por profissionais altamente qualificados, preparados para entender a sua necessidade e entregar soluções estéticas e funcionais, seja em projetos residenciais, comerciais ou corporativos. Trabalhamos apenas com materiais certificados, garantindo a segurança e durabilidade que sua obra merece.</p>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabButtonsWrapper}>
          <div className={styles.tabButtons}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'missao' ? styles.active : ''}`}
              onClick={() => setActiveTab('missao')}
            >
              <Target size={20} /> Missão
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'visao' ? styles.active : ''}`}
              onClick={() => setActiveTab('visao')}
            >
              <Eye size={20} /> Visão
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'valores' ? styles.active : ''}`}
              onClick={() => setActiveTab('valores')}
            >
              <Gem size={20} /> Valores
            </button>
          </div>
        </div>

        <div className={styles.tabContent}>
          <div className={`${styles.tabPanel} ${activeTab === 'missao' ? styles.active : ''}`}>
            <div className={styles.panelHeader}>
              <div className={styles.iconBox}><Target size={28} /></div>
              <h3>Nossa Missão</h3>
            </div>
            <p>Oferecer aos clientes e parceiros comerciais total tranquilidade em logística, gestão e execução de cada projeto, com foco absoluto na satisfação do cliente e na excelência do resultado final.</p>
          </div>
          
          <div className={`${styles.tabPanel} ${activeTab === 'visao' ? styles.active : ''}`}>
            <div className={styles.panelHeader}>
              <div className={styles.iconBox}><Eye size={28} /></div>
              <h3>Nossa Visão</h3>
            </div>
            <p>Ser a empresa referência em instalação de gesso e drywall na Zona Sul de São Paulo, reconhecida pela excelência no acabamento, inovação técnica, sustentabilidade e confiança construída com cada cliente.</p>
          </div>
          
          <div className={`${styles.tabPanel} ${activeTab === 'valores' ? styles.active : ''}`}>
            <div className={styles.panelHeader}>
              <div className={styles.iconBox}><Gem size={28} /></div>
              <h3>Nossos Valores</h3>
            </div>
            <ul className={styles.valoresList}>
              <li><strong>Qualidade Garantida:</strong> Apenas os melhores materiais e técnicas rigorosas do mercado.</li>
              <li><strong>Comprometimento:</strong> Respeito inegociável aos prazos acordados e ao orçamento.</li>
              <li><strong>Transparência:</strong> Comunicação clara, honesta e direta em todas as etapas da obra.</li>
              <li><strong>Limpeza e Organização:</strong> Cuidado excepcional com o ambiente do cliente durante toda a execução.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.socialContainer}>
        <h2 className={styles.socialTitle}>Acompanhe nosso trabalho</h2>
        <div className={styles.socialGrid}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
            <div className={`${styles.socialIcon} ${styles.instagram}`}>
              <Instagram size={32} />
            </div>
            <h3>Instagram</h3>
            <p>Veja nosso dia a dia</p>
          </a>
          
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
            <div className={`${styles.socialIcon} ${styles.facebook}`}>
              <Facebook size={32} />
            </div>
            <h3>Facebook</h3>
            <p>Acompanhe novidades</p>
          </a>


        </div>
      </div>
    </main>
  );
}
