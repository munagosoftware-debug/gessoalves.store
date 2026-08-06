'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './FAQAccordion.module.css';

const faqs = [
  {
    question: "Vocês atendem toda a cidade de São Paulo?",
    answer: "Nossa área principal de atuação é a Zona Sul de São Paulo, incluindo bairros como Santo Amaro, Morumbi, Vila Mariana, Saúde, Ipiranga e Jabaquara. Para outras regiões, entre em contato para verificarmos a disponibilidade."
  },
  {
    question: "O gesso acartonado (drywall) suporta peso?",
    answer: "Sim, o drywall pode suportar bastante peso, desde que seja instalado com os reforços adequados (tábua ou chapa metálica) por trás da placa no local onde o objeto será fixado. Televisões, armários e prateleiras podem ser instalados sem problemas."
  },
  {
    question: "Qual o prazo médio para instalação de uma sanca de gesso?",
    answer: "O prazo varia conforme o tamanho e a complexidade do projeto. No entanto, instalações padrão em ambientes residenciais costumam levar de 1 a 3 dias para a conclusão da parte estrutural e do acabamento em massa."
  },
  {
    question: "Vocês fornecem a iluminação (fitas de LED, spots) para a sanca?",
    answer: "Nós preparamos toda a estrutura e os recortes para a iluminação conforme o projeto. Os materiais elétricos (LEDs, spots) e a instalação elétrica final podem ser incluídos no pacote de acordo com a negociação prévia."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Gerar o JSON-LD para SEO (FAQPage)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', width: '100%' }}>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={styles.faqButton}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <div className={styles.iconWrapper}>
                  <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Plus size={20} color={isOpen ? "#fff" : "var(--color-cyan)"} strokeWidth={2.5} />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className={styles.faqAnswer}>
                      <div style={{ borderTop: '1px solid rgba(27, 42, 92, 0.1)', paddingTop: '20px', marginTop: '-4px' }}>
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
