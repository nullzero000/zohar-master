'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/TechnicalView.css';

const LEVELS = ['NEFESH', 'RUACH', 'NESHAMA', 'CHAYA', 'YECHIDA', 'ATZILUT'];

export const ManifestNavigation = () => {
  const { expansionLevel, setExpansionLevel } = useGematriaStore();

  // Cálculo del porcentaje de progreso (0% a 100%)
  // Si hay 6 niveles: indices 0 a 5. 
  // Nivel 0 = 0%, Nivel 5 = 100%.
  const progressPercentage = (expansionLevel / (LEVELS.length - 1)) * 100;

  return (
    <div className="tech-nav-container fade-in-panel">
      
      {/* LÍNEA DE PROGRESO (Absoluta detrás) */}
      <div className="tech-nav-line">
         <div 
            className="tech-nav-line-fill" 
            style={{ width: `${progressPercentage}%` }} 
         />
      </div>

      {/* NODOS (Track) */}
      <div className="tech-nav-track">
        {LEVELS.map((lvl, idx) => {
          const isActive = idx === expansionLevel;
          const isPast = idx <= expansionLevel; // 'Past' incluye el actual para iluminar el camino

          let nodeClass = 'tech-nav-node';
          if (isActive) nodeClass += ' active';
          else if (isPast) nodeClass += ' past';

          return (
            <button 
              key={lvl} 
              className={nodeClass}
              onClick={() => setExpansionLevel(idx)}
              aria-label={`Select level ${lvl}`}
            >
              {/* Indicador Rombo */}
              <div className="tech-node-indicator">
                <div className="tech-node-core" />
              </div>
              
              {/* Etiqueta */}
              <span className="tech-label-main">{lvl}</span>
            </button>
          );
        })}
      </div>
      
    </div>
  );
};