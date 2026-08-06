'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Send, CheckCircle, AlertCircle, Paperclip } from 'lucide-react';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  subject: z.string().min(3, 'Assunto obrigatório'),
  message: z.string().min(10, 'Mensagem muito curta'),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [file, setFile] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const loadingToast = toast.loading('Enviando sua mensagem...');

    try {
      if (!executeRecaptcha) {
        throw new Error('ReCaptcha não está disponível');
      }
      
      const token = await executeRecaptcha('contact_form');

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      if (file) {
        formData.append('file', file);
      }
      formData.append('recaptchaToken', token);

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso!', { id: loadingToast });
        setSubmitStatus('success');
        reset();
        setFile(null);
      } else {
        throw new Error(result.error || 'Erro ao enviar formulário');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Ocorreu um erro ao enviar. Tente novamente.', { id: loadingToast });
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Mensagem Enviada!</h3>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>Em breve nossa equipe entrará em contato com você.</p>
            <button
              onClick={() => setSubmitStatus(null)}
              style={{ padding: '10px 20px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Enviar nova mensagem
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-navy)' }}>Nome</label>
              <input
                type="text"
                {...register('name')}
                style={{ width: '100%', padding: '12px', border: errors.name ? '1px solid #DC2626' : '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' }}
              />
              {errors.name && <span style={{ color: '#DC2626', fontSize: '0.85rem' }}>{errors.name.message}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-navy)' }}>E-mail</label>
                <input
                  type="email"
                  {...register('email')}
                  style={{ width: '100%', padding: '12px', border: errors.email ? '1px solid #DC2626' : '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' }}
                />
                {errors.email && <span style={{ color: '#DC2626', fontSize: '0.85rem' }}>{errors.email.message}</span>}
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-navy)' }}>Telefone / WhatsApp</label>
                <input
                  type="text"
                  {...register('phone')}
                  style={{ width: '100%', padding: '12px', border: errors.phone ? '1px solid #DC2626' : '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' }}
                />
                {errors.phone && <span style={{ color: '#DC2626', fontSize: '0.85rem' }}>{errors.phone.message}</span>}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-navy)' }}>Assunto</label>
              <input
                type="text"
                {...register('subject')}
                style={{ width: '100%', padding: '12px', border: errors.subject ? '1px solid #DC2626' : '1px solid #e2e8f0', borderRadius: '8px', outline: 'none' }}
              />
              {errors.subject && <span style={{ color: '#DC2626', fontSize: '0.85rem' }}>{errors.subject.message}</span>}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-navy)' }}>Mensagem</label>
              <textarea
                {...register('message')}
                rows="4"
                style={{ width: '100%', padding: '12px', border: errors.message ? '1px solid #DC2626' : '1px solid #e2e8f0', borderRadius: '8px', outline: 'none', resize: 'vertical' }}
              />
              {errors.message && <span style={{ color: '#DC2626', fontSize: '0.85rem' }}>{errors.message.message}</span>}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-navy)' }}>Planta do Projeto (Opcional)</label>
              <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block' }}>
                <button
                  type="button"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '10px 16px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px', cursor: 'pointer', color: '#64748b' }}
                >
                  <Paperclip size={18} />
                  {file ? file.name : 'Anexar Arquivo'}
                </button>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  style={{ position: 'absolute', left: 0, top: 0, opacity: 0, cursor: 'pointer', height: '100%' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '14px',
                background: 'var(--color-navy, #1e293b)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
                marginTop: '1rem'
              }}
            >
              {isSubmitting ? 'Enviando...' : (
                <>
                  Enviar Mensagem
                  <Send size={18} />
                </>
              )}
            </button>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center' }}>
              Este site é protegido por reCAPTCHA e as <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{textDecoration: 'underline'}}>Políticas de Privacidade</a> e <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{textDecoration: 'underline'}}>Termos de Serviço</a> do Google se aplicam.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
