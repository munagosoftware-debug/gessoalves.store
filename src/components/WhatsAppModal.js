import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import styles from './WhatsAppModal.module.css';

export default function WhatsAppModal({ message, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cidade: '',
    cep: '',
    numero: '',
    complemento: ''
  });

  // Fecha o modal com a tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const fetchAddress = async (cepStr) => {
    const cleanCep = cepStr.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            cidade: `${data.logradouro ? data.logradouro + ', ' : ''}${data.bairro}, ${data.localidade} - ${data.uf}`
          }));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'cep') {
      value = value.replace(/\D/g, '').slice(0, 8);
      if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      }
      if (value.length === 9) {
        fetchAddress(value);
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Constrói a mensagem final
    const finalMessage = `${message}
    
*Dados do Cliente:*
Nome: ${formData.nome}
E-mail: ${formData.email}
Endereço: ${formData.cidade}
CEP: ${formData.cep}
Número: ${formData.numero}
Complemento: ${formData.complemento || 'N/A'}`;

    const whatsappNumber = '5511961155049'; // Usando o número do FloatingWhatsApp
    const encodedMessage = encodeURIComponent(finalMessage);
    const href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      // Fecha o modal e abre o WhatsApp
      onClose();
      setIsSubmitting(false);
      window.open(href, '_blank', 'noopener,noreferrer');
    }, 3000); // 3.0 seconds animation for the premium effect
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {isSubmitting ? (
          <div className={styles.premiumAnimation}>
            <div className={styles.svgWrapper}>
              <svg viewBox="0 0 100 100" className={styles.houseSvg}>
                {/* Background Outline */}
                <path 
                  d="M50 15 L15 45 L15 85 L40 85 L40 55 L60 55 L60 85 L85 85 L85 45 Z" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="5" 
                  strokeLinejoin="round" 
                />
                
                {/* Drawing Stroke */}
                <path 
                  className={styles.houseDraw}
                  d="M50 15 L15 45 L15 85 L40 85 L40 55 L60 55 L60 85 L85 85 L85 45 Z" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="5" 
                  strokeLinejoin="round" 
                />

                {/* Solid Plaster Fill */}
                <path 
                  className={styles.houseFill}
                  d="M50 15 L15 45 L15 85 L40 85 L40 55 L60 55 L60 85 L85 85 L85 45 Z" 
                  fill="#ffffff" 
                />
              </svg>
              
              {/* Plaster Dust Particles */}
              <div className={styles.particles}>
                <span style={{"--i": 1}}></span>
                <span style={{"--i": 2}}></span>
                <span style={{"--i": 3}}></span>
                <span style={{"--i": 4}}></span>
                <span style={{"--i": 5}}></span>
              </div>
            </div>
            
            <h3 className={styles.premiumText}>Preparando seu atendimento...</h3>
          </div>
        ) : (
          <>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
              <X size={24} />
            </button>
            
            <h2>Solicitar Orçamento</h2>
        <p>Preencha os dados abaixo para receber um atendimento mais rápido e personalizado.</p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome Completo</label>
            <input 
              type="text" 
              id="nome" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange} 
              required 
              placeholder="Digite seu nome"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="seu@email.com"
            />
          </div>
          
          <div className={styles.rowGroup}>
            <div className={styles.inputGroup} style={{ flex: '0 0 130px' }}>
              <label htmlFor="cep">CEP</label>
              <input 
                type="text" 
                id="cep" 
                name="cep" 
                value={formData.cep} 
                onChange={handleChange} 
                required 
                maxLength="9"
                placeholder="00000-000"
              />
            </div>
            
            <div className={styles.inputGroup} style={{ flex: '0 0 100px' }}>
              <label htmlFor="numero">Número</label>
              <input 
                type="text" 
                id="numero" 
                name="numero" 
                value={formData.numero} 
                onChange={handleChange} 
                required 
                placeholder="Ex: 123"
              />
            </div>
            
            <div className={styles.inputGroup} style={{ flex: '1' }}>
              <label htmlFor="complemento">Complemento</label>
              <input 
                type="text" 
                id="complemento" 
                name="complemento" 
                value={formData.complemento} 
                onChange={handleChange} 
                placeholder="Ex: Apto 42"
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="cidade">Endereço Completo (Rua, Bairro, Cidade)</label>
            <input 
              type="text" 
              id="cidade" 
              name="cidade" 
              value={formData.cidade} 
              onChange={handleChange} 
              required 
              placeholder="Ex: Rua Direita, Butantã - SP"
            />
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            <MessageCircle size={20} />
            Ir para o WhatsApp
          </button>
        </form>
          </>
        )}
      </div>
    </div>
  );
}
