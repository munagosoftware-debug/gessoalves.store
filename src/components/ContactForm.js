'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/schemas';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Send, CheckCircle, AlertCircle, Paperclip } from 'lucide-react';
import { toast } from 'react-hot-toast';
import styles from './ContactForm.module.css';

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
    resolver: zodResolver(contactFormSchema),
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
    <div className={styles.formContainer}>
      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={styles.successState}
          >
            <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 1rem' }} />
            <h3 className={styles.successTitle}>Mensagem Enviada!</h3>
            <p className={styles.successText}>Em breve nossa equipe entrará em contato com você.</p>
            <button
              onClick={() => setSubmitStatus(null)}
              className={styles.successButton}
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
            className={styles.form}
          >
            <div>
              <label htmlFor="name" className={styles.label}>Nome</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={errors.name ? styles.inputError : styles.input}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <span id="name-error" role="alert" className={styles.errorText}>{errors.name.message}</span>}
            </div>

            <div className={styles.gridRow}>
              <div>
                <label htmlFor="email" className={styles.label}>E-mail</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? styles.inputError : styles.input}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span id="email-error" role="alert" className={styles.errorText}>{errors.email.message}</span>}
              </div>
              <div>
                <label htmlFor="phone" className={styles.label}>Telefone / WhatsApp</label>
                <input
                  id="phone"
                  type="text"
                  {...register('phone')}
                  className={errors.phone ? styles.inputError : styles.input}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <span id="phone-error" role="alert" className={styles.errorText}>{errors.phone.message}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={styles.label}>Assunto</label>
              <input
                id="subject"
                type="text"
                {...register('subject')}
                className={errors.subject ? styles.inputError : styles.input}
                aria-invalid={errors.subject ? 'true' : 'false'}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
              />
              {errors.subject && <span id="subject-error" role="alert" className={styles.errorText}>{errors.subject.message}</span>}
            </div>

            <div>
              <label htmlFor="message" className={styles.label}>Mensagem</label>
              <textarea
                id="message"
                {...register('message')}
                rows="4"
                className={errors.message ? styles.textareaError : styles.textarea}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && <span id="message-error" role="alert" className={styles.errorText}>{errors.message.message}</span>}
            </div>

            <div>
              <label htmlFor="file" className={styles.label}>Planta do Projeto (Opcional)</label>
              <div className={styles.fileWrapper}>
                <button 
                  type="button" 
                  className={styles.fileButton}
                  onClick={() => document.getElementById('file').click()}
                >
                  <Paperclip size={18} />
                  {file ? file.name : 'Anexar Arquivo'}
                </button>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className={styles.fileInput}
                  aria-label="Planta do Projeto"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Enviando...' : (
                <>
                  Enviar Mensagem
                  <Send size={18} />
                </>
              )}
            </button>
            <p className={styles.recaptchaText}>
              Este site é protegido por reCAPTCHA e as <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className={styles.recaptchaLink}>Políticas de Privacidade</a> e <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className={styles.recaptchaLink}>Termos de Serviço</a> do Google se aplicam.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
