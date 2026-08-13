'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LogIn, LogOut, Image as ImageIcon, MessageSquare, LayoutDashboard } from 'lucide-react';
import styles from './page.module.css';

import AdminGaleria from '@/components/admin/AdminGaleria';
import AdminTestimonials from '@/components/admin/AdminTestimonials';
import AdminAssets from '@/components/admin/AdminAssets';

export default function AdminDashboardPage() {
  const [authed, setAuthed] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('galeria');

  // Verifica a sessão ao carregar
  useEffect(() => {
    fetch('/api/admin/gallery?status=pending')
      .then(res => {
        if (res.status === 401) {
          setAuthed(false);
        } else {
          setAuthed(true);
        }
      })
      .catch(() => setAuthed(false));
  }, []);

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
  };

  // Se a API retornar 401 dentro de algum componente
  const handleAuthError = () => {
    setAuthed(false);
  };

  if (authed === null) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Carregando painel...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className="logo-highlight" style={{ margin: '0 auto 1rem', display: 'inline-block' }}>
              <Image src="/logo-v2.png" alt="Gessoalves Logo" width={240} height={80} style={{ display: 'block', objectFit: 'contain' }} />
            </div>
            <h1 className={styles.loginTitle}>Painel Admin</h1>
            <p className={styles.loginSubtitle}>Gessoalves Store</p>
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
        
        {/* Top Navbar */}
        <div className={styles.topNav}>
          <div className={styles.brand}>
            <Image src="/logo-v2.png" alt="Gessoalves Logo" width={150} height={50} style={{ objectFit: 'contain' }} />
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={16} /> Sair
          </button>
        </div>

        <div className={styles.dashboardLayout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <nav className={styles.navMenu}>
              <button 
                onClick={() => setActiveTab('galeria')} 
                className={activeTab === 'galeria' ? styles.navItemActive : styles.navItem}
              >
                <LayoutDashboard size={18} /> Aprovação da Galeria
              </button>
              <button 
                onClick={() => setActiveTab('testimonials')} 
                className={activeTab === 'testimonials' ? styles.navItemActive : styles.navItem}
              >
                <MessageSquare size={18} /> Avaliações de Clientes
              </button>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button 
                  onClick={() => setActiveTab(activeTab.startsWith('assets') ? 'galeria' : 'assets_all')} 
                  className={activeTab.startsWith('assets') ? styles.navItemActive : styles.navItem}
                >
                  <ImageIcon size={18} /> Mídias do Site (Fotos/Vídeos)
                </button>
                {activeTab.startsWith('assets') && (
                  <div className={styles.subMenu}>
                    <button onClick={() => setActiveTab('assets_all')} className={activeTab === 'assets_all' ? styles.subNavItemActive : styles.subNavItem}>Todas as Fotos</button>
                    <button onClick={() => setActiveTab('assets_home')} className={activeTab === 'assets_home' ? styles.subNavItemActive : styles.subNavItem}>Home (Hero / Antes & Depois)</button>
                    <button onClick={() => setActiveTab('assets_services')} className={activeTab === 'assets_services' ? styles.subNavItemActive : styles.subNavItem}>Páginas de Serviços</button>
                    <button onClick={() => setActiveTab('assets_portfolio')} className={activeTab === 'assets_portfolio' ? styles.subNavItemActive : styles.subNavItem}>Página Portfólio & Obras</button>
                  </div>
                )}
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className={styles.mainContent}>
            {activeTab === 'galeria' && <AdminGaleria onError={handleAuthError} />}
            {activeTab === 'testimonials' && <AdminTestimonials onError={handleAuthError} />}
            {activeTab.startsWith('assets') && <AdminAssets onError={handleAuthError} filter={activeTab.split('_')[1] || 'all'} />}
          </main>
        </div>

      </div>
    </div>
  );
}
