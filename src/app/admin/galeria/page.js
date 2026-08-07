'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, LogIn, LogOut } from 'lucide-react';

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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f8fb' }}>
        <p style={{ color: '#888' }}>Carregando...</p>
      </div>
    );
  }

  // Tela de Login
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f8fb' }}>
        <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: 'var(--color-navy)', fontSize: '1.8rem' }}>Painel Admin</h1>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Gessoalves · Moderação de Galeria</p>
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="email" required placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            <input type="password" required placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
            {loginError && <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>{loginError}</p>}
            <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'var(--color-navy)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              <LogIn size={18} /> Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8fb', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
          <h1 style={{ color: 'var(--color-navy)', fontSize: '1.8rem' }}>Moderação de Galeria</h1>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {['pending', 'approved', 'rejected'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 18px', borderRadius: '20px', border: '1px solid var(--color-navy)', background: filter === f ? 'var(--color-navy)' : '#fff', color: filter === f ? '#fff' : 'var(--color-navy)', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                {f === 'pending' ? 'Pendentes' : f === 'approved' ? 'Aprovados' : 'Rejeitados'}
              </button>
            ))}
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '20px', border: '1px solid #dc2626', background: '#fff', color: '#dc2626', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {loading ? <p style={{ textAlign: 'center', color: '#888' }}>Carregando...</p> : submissions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#888', background: '#fff', borderRadius: '12px' }}>
            <p>Nenhuma submissão {filter === 'pending' ? 'pendente' : filter === 'approved' ? 'aprovada' : 'rejeitada'}.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {submissions.map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '0', alignItems: 'stretch' }}>
                {/* Imagens */}
                <div style={{ display: 'flex', gap: '4px', padding: '16px', background: '#f8f8f8' }}>
                  {item.image_urls.map((url, i) => (
                    <img key={i} src={url} alt="Submissão" style={{ width: '90px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  ))}
                </div>
                {/* Info */}
                <div style={{ padding: '16px' }}>
                  <h3 style={{ color: 'var(--color-navy)', margin: '0 0 6px', fontSize: '1.1rem' }}>{item.name}</h3>
                  <p style={{ color: '#555', fontSize: '0.85rem', margin: '0 0 3px' }}>🔧 {item.service}</p>
                  <p style={{ color: '#555', fontSize: '0.85rem', margin: '0 0 3px' }}>📍 {item.bairro}</p>
                  <p style={{ color: '#888', fontSize: '0.75rem', margin: 0 }}>
                    {new Date(item.created_at).toLocaleDateString('pt-BR')} · IP: {item.ip_address}
                  </p>
                </div>
                {/* Ações */}
                {filter === 'pending' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', justifyContent: 'center' }}>
                    <button onClick={() => handleModerate(item.id, 'approved')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
                      <CheckCircle size={16} /> Aprovar
                    </button>
                    <button onClick={() => handleModerate(item.id, 'rejected')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
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

const inputStyle = { width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' };
