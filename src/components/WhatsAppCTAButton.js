'use client';

import { useWhatsAppModal } from '../context/WhatsAppModalContext';

export default function WhatsAppCTAButton({ message, children, className, style }) {
  const { openWhatsAppModal } = useWhatsAppModal();

  return (
    <button
      onClick={() => openWhatsAppModal(message)}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
