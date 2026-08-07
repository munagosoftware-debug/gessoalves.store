'use client';
import Image from 'next/image';
import { MapPin, Navigation, ExternalLink, Check } from 'lucide-react';
import styles from './CoverageMap.module.css';

export default function CoverageMap() {
  const regions = [
    'Butantã e Região',
    'Morumbi',
    'Pinheiros',
    'Vila Mariana',
    'Jardins',
    'Alto de Pinheiros',
    'Lapa / Perdizes',
    'Demais bairros (até 20km)',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>Área de Atuação</h2>
        <p className={styles.headerSubtitle}>
          Atendemos projetos residenciais, comerciais e corporativos em São Paulo e região metropolitana.
        </p>
      </div>

      {/* Box de Endereço Base */}
      <div className={styles.baseInfoBox}>
        <div className={styles.baseAddressRow}>
          <MapPin size={20} color="var(--color-navy)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div className={styles.baseAddressText}>
              Rua Inquiririm, 687 - Vila Indiana (Butantã), São Paulo - SP
            </div>
          </div>
        </div>

        <div className={styles.radiusBadge}>
          <Navigation size={13} />
          <span>Atendimento num raio de até 20km</span>
        </div>
      </div>

      {/* Mapa Interativo */}
      <a 
        href="https://maps.google.com/maps?q=Rua%20Inquiririm,%20687%20-%20Vila%20Indiana,%20São%20Paulo" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.mapWrapper}
        title="Abrir rota no Google Maps"
      >
        <Image
          src="/mapa-cobertura.png"
          alt="Área de Atuação Gessoalves - Raio de 20km"
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className={styles.mapBadge}>
          <span>Ver rota no Google Maps</span>
          <ExternalLink size={14} />
        </div>
      </a>

      {/* Principais Bairros Atendidos */}
      <div className={styles.regionsSection}>
        <div className={styles.regionsTitle}>Principais Regiões Atendidas:</div>
        <div className={styles.regionPills}>
          {regions.map((region, index) => (
            <span key={index} className={styles.pill}>
              <Check size={14} className={styles.pillCheck} />
              {region}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

