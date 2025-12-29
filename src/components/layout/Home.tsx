'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';
import '@/styles/Home.css';

// Componentes UI
import { HebrewInput } from '@/components/ui/HebrewInput';
import { HebrewKeyboard } from '@/components/ui/HebrewKeyboard';
import { SchoolSelector } from '@/components/ui/SchoolSelector';
import { HebrewGalaxy } from '@/components/visuals/HebrewGalaxy';
import { GematriaTotal } from '@/components/dashboard/GematriaTotal';
import { TechnicalView } from '@/components/dashboard/TechnicalView';
import { TreeOfLifeView } from '@/components/dashboard/TreeOfLifeView';
import { VectorDataView } from '@/components/dashboard/VectorDataView';
import { ManifestNavigation } from '@/components/dashboard/ManifestNavigation';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';
import { ManifestationSequence } from '@/components/visuals/ManifestationSequence';

export const Home = () => {
  const { 
    inputText, setInputText, school, isManifesting, setManifesting, 
    manifestView, isOverlayActive, setOverlayActive 
  } = useGematriaStore();

  const [isMobile, setIsMobile] = useState(false);
  const [showSequence, setShowSequence] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleManifestClick = () => {
    if (inputText.length > 0) {
        if (!isManifesting) {
            setManifesting(true);
            setOverlayActive(false); 
            setShowSequence(true);   
        } else {
            handleClose();
        }
    }
  };

  const advanceToAnalysis = () => {
      setShowSequence(false); 
      setOverlayActive(true); 
  };

  const handleClose = () => {
      setManifesting(false);
      setOverlayActive(false);
      setShowSequence(false);
  };

  return (
    <main className="home-container">
      <div className={`layer-galaxy fade-transition ${isManifesting ? 'opacity-20' : 'opacity-100'}`}>
        <HebrewGalaxy text={inputText} school={school} />
      </div>

      <AnimatePresence>
        {showSequence && <ManifestationSequence onComplete={advanceToAnalysis} />}
      </AnimatePresence>

      <div className="layer-ui">
        <header className={`ui-header ${isManifesting ? 'mobile-hidden' : ''}`}>
            <SchoolSelector />
        </header>

        <section className={`ui-main ${isManifesting ? 'mobile-hidden' : ''}`}>
            <div className="input-container-wrapper">
                <HebrewInput 
                    value={inputText} school={school} 
                    onDelete={() => setInputText(inputText.slice(0, -1))}
                    mode="ORIGIN"
                />
            </div>
        </section>

        {/* --- PANEL DE ANÁLISIS (ESTILO BIO-RESONANCE) --- */}
        <div className={`data-panel-wrapper fade-transition ${isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
            <button onClick={handleClose} className="panel-close-btn">×</button>

            <div className="panel-stack" style={{ 
                width: '100%', height: '100%', maxWidth: '98vw', 
                display: 'flex', flexDirection: 'column', padding: '10px'
            }}>
                
                {/* 1. NIVELES (TOP) */}
                <div style={{ flexShrink: 0 }}>
                    <ManifestNavigation />
                </div>

                {/* 2. CONTENIDO (CENTRO) - Sin scroll interno */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}>
                    <GematriaTotal />
                    <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
                        {manifestView === 'dossier' && <TechnicalView />}
                        {manifestView === 'tree' && <TreeOfLifeView />}
                        {manifestView === 'vector' && <VectorDataView />}
                    </div>
                </div>

                {/* 3. NAVEGACIÓN (BOTTOM) */}
                <div style={{ flexShrink: 0, padding: '10px 0' }}>
                    <DashboardTabs />
                </div>
            </div>
        </div>

        {/* FOOTER DE EDICIÓN */}
        {!isOverlayActive && (
            <footer className="ui-footer">
                <div className="keyboard-wrapper"><HebrewKeyboard /></div>
                <div className="controls-wrapper">
                    <button onClick={handleManifestClick} className="manifest-btn">
                        MANIFESTAR
                    </button>
                </div>
            </footer>
        )}
      </div>
    </main>
  );
};