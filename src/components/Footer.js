import Link from 'next/link';
import { Facebook, Instagram, Youtube, Phone, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        <div className={styles.footerSection}>
          <h3>Navegação</h3>
          <ul className={styles.footerLinks}>
            <li><Link href="/">Início</Link></li>
            <li><Link href="/quem-somos">Quem Somos</Link></li>
            <li><Link href="/servicos">Serviços</Link></li>
            <li><Link href="/portfolio">Portfólio</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contato">Contato</Link></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contato</h3>
          <ul className={styles.footerLinks}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> (11) 4213-2271
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={18} /> 
              <a href="https://wa.me/5511937086879" target="_blank" rel="noopener noreferrer">
                (11) 93708-6879
              </a>
            </li>
          </ul>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook"><Facebook /></a>
            <a href="#" aria-label="Instagram"><Instagram /></a>
            <a href="#" aria-label="YouTube"><Youtube /></a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Galeria de Clientes</h3>
          <div className={styles.galleryPlaceholder}>
            <p>Espaço reservado para a Galeria (Etapa 5)</p>
          </div>
        </div>

      </div>
      
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} Gessoalves - Instalação de forro de gesso acartonado e drywall. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
