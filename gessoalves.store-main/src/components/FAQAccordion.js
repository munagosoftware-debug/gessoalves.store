'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
    <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                backgroundColor: '#FFF',
                borderRadius: '8px',
                border: '1px solid var(--color-silver-light)',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: '100%',
                  padding: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'var(--color-navy)',
                  fontWeight: '600',
                  fontSize: '1.1rem'
                }}
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown color="var(--color-cyan)" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div style={{ padding: '0 20px 20px 20px', color: 'var(--color-graphite)', lineHeight: '1.6' }}>
                      {faq.answer}
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
