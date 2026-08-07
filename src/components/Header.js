'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`} 
              >
                {link.label}
              </Link>
            );
          })}
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
