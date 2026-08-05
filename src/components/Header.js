'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoContainer}>
        <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-navy)' }}>
          G.A <span style={{ color: 'var(--color-graphite)' }}>GESSO</span> ALVES
        </div>
        {/* Futuramente: <Image src="/logo.png" alt="Gessoalves Logo" width={150} height={50} className={styles.logo} /> */}
      </Link>
      
      <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
        <Link href="/" className={styles.navLink} onClick={toggleMenu}>Início</Link>
        <Link href="/quem-somos" className={styles.navLink} onClick={toggleMenu}>Quem Somos</Link>
        <Link href="/servicos" className={styles.navLink} onClick={toggleMenu}>Serviços</Link>
        <Link href="/portfolio" className={styles.navLink} onClick={toggleMenu}>Portfólio</Link>
        <Link href="/blog" className={styles.navLink} onClick={toggleMenu}>Blog</Link>
        <Link href="/contato" className={styles.navLink} onClick={toggleMenu}>Contato</Link>
      </nav>

      <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Menu">
        {isOpen ? <X size={28} color="var(--color-navy)" /> : <Menu size={28} color="var(--color-navy)" />}
      </button>
    </header>
  );
}
