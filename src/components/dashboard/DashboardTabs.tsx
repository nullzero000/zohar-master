'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/DashboardTabs.css';

export const DashboardTabs = () => {
  const { manifestView, setManifestView } = useGematriaStore();

  return (
    <div className="dashboard-tabs-container">
      <button 
        onClick={() => setManifestView('dossier')}
        className={`tab-btn ${manifestView === 'dossier' ? 'active' : ''}`}
      >
        <span className="tab-icon">◈</span>
        <span className="tab-text">TECHNICAL DATA</span>
      </button>

      <button 
        onClick={() => setManifestView('tree')}
        className={`tab-btn ${manifestView === 'tree' ? 'active' : ''}`}
      >
        <span className="tab-icon">☤</span>
        <span className="tab-text">TREE OF LIFE</span>
      </button>

      <button 
        onClick={() => setManifestView('vector')}
        className={`tab-btn ${manifestView === 'vector' ? 'active' : ''}`}
      >
        <span className="tab-icon">∢</span>
        <span className="tab-text">VECTOR FIELD</span>
      </button>

      <div className={`tab-indicator pos-${manifestView}`} />
    </div>
  );
};