'use client';
import { useGematriaStore } from '@/stores/gematriaStore';

const LEVELS = ['NEFESH', 'RUACH', 'NESHAMA', 'CHAYA', 'YECHIDA', 'ATZILUT'];

export const ManifestNavigation = () => {
  const { expansionLevel, setExpansionLevel } = useGematriaStore();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0', // Usamos el gap visual de las líneas
      width: '100%',
      padding: '10px 0',
      marginBottom: '5px'
    }}>
      {LEVELS.map((lvl, idx) => {
        const isActive = idx === expansionLevel;
        const isPast = idx < expansionLevel;
        
        return (
          <div key={lvl} style={{ display: 'flex', alignItems: 'center' }}>
            
            {/* ITEM */}
            <div 
              onClick={() => setExpansionLevel(idx)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                opacity: isActive ? 1 : (isPast ? 0.6 : 0.3),
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Icono Rombo */}
              <div style={{
                fontSize: '1.2rem', color: isActive ? '#fff' : 'inherit',
                textShadow: isActive ? '0 0 10px #fff' : 'none',
                marginBottom: '4px'
              }}>
                {isActive ? '◈' : (isPast ? '◆' : '◇')}
              </div>
              
              {/* Texto */}
              <span style={{
                fontSize: '0.5rem', letterSpacing: '0.1em', fontWeight: isActive ? 'bold' : 'normal'
              }}>
                {lvl}
              </span>
            </div>

            {/* LÍNEA CONECTORA (Excepto el último) */}
            {idx < LEVELS.length - 1 && (
              <div style={{
                width: '30px', height: '1px', 
                background: isPast ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                margin: '0 8px', marginTop: '-10px' // Alinear con rombos
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
};