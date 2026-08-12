'use client';

import { useState, useRef, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Send, CheckCircle, X, Image as ImageIcon, ChevronDown, Shield } from 'lucide-react';

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
    const newFilesArray = Array.from(selectedFiles);
    
    const uniqueNewFiles = newFilesArray.filter(newFile => 
      !files.some(existingFile => existingFile.name === newFile.name)
    );

    if (uniqueNewFiles.length === 0 && newFilesArray.length > 0) {
      setErrorMsg('Estes arquivos já foram adicionados.');
      return;
    }

    const availableSlots = 5 - files.length;
    if (availableSlots <= 0) {
      setErrorMsg('Você já atingiu o limite máximo de 5 arquivos.');
      return;
    }
    
    if (files.length + uniqueNewFiles.length > 5) {
      setErrorMsg('Limite excedido! O máximo permitido é de 5 arquivos no total.');
      return;
    }
    
    const allowedNewFiles = uniqueNewFiles;
    if (allowedNewFiles.length === 0) return;

    const newCompressedFiles = [];
    const newPreviewUrls = [];

    for (const file of allowedNewFiles) {
      if (file.size > 100 * 1024 * 1024) {
        setErrorMsg(`O arquivo ${file.name} excede o limite máximo de 100MB.`);
        continue;
      }

      if (file.type.startsWith('video/')) {
        if (!['video/mp4', 'video/webm'].includes(file.type)) {
          setErrorMsg(`O formato de vídeo ${file.type} não é suportado. Envie MP4 ou WEBM.`);
          continue;
        }
        newCompressedFiles.push(file);
        newPreviewUrls.push({ url: URL.createObjectURL(file), type: file.type });
        continue;
      }

      const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
      try {
        const compressed = await imageCompression(file, options);
        newCompressedFiles.push(new File([compressed], file.name, { type: compressed.type }));
        newPreviewUrls.push({ url: URL.createObjectURL(compressed), type: compressed.type });
      } catch {
        newCompressedFiles.push(file);
        newPreviewUrls.push({ url: URL.createObjectURL(file), type: file.type });
      }
    }

    if (newCompressedFiles.length > 0) {
      setFiles(prev => [...prev, ...newCompressedFiles]);
      setPreviews(prev => [...prev, ...newPreviewUrls]);
      if (files.length + uniqueNewFiles.length <= 5) {
        setErrorMsg('');
      }
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
            style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--color-graphite)', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle size={72} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
            </motion.div>
            <h3 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>Fotos Enviadas!</h3>
            <p style={{ color: 'var(--color-silver-light)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
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
              gap: '28px',
              background: 'linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.9) 100%)',
              backdropFilter: 'blur(20px)',
              padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2.5rem)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {/* Honeypot anti-bot — oculto */}
            <input name="website" type="text" defaultValue="" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '20px' }}>
              <div>
                <label htmlFor="name" style={labelStyle}>Nome completo *</label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Ex: João da Silva"
                  style={inputStyle}
                  className="premium-input"
                />
              </div>
              <div>
                <label htmlFor="contact" style={labelStyle}>WhatsApp ou E-mail <span style={{color: '#94a3b8', fontWeight: 'normal'}}>(opcional)</span></label>
                <input
                  id="contact"
                  value={form.contact}
                  onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                  placeholder="(11) 99999-9999"
                  style={inputStyle}
                  className="premium-input"
                />
              </div>
              <div>
                <label id="service-label" style={labelStyle}>Serviço realizado *</label>
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <div
                    role="combobox"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="listbox"
                    aria-labelledby="service-label"
                    aria-controls="service-listbox"
                    tabIndex={0}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsDropdownOpen(!isDropdownOpen); } }}
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: form.service ? '#ffffff' : 'rgba(255,255,255,0.5)',
                      border: isDropdownOpen ? '1px solid var(--color-cyan, #4cc9f0)' : inputStyle.border
                    }}
                    className="premium-input"
                  >
                    {form.service || 'Selecione uma opção...'}
                    <ChevronDown size={18} style={{ transition: 'transform 0.2s ease', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                  </div>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        id="service-listbox"
                        role="listbox"
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          background: 'var(--color-graphite)',
                          border: '1px solid rgba(255,255,255,0.1)',
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
                            role="option"
                            aria-selected={form.service === s}
                            tabIndex={0}
                            onClick={() => {
                              setForm(p => ({ ...p, service: s }));
                              setIsDropdownOpen(false);
                            }}
                            onKeyDown={(e) => { if(e.key === 'Enter') { setForm(p => ({ ...p, service: s })); setIsDropdownOpen(false); } }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = form.service === s ? 'rgba(255,255,255,0.05)' : 'transparent';
                            }}
                            style={{
                              padding: '12px 16px',
                              cursor: 'pointer',
                              color: '#ffffff',
                              transition: 'background 0.2s',
                              background: form.service === s ? 'rgba(255,255,255,0.05)' : 'transparent',
                              fontWeight: form.service === s ? '600' : '400',
                              borderLeft: form.service === s ? '3px solid var(--color-cyan, #4cc9f0)' : '3px solid transparent'
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
                <label htmlFor="bairro" style={labelStyle}>Bairro / Cidade *</label>
                <input
                  id="bairro"
                  required
                  value={form.bairro}
                  onChange={e => setForm(p => ({ ...p, bairro: e.target.value }))}
                  placeholder="Ex: Morumbi, SP"
                  style={inputStyle}
                  className="premium-input"
                />
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="experience" style={labelStyle}>Sobre a sua experiência <span style={{color: '#94a3b8', fontWeight: 'normal'}}>(opcional)</span></label>
                <textarea
                  id="experience"
                  value={form.experience}
                  onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}
                  placeholder="Conte-nos um pouco sobre como foi realizar sua obra com a Gesso Alves..."
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }}
                  className="premium-input"
                />
              </div>
            </div>

            {/* Dropzone Elegante para Fotos ou Vídeos */}
            <div>
              <label htmlFor="file-upload" style={labelStyle}>Fotos ou Vídeos do resultado <span style={{color: '#94a3b8', fontWeight: 'normal'}}>(1 a 5 arquivos — JPG, PNG, WebP, MP4, WEBM — máx 100MB)</span></label>
              
              <div 
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInputRef.current?.click(); } }}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: isDragging ? '2px dashed var(--color-cyan, #4cc9f0)' : '2px dashed rgba(255,255,255,0.15)',
                  background: isDragging ? 'rgba(76, 201, 240, 0.05)' : 'rgba(255,255,255,0.02)',
                  borderRadius: '20px',
                  padding: '3rem 1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  boxShadow: isDragging ? 'inset 0 0 40px rgba(76, 201, 240, 0.1)' : 'inset 0 0 0 transparent'
                }}
              >
                <input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                
                <div style={{ 
                  width: '72px', height: '72px', 
                  borderRadius: '50%', 
                  background: isDragging ? 'linear-gradient(135deg, #4cc9f0, #4361ee)' : 'rgba(255,255,255,0.05)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  color: isDragging ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isDragging ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
                  boxShadow: isDragging ? '0 10px 30px rgba(67, 97, 238, 0.4)' : 'none'
                }}>
                  <UploadCloud size={isDragging ? 36 : 32} style={{ transition: 'all 0.3s' }} />
                </div>
                <div>
                  <p style={{ fontWeight: '600', color: isDragging ? '#4cc9f0' : '#ffffff', margin: 0, fontSize: 'clamp(0.95rem, 4vw, 1.1rem)', transition: 'color 0.3s' }}>
                    {isDragging ? 'Solte seus arquivos aqui!' : 'Clique ou arraste os arquivos'}
                  </p>
                  <p style={{ color: 'var(--color-silver-light)', fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', marginTop: '6px' }}>
                    Máximo de 5 fotos ou vídeos (até 100MB).
                  </p>
                </div>
              </div>

              {/* Grid de Previews */}
              {previews.length > 0 && (
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {previews.map((preview, i) => (
                    <div key={i} style={{ position: 'relative', width: '100px', height: '100px' }}>
                      {preview.type.startsWith('video/') ? (
                        <video
                          src={preview.url}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={preview.url}
                          alt={`Preview ${i + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      )}
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

            {/* Autorização Legal e Privacidade */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
              <div style={{ 
                padding: '20px', 
                background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderLeft: '4px solid #4cc9f0',
                transition: 'all 0.3s ease'
              }}>
                <label htmlFor="authorized" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', cursor: 'pointer', margin: 0 }}>
                  <input
                    id="authorized"
                    type="checkbox"
                    required
                    checked={form.authorized}
                    onChange={e => setForm(p => ({ ...p, authorized: e.target.checked }))}
                    style={{ marginTop: '3px', width: '22px', height: '22px', accentColor: 'var(--color-cyan, #4cc9f0)', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                    <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Autorização de uso de imagem:</strong> 
                    Autorizo a Gessoalves a publicar meu nome e a(s) foto(s) ou vídeo(s) enviada(s) no portfólio do site e nas redes sociais oficiais da empresa. *
                  </span>
                </label>
              </div>

              {/* Privacy Notice */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <Shield size={20} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: '1.5' }}>
                  <strong style={{ color: '#10B981' }}>Fique tranquilo!</strong> Seus dados de contato (WhatsApp e e-mail) são estritamente confidenciais e não serão divulgados. Apenas a sua opinião e as fotos aparecerão na nossa galeria.
                </p>
              </div>
            </div>

            {errorMsg && (
              <motion.div 
                role="alert"
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
                padding: 'clamp(14px, 4vw, 18px) clamp(16px, 5vw, 32px)', 
                fontSize: 'clamp(1rem, 4vw, 1.15rem)',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                opacity: status === 'loading' ? 0.7 : 1,
                borderRadius: '16px',
                width: '100%',
                marginTop: '16px',
                boxShadow: '0 10px 25px rgba(76, 201, 240, 0.3)',
                letterSpacing: '0.5px'
              }}
            >
              {status === 'loading' ? 'Processando envio...' : (
                <>
                  Enviar Minhas Fotos
                  <Send size={22} style={{ transition: 'transform 0.3s ease', transform: 'translateX(2px)' }} />
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
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  fontSize: '1rem',
  color: '#ffffff',
  background: 'rgba(255,255,255,0.03)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'all 0.2s ease'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '600',
  fontSize: '0.9rem',
  color: 'var(--color-silver-light)',
};
