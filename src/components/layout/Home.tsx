'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/Home.css';
import '@/styles/UIControls.css';

// Componentes UI
import { HebrewInput } from '@/components/ui/HebrewInput';
import { HebrewKeyboard } from '@/components/ui/HebrewKeyboard';
import { SchoolSelector } from '@/components/ui/SchoolSelector';
import { VisualSelector } from '@/components/ui/VisualSelector'; // Asegúrate de tener este componente

// Visuals
import { HebrewGalaxy } from '@/components/visuals/HebrewGalaxy';
import { MysticParticles } from '@/components/visuals/MysticParticles';
import { LetterGlitch } from '@/components/visuals/LetterGlitch';

// Dashboard
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

    const [showSequence, setShowSequence] = useState(false);
    const [bgMode, setBgMode] = useState<'GALAXY' | 'GLITCH' | 'PARTICLES' | 'VOID'>('GALAXY');

    const handleManifestClick = () => {
        if (inputText.length > 0) {
            if (!isManifesting) {
                setManifesting(true); setOverlayActive(false); setShowSequence(true);
            } else {
                handleClose();
            }
        }
    };

    const advanceToAnalysis = () => { setShowSequence(false); setOverlayActive(true); };
    const handleClose = () => { setManifesting(false); setOverlayActive(false); setShowSequence(false); };

    return (
        <main className="home-container">
            {/* CAPA DE FONDO */}
            <div className={`layer-galaxy fade-transition ${isManifesting ? 'opacity-20' : 'opacity-100'}`}>
                {bgMode === 'GALAXY' && <HebrewGalaxy text={inputText} school={school} />}
                {bgMode === 'VOID' && <div style={{ background: '#000', width: '100%', height: '100%' }} />}
                {bgMode === 'GLITCH' && <LetterGlitch characters="אבגדהוזחטיכלמנסעפצקרשת" />}
                {bgMode === 'PARTICLES' && <MysticParticles text={inputText} school={school} />}
            </div>

            <AnimatePresence>
                {showSequence && <ManifestationSequence onComplete={advanceToAnalysis} />}
            </AnimatePresence>

            <div className="layer-ui">
                {/* HEADER: PILA VERTICAL (ESCUELAS ARRIBA, VISUALES ABAJO) */}
                <header className={`ui-header ${isManifesting ? 'mobile-hidden' : ''}`}>
                    <div className="header-stack">
                        <SchoolSelector />
                        <VisualSelector currentMode={bgMode} onModeChange={setBgMode} />
                    </div>
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

                {/*Overlay panel*/}
                <div className={`data-panel-wrapper fade-transition ${isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
                    <button onClick={handleClose} className="panel-close-btn">×</button>
                    <div className="panel-stack" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '10px' }}>

                        {/* 1. Navegación superior (Niveles) */}
                        <div style={{ flexShrink: 0 }}> <ManifestNavigation /> </div>

                        {/* 2. Área de contenido dinámico */}
                        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                            {/* ELIMINADO: <GematriaTotal /> ya no va aquí fuera */}

                            <div style={{ flex: 1, position: 'relative', minHeight: 0, marginTop: '10px' }}>
                                {manifestView === 'dossier' && <TechnicalView />}
                                {manifestView === 'tree' && <TreeOfLifeView />}
                                {manifestView === 'vector' && <VectorDataView />}
                            </div>
                        </div>

                        {/* 3. Tabs inferiores */}
                        <div style={{ flexShrink: 0, padding: '10px 0' }}> <DashboardTabs /> </div>
                    </div>
                </div>

                {/* FOOTER */}
                {!isOverlayActive && (
                    <footer className="ui-footer">
                        <div className="keyboard-wrapper"><HebrewKeyboard /></div>
                        <div className="controls-wrapper">
                            <button onClick={handleManifestClick} className="manifest-trigger">
                                MANIFESTAR
                            </button>
                        </div>
                    </footer>
                )}
            </div>
        </main>
    );
};