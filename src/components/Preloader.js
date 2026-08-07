'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  // Fases: 'intro' | 'expanding' | 'revealing' | 'done'
  const [phase, setPhase] = useState('intro');

  const startReveal = useCallback(() => {
    setPhase('expanding');
    
    // Após a faixa expandir cobrindo a tela, inicia o deslizamento de revelação
    const revealTimer = setTimeout(() => {
      setPhase('revealing');
    }, 600);

    // Desmonta totalmente do DOM liberando 100% da navegação
    const doneTimer = setTimeout(() => {
      setPhase('done');
    }, 1300);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    // Inicia a expansão da faixa azul automaticamente aos 1.3 segundos
    const timer = setTimeout(() => {
      startReveal();
    }, 1300);

    return () => clearTimeout(timer);
  }, [startReveal]);

  if (phase === 'done') return null;

  return (
    <div 
      className={`${styles.preloader} ${phase === 'revealing' ? styles.revealing : ''}`}
      onClick={phase === 'intro' ? startReveal : undefined}
      title="Toque para pular"
    >
      {/* Camada de fundo escura que some quando a faixa expande */}
      <div className={`${styles.darkBackdrop} ${phase !== 'intro' ? styles.fadeOutBackdrop : ''}`}></div>

      {/* Faixa Azul Principal que se expande para cobrir a tela e depois desliza revelando o site */}
      <div className={`${styles.blueStripe} ${phase === 'expanding' || phase === 'revealing' ? styles.stripeExpanded : ''}`}></div>

      {/* Logo e conteúdo central */}
      <div className={`${styles.contentWrapper} ${phase !== 'intro' ? styles.fadeOutLogo : ''}`}>
        <div className={styles.imageContainer}>
          <Image 
            src="/preload.png" 
            alt="Gesso Alves - Decorações em Gesso e Drywall" 
            fill
            className={styles.preloadImage}
            priority 
          />
        </div>
      </div>
    </div>
  );
}
