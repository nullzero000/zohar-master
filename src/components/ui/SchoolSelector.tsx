'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/UIControls.css';

// TEMA DE COLOR
const SCHOOL_THEME: Record<string, { color: string; glow: string }> = {
  ve: { color: 'rgb(255, 215, 0)', glow: 'rgba(255, 215, 0, 0.6)' },
  shefa: { color: 'rgb(0, 255, 255)', glow: 'rgba(0, 255, 255, 0.6)' },
  cordovero: { color: 'rgb(139, 0, 0)', glow: 'rgba(139, 0, 0, 0.6)' },
  abulafia: { color: 'rgb(255, 69, 0)', glow: 'rgba(255, 69, 0, 0.6)' }
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
    <div className="control-bar">
      {SCHOOLS.map((s) => {
        const isActive = school === s.id;
        const theme = SCHOOL_THEME[s.id] || { color: '#fff', glow: 'rgba(255,255,255,0.5)' };

        const customStyles = {
            '--school-color': theme.color,
            '--school-glow': theme.glow
        } as React.CSSProperties;

        return (
          <button
            key={s.id}
            onClick={() => setSchool(s.id as any)}
            className={`school-btn ${isActive ? 'active' : ''}`}
            style={customStyles}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
};