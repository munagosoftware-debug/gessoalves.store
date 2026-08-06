'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, MessageCircle, Cuboid, Camera } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      {/* Parte Superior Escura */}
      <div className={styles.footerTop}>
        <div className={styles.footerContent}>
          
          {/* Coluna 1: Navegação */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Navegação</h3>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/quem-somos">Quem Somos</Link></li>
              <li><Link href="/servicos">Serviços</Link></li>
              <li><Link href="/portfolio">Portfólio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contato">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 2: Contato */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Contato</h3>
            <ul className={styles.footerLinks}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: '1.4' }}>
                <span style={{ marginTop: '2px' }}>📍</span>
                Rua Inquiririm, 687<br />Vila Indiana, Butantã - SP
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Phone size={18} /> (11) 4213-2271
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageCircle size={18} /> 
                <a href="https://wa.me/5511961155049" target="_blank" rel="noopener noreferrer">
                  (11) 96115-5049
                </a>
              </li>
            </ul>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Coluna 3: Gráfico 3D Central */}
          <div className={styles.wireframeContainer}>
            <img 
              src="/footer-wireframe.png" 
              alt="Projeto 3D Gesso" 
              className={styles.wireframeImage}
            />
          </div>

          {/* Coluna 4: Galeria */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Galeria de Clientes</h3>
            <ul className={styles.footerLinks} style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
              <li>
                <Link href="/ra" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>
                    <Cuboid size={22} color="#fff" />
                  </div>
                  <span style={{ color: '#fff', fontSize: '0.95rem' }}>Visualize Gesso em RA (Novo)</span>
                </Link>
              </li>
              <li>
                <Link href="/galeria-de-clientes" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>
                    <Camera size={22} color="#fff" />
                  </div>
                  <span style={{ color: '#fff', fontSize: '0.95rem' }}>Envie sua foto &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </footer>
  );
}
