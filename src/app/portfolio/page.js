'use client';

import { useState } from 'react';
import styles from './page.module.css';

const portfolioData = [
  { id: 1, type: 'forro', title: 'Forro de Gesso com Sanca', client: 'Residência Morumbi', img: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Forro+1' },
  { id: 2, type: 'drywall', title: 'Divisória Corporativa', client: 'Escritório Berrini', img: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Drywall+1' },
  { id: 3, type: 'moldura', title: 'Molduras Clássicas', client: 'Apartamento Saúde', img: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Moldura+1' },
  { id: 4, type: 'forro', title: 'Rebaixamento com Led', client: 'Sala de Estar Moema', img: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Forro+2' },
  { id: 5, type: 'drywall', title: 'Parede Acústica', client: 'Estúdio Granja Julieta', img: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Drywall+2' },
  { id: 6, type: 'sanca', title: 'Sanca Invertida', client: 'Quarto Casal Vila Mariana', img: 'https://via.placeholder.com/600x400/2B2E38/FFFFFF?text=Sanca+1' },
];

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');

  const filteredItems = filter === 'todos' 
    ? portfolioData 
    : portfolioData.filter(item => item.type === filter);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Nosso Portfólio</h1>
      
      <div className={styles.filters}>
        <button className={`${styles.filterBtn} ${filter === 'todos' ? styles.active : ''}`} onClick={() => setFilter('todos')}>Todos</button>
        <button className={`${styles.filterBtn} ${filter === 'forro' ? styles.active : ''}`} onClick={() => setFilter('forro')}>Forros e Rebaixamentos</button>
        <button className={`${styles.filterBtn} ${filter === 'drywall' ? styles.active : ''}`} onClick={() => setFilter('drywall')}>Drywall</button>
        <button className={`${styles.filterBtn} ${filter === 'sanca' ? styles.active : ''}`} onClick={() => setFilter('sanca')}>Sancas</button>
        <button className={`${styles.filterBtn} ${filter === 'moldura' ? styles.active : ''}`} onClick={() => setFilter('moldura')}>Molduras</button>
      </div>

      <div className={styles.grid}>
        {filteredItems.map(item => (
          <div key={item.id} className={styles.portfolioItem}>
            <img src={item.img} alt={item.title} />
            <div className={styles.overlay}>
              <h3>{item.title}</h3>
              <p>{item.client}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
