'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Trash2, Edit } from 'lucide-react';
import styles from '@/app/admin/page.module.css';

export default function AdminAssets({ onError, filter = 'all' }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    section: 'hero', // default
    title: '',
    file: null,
    image_url: ''
  });

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        section: item.section,
        title: item.title || '',
        file: null,
        image_url: item.image_url
      });
    } else {
      setEditingId(null);
      setFormData({ section: 'hero', title: '', file: null, image_url: '' });
    }
    setShowModal(true);
  };

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/assets');
      if (res.status === 401) {
        if (onError) onError();
        return;
      }
      const { data } = await res.json();
      setAssets(data || []);
    } catch {
      setAssets([]);
    }
    setLoading(false);
  }, [onError]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!editingId;
    if (!isEdit && !formData.file) return;

    setUploading(true);
    const form = new FormData();
    if (isEdit) form.append('id', editingId);
    form.append('section', formData.section);
    form.append('title', formData.title);
    if (formData.file) form.append('file', formData.file);
    if (isEdit && formData.image_url) form.append('image_url', formData.image_url);

    try {
      const res = await fetch('/api/admin/assets', {
        method: isEdit ? 'PUT' : 'POST',
        body: form
      });

      if (res.status === 401) {
        if (onError) onError();
        return;
      }

      if (res.ok) {
        setShowModal(false);
        setEditingId(null);
        setFormData({ section: 'hero', title: '', file: null, image_url: '' });
        fetchAssets();
      } else {
        const errorData = await res.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (err) {
      alert('Erro ao enviar o arquivo.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta mídia? Esta ação pode quebrar a exibição no site se não houver outra mídia substituta.')) return;
    
    const res = await fetch(`/api/admin/assets?id=${id}`, { method: 'DELETE' });
    if (res.status === 401) {
      if (onError) onError();
      return;
    }
    
    if (res.ok) {
      fetchAssets();
    }
  };

  const sectionGroups = [
    {
      label: 'Home Page',
      options: [
        { value: 'hero', label: 'Carrossel Principal (Hero)' },
        { value: 'portfolio', label: 'Carrossel Obras Recentes (Home)' },
        { value: 'beforeafter', label: 'Comparativo Antes/Depois (Home)' },
      ]
    },
    {
      label: 'Páginas de Serviços (Capas e Galerias)',
      options: [
        { value: 'services_forro-de-gesso-acartonado', label: 'Serviço: Forro Acartonado' },
        { value: 'services_parede-de-drywall', label: 'Serviço: Parede de Drywall' },
        { value: 'services_sanca-de-gesso', label: 'Serviço: Sanca de Gesso' },
        { value: 'services_rebaixamento-de-teto-com-gesso', label: 'Serviço: Rebaixamento de Teto' },
        { value: 'services_molduras-de-gesso', label: 'Serviço: Molduras & Rodateto' },
        { value: 'services_forro-modular', label: 'Serviço: Forro Modular' }
      ]
    },
    {
      label: 'Página de Portfólio (Projetos Fixos)',
      options: [
        { value: 'portfolio_proj_1', label: 'Projeto 1: Forro Acartonado' },
        { value: 'portfolio_proj_2', label: 'Projeto 2: Drywall Corporativo' },
        { value: 'portfolio_proj_3', label: 'Projeto 3: Molduras' },
        { value: 'portfolio_proj_4', label: 'Projeto 4: Rebaixamento LED' },
        { value: 'portfolio_proj_5', label: 'Projeto 5: Parede Acústica' },
        { value: 'portfolio_proj_6', label: 'Projeto 6: Sanca Flutuante' },
        { value: 'portfolio_proj_7', label: 'Projeto 7: Forro Modular' },
        { value: 'portfolio_proj_8', label: 'Projeto 8: Sanca Aberta' }
      ]
    }
  ];

  const getSectionLabel = (val) => {
    for (const group of sectionGroups) {
      const found = group.options.find(opt => opt.value === val);
      if (found) return found.label;
    }
    return val;
  };

  const filteredAssets = filter === 'all' 
    ? assets 
    : filter === 'services'
      ? assets.filter(item => item.section.startsWith('services_'))
      : filter === 'home'
        ? assets.filter(item => ['hero', 'beforeafter'].includes(item.section))
      : filter === 'portfolio'
        ? assets.filter(item => item.section === 'portfolio' || item.section.startsWith('portfolio_proj_'))
      : assets.filter(item => item.section === filter);

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.headerTitle}>Gerenciar Mídias do Site</h1>
        <button onClick={() => handleOpenModal()} className={styles.actionButton}>
          <UploadCloud size={16} /> Nova Mídia
        </button>
      </div>



      {loading ? <p className={styles.loadingText} style={{ textAlign: 'center' }}>Carregando...</p> : filteredAssets.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhuma mídia encontrada para esta categoria.</p>
        </div>
      ) : (
        <div className={styles.submissionList}>
          {filteredAssets.map(item => (
            <div key={item.id} className={styles.submissionCard} style={{ gridTemplateColumns: 'auto 1fr auto', padding: '16px' }}>
              <div className={styles.imageArea} style={{ padding: '0', marginRight: '16px' }}>
                {item.image_url.match(/\.(mp4|webm)$/i) ? (
                  <video src={item.image_url} width={120} height={80} style={{ objectFit: 'cover', borderRadius: '8px' }} muted />
                ) : (
                  <Image src={item.image_url} alt={item.title || "Midia"} width={120} height={80} className={styles.thumbnail} />
                )}
              </div>
              <div className={styles.infoArea} style={{ padding: '0' }}>
                <h3 className={styles.itemName}>{item.title || 'Sem título'}</h3>
                <p className={styles.itemDetail}>{getSectionLabel(item.section)}</p>
                <p className={styles.itemMeta} style={{ marginTop: '8px' }}>
                  Adicionado em {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className={styles.actionsArea} style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <button onClick={() => handleOpenModal(item)} className={styles.editButton}>
                  <Edit size={16} /> Editar
                </button>
                <button onClick={() => handleDelete(item.id)} className={styles.rejectButton} style={{ marginTop: '6px' }}>
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Upload */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{editingId ? 'Editar Mídia' : 'Adicionar Nova Mídia'}</h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Seção de Destino</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                    className={styles.modalInput}
                  >
                    {sectionGroups.map((group, idx) => (
                      <optgroup key={idx} label={group.label}>
                        {group.options.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Título ou Descrição (opcional)</label>
                <input 
                  type="text" 
                  placeholder="Ex: Foto fachada nova" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  className={styles.modalInput}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Arquivo (Imagem ou Vídeo)</label>
                <div className={styles.fileUploadArea}>
                  <label className={styles.fileUploadLabel}>
                    {!formData.file && formData.image_url ? (
                      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {formData.image_url.match(/\.(mp4|webm)$/i) ? (
                          <video src={formData.image_url} style={{ maxHeight: '150px', borderRadius: '8px', marginBottom: '10px' }} muted />
                        ) : (
                          <img src={formData.image_url} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px', marginBottom: '10px' }} />
                        )}
                        <span style={{color: '#fff', fontSize: '0.85rem'}}>Mídia Atual (Clique para alterar)</span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud size={36} className={styles.fileUploadIcon} />
                        <span style={{color: formData.file ? '#fff' : '#aaa', fontWeight: formData.file ? 'bold' : 'normal'}}>
                          {formData.file ? formData.file.name : 'Clique para selecionar a mídia'}
                        </span>
                      </>
                    )}
                    <input 
                      type="file" 
                      accept="image/*,video/mp4,video/webm"
                      onChange={(e) => setFormData({...formData, file: e.target.files[0]})} 
                      required={!editingId} 
                      className={styles.fileInputHidden}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.modalActions} style={{ marginTop: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelButton} disabled={uploading}>Cancelar</button>
                <button type="submit" className={styles.submitButton} disabled={uploading}>
                  {uploading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
