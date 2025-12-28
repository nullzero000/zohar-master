'use client';

import { useEffect, useRef, useState } from 'react';
import { getHebrewColor } from '@/utils/logicHelper';
import { type KabbalahMode } from '@/lib/types';

interface HebrewGalaxyProps {
  text: string;
  school: KabbalahMode;
}

interface Star {
  id: number;
  angle: number;
  radius: number;
  depth: number;
  sizeBase: number;
  speed: number;
  char: string;
  color: string;
  currentOpacity: number;
  targetOpacity: number;
}

export const HebrewGalaxy = ({ text, school }: HebrewGalaxyProps) => {
  const [stars, setStars] = useState<Star[]>([]);
  const requestRef = useRef<number>(0);
  
  const STARS_PER_CHAR = 40; 
  const POOL_SIZE = 1200; 

  useEffect(() => {
    const initialStars: Star[] = Array.from({ length: POOL_SIZE }).map((_, i) => {
      const calculatedRadius = Math.random() * 95;
      // Estrellas ambiente: Algunas siempre serán visibles como puntos lejanos
      const isAmbient = Math.random() > 0.95; 

      return {
        id: i,
        angle: Math.random() * Math.PI * 2,
        radius: calculatedRadius, 
        depth: Math.random() * 3 + 0.1,
        sizeBase: Math.random() * 0.5 + 0.2, 
        speed: (0.0001 + Math.random() * 0.0002) * (30 / (calculatedRadius + 5)) * (Math.random() > 0.5 ? 1 : -1),
        char: isAmbient ? '.' : '', // Puntos para estrellas ambiente
        color: '#fff',
        currentOpacity: isAmbient ? Math.random() * 0.5 : 0, // Visibilidad inicial si es ambiente
        targetOpacity: isAmbient ? Math.random() * 0.5 : 0
      };
    });
    setStars(initialStars);
  }, []);

  useEffect(() => {
    setStars(prevStars => prevStars.map((star, index) => {
      const charIndex = Math.floor(index / STARS_PER_CHAR);
      
      // Si hay texto, convertimos estrellas en letras
      if (charIndex < text.length) {
        return {
          ...star,
          char: text[charIndex],
          color: getHebrewColor(text[charIndex], school),
          targetOpacity: 1
        };
      } else {
        // Si no hay texto, volvemos a modo ambiente (puntos) o invisible
        const isAmbient = star.id % 20 === 0; // 5% de estrellas ambiente
        return {
          ...star,
          char: isAmbient ? '.' : '',
          color: '#ffffff',
          targetOpacity: isAmbient ? 0.3 : 0
        };
      }
    }));
  }, [text, school]);

  const animate = () => {
    setStars(prevStars => prevStars.map(star => {
      if (star.currentOpacity < 0.01 && star.targetOpacity === 0) return star;

      const newAngle = star.angle + star.speed;
      const newOpacity = star.currentOpacity + (star.targetOpacity - star.currentOpacity) * 0.05;

      return {
        ...star,
        angle: newAngle,
        currentOpacity: newOpacity
      };
    }));
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div style={{ 
      position: 'absolute', inset: 0, 
      overflow: 'hidden', pointerEvents: 'none',
      perspective: '1000px',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* CORRECCIÓN: Fondo Nebula SIEMPRE visible (opacity: 0.6 fijo) */}
      <div style={{
        position: 'absolute', width: '100%', height: '100%',
        background: 'radial-gradient(circle at center, rgba(20,10,40,0.4) 0%, rgba(0,0,0,0) 80%)',
        opacity: 0.6, 
        transition: 'opacity 3s ease',
        zIndex: -1
      }} />

      {stars.map((star) => {
        if (star.currentOpacity < 0.01) return null;

        const x = Math.cos(star.angle) * star.radius;
        const y = Math.sin(star.angle) * star.radius;
        const scale = star.depth * (0.6 + star.currentOpacity * 0.4);

        return (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              transform: `translate3d(${x}vw, ${y}vh, ${star.depth * 50}px) scale(${scale})`,
              color: star.color,
              fontSize: star.char === '.' ? `${star.sizeBase * 2}px` : `${star.sizeBase}rem`, // Ajuste tamaño puntos vs letras
              opacity: star.currentOpacity,
              textShadow: `0 0 ${5 * star.currentOpacity}px ${star.color}`,
              fontFamily: '"Times New Roman", serif',
              willChange: 'transform, opacity',
              transition: 'color 1s ease',
            }}
          >
            {star.char}
          </div>
        )
      })}
    </div>
  );
};