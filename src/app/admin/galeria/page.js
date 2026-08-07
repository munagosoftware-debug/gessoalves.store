'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CheckCircle, XCircle, LogIn, LogOut } from 'lucide-react';
import styles from './page.module.css';

export default function AdminGaleriaPage() {
  // authed: null = verificando sessão, true = autenticado, false = não autenticado
  const [authed, setAuthed] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending');

  // Autenticação via cookie httpOnly de sessão (definido pelo servidor)
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setAuthed(true);
    } else {
      setLoginError(data.error || 'Credenciais inválidas.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
    setSubmissions([]);
  };

  const fetchSubmissions = useCallback(async (f) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?status=${f}`);
      if (res.status === 401) {
        setAuthed(false);
        setSubmissions([]);
        return;
      }
      const { data } = await res.json();
      setSubmissions(data || []);
    } catch {
      setSubmissions([]);
    }
    setLoading(false);
  }, []);

  // Ao montar, tenta usar a sessão (cookie httpOnly) já existente
  useEffect(() => {
    fetchSubmissions('pending').then(() => {
      setAuthed((prev) => (prev === false ? false : true));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authed) fetchSubmissions(filter);
  }, [authed, filter, fetchSubmissions]);

  const handleModerate = async (id, status) => {
    const res = await fetch('/api/admin/gallery', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    fetchSubmissions(filter);
  };

  // Aguardando verificação inicial da sessão
  if (authed === null) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Carregando...</p>
      </div>
    );
  }

  // Tela de Login
  if (!authed) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className="logo-highlight" style={{ margin: '0 auto 1rem', display: 'inline-block' }}>
              <Image src="/logo-v2.png" alt="Gessoalves Logo" width={240} height={80} style={{ display: 'block', objectFit: 'contain' }} />
            </div>
            <h1 className={styles.loginTitle}>Painel Admin</h1>
            <p className={styles.loginSubtitle}>Gessoalves · Moderação de Galeria</p>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input type="email" required placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} className={styles.loginInput} />
            <input type="password" required placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className={styles.loginInput} />
            {loginError && <p className={styles.loginError}>{loginError}</p>}
            <button type="submit" className={styles.loginButton}>
              <LogIn size={18} /> Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardInner}>
        <div className={styles.dashboardHeader}>
          <h1 className={styles.headerTitle}>Moderação de Galeria</h1>
          <div className={styles.filterBar}>
            {['pending', 'approved', 'rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={filter === f ? styles.filterButtonActive : styles.filterButton}>
                {f === 'pending' ? 'Pendentes' : f === 'approved' ? 'Aprovados' : 'Rejeitados'}
              </button>
            ))}
            <button onClick={handleLogout} className={styles.logoutButton}>
              <LogOut size={16} /> Sair
            </button>
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
                {/* Imagens */}
                <div className={styles.imageArea}>
                  {item.image_urls.map((url, i) => (
                    <Image key={i} src={url} alt="Submissão" width={90} height={80} className={styles.thumbnail} />
                  ))}
                </div>
                {/* Info */}
                <div className={styles.infoArea}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDetail}>🔧 {item.service}</p>
                  <p className={styles.itemDetail}>📍 {item.bairro}</p>
                  <p className={styles.itemMeta}>
                    {new Date(item.created_at).toLocaleDateString('pt-BR')} · IP: {item.ip_address}
                  </p>
                </div>
                {/* Ações */}
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
    </div>
  );
}
