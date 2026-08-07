'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/quem-somos', label: 'Quem Somos' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/portfolio', label: 'Portfólio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ];

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoContainer} onClick={() => setIsOpen(false)}>
        <Image 
          src="/logo.webp" 
          alt="Gessoalves Logo" 
          width={180} 
          height={60} 
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

        <Link href="https://wa.me/5511961155049" target="_blank" className={styles.ctaBtn}>
          Orçamento
        </Link>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu" aria-expanded={isOpen}>
          {isOpen ? <X size={28} color="var(--color-navy)" /> : <Menu size={28} color="var(--color-navy)" />}
        </button>
      </div>
    </header>
  );
}
