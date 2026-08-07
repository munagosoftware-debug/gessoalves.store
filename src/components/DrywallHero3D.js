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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, -5, 7);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    
    container.appendChild(renderer.domElement);

    const ceilingGroup = new THREE.Group();
    scene.add(ceilingGroup);

    // 2. Materiais
    const gessoMaterial = new THREE.MeshStandardMaterial({
      color: 0xfffafa,
      roughness: 0.95,
      metalness: 0.0,
    });
    
    // 3. Geometrias (Sanca Invertida)
    
    // Placa Base (Teto principal maior)
    const baseWidth = 5.0;
    const baseDepth = 5.0;
    const baseHeight = 0.1;
    const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
    const baseMesh = new THREE.Mesh(baseGeometry, gessoMaterial);
    
    // Posições Base
    const baseTargetY = 0.4;
    baseMesh.position.set(0, baseTargetY + 5, 0); // Começa 5 unidades acima (invisível/fora da tela)
    baseMesh.receiveShadow = true;
    ceilingGroup.add(baseMesh);

    // Placa "Ilha" (Rebaixamento flutuante)
    const ilhaWidth = 3.5;
    const ilhaDepth = 3.5;
    const ilhaHeight = 0.15;
    const ilhaGeometry = new THREE.BoxGeometry(ilhaWidth, ilhaHeight, ilhaDepth);
    const ilhaMesh = new THREE.Mesh(ilhaGeometry, gessoMaterial);
    
    // Posições Ilha
    const ilhaTargetY = 0;
    ilhaMesh.position.set(0, ilhaTargetY + 5, 0); // Começa acima também
    ilhaMesh.castShadow = true;
    ilhaMesh.receiveShadow = true;
    ceilingGroup.add(ilhaMesh);

    // Borda interna simulando o tubo/fita de LED na sanca
    const ledGeometry = new THREE.BoxGeometry(ilhaWidth - 0.1, 0.05, ilhaDepth - 0.1);
    const ledMaterial = new THREE.MeshBasicMaterial({ color: 0xffddaa });
    const ledMesh = new THREE.Mesh(ledGeometry, ledMaterial);
    
    const ledTargetY = 0.1;
    ledMesh.position.set(0, ledTargetY + 5, 0);
    ceilingGroup.add(ledMesh);

    // 4. Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(2, -5, 5);
    scene.add(fillLight);

    // Luzes da Fita de LED (Sanca)
    const sancaLights = [];
    const createSancaLight = (x, z) => {
      const light = new THREE.PointLight(0xffddaa, 0, 4); // Inicia com intensidade 0
      light.position.set(x, 0.2, z);
      ceilingGroup.add(light);
      sancaLights.push(light);
    };
    
    createSancaLight(1.5, 1.5);
    createSancaLight(-1.5, 1.5);
    createSancaLight(1.5, -1.5);
    createSancaLight(-1.5, -1.5);
    createSancaLight(0, 1.5);
    createSancaLight(0, -1.5);
    createSancaLight(1.5, 0);
    createSancaLight(-1.5, 0);

    // Spots Embutidos na Ilha (Dicroicas)
    const spotLights = [];
    const createSpot = (x, z) => {
      const spot = new THREE.SpotLight(0xffeedd, 0, 10, Math.PI / 6, 0.5, 1);
      spot.position.set(x, -0.05, z);
      spot.target.position.set(x, -10, z);
      spot.castShadow = true;
      spot.shadow.bias = -0.001;
      
      ceilingGroup.add(spot);
      scene.add(spot.target);
      spotLights.push(spot);
    };

    createSpot(1.2, 1.2);
    createSpot(-1.2, 1.2);
    createSpot(1.2, -1.2);
    createSpot(-1.2, -1.2);

    // 5. Animação e Interação
    let animationFrameId;
    const startTime = Date.now();
    
    // Fases da Animação (Timings em ms)
    const T_BASE_START = 200;
    const T_ILHA_START = 800;
    const T_LIGHTS_START = 1600;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const now = Date.now();
      const elapsed = now - startTime;
      
      // 1. Descer a Placa Base suavemente
      if (elapsed > T_BASE_START) {
        baseMesh.position.y = THREE.MathUtils.lerp(baseMesh.position.y, baseTargetY, 0.05);
      }
      
      // 2. Descer a Ilha (Sanca Invertida) e os LEDs estruturais suavemente
      if (elapsed > T_ILHA_START) {
        ilhaMesh.position.y = THREE.MathUtils.lerp(ilhaMesh.position.y, ilhaTargetY, 0.04);
        ledMesh.position.y = THREE.MathUtils.lerp(ledMesh.position.y, ledTargetY, 0.04);
      }
      
      // 3. Efeito de "Fade In" das luzes apenas após a estrutura estar praticamente montada
      if (elapsed > T_LIGHTS_START) {
        const progress = Math.min((elapsed - T_LIGHTS_START) / 1500, 1.0); // 1.5s para acender tudo
        const easeInOut = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        sancaLights.forEach(light => {
          light.intensity = easeInOut * 2.5;
        });
        
        spotLights.forEach(spot => {
          spot.intensity = easeInOut * 8.0;
        });
      }

      // Flutuação extremamente suave do grupo todo
      ceilingGroup.rotation.y = Math.sin(now * 0.0003) * 0.10;
      ceilingGroup.rotation.x = Math.sin(now * 0.0004) * 0.05;
      ceilingGroup.position.y = Math.sin(now * 0.0005) * 0.15;

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
      
      // Limpeza de memória
      baseGeometry.dispose();
      ilhaGeometry.dispose();
      ledGeometry.dispose();
      gessoMaterial.dispose();
      ledMaterial.dispose();
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
            Teto Gessoalves 3D Premium
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        width: '100%',
        height: '350px',
        position: 'relative',
      }}
    />
  );
}
