import Link from 'next/link';
import { servicesData } from '@/lib/servicesData';
import styles from './page.module.css';

export const metadata = {
  title: 'Instalação de Gesso e Drywall na Zona Sul | Gessoalves',
  description: 'Gessoalves: Excelência em instalação de forro de gesso acartonado, drywall, sancas e acabamentos. Atendimento rápido e garantido na Zona Sul de SP.',
};

export default function Home() {
  const bairros = ['Morumbi', 'Santo Amaro', 'Granja Julieta', 'Chácara Santo Antônio', 'Saúde', 'Interlagos', 'Campo Belo'];

  const depoimentos = [
    { nome: 'Carlos Mendes', texto: 'A equipe da Gessoalves transformou minha sala com o teto rebaixado. Trabalho rápido e muito limpo!' },
    { nome: 'Fernanda Costa', texto: 'Fizemos as divisórias do nosso escritório em drywall. A agilidade e a qualidade do isolamento acústico foram excelentes.' },
    { nome: 'Roberto Silva', texto: 'Ótimo atendimento do início ao fim. A sanca de gesso na minha varanda ficou incrível, super recomendo!' }
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Transforme seu ambiente com a excelência do Gesso e Drywall</h1>
        <p>Total tranquilidade em logística, gestão e execução para o seu projeto na Zona Sul de São Paulo.</p>
        <Link href="https://wa.me/5511937086879" target="_blank" className="btn-3d" style={{ padding: '1rem 2.5rem', fontSize: '1.2rem' }}>
          Solicitar Orçamento
        </Link>
      </section>

      {/* Serviços em Destaque */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <h2 className={styles.sectionTitle}>Nossos Serviços</h2>
        <div className={styles.servicesGrid}>
          {servicesData.map(service => (
            <div key={service.slug} className={styles.serviceCard}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link href={`/servicos/${service.slug}`} className="btn-3d" style={{ width: '100%', textAlign: 'center' }}>
                Saiba Mais
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Por que escolher a Gessoalves */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Por que escolher a Gessoalves?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureBox}>
            <h3>Rapidez de Instalação</h3>
            <p>Prazos levados a sério. Projetos executados com agilidade sem abrir mão da qualidade.</p>
          </div>
          <div className={styles.featureBox}>
            <h3>Materiais de Alta Qualidade</h3>
            <p>Trabalhamos apenas com fornecedores certificados para garantir durabilidade e segurança.</p>
          </div>
          <div className={styles.featureBox}>
            <h3>Atendimento Especializado</h3>
            <p>Equipe treinada para entregar o melhor acabamento com limpeza e organização.</p>
          </div>
        </div>
      </section>

      {/* Área de Atuação */}
      <section className={styles.section} style={{ background: '#fff' }}>
        <h2 className={styles.sectionTitle}>Nossa Área de Atuação</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Atendemos toda a Zona Sul de São Paulo e bairros vizinhos, incluindo:</p>
        <div className={styles.bairrosList}>
          {bairros.map((bairro, index) => (
            <span key={index} className={styles.bairroItem}>{bairro}</span>
          ))}
        </div>
      </section>

      {/* Depoimentos (Placeholders) */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>O que nossos clientes dizem</h2>
        <div className={styles.testimonialsGrid}>
          {depoimentos.map((dep, index) => (
            <div key={index} className={styles.testimonialCard}>
              <p>"{dep.texto}"</p>
              <h4>- {dep.nome}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className={styles.ctaSection}>
        <h2>Pronto para iniciar sua obra?</h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Fale com nossos especialistas pelo WhatsApp e receba um orçamento sem compromisso.</p>
        <Link href="https://wa.me/5511937086879" target="_blank" className="btn-3d" style={{ background: 'var(--color-bg)', color: 'var(--color-primary)' }}>
          Chamar no WhatsApp
        </Link>
      </section>
    </main>
  );
}
