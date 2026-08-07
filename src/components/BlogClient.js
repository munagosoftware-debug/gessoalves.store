'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  X, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Phone, 
  BookOpen, 
  Flame 
} from 'lucide-react';
import { blogPosts, blogCategories } from '@/lib/blogData';
import styles from './BlogClient.module.css';

export default function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtra os posts baseado na busca e na categoria selecionada
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'Todos' || post.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Artigo em destaque (se não houver filtro ativo, exibe o primeiro post com featured: true)
  const featuredPost = useMemo(() => {
    if (selectedCategory === 'Todos' && searchQuery.trim() === '') {
      return blogPosts.find((p) => p.featured) || blogPosts[0];
    }
    return null;
  }, [selectedCategory, searchQuery]);

  // Lista dos demais artigos
  const regularPosts = useMemo(() => {
    if (featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Topo / Hero */}
        <div className={styles.heroSection}>
          <div className={styles.badge}>
            <span className={styles.pulseDot} />
            Dicas & Conhecimento Técnico
          </div>
          <h1 className={styles.heroTitle}>Blog & Tendências Gesso Alves</h1>
          <p className={styles.heroSubtitle}>
            Tudo o que você precisa saber sobre drywall, isolamento acústico, sancas iluminadas e as melhores práticas para a sua reforma ou construção.
          </p>
        </div>

        {/* Controles: Busca e Filtros */}
        <div className={styles.controlsWrapper}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar por artigos, drywall, sancas, acústica..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className={styles.clearSearchBtn}
                title="Limpar busca"
                aria-label="Limpar busca"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className={styles.categoriesBar}>
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${styles.categoryBtn} ${
                  selectedCategory === category ? styles.categoryBtnActive : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Post Destaque (quando sem filtro de busca) */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredCard}>
            <div className={styles.featuredImageWrapper}>
              <div className={styles.featuredBadge}>
                <Flame size={14} /> Artigo em Destaque
              </div>
              <Image
                src={featuredPost.img}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                className={styles.featuredImage}
                priority
              />
            </div>
            <div className={styles.featuredContent}>
              <div className={styles.featuredMeta}>
                <span className={styles.categoryTag}>{featuredPost.category}</span>
                <span className={styles.metaItem}>
                  <Clock size={13} /> {featuredPost.readTime}
                </span>
                <span className={styles.metaItem}>{featuredPost.date}</span>
              </div>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
              <div className={styles.ctaReadLink}>
                <span>Ler Artigo Completo</span>
                <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        )}

        {/* Grid de Artigos */}
        {regularPosts.length > 0 ? (
          <>
            <h2 className={styles.articlesSectionTitle}>
              <BookOpen size={20} color="var(--color-navy, #1b2a5c)" />
              {selectedCategory === 'Todos' ? 'Todos os Artigos' : `Artigos sobre ${selectedCategory}`}
            </h2>
            <div className={styles.grid}>
              {regularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={styles.card}
                >
                  <div className={styles.cardImageWrapper}>
                    <span className={styles.cardCategoryBadge}>{post.category}</span>
                    <Image
                      src={post.img}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardDate}>{post.date}</span>
                      <span className={styles.cardReadTime}>
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardAuthor}>{post.author}</span>
                      <span className={styles.cardButton}>
                        Ler <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>Nenhum artigo encontrado</h3>
            <p className={styles.emptySubtitle}>
              Tente buscar por outros termos ou selecionar outra categoria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchQuery('');
              }}
              className={styles.resetBtn}
            >
              Ver todos os artigos
            </button>
          </div>
        )}

        {/* Banner CTA Final */}
        <div className={styles.ctaBanner}>
          <div className={styles.ctaText}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4cc9f0', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              <Sparkles size={16} /> Transforme seu Ambiente
            </div>
            <h3 className={styles.ctaBannerTitle}>
              Ficou com alguma dúvida ou precisa de um orçamento para sua obra?
            </h3>
            <p className={styles.ctaBannerSubtitle}>
              Nossa equipe de especialistas está pronta para analisar sua planta e apresentar a solução ideal em drywall, forros e sancas decorativas.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <a
              href="https://wa.me/5511977983696?text=Ol%C3%A1!%20Li%20os%20artigos%20do%20blog%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20minha%20obra."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <MessageSquare size={18} />
              Chamar no WhatsApp
            </a>
            <a href="tel:11977983696" className={styles.phoneCallBtn}>
              <Phone size={15} />
              (11) 97798-3696
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
