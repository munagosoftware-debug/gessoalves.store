'use client';

import { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Edit, Trash2, Star } from 'lucide-react';
import styles from '@/app/admin/page.module.css';

export default function AdminTestimonials({ onError }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    rating: 5,
    text: '',
    file: null,
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
      if (res.status === 401) {
        if (onError) onError();
        return;
      }
      const { data } = await res.json();
      setTestimonials(data || []);
    } catch {
      setTestimonials([]);
    }
    setLoading(false);
  }, [onError]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleOpenModal = (testimonial = null) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setFormData({
        name: testimonial.name,
        service: testimonial.service,
        rating: testimonial.rating,
        text: testimonial.text,
        file: null,
        image_url: testimonial.image_url || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        service: '',
        rating: 5,
        text: '',
        file: null,
        image_url: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    const form = new FormData();
    if (editingId) form.append('id', editingId);
    form.append('name', formData.name);
    form.append('service', formData.service);
    form.append('rating', formData.rating);
    form.append('text', formData.text);
    if (formData.file) form.append('file', formData.file);
    if (editingId && formData.image_url) form.append('image_url', formData.image_url);

    try {
      const res = await fetch('/api/admin/testimonials', {
        method: editingId ? 'PATCH' : 'POST',
        body: form
      });

      if (res.status === 401) {
        if (onError) onError();
        return;
      }

      if (res.ok) {
        setShowModal(false);
        fetchTestimonials();
      } else {
        const errorData = await res.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (err) {
      alert('Erro ao salvar depoimento.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta avaliação?')) return;
    
    const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
    if (res.status === 401) {
      if (onError) onError();
      return;
    }
    
    if (res.ok) {
      fetchTestimonials();
    }
  };

  return (
    <div>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.headerTitle}>Gerenciar Avaliações</h1>
        <button onClick={() => handleOpenModal()} className={styles.actionButton}>
          <PlusCircle size={16} /> Adicionar Nova
        </button>
      </div>

      {loading ? <p className={styles.loadingText} style={{ textAlign: 'center' }}>Carregando...</p> : testimonials.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Nenhuma avaliação encontrada.</p>
        </div>
      ) : (
        <div className={styles.submissionList}>
          {testimonials.map(item => (
            <div key={item.id} className={styles.submissionCard} style={{ gridTemplateColumns: '1fr auto', padding: '16px' }}>
              <div className={styles.infoArea} style={{ padding: '0' }}>
                <h3 className={styles.itemName}>{item.name} <span style={{color: '#fbbf24'}}>{"⭐".repeat(item.rating)}</span></h3>
                <p className={styles.itemDetail}>🔧 {item.service}</p>
                <p className={styles.itemDetail} style={{ marginTop: '8px', color: '#fff' }}>&quot;{item.text}&quot;</p>
              </div>
              <div className={styles.actionsArea} style={{ flexDirection: 'column' }}>
                <button onClick={() => handleOpenModal(item)} className={styles.editButton}>
                  <Edit size={16} /> Editar
                </button>
                <button onClick={() => handleDelete(item.id)} className={styles.rejectButton}>
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{editingId ? 'Editar Avaliação' : 'Nova Avaliação'}</h2>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Foto do Cliente (Opcional)</label>
                {(formData.file || formData.image_url) && (
                  <div style={{ marginBottom: '10px' }}>
                    <img 
                      src={formData.file ? URL.createObjectURL(formData.file) : formData.image_url} 
                      alt="Avatar Preview" 
                      style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setFormData({...formData, file: null, image_url: ''})}
                      style={{ display: 'block', marginTop: '5px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                    >
                      Remover foto
                    </button>
                  </div>
                )}
                {!formData.file && !formData.image_url && (
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setFormData({...formData, file: e.target.files[0]});
                      }
                    }} 
                    className={styles.modalInput}
                  />
                )}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Nome do Cliente</label>
                <input 
                  type="text" 
                  placeholder="Ex: João Silva" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  className={styles.modalInput}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Serviço Realizado</label>
                <input 
                  type="text" 
                  placeholder="Ex: Forro de Gesso 3D, Divisória" 
                  value={formData.service} 
                  onChange={(e) => setFormData({...formData, service: e.target.value})} 
                  required 
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Avaliação (Estrelas)</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star size={28} fill={formData.rating >= star ? '#eab308' : 'transparent'} color={formData.rating >= star ? '#eab308' : '#666'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Depoimento do Cliente</label>
                <textarea 
                  placeholder="Escreva o depoimento aqui..." 
                  value={formData.text} 
                  onChange={(e) => setFormData({...formData, text: e.target.value})} 
                  required 
                  rows={4}
                  className={styles.modalInput}
                />
              </div>

              <div className={styles.modalActions}>
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
