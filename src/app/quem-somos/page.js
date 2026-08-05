'use client';

import { useState } from 'react';
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
        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'missao' ? styles.active : ''}`}
            onClick={() => setActiveTab('missao')}
          >
            Nossa Missão
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'visao' ? styles.active : ''}`}
            onClick={() => setActiveTab('visao')}
          >
            Nossa Visão
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'valores' ? styles.active : ''}`}
            onClick={() => setActiveTab('valores')}
          >
            Nossos Valores
          </button>
        </div>

        <div className={styles.tabContent}>
          <div className={`${styles.tabPanel} ${activeTab === 'missao' ? styles.active : ''}`}>
            <h3>Missão</h3>
            <p>Oferecer aos clientes e parceiros comerciais total tranquilidade em logística, gestão e execução de cada projeto, com foco absoluto na satisfação do cliente.</p>
          </div>
          
          <div className={`${styles.tabPanel} ${activeTab === 'visao' ? styles.active : ''}`}>
            <h3>Visão</h3>
            <p>Ser a empresa referência em instalação de gesso e drywall na Zona Sul de São Paulo, reconhecida pela excelência no acabamento, inovação técnica e confiança construída com cada cliente.</p>
          </div>
          
          <div className={`${styles.tabPanel} ${activeTab === 'valores' ? styles.active : ''}`}>
            <h3>Valores</h3>
            <p><strong>Qualidade Garantida:</strong> Apenas os melhores materiais e técnicas do mercado.<br/>
            <strong>Comprometimento:</strong> Respeito inegociável aos prazos e ao orçamento.<br/>
            <strong>Transparência:</strong> Comunicação clara em todas as etapas da obra.<br/>
            <strong>Limpeza e Organização:</strong> Respeito pelo ambiente do cliente durante toda a execução.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
