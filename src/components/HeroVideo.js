'use client';

import { useRef, useEffect } from 'react';

export default function HeroVideo() {
  const videoRef = useRef(null);
  
  useEffect(() => {
    if (videoRef.current) {
      // Diminuir a velocidade do vídeo (1.0 é o normal, 0.4 é bem mais lento)
      videoRef.current.playbackRate = 0.4; 
    }
  }, []);

  return (
    <video 
      ref={videoRef}
      src="/hero-video.mp4" 
      autoPlay 
      loop 
      muted 
      playsInline 
      style={{ 
        width: '100%', 
        height: '600px', // Mesma altura do HeroSwiper para alinhamento perfeito
        objectFit: 'cover',
        borderRadius: '20px', // Combinando com o borderRadius do HeroSwiper
        boxShadow: '0 20px 40px rgba(27, 42, 92, 0.15)',
      }}
    />
  );
}
