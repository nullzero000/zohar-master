'use client';

import { useGematriaStore } from '@/stores/gematriaStore';

// Definimos el "Color Insignia" de cada escuela usando valores de TU tabla
// para mantener la coherencia absoluta.
const SCHOOL_THEME: Record<string, { color: string; glow: string }> = {
  ve: { 
    color: 'rgb(255, 215, 0)', // Color de ALEPH (Gra) - Oro
    glow: 'rgba(255, 215, 0, 0.6)' 
  },
  shefa: { 
    color: 'rgb(0, 255, 255)', // Color de MEM (Akashic) - Cyan Puro
    glow: 'rgba(0, 255, 255, 0.6)' 
  },
  cordovero: { 
    color: 'rgb(139, 0, 0)', // Color de VAV (Traditional) - Rojo Oscuro
    glow: 'rgba(139, 0, 0, 0.6)' 
  },
  abulafia: { 
    color: 'rgb(255, 69, 0)', // Color de SHIN (Esoteric) - Rojo Fuego Intenso
    glow: 'rgba(255, 69, 0, 0.6)' 
  }
};

const SCHOOLS = [
  { id: 've', label: 'VILNA GAON' },
  { id: 'shefa', label: 'SHEFA TAL' },
  { id: 'cordovero', label: 'CORDOVERO' },
  { id: 'abulafia', label: 'ABULAFIA' },
];

export const SchoolSelector = () => {
  const { school, setSchool } = useGematriaStore();

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      background: 'rgba(0, 0, 0, 0.4)',
      padding: '5px 8px',
      borderRadius: '99px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      marginTop: '10px'
    }}>
      {SCHOOLS.map((s) => {
        const isActive = school === s.id;
        const theme = SCHOOL_THEME[s.id] || { color: '#fff', glow: 'rgba(255,255,255,0.5)' };

        return (
          <button
            key={s.id}
            onClick={() => setSchool(s.id as any)}
            style={{
              position: 'relative',
              background: isActive ? `rgba(255,255,255,0.05)` : 'transparent',
              border: isActive ? `1px solid ${theme.color}` : '1px solid transparent',
              color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.4)',
              padding: '6px 14px',
              fontSize: '0.6rem',
              fontFamily: 'Courier New',
              fontWeight: '700',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              borderRadius: '99px',
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              boxShadow: isActive ? `0 0 15px ${theme.glow}, inset 0 0 5px ${theme.glow}` : 'none',
              textShadow: isActive ? `0 0 8px ${theme.glow}` : 'none',
              overflow: 'hidden'
            }}
          >
            {isActive && (
                <div style={{
                    position: 'absolute', inset: 0, 
                    background: theme.color, 
                    opacity: 0.1, 
                    zIndex: -1 
                }} />
            )}
            {s.label}
          </button>
        );
      })}
    </div>
  );
};