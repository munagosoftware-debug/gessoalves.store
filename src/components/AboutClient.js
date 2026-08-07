'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  Target, Eye, Gem, Instagram, Facebook, 
  ShieldCheck, Clock, Award, Users, Hammer,
  CheckCircle2, Sparkles, MessageSquare, Phone,
  Building2, Star, TrendingUp
} from 'lucide-react';
import styles from './AboutClient.module.css';

/* Animated counter hook */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export default function AboutClient() {
  const anos = useCountUp(12);
  const obras = useCountUp(850);
  const satisfacao = useCountUp(98);
  const clientes = useCountUp(420);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        {/* ===== HERO SECTION ===== */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            Conheça Nossa História
          </div>
          <h1 className={styles.heroTitle}>
            Quem é a <span className={styles.highlight}>Gessoalves</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Transformando ambientes na Zona Sul de São Paulo com excelência em gesso e drywall há mais de uma década. Compromisso real com qualidade, prazo e confiança.
          </p>
        </section>

        {/* ===== HISTÓRIA / SOBRE ===== */}
        <section className={styles.storySection}>
          <div className={styles.storyCard}>
            <div className={styles.storyIconRow}>
              <div className={styles.storyIcon}>
                <Building2 size={28} />
              </div>
              <span className={styles.storyLabel}>Nossa Trajetória</span>
            </div>
            <p className={styles.storyText}>
              A Gessoalves nasceu com o propósito de transformar ambientes na Zona Sul de São Paulo. Com anos de experiência no mercado de construção a seco (drywall) e acabamentos em gesso, nos destacamos pelo compromisso com a qualidade e o cumprimento rigoroso dos prazos.
            </p>
            <p className={styles.storyText}>
              Nossa equipe é formada por profissionais altamente qualificados, preparados para entender a sua necessidade e entregar soluções estéticas e funcionais, seja em projetos residenciais, comerciais ou corporativos. Trabalhamos apenas com materiais certificados, garantindo a segurança e durabilidade que sua obra merece.
            </p>
          </div>
        </section>

        {/* ===== NÚMEROS / ESTATÍSTICAS ===== */}
        <section className={styles.statsSection}>
          <div className={styles.statsHeader}>
            <h2 className={styles.statsSectionTitle}>Nossos Números Falam</h2>
            <p className={styles.statsSectionSubtitle}>Resultados construídos obra a obra, com transparência e dedicação.</p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.statCard} ref={anos.ref}>
              <div className={styles.statIcon}>
                <Clock size={24} />
              </div>
              <span className={styles.statNumber}>{anos.count}+</span>
              <span className={styles.statLabel}>Anos de Experiência</span>
            </div>
            <div className={styles.statCard} ref={obras.ref}>
              <div className={styles.statIcon}>
                <Hammer size={24} />
              </div>
              <span className={styles.statNumber}>{obras.count}+</span>
              <span className={styles.statLabel}>Obras Concluídas</span>
            </div>
            <div className={styles.statCard} ref={satisfacao.ref}>
              <div className={styles.statIcon}>
                <Star size={24} />
              </div>
              <span className={styles.statNumber}>{satisfacao.count}%</span>
              <span className={styles.statLabel}>Taxa de Satisfação</span>
            </div>
            <div className={styles.statCard} ref={clientes.ref}>
              <div className={styles.statIcon}>
                <Users size={24} />
              </div>
              <span className={styles.statNumber}>{clientes.count}+</span>
              <span className={styles.statLabel}>Clientes Atendidos</span>
            </div>
          </div>
        </section>

        {/* ===== MISSÃO / VISÃO / VALORES ===== */}
        <section className={styles.mvvSection}>
          <div className={styles.mvvHeader}>
            <h2 className={styles.mvvTitle}>Missão, Visão e Valores</h2>
            <p className={styles.mvvSubtitle}>Os pilares que orientam cada projeto e cada decisão na Gessoalves.</p>
          </div>

          <div className={styles.mvvGrid}>
            {/* Missão */}
            <div className={styles.mvvCard}>
              <div className={styles.mvvIconWrapper}>
                <Target size={28} />
              </div>
              <h3 className={styles.mvvCardTitle}>Nossa Missão</h3>
              <p className={styles.mvvCardText}>
                Oferecer aos clientes e parceiros comerciais total tranquilidade em logística, gestão e execução de cada projeto, com foco absoluto na satisfação do cliente e na excelência do resultado final.
              </p>
            </div>

            {/* Visão */}
            <div className={styles.mvvCard}>
              <div className={styles.mvvIconWrapper}>
                <Eye size={28} />
              </div>
              <h3 className={styles.mvvCardTitle}>Nossa Visão</h3>
              <p className={styles.mvvCardText}>
                Ser a empresa referência em instalação de gesso e drywall na Zona Sul de São Paulo, reconhecida pela excelência no acabamento, inovação técnica, sustentabilidade e confiança construída com cada cliente.
              </p>
            </div>

            {/* Valores */}
            <div className={styles.mvvCard}>
              <div className={styles.mvvIconWrapper}>
                <Gem size={28} />
              </div>
              <h3 className={styles.mvvCardTitle}>Nossos Valores</h3>
              <div className={styles.valuesList}>
                <div className={styles.valueItem}>
                  <CheckCircle2 size={16} className={styles.valueCheck} />
                  <span><strong>Qualidade Garantida:</strong> Materiais e técnicas rigorosas do mercado.</span>
                </div>
                <div className={styles.valueItem}>
                  <CheckCircle2 size={16} className={styles.valueCheck} />
                  <span><strong>Comprometimento:</strong> Respeito inegociável aos prazos e orçamento.</span>
                </div>
                <div className={styles.valueItem}>
                  <CheckCircle2 size={16} className={styles.valueCheck} />
                  <span><strong>Transparência:</strong> Comunicação clara e direta em todas as etapas.</span>
                </div>
                <div className={styles.valueItem}>
                  <CheckCircle2 size={16} className={styles.valueCheck} />
                  <span><strong>Obra Limpa:</strong> Cuidado excepcional com o ambiente do cliente.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DIFERENCIAIS ===== */}
        <section className={styles.differentialsSection}>
          <div className={styles.diffHeader}>
            <h2 className={styles.diffTitle}>Por Que Escolher a Gessoalves?</h2>
          </div>
          <div className={styles.diffGrid}>
            <div className={styles.diffItem}>
              <ShieldCheck size={22} className={styles.diffIcon} />
              <div>
                <h4 className={styles.diffItemTitle}>Garantia de 5 Anos</h4>
                <p className={styles.diffItemDesc}>Contrato formal com nota fiscal e termo de garantia em cada obra.</p>
              </div>
            </div>
            <div className={styles.diffItem}>
              <Award size={22} className={styles.diffIcon} />
              <div>
                <h4 className={styles.diffItemTitle}>Equipe Própria</h4>
                <p className={styles.diffItemDesc}>Mestres gesseiros experientes e treinados sem terceirização.</p>
              </div>
            </div>
            <div className={styles.diffItem}>
              <Sparkles size={22} className={styles.diffIcon} />
              <div>
                <h4 className={styles.diffItemTitle}>Materiais Certificados</h4>
                <p className={styles.diffItemDesc}>Chapas e perfis de marcas premium com certificação ABNT.</p>
              </div>
            </div>
            <div className={styles.diffItem}>
              <TrendingUp size={22} className={styles.diffIcon} />
              <div>
                <h4 className={styles.diffItemTitle}>Obra Rápida e Limpa</h4>
                <p className={styles.diffItemDesc}>Proteção de pisos e móveis com instalação ágil e sem entulho.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== REDES SOCIAIS ===== */}
        <section className={styles.socialSection}>
          <h2 className={styles.socialTitle}>Acompanhe Nosso Trabalho</h2>
          <div className={styles.socialGrid}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={`${styles.socialIcon} ${styles.instagram}`}>
                <Instagram size={28} />
              </div>
              <div>
                <h3 className={styles.socialName}>Instagram</h3>
                <p className={styles.socialDesc}>Veja nosso dia a dia e obras em andamento</p>
              </div>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialCard}>
              <div className={`${styles.socialIcon} ${styles.facebook}`}>
                <Facebook size={28} />
              </div>
              <div>
                <h3 className={styles.socialName}>Facebook</h3>
                <p className={styles.socialDesc}>Acompanhe novidades e promoções</p>
              </div>
            </a>
          </div>
        </section>

        {/* ===== BANNER CTA ===== */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaBannerTitle}>
              Pronto para transformar seu espaço com quem entende do assunto?
            </h2>
            <p className={styles.ctaBannerSubtitle}>
              Fale agora com nosso time técnico pelo WhatsApp ou solicite uma visita gratuita sem compromisso.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <a
              href="https://wa.me/5511977983637?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20minha%20obra."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageSquare size={18} />
              Solicitar Orçamento no WhatsApp
            </a>
            <a href="tel:+5511977983637" className={styles.phoneCallBtn}>
              <Phone size={15} />
              (11) 97798-3637
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
