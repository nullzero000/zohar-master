'use client';

import { useEffect, useRef } from 'react';
// CORRECCIÓN: Ruta ajustada a tu arquitectura actual
import { type KabbalahMode } from '@/lib/types';

interface MysticParticlesProps {
  text: string;
  school: KabbalahMode; // CORRECCIÓN: Usamos tu tipo definido
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;       // Opacidad actual
  targetAlpha: number; // Opacidad objetivo (0 o visible)
  pulse: number;
  char: string;
  color: string;
}

export const MysticParticles = ({ text, school }: MysticParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const initializedRef = useRef(false);

  // AXIOMA: Densidad 2X. 30 partículas doradas por cada letra escrita.
  const PARTICLES_PER_CHAR = 30;
  const MAX_POOL = 60 * PARTICLES_PER_CHAR; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!initializedRef.current) {
      const resize = () => {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      };
      resize();
      window.addEventListener('resize', resize);

      // INICIALIZACIÓN
      for (let i = 0; i < MAX_POOL; i++) {
        particlesRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 12 + 8,
          alpha: 0,
          targetAlpha: 0,
          pulse: Math.random() * 0.01 + 0.002,
          char: '',
          color: 'rgba(255, 235, 180' // Base dorada
        });
      }
      initializedRef.current = true;
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1. Lógica de Fading
      particlesRef.current.forEach(p => {
        p.alpha += (p.targetAlpha - p.alpha) * 0.08;
      });

      // 2. Renderizado
      particlesRef.current.forEach((p) => {
        if (p.alpha < 0.01) return;

        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;

        const currentAlpha = p.alpha + Math.sin(Date.now() * p.pulse) * 0.1;
        const finalAlpha = Math.max(0, Math.min(1, currentAlpha));

        ctx.font = `${p.size}px "Times New Roman"`;
        ctx.fillStyle = `${p.color}, ${finalAlpha})`;
        
        ctx.shadowBlur = 5;
        ctx.shadowColor = `rgba(255, 215, 0, ${finalAlpha * 0.5})`;
        
        ctx.fillText(p.char, p.x, p.y);
        
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  // LÓGICA REACTIVA
  useEffect(() => {
    particlesRef.current.forEach((p, index) => {
      const charIndex = Math.floor(index / PARTICLES_PER_CHAR);
      
      if (charIndex < text.length) {
        p.char = text[charIndex];
        if (p.targetAlpha === 0) {
           p.x = Math.random() * window.innerWidth;
           p.y = Math.random() * window.innerHeight;
           p.targetAlpha = Math.random() * 0.5 + 0.2; 
        }
      } else {
        p.targetAlpha = 0;
      }
    });
  }, [text, school]); 

  return (
    <canvas 
      ref={canvasRef}
      style={{ 
        position: 'absolute', inset: 0, 
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }} 
    />
  );
};