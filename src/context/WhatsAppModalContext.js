'use client';

import { createContext, useState, useContext } from 'react';
import WhatsAppModal from '../components/WhatsAppModal';

const WhatsAppModalContext = createContext();

export function WhatsAppModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const openWhatsAppModal = (message) => {
    setModalMessage(message);
    setIsOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsOpen(false);
  };

  return (
    <WhatsAppModalContext.Provider value={{ openWhatsAppModal, closeWhatsAppModal }}>
      {children}
      {isOpen && <WhatsAppModal message={modalMessage} onClose={closeWhatsAppModal} />}
    </WhatsAppModalContext.Provider>
  );
}

export function useWhatsAppModal() {
  return useContext(WhatsAppModalContext);
}
