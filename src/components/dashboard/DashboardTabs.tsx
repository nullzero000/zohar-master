'use client';
import { useGematriaStore } from '@/stores/gematriaStore';

const TABS = [
  { id: 'dossier', label: 'TECHNICAL DATA', icon: '◈' },
  { id: 'tree', label: 'TREE OF LIFE', icon: '☤' },
  { id: 'vector', label: 'VECTOR FIELD', icon: '∢' },
];

export const DashboardTabs = () => {
  const { manifestView, setManifestView } = useGematriaStore();

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: '20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '0', marginBottom: '10px', width: '100%'
    }}>
      {TABS.map((tab) => {
        const isActive = manifestView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setManifestView(tab.id as any)}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: isActive ? '2px solid #d4af37' : '2px solid transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
              padding: '8px 12px',
              fontSize: '0.65rem',
              fontFamily: 'Courier New',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <span style={{ fontSize: '0.8rem', color: isActive ? '#d4af37' : 'inherit' }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};