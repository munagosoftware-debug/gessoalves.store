'use client';

import React from 'react';
import styles from './MarqueeBanner.module.css';

export default function MarqueeBanner({ items, variant = 'dark' }) {
  // Duplicar os itens para criar o efeito infinito sem cortes visíveis
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`${styles.marqueeContainer} ${variant === 'light' ? styles.light : ''}`}>
      <div className={styles.marqueeContent}>
        {duplicatedItems.map((item, index) => (
          <React.Fragment key={index}>
            <span className={styles.star}>✦</span>
            <span>{item}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
