'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function DrywallHero3D() {
  const mountRef = useRef(null);
  const [isMobileOrReduced, setIsMobileOrReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Verificar se é mobile ou movimento reduzido
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || reducedMotion) {
      setIsMobileOrReduced(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometria: Placa estilizada de Drywall com cantos chanfrados
    const geometry = new THREE.BoxGeometry(3.2, 2.2, 0.2);

    // Material com bisel metálico/gesso refletivo
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xf1e9dc,
      roughness: 0.3,
      metalness: 0.2,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });

    const drywallPanel = new THREE.Mesh(geometry, material);
    scene.add(drywallPanel);

    // Bordas chanfradas prateadas
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x1b2a5c, linewidth: 2 });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    drywallPanel.add(wireframe);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x1b2a5c, 2, 10);
    pointLight.position.set(-3, -2, 3);
    scene.add(pointLight);

    // Loop de Animação
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      drywallPanel.rotation.y += 0.008;
      drywallPanel.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
      renderer.render(scene, camera);
    };

    animate();

    // Redimensionamento
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  if (isMobileOrReduced) {
    return (
      <div
        style={{
          width: '100%',
          height: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="metallic-card"
          style={{
            width: '260px',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            transform: 'rotate(-4deg)',
          }}
        >
          <div className="metallic-screw screw-tl" />
          <div className="metallic-screw screw-tr" />
          <div className="metallic-screw screw-bl" />
          <div className="metallic-screw screw-br" />
          <h4 style={{ color: 'var(--color-navy)', fontSize: '1.2rem', textAlign: 'center' }}>
            Placa Gessoalves 3D
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '350px',
        position: 'relative',
      }}
    />
  );
}
