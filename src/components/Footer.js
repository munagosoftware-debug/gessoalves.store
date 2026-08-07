'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube, Phone, MessageCircle, Camera } from 'lucide-react';
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
              <li className={styles.contactItemSpaced}>
                <span className={styles.emojiIcon}>📍</span>
                Rua Inquiririm, 687<br />Vila Indiana, Butantã - SP
              </li>
              <li className={styles.contactItemTopMargin}>
                <Phone size={18} /> (11) 4213-2271
              </li>
              <li className={styles.contactItem}>
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
            <Image 
              src="/footer-wireframe.webp" 
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
