'use client';

import { useGematriaStore } from '@/stores/gematriaStore';

export const ManifestNavigation = () => {
  const { manifestView, setManifestView } = useGematriaStore();

  const navItems = [
    { id: 'dossier', label: 'DOSSIER TÉCNICO' },
    { id: 'tree', label: 'ÁRBOL DE VIDA' },
    { id: 'vector', label: 'DATA VECTORIAL' }
  ];

  return (
    /* Z-Index alto y pointer-events-auto para asegurar que sean clickeables */
    <nav className="flex items-center gap-2 p-1 bg-black/80 backdrop-blur-md rounded-full border border-white/20 shadow-2xl pointer-events-auto z-[1001]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setManifestView(item.id as any)}
          className={`
            relative px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] transition-all duration-300
            ${manifestView === item.id 
              ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
              : 'text-white/40 hover:text-white hover:bg-white/10'}
          `}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};