'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { openWhatsAppModal } = useWhatsAppModal();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle scroll for transparent -> solid header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/quem-somos', label: 'Quem Somos' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/portfolio', label: 'Portfólio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ];

  const isHomePage = pathname === '/';
  const shouldBeSolid = !isHomePage || isScrolled;

  return (
    <header className={`${styles.header} ${shouldBeSolid ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logoContainer} onClick={() => setIsOpen(false)}>
        <Image 
          src="/logo.png" 
          alt="Gessoalves Logo" 
          width={300} 
          height={100} 
          className={styles.logo} 
          priority
        />
      </Link>
      
      <div className={styles.navContainer}>
        <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
          <div className={styles.navLinksWrapper}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className={styles.mobileNavFooter}>
            <button 
              onClick={() => {
                setIsOpen(false);
                openWhatsAppModal('Olá! Gostaria de um orçamento para o meu projeto.');
              }} 
              className={styles.mobileNavCta}
            >
              <MessageSquare size={18} />
              <span>Solicitar Orçamento no WhatsApp</span>
            </button>
            <div className={styles.mobileContactInfo}>
              <span className={styles.mobileRegionText}>Atendimento em SP e Região (20km)</span>
              <a href="tel:+5511961155049" className={styles.mobilePhoneLink}>
                <Phone size={14} />
                <span>(11) 96115-5049</span>
              </a>
            </div>
          </div>
        </nav>

        <button 
          onClick={() => openWhatsAppModal('Olá! Gostaria de um orçamento para o meu projeto.')} 
          className={styles.ctaBtn}
        >
          Orçamento
        </button>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu" aria-expanded={isOpen}>
          {isOpen ? <X size={28} color="#ffffff" /> : <Menu size={28} color="#ffffff" />}
        </button>
      </div>
    </header>
  );
}
