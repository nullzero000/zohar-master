'use client';

import { useState, useEffect } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils'; // Import necesario
import '@/styles/Home.css';

import { HebrewInput } from '@/components/ui/HebrewInput';
import { HebrewKeyboard } from '@/components/ui/HebrewKeyboard';
import { SchoolSelector } from '@/components/ui/SchoolSelector';
import { MysticParticles } from '@/components/visuals/MysticParticles';
import { HebrewGalaxy } from '@/components/visuals/HebrewGalaxy';
import { GematriaTotal } from '@/components/dashboard/GematriaTotal';
import { TechnicalView } from '@/components/dashboard/TechnicalView';
import { TreeOfLifeView } from '@/components/dashboard/TreeOfLifeView';
import { VectorDataView } from '@/components/dashboard/VectorDataView';
import { ManifestNavigation } from '@/components/dashboard/ManifestNavigation';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';

export const Home = () => {
  const { 
    inputText, setInputText, school, isManifesting, setManifesting, 
    manifestView, isOverlayActive, setOverlayActive 
  } = useGematriaStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleManifestClick = () => {
    if (inputText.length > 0) {
        const newState = !isManifesting;
        setManifesting(newState);
        if (newState) setOverlayActive(true);
    }
  };

  return (
    <main className="home-container">
      
      {/* CAPA VISUAL */}
      <div className={`layer-galaxy fade-transition ${isManifesting ? 'opacity-20' : 'opacity-100'}`}>
        <HebrewGalaxy text={inputText} school={school} />
      </div>

      <div className="layer-ui">
        
        {/* HEADER (Escuelas) */}
        <header className={`ui-header ${isMobile && isManifesting ? 'mobile-hidden' : ''}`}>
            <SchoolSelector />
        </header>

        {/* INPUT PRINCIPAL (Edición) - Se oculta al manifestar */}
        <section className={`ui-main ${isMobile && isManifesting ? 'mobile-hidden' : ''}`}>
            <div className="input-container-wrapper">
                <HebrewInput 
                    value={inputText} school={school} 
                    onDelete={() => setInputText(inputText.slice(0, -1))}
                    mode="ORIGIN"
                />
            </div>
        </section>

        {/* --- PANEL DE DATOS (ANÁLISIS) --- */}
        <div className={`data-panel-wrapper fade-transition ${isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
            <div className="panel-stack" style={{ 
                display: 'flex', flexDirection: 'column', width: '100%', height: '100%', 
                maxWidth: '1200px', padding: isMobile ? '0' : '10px' 
            }}>
                
                {/* [NUEVO] VISOR DE SECUENCIA ACTIVA (Solo visible al manifestar) */}
                {/* Esto asegura que veas las letras aunque el input principal esté oculto */}
                <div style={{ 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2px',
                    padding: '10px 0 5px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(0,0,0,0.3)', width: '100%'
                }}>
                    {inputText.split('').map((char, i) => {
                        const color = getHebrewColor(char, school);
                        const isBlack = isOntologicalBlack(color);
                        return (
                            <span key={i} style={{
                                color: color,
                                fontSize: '1.5rem', fontFamily: 'Times New Roman', fontWeight: 'bold',
                                textShadow: isBlack 
                                    ? '0 0 5px rgba(255,255,255,0.8)' 
                                    : `0 0 10px ${color}`
                            }}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* NAVEGACIÓN (Niveles) */}
                <div style={{ padding: '5px 0', width: '100%', flexShrink: 0 }}>
                    <ManifestNavigation />
                </div>

                {/* GEMATRÍA (Solo en Technical Data) */}
                {manifestView === 'dossier' && (
                    <div style={{ flexShrink: 0, marginBottom: '10px' }}>
                        <GematriaTotal />
                    </div>
                )}
                
                {/* TABS (Desktop) */}
                {!isMobile && <DashboardTabs />}

                {/* CONTENIDO PRINCIPAL */}
                <div style={{ flex: 1, width: '100%', position: 'relative', overflow: 'hidden' }}>
                    {manifestView === 'dossier' && <TechnicalView />}
                    {manifestView === 'tree' && <TreeOfLifeView />}
                    {manifestView === 'vector' && <VectorDataView />}
                </div>
            </div>
        </div>

        {/* BARRA MÓVIL */}
        {isMobile && isOverlayActive && (
            <div className="mobile-nav-bar">
                <DashboardTabs />
                <button onClick={() => setManifesting(false)} style={{ 
                    background: 'transparent', border: '1px solid #d4af37', 
                    color: '#d4af37', borderRadius: '50%', width: '40px', height: '40px', 
                    fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    ×
                </button>
            </div>
        )}

        {/* FOOTER / TECLADO */}
        <footer className={`ui-footer ${isMobile && isManifesting ? 'mobile-hidden' : ''}`}>
            <div className="keyboard-wrapper">
                <HebrewKeyboard />
            </div>
            <div className="controls-wrapper">
                <button 
                    onClick={handleManifestClick} 
                    className="manifest-btn"
                    disabled={inputText.length === 0}
                    style={{ opacity: inputText.length === 0 ? 0.5 : 1 }}
                >
                    {isManifesting ? 'DETENER' : 'MANIFESTAR'}
                </button>
            </div>
        </footer>

      </div>
    </main>
  );
};