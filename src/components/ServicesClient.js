'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Layers, 
  Compass, 
  Hammer, 
  Award,
  CheckCheck
} from 'lucide-react';
import { servicesData } from '@/lib/servicesData';
import styles from './ServicesClient.module.css';

export default function ServicesClient() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            Soluções Completas em Gesso & Drywall
          </div>
          <h1 className={styles.heroTitle}>
            Serviços de Alto Padrão para sua Reforma
          </h1>
          <p className={styles.heroSubtitle}>
            Projetos residenciais e comerciais executados com rigor técnico, matéria-prima certificada, sem desperdício e com garantia de 5 anos em toda São Paulo.
          </p>

          {/* Barra de Confiança */}
          <div className={styles.trustBar}>
            <div className={styles.trustItem}>
              <ShieldCheck className={styles.trustIcon} size={28} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Garantia de 5 Anos</span>
                <span className={styles.trustDesc}>Contrato e nota fiscal</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <Clock className={styles.trustIcon} size={28} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Pontualidade na Entrega</span>
                <span className={styles.trustDesc}>Cronograma rigoroso</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <Award className={styles.trustIcon} size={28} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Equipe Especializada</span>
                <span className={styles.trustDesc}>Mestres gesseiros experientes</span>
              </div>
            </div>

            <div className={styles.trustItem}>
              <Sparkles className={styles.trustIcon} size={28} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Obra Limpa</span>
                <span className={styles.trustDesc}>Proteção de pisos e isolamento</span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de Serviços */}
        <div className={styles.grid}>
          {servicesData.map((service) => (
            <div key={service.slug} className={styles.card}>
              {/* Imagem do Serviço */}
              <div className={styles.imageWrapper}>
                <Image
                  src={service.placeholderImg}
                  alt={service.title}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {service.badge && (
                  <span className={styles.badgeHighlight}>{service.badge}</span>
                )}
              </div>

              {/* Corpo do Card */}
              <div className={styles.cardBody}>
                {service.idealFor && (
                  <div className={styles.idealForTag}>
                    <Layers size={13} color="var(--color-navy, #1b2a5c)" />
                    <span>{service.idealFor}</span>
                  </div>
                )}

                <h2 className={styles.cardTitle}>{service.title}</h2>
                <p className={styles.cardDescription}>{service.description}</p>

                {/* Lista de Diferenciais */}
                <div className={styles.featuresList}>
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <CheckCircle2 size={15} className={styles.checkIcon} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Ações */}
                <div className={styles.cardActions}>
                  <Link href={`/servicos/${service.slug}`} className={styles.btnDetails}>
                    <span>Ver Detalhes</span>
                    <ArrowRight size={15} />
                  </Link>
                  <a
                    href={`https://wa.me/5511977983637?text=${encodeURIComponent(`Olá! Gostaria de um orçamento para o serviço de ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnWhatsapp}
                  >
                    <MessageSquare size={15} />
                    <span>Orçamento</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção Como Trabalhamos */}
        <section className={styles.processSection}>
          <div className={styles.processHeader}>
            <h2 className={styles.processSectionTitle}>Como Funciona Nosso Atendimento</h2>
            <p className={styles.processSectionSubtitle}>
              Processo simplificado, transparente e sem burocracia do primeiro contato até a entrega das chaves.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3 className={styles.stepTitle}>Envio do Projeto ou Planta</h3>
              <p className={styles.stepDescription}>
                Envie suas medidas ou fotos pelo WhatsApp. Analisamos os detalhes para pré-dimensionamento.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3 className={styles.stepTitle}>Visita Técnica Gratuita</h3>
              <p className={styles.stepDescription}>
                Nosso especialista vai até o local na Zona Sul ou SP para conferência milimétrica de medidas.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3 className={styles.stepTitle}>Execução Rápida e Limpa</h3>
              <p className={styles.stepDescription}>
                Instalação com estrutura certificada, proteção das áreas e mínima geração de resíduos.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>4</div>
              <h3 className={styles.stepTitle}>Entrega com Garantia Total</h3>
              <p className={styles.stepDescription}>
                Vistoria de qualidade final, emissão de nota fiscal e termo de garantia de 5 anos.
              </p>
            </div>
          </div>
        </section>

        {/* Banner CTA Final */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaBannerTitle}>
              Pronto para iniciar a sua reforma com especialistas?
            </h2>
            <p className={styles.ctaBannerSubtitle}>
              Fale agora com nosso time técnico pelo WhatsApp ou solicite um orçamento detalhado sem custo.
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
