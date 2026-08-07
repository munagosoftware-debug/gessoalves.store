'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Phone, MessageCircle, Camera } from 'lucide-react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { openWhatsAppModal } = useWhatsAppModal();

  return (
    <footer className={styles.footerContainer}>
      {/* Parte Superior Escura */}
      <div className={styles.footerTop}>
        <div className={styles.footerContent}>
          
          {/* Coluna 1: Logo & Navegação */}
          <div className={styles.footerSection}>
            <div className="logo-highlight" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
              <Link href="/">
                <Image 
                  src="/logo.png" 
                  alt="Gessoalves Logo" 
                  width={200} 
                  height={80} 
                  style={{ objectFit: 'contain', display: 'block' }}
                />
              </Link>
            </div>
            <h3 className={styles.sectionTitle}>Navegação</h3>
            <ul className={styles.navLinks}>
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
              <li className={styles.contactItemSpaced}>
                <span className={styles.emojiIcon}>📍</span>
                Rua Inquiririm, 687<br />Vila Indiana, Butantã - SP
              </li>
              <li className={styles.contactItemTopMargin}>
                <Phone size={18} /> (11) 4213-2271
              </li>
              <li className={styles.contactItem}>
                <MessageCircle size={18} /> 
                <button 
                  onClick={() => openWhatsAppModal('Olá! Vim pelo site da Gessoalves e gostaria de tirar uma dúvida.')} 
                  style={{ background: 'none', border: 'none', color: 'inherit', padding: 0, cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                >
                  (11) 96115-5049
                </button>
              </li>
            </ul>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Coluna 3: Gráfico 3D Central */}
          <div className={styles.wireframeContainer}>
            <Image 
              src="/footer-wireframe-gesso.png" 
              alt="Projeto 3D Gesso" 
              width={1000}
              height={1000}
              className={styles.wireframeImage}
              loading="lazy"
            />
          </div>

          {/* Coluna 4: Galeria */}
          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Galeria de Clientes</h3>
            <ul className={styles.galleryLinksList}>
              {/* TODO: reativar quando a página /ra (visualização em RA) existir */}
              <li>
                <Link href="/galeria-de-clientes" className={styles.galleryLink}>
                  <div className={styles.galleryIconBox}>
                    <Camera size={22} color="#fff" />
                  </div>
                  <span className={styles.galleryText}>Envie sua foto &rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </footer>
  );
}
