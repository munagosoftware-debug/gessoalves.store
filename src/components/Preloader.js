'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Se já foi exibido nesta sessão, não exibe
    try {
      if (sessionStorage.getItem('gesso_preloader_seen')) {
        return;
      }
    } catch {}

    setMounted(true);

    // Inicia o fade suave aos 350ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 350);

    // Desmonta totalmente aos 650ms
    const removeTimer = setTimeout(() => {
      setMounted(false);
      try {
        sessionStorage.setItem('gesso_preloader_seen', 'true');
      } catch {}
    }, 650);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`${styles.preloader} ${fading ? styles.fadeOut : ''}`}>
      <div className={styles.contentWrapper}>
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
