'use client';

import { useState, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Send, CheckCircle, X, Image as ImageIcon, ChevronDown } from 'lucide-react';

const SERVICES = [
  'Forro de Gesso Acartonado',
  'Parede de Drywall',
  'Sanca de Gesso',
  'Rebaixamento de Teto com Gesso',
  'Molduras de Gesso',
  'Forro Modular',
];

export default function ClientGalleryForm() {
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({ name: '', contact: '', service: '', bairro: '', experience: '', authorized: false });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const processFiles = async (selectedFiles) => {
    const selected = Array.from(selectedFiles).slice(0, 3);
    const compressedFiles = [];
    const previewUrls = [];

    for (const file of selected) {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
      try {
        const compressed = await imageCompression(file, options);
        compressedFiles.push(new File([compressed], file.name, { type: compressed.type }));
        previewUrls.push(URL.createObjectURL(compressed));
      } catch {
        compressedFiles.push(file);
        previewUrls.push(URL.createObjectURL(file));
      }
    }
    setFiles(compressedFiles);
    setPreviews(previewUrls);
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service) { setErrorMsg('Selecione o serviço realizado.'); return; }
    if (!form.authorized) { setErrorMsg('Você precisa autorizar a publicação.'); return; }
    if (files.length === 0) { setErrorMsg('Adicione ao menos 1 foto.'); return; }

    setStatus('loading');
    setErrorMsg('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('contact', form.contact);
    formData.append('service', form.service);
    formData.append('bairro', form.bairro);
    formData.append('experience', form.experience);
    formData.append('authorized', 'true');
    formData.append('website', ''); // honeypot — deve ficar vazio
    files.forEach(f => formData.append('images', f));

    try {
      const res = await fetch('/api/gallery/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar.');
      setStatus('success');
      setForm({ name: '', contact: '', service: '', bairro: '', experience: '', authorized: false });
      setFiles([]); setPreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: '750px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            style={{ textAlign: 'center', padding: '4rem 2rem', background: '#fff', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle size={72} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
            </motion.div>
            <h3 style={{ color: 'var(--color-navy)', fontSize: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>Fotos Enviadas!</h3>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
              Obrigado por compartilhar o resultado! Suas fotos passarão por uma rápida moderação antes de aparecerem na nossa galeria.
            </p>
            <button
              onClick={() => setStatus(null)}
              className="btn-3d"
              style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: '12px' }}
            >
              Enviar Mais Fotos
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '24px',
              background: '#fff',
              padding: '2.5rem',
              borderRadius: '24px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
            }}
          >
            {/* Honeypot anti-bot — oculto */}
            <input name="website" type="text" defaultValue="" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Nome completo *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: João da Silva"
                  style={inputStyle}
                  className="premium-input"
                />
              </div>
              <div>
                <label style={labelStyle}>WhatsApp ou E-mail <span style={{color: '#94a3b8', fontWeight: 'normal'}}>(opcional)</span></label>
                <input
                  value={form.contact}
                  onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  style={inputStyle}
                  className="premium-input"
                />
              </div>
              <div>
                <label style={labelStyle}>Serviço realizado *</label>
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: form.service ? 'var(--color-navy)' : '#94a3b8',
                      border: isDropdownOpen ? '1px solid var(--color-navy)' : inputStyle.border
                    }}
                    className="premium-input"
                  >
                    {form.service || 'Selecione uma opção...'}
                    <ChevronDown size={18} style={{ transition: 'transform 0.2s ease', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </div>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: '#fff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '12px',
                          marginTop: '6px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                          zIndex: 50,
                          overflow: 'hidden',
                          transformOrigin: 'top'
                        }}
                      >
                        {SERVICES.map(s => (
                          <div
                            key={s}
                            onClick={() => {
                              setForm(p => ({ ...p, service: s }));
                              setIsDropdownOpen(false);
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#f1f5f9';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = form.service === s ? '#f1f5f9' : 'transparent';
                            }}
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              color: 'var(--color-navy)',
                              transition: 'background 0.2s',
                              background: form.service === s ? '#f1f5f9' : 'transparent',
                              fontWeight: form.service === s ? '600' : '400',
                              borderLeft: form.service === s ? '3px solid var(--color-navy)' : '3px solid transparent'
                            }}
                          >
                            {s}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Bairro / Cidade *</label>
                <input
                  required
                  value={form.bairro}
                  onChange={e => setForm(p => ({ ...p, bairro: e.target.value }))}
                  placeholder="Ex: Morumbi, SP"
                  style={inputStyle}
                  className="premium-input"
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Sobre a sua experiência <span style={{color: '#94a3b8', fontWeight: 'normal'}}>(opcional)</span></label>
                <textarea
                  value={form.experience}
                  onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}
                  placeholder="Conte-nos um pouco sobre como foi realizar sua obra com a Gesso Alves..."
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }}
                  className="premium-input"
                />
              </div>
            </div>

            {/* Dropzone Elegante para Fotos */}
            <div>
              <label style={labelStyle}>Fotos do resultado <span style={{color: '#94a3b8', fontWeight: 'normal'}}>(1 a 3 fotos — JPG, PNG, WebP)</span></label>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragging ? '2px dashed var(--color-navy)' : '2px dashed #cbd5e1',
                  background: isDragging ? '#f8fafc' : '#ffffff',
                  borderRadius: '16px',
                  padding: '2.5rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-navy)' }}>
                  <UploadCloud size={32} />
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: 'var(--color-navy)', margin: 0, fontSize: '1.05rem' }}>
                    Clique para fazer upload ou arraste as fotos
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                    Máximo de 3 fotos. Tamanho ideal.
                  </p>
                </div>
              </div>

              {/* Grid de Previews */}
              {previews.length > 0 && (
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {previews.map((url, i) => (
                    <div key={i} style={{ position: 'relative', width: '100px', height: '100px' }}>
                      <img
                        src={url}
                        alt={`Preview ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                        style={{
                          position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px',
                          background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Autorização Legal */}
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', margin: 0 }}>
                <input
                  type="checkbox"
                  required
                  checked={form.authorized}
                  onChange={e => setForm(p => ({ ...p, authorized: e.target.checked }))}
                  style={{ marginTop: '4px', width: '20px', height: '20px', accentColor: 'var(--color-navy)', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.4' }}>
                  <strong>Autorização de uso de imagem:</strong> Autorizo a Gessoalves a publicar meu nome e a(s) foto(s) enviada(s) no portfólio do site e nas redes sociais oficiais da empresa. *
                </span>
              </label>
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: '#fef2f2', color: '#dc2626', padding: '14px', borderRadius: '12px', fontSize: '0.95rem', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                ⚠️ {errorMsg}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-3d"
              style={{ 
                padding: '16px 32px', 
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                opacity: status === 'loading' ? 0.7 : 1,
                borderRadius: '14px',
                width: '100%',
                marginTop: '10px'
              }}
            >
              {status === 'loading' ? 'Processando envio...' : (
                <>
                  Enviar Minhas Fotos
                  <Send size={20} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #cbd5e1',
  borderRadius: '12px',
  fontSize: '1rem',
  color: 'var(--color-navy)',
  background: '#f8fafc',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  fontSize: '0.9rem',
  color: 'var(--color-navy)',
};
