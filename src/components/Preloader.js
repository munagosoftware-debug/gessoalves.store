'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esconde o preloader após 2.2 segundos para dar tempo de exibir a animação
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.preloader} ${!loading ? styles.hidden : ''}`}>
      {/* Paineis divididos para efeito de abertura (Luxury Industrial) */}
      <div className={`${styles.panel} ${styles.leftPanel} ${!loading ? styles.slideLeft : ''}`}></div>
      <div className={`${styles.panel} ${styles.rightPanel} ${!loading ? styles.slideRight : ''}`}></div>
      
      {/* Faixa diagonal dinâmica */}
      <div className={`${styles.diagonalStripe} ${!loading ? styles.stripeExit : ''}`}></div>
      
      {/* Conteúdo principal */}
      <div className={`${styles.contentWrapper} ${!loading ? styles.fadeOut : ''}`}>
        <div className={styles.imageContainer}>
          <Image 
            src="/preload.png" 
            alt="Gessoalves" 
            fill
            className={styles.preloadImage}
            priority 
          />
        </div>
      </div>
    </div>
  );
}
