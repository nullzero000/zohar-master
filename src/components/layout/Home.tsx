'use client';

import { useState } from 'react';
import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/Home.css';

// --- COMPONENTES UI (Los que arreglamos) ---
import { HebrewInput } from '@/components/ui/HebrewInput';
import { HebrewKeyboard } from '@/components/ui/HebrewKeyboard';
import { SchoolSelector } from '@/components/ui/SchoolSelector';

// --- VISUALES (Asumo que existen según tu árbol de archivos) ---
// Si alguno da error, coméntalo temporalmente.
import { LetterGlitch } from '@/components/visuals/LetterGlitch';
import { MysticParticles } from '@/components/visuals/MysticParticles';
import { HebrewGalaxy } from '@/components/visuals/HebrewGalaxy';

// --- DASHBOARD (Placeholders/Existentes) ---
import { GematriaTotal } from '@/components/dashboard/GematriaTotal';
import { TechnicalDossier } from '@/components/dashboard/TechnicalDossier';
import { TreeOfLifeView } from '@/components/dashboard/TreeOfLifeView';
import { VectorDataView } from '@/components/dashboard/VectorDataView';

// Tipo local para el selector de fondo
type VisualMode = 'GALAXY' | 'PARTICLES' | 'VOID';

export const Home = () => {
  // 1. Conexión al Cerebro (Store)
  const { 
    inputText, 
    setInputText,
    school, 
    isManifesting, 
    setManifesting, // Necesitamos esto para el botón de activar
    manifestView, 
    isOverlayActive, 
    setOverlayActive 
  } = useGematriaStore();

  const [visualMode, setVisualMode] = useState<VisualMode>('GALAXY');

  // Función de borrado segura
  const handleDelete = () => {
    if (inputText.length > 0) {
      setInputText(inputText.slice(0, -1));
    }
  };

  // Lógica de visibilidad forzada cuando hay datos encima
  const forceHidden = isOverlayActive;

  return (
    <main className="home-container">
      
      {/* =========================================================
          CAPA 1: VISUALES DE FONDO (El "Ein Sof")
         ========================================================= */}
      
      <div className="layer-background" style={{ opacity: (visualMode === 'VOID' && !forceHidden) ? 1 : 0 }}>
        {/* Efecto Glitch Base */}
        <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={true} smooth={true} />
      </div>

      <div className="layer-particles" style={{ opacity: (visualMode === 'PARTICLES' && !forceHidden) ? 1 : 0 }}>
         {/* Partículas místicas reaccionando al texto */}
         <MysticParticles text={inputText} school={school} />
      </div>

      <div className="layer-galaxy" style={{ opacity: (visualMode === 'GALAXY' && !forceHidden) ? 1 : 0 }}>
        {/* Galaxia de letras giratorias */}
        <HebrewGalaxy text={inputText} school={school} />
      </div>


      {/* =========================================================
          CAPA 2: INTERFAZ DE USUARIO (El "Kelim")
         ========================================================= */}
      <div className="layer-ui">
        
        {/* --- HEADER --- */}
        <header className="ui-header">
            {/* 1. Selector de Escuela (Se oculta al manifestar) */}
            <div className={`fade-transition ${isManifesting ? 'is-hidden' : 'is-visible'}`}>
                <SchoolSelector />
            </div>
            
            {/* 2. Selector Visual (Botones Galaxy/Particles/Void) */}
            <div className={`visual-selector fade-transition ${isManifesting && !isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
                {(['GALAXY', 'PARTICLES', 'VOID'] as VisualMode[]).map((mode) => (
                    <button
                        key={mode}
                        onClick={() => setVisualMode(mode)}
                        className={`visual-btn ${visualMode === mode ? 'active' : ''}`}
                    >
                        {mode}
                    </button>
                ))}
            </div>

            {/* 3. Panel de Totales (Solo visible si hay overlay activo) */}
            <div className={`fade-transition mt-4 ${isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
                <GematriaTotal />
            </div>
        </header>


        {/* --- MAIN SECTION (EL ARCA) --- */}
        <section className="ui-main">
            
            {/* INPUT HEBREO INTELIGENTE 
                - Ya no necesitamos posicionamiento CSS complejo aquí.
                - El componente HebrewInput maneja su propia expansión (fixed inset-0) 
                  cuando mode='MANIFESTATION'.
            */}
            <div className={`input-container-wrapper ${isOverlayActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <HebrewInput 
                    value={inputText}
                    school={school}
                    onDelete={handleDelete}
                    mode={isManifesting ? 'MANIFESTATION' : 'ORIGIN'}
                    // Pasamos el modo visual para que el Input pueda adaptar sus efectos (opcional)
                    manifestBg={visualMode === 'VOID' ? 'BLACK_HOLE' : 'COSMOS'} 
                />
            </div>

            {/* PANELES DE DATOS (DOSSIER TÉCNICO) */}
            <div className={`data-panel-wrapper fade-transition ${isOverlayActive ? 'is-visible' : 'is-hidden'}`}>
                {manifestView === 'dossier' && <TechnicalDossier />}
                {manifestView === 'tree' && <TreeOfLifeView />}
                {manifestView === 'vector' && <VectorDataView />}
            </div>
        </section>


        {/* --- FOOTER --- */}
        <footer className="ui-footer">
            
            {/* TECLADO (Se oculta/escala al manifestar) */}
            <div className={`keyboard-wrapper fade-transition ${isManifesting ? 'is-hidden scale-75' : 'is-visible scale-100'}`}>
                <HebrewKeyboard />
            </div>

            {/* CONTROLES DE ACCIÓN */}
            <div className="controls-wrapper">
                
                {/* Botón Principal: MANIFESTAR / RETORNAR */}
                <button 
                    onClick={() => setManifesting(!isManifesting)}
                    className={`manifest-btn ${inputText.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {isManifesting ? 'DETENER EMANACIÓN' : 'MANIFESTAR'}
                </button>
                
                {/* Botón Secundario: VER DATOS (Solo visible al manifestar) */}
                {isManifesting && (
                    <button 
                        onClick={() => setOverlayActive(!isOverlayActive)}
                        className="toggle-data-btn"
                    >
                        {isOverlayActive ? 'OCULTAR ANÁLISIS' : 'VER DATOS TÉCNICOS'}
                    </button>
                )}
            </div>
        </footer>

      </div>
    </main>
  );
};