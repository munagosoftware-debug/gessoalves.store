'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GsapProvider({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Verificar preferência de movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Reveal on scroll para elementos com .gsap-reveal
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // 2. Reveal com Stagger em grids (.gsap-stagger-grid > child)
    const staggerGrids = document.querySelectorAll('.gsap-stagger-grid');
    staggerGrids.forEach((grid) => {
      const items = grid.children;
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 80%',
            },
          }
        );
      }
    });

    // 3. Parallax Sutil em elementos com data-speed
    const parallaxElements = document.querySelectorAll('[data-speed]');
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.2;
      gsap.to(el, {
        y: () => (1 - speed) * 80,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
