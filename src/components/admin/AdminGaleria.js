'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle } from 'lucide-react';
import styles from '@/app/admin/page.module.css';

export default function AdminGaleria({ onError }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending');

  const fetchSubmissions = useCallback(async (f) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?status=${f}`);
      if (res.status === 401) {
        if (onError) onError();
        return;
      }
      const { data } = await res.json();
      setSubmissions(data || []);
    } catch {
      setSubmissions([]);
    }
    setLoading(false);
  }, [onError]);

  useEffect(() => {
    fetchSubmissions(filter);
  }, [filter, fetchSubmissions]);

  const handleModerate = async (id, status) => {
    const res = await fetch('/api/admin/gallery', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.status === 401) {
      if (onError) onError();
      return;
    }
    fetchSubmissions(filter);
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.headerTitle}>Moderação da Galeria</h1>
        <div className={styles.filterBar}>
          {['pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={filter === f ? styles.filterButtonActive : styles.filterButton}>
              {f === 'pending' ? 'Pendentes' : f === 'approved' ? 'Aprovados' : 'Rejeitados'}
            </button>
          ))}
        </div>
      </div>

      {loading ? <p className={styles.loadingText} style={{ textAlign: 'center' }}>Carregando...</p> : submissions.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhuma submissão {filter === 'pending' ? 'pendente' : filter === 'approved' ? 'aprovada' : 'rejeitada'}.</p>
        </div>
      ) : (
        <div className={styles.submissionList}>
          {submissions.map(item => (
            <div key={item.id} className={styles.submissionCard}>
              <div className={styles.imageArea}>
                {item.image_urls.map((url, i) => (
                  <Image key={i} src={url} alt="Submissão" width={90} height={80} className={styles.thumbnail} />
                ))}
              </div>
              <div className={styles.infoArea}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemDetail}>🔧 {item.service}</p>
                <p className={styles.itemDetail}>📍 {item.bairro}</p>
                <p className={styles.itemMeta}>
                  {new Date(item.created_at).toLocaleDateString('pt-BR')} · IP: {item.ip_address}
                </p>
              </div>
              {filter === 'pending' && (
                <div className={styles.actionsArea}>
                  <button onClick={() => handleModerate(item.id, 'approved')} className={styles.approveButton}>
                    <CheckCircle size={16} /> Aprovar
                  </button>
                  <button onClick={() => handleModerate(item.id, 'rejected')} className={styles.rejectButton}>
                    <XCircle size={16} /> Rejeitar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
