'use client';

import { useState } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/Home.css';
import { TechnicalView } from '@/components/dashboard/TechnicalView';

// --- COMPONENTES UI ---
import { HebrewInput } from '@/components/ui/HebrewInput';
import { HebrewKeyboard } from '@/components/ui/HebrewKeyboard';
import { SchoolSelector } from '@/components/ui/SchoolSelector';

// --- VISUALES ---
import { LetterGlitch } from '@/components/visuals/LetterGlitch';
import { MysticParticles } from '@/components/visuals/MysticParticles';
import { HebrewGalaxy } from '@/components/visuals/HebrewGalaxy';

// --- DASHBOARD ---
import { GematriaTotal } from '@/components/dashboard/GematriaTotal';
import { TechnicalDossier } from '@/components/dashboard/TechnicalDossier';
import { AnalysisSliders } from '@/components/dashboard/AnalysisSliders';
import { TreeOfLifeView } from '@/components/dashboard/TreeOfLifeView';
import { VectorDataView } from '@/components/dashboard/VectorDataView';
import { ManifestNavigation } from '@/components/dashboard/ManifestNavigation';
import { DashboardTabs } from '@/components/dashboard/DashboardTabs';

type VisualMode = 'GALAXY' | 'PARTICLES' | 'VOID';

export const Home = () => {
  const { 
    inputText, setInputText, school, isManifesting, setManifesting, 
    manifestView, isOverlayActive, setOverlayActive 
  } = useGematriaStore();

  const [visualMode, setVisualMode] = useState<VisualMode>('GALAXY');

  const handleDelete = () => {
    if (inputText.length > 0) setInputText(inputText.slice(0, -1));
  };

  return (
    <main className="home-container">
      
 {/* CAPAS DE FONDO */}
      <div className="layer-background" style={{ opacity: (visualMode === 'VOID' && !isOverlayActive) ? 1 : 0 }}>
        <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={true} smooth={true} />
      </div>
      <div className="layer-particles" style={{ opacity: (visualMode === 'PARTICLES' && !isOverlayActive) ? 1 : 0 }}>
         <MysticParticles text={inputText} school={school} />
      </div>
      <div className="layer-galaxy" style={{ opacity: (visualMode === 'GALAXY' && !isOverlayActive) ? 1 : 0 }}>
        <HebrewGalaxy text={inputText} school={school} />
      </div>

      <div className="layer-ui">
        
        {/* HEADER */}
        <header className="ui-header">
            <div className={`fade-transition ${isManifesting ? 'is-hidden' : 'is-visible'}`}>
                <SchoolSelector />
            </div>
            <div className={`visual-selector fade-transition ${isManifesting && !isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
                {(['GALAXY', 'PARTICLES', 'VOID'] as VisualMode[]).map((mode) => (
                    <button key={mode} onClick={() => setVisualMode(mode)} className={`visual-btn ${visualMode === mode ? 'active' : ''}`}>
                        {mode}
                    </button>
                ))}
            </div>
        </header>

        {/* MAIN SECTION */}
        <section className="ui-main">
            
            <div className={`input-container-wrapper ${isOverlayActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <HebrewInput 
                    value={inputText} school={school} onDelete={handleDelete}
                    mode={isManifesting ? 'MANIFESTATION' : 'ORIGIN'}
                    manifestBg={visualMode === 'VOID' ? 'BLACK_HOLE' : 'COSMOS'} 
                />
            </div>

                 {/* PANELES DE DATOS (Overlay) */}
            <div className={`data-panel-wrapper fade-transition ${isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
                
                <div className="panel-stack" style={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', 
                    width: '100%', maxWidth: '900px', 
                    height: '100%', 
                    overflow: 'hidden', 
                    padding: '10px'
                }}>

                    {/* HEADER FIJO */}
                    <div style={{ flexShrink: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <ManifestNavigation />
                        {/* Solo mostramos Gematria Total si NO estamos en Árbol (para ganar espacio) */}
                        {manifestView !== 'tree' && <GematriaTotal />}
                        <DashboardTabs />
                    </div>

                    {/* CUERPO FLEXIBLE */}
                    <div style={{ 
                        flex: 1, 
                        width: '100%', 
                        position: 'relative', 
                        overflow: 'hidden', // ELIMINAMOS SCROLL DEL PADRE, LO MANEJA CADA VISTA
                        marginTop: '10px'
                    }}>
                        
                        {/* VISTA A: TECHNICAL DATA (AHORA CON SUB-TABS) */}
                        {manifestView === 'dossier' && (
                            <div style={{ width: '100%', height: '100%' }}>
                                <TechnicalView />
                            </div>
                        )}

                        {/* VISTA B: ÁRBOL DE LA VIDA */}
                        {manifestView === 'tree' && (
                            <div className="fade-in-panel" style={{ width: '100%', height: '100%' }}>
                                <TreeOfLifeView />
                            </div>
                        )}
                        
                        {/* VISTA C: VECTOR */}
                        {manifestView === 'vector' && <VectorDataView />}
                    </div>
                
                </div>

            </div>
        </section>

        {/* FOOTER */}
        <footer className="ui-footer">
            <div className={`keyboard-wrapper fade-transition ${isManifesting ? 'is-hidden scale-75' : 'is-visible scale-100'}`}>
                <HebrewKeyboard />
            </div>
            <div className="controls-wrapper">
                <button onClick={() => setManifesting(!isManifesting)} className={`manifest-btn ${inputText.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                    {isManifesting ? 'DETENER EMANACIÓN' : 'MANIFESTAR'}
                </button>
                {isManifesting && (
                    <button onClick={() => setOverlayActive(!isOverlayActive)} className="toggle-data-btn">
                        {isOverlayActive ? 'OCULTAR ANÁLISIS' : 'VER DATOS TÉCNICOS'}
                    </button>
                )}
            </div>
        </footer>

      </div>
    </main>
  );
};