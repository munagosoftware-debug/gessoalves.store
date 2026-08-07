'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, 
  X, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  Eye, 
  Award, 
  CheckCheck, 
  Users, 
  Maximize2 
} from 'lucide-react';
import { portfolioProjects, portfolioCategories } from '@/lib/portfolioData';
import styles from './PortfolioClient.module.css';

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Fecha modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  // Contagem por categoria
  const counts = useMemo(() => {
    const countMap = { todos: portfolioProjects.length };
    portfolioCategories.forEach(cat => {
      if (cat.key !== 'todos') {
        countMap[cat.key] = portfolioProjects.filter(p => p.type === cat.key).length;
      }
    });
    return countMap;
  }, []);

  // Filtragem combinada
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((item) => {
      const matchesCategory = activeCategory === 'todos' || item.type === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.specs.some(spec => spec.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            Portfólio de Obras Reais em SP
          </div>
          <h1 className={styles.heroTitle}>
            Excelência e Precisão em Cada Detalhe
          </h1>
          <p className={styles.heroSubtitle}>
            Explore nossa galeria de projetos executados na Zona Sul e Grande São Paulo. Do drywall acústico a sancas com iluminação sofisticada.
          </p>

          {/* Stats Bar */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <Award className={styles.statIcon} size={26} />
              <div className={styles.statText}>
                <span className={styles.statNumber}>+15 Anos</span>
                <span className={styles.statLabel}>de Tradição em SP</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <CheckCheck className={styles.statIcon} size={26} />
              <div className={styles.statText}>
                <span className={styles.statNumber}>+1.200</span>
                <span className={styles.statLabel}>Obras Concluídas</span>
              </div>
            </div>

            <div className={styles.statDivider} />

            <div className={styles.statItem}>
              <Users className={styles.statIcon} size={26} />
              <div className={styles.statText}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Clientes Satisfeitos</span>
              </div>
            </div>
          </div>
        </section>

        {/* Controles de Busca e Filtros */}
        <div className={styles.controlsWrapper}>
          
          {/* Busca em Tempo Real */}
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Buscar por bairro, sanca, drywall, iluminação..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                title="Limpar busca"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filtros em Pílulas */}
          <div className={styles.filtersBar}>
            {portfolioCategories.map((cat) => {
              const count = counts[cat.key] || 0;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`${styles.filterBtn} ${isActive ? styles.filterBtnActive : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className={styles.filterCount}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid de Projetos */}
        {filteredProjects.length > 0 ? (
          <div className={styles.grid}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className={styles.card}
                onClick={() => setSelectedProject(project)}
              >
                {/* Imagem do Projeto */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className={styles.cardImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className={styles.categoryBadge}>{project.categoryLabel}</span>
                  <span className={styles.areaBadge}>{project.area}</span>
                </div>

                {/* Corpo do Card */}
                <div className={styles.cardBody}>
                  <div className={styles.locationRow}>
                    <MapPin size={14} color="var(--color-navy, #1b2a5c)" />
                    <span>{project.location}</span>
                  </div>

                  <h2 className={styles.cardTitle}>{project.title}</h2>
                  <p className={styles.cardDescription}>{project.description}</p>

                  {/* Tags de Especificações */}
                  <div className={styles.specsList}>
                    {project.specs.slice(0, 2).map((spec, idx) => (
                      <span key={idx} className={styles.specTag}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardFooter}>
                    <button className={styles.detailsBtn}>
                      <Maximize2 size={15} />
                      <span>Ver Projeto & Fotos</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>Nenhum projeto encontrado</h3>
            <p className={styles.emptySubtitle}>
              Tente buscar por outro termo ou selecione a categoria "Todos os Projetos".
            </p>
            <button
              onClick={() => {
                setActiveCategory('todos');
                setSearchQuery('');
              }}
              className={styles.resetBtn}
            >
              Ver todos os projetos
            </button>
          </div>
        )}

        {/* Modal Lightbox com Detalhes do Projeto */}
        {selectedProject && (
          <div 
            className={styles.modalBackdrop}
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.modalCloseBtn}
                onClick={() => setSelectedProject(null)}
                title="Fechar"
              >
                <X size={20} />
              </button>

              <div className={styles.modalImageWrapper}>
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  fill
                  className={styles.modalImage}
                  sizes="(max-width: 900px) 100vw, 550px"
                  priority
                />
              </div>

              <div className={styles.modalBody}>
                <span className={styles.modalCategory}>
                  {selectedProject.categoryLabel}
                </span>

                <h3 className={styles.modalTitle}>
                  {selectedProject.title}
                </h3>

                <div className={styles.modalLocation}>
                  <MapPin size={15} color="var(--color-navy, #1b2a5c)" />
                  <span>{selectedProject.location} • Área: {selectedProject.area}</span>
                </div>

                <p className={styles.modalDescription}>
                  {selectedProject.description}
                </p>

                <div className={styles.modalSpecsTitle}>
                  Especificações Técnicas:
                </div>
                <div className={styles.modalSpecsList}>
                  {selectedProject.specs.map((spec, i) => (
                    <div key={i} className={styles.modalSpecItem}>
                      <CheckCircle2 size={15} className={styles.checkIcon} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/5511977983637?text=${encodeURIComponent(`Olá! Vi o projeto "${selectedProject.title}" (${selectedProject.location}) no portfólio da Gessoalves e gostaria de um orçamento para um projeto parecido.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalCtaBtn}
                >
                  <MessageSquare size={18} />
                  Quero um Projeto Semelhante
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CTA Banner Final */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaBannerTitle}>
              Quer transformar o seu ambiente com esse mesmo padrão?
            </h2>
            <p className={styles.ctaBannerSubtitle}>
              Solicite uma visita técnica gratuita ou envie sua planta pelo WhatsApp. Nossos engenheiros e mestres gesseiros atendem toda a Zona Sul e SP.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <a
              href="https://wa.me/5511977983637?text=Ol%C3%A1!%20Vi%20o%20portf%C3%B3lio%20da%20Gessoalves%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20gratuito."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageSquare size={18} />
              Solicitar Orçamento Grátis
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
