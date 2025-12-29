'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/ManifestNavigation.css';

const LEVELS = [
  { id: 0, label: 'NEFESH', sub: 'BASE' },
  { id: 1, label: 'RUACH', sub: 'EXP. 1' },
  { id: 2, label: 'NESHAMA', sub: 'EXP. 2' },
  { id: 3, label: 'CHAYA', sub: 'EXP. 3' },
  { id: 4, label: 'YECHIDA', sub: 'EXP. 4' },
  { id: 5, label: 'ATZILUT', sub: 'FINAL' },
];

export const ManifestNavigation = () => {
  const { expansionLevel, setExpansionLevel } = useGematriaStore();

  return (
    <nav className="manifest-nav-container">
      <div className="nav-track">
        {LEVELS.map((level) => {
          const isActive = expansionLevel === level.id;
          const isPast = expansionLevel > level.id;

          return (
            <button
              key={level.id}
              onClick={() => setExpansionLevel(level.id)}
              className={`nav-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
            >
              <div className="node-indicator">
                <div className="node-core" />
              </div>
              <div className="node-labels">
                <span className="label-main">{level.label}</span>
                <span className="label-sub">{level.sub}</span>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Línea conectora visual */}
      <div className="nav-line">
        <div 
            className="nav-line-fill" 
            style={{ width: `${(expansionLevel / 5) * 100}%` }} 
        />
      </div>
    </nav>
  );
};