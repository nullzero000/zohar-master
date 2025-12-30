'use client';

import { useMemo } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor } from '@/lib/gematriaUtils';
import '@/styles/SacredGeometry.css';

export const SacredGeometry = () => {
  const { inputText, school } = useGematriaStore();
  
  const charColors = useMemo(() => {
    if (!inputText) return ['#ffffff'];
    return inputText.split('').map(char => getHebrewColor(char, school));
  }, [inputText, school]);

  const petals = Array.from({ length: 64 }).map((_, i) => ({
    id: i,
    color: charColors[i % charColors.length],
    rotation: i * (360 / 64)
  }));

  return (
    <div className="sacred-container">
      <div className="sacred-canvas">
        <div 
          className="sacred-core" 
          style={{ backgroundColor: '#fff', boxShadow: `0 0 20px #fff` }} 
        />

        {petals.map((petal) => (
          <div 
            key={petal.id} 
            className="sacred-petal" 
            style={{ 
              borderColor: petal.color,
              // -25% en un canvas de 65vmin toca los bordes de la pantalla
              transform: `rotate(${petal.rotation}deg) translateY(-25%)`,
              filter: `drop-shadow(0 0 1px ${petal.color})`,
            }} 
          />
        ))}
      </div>
    </div>
  );
};