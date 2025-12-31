'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechnicalDossier } from '@/components/dashboard/TechnicalDossier';
import { AnalysisSliders } from '@/components/dashboard/AnalysisSliders';
import { RawManifestView } from '@/components/dashboard/RawManifestView';
import { RectificationProtocols } from '@/components/dashboard/RectificationProtocols'; // <--- IMPORTACIÓN NUEVA
import '@/styles/TechnicalView.css';

// Agregamos 'PROTO' a los tipos de pestaña
type TechTab = 'SYSTEM' | 'BIO' | 'RAW' | 'PROTO';

export const TechnicalView = () => {
  const [activeTab, setActiveTab] = useState<TechTab>('SYSTEM');

  return (
    <div className="tech-view-container fade-in-panel">
      
      <div className="tech-tabs-header">
        <button 
            onClick={() => setActiveTab('SYSTEM')} 
            className={`tech-tab-btn ${activeTab === 'SYSTEM' ? 'active' : ''}`}
        >
            SYSTEM
        </button>
        <div className="tech-divider">/</div>
        <button 
            onClick={() => setActiveTab('BIO')} 
            className={`tech-tab-btn ${activeTab === 'BIO' ? 'active' : ''}`}
        >
            BIO-RES
        </button>
        <div className="tech-divider">/</div>
        <button 
            onClick={() => setActiveTab('RAW')} 
            className={`tech-tab-btn ${activeTab === 'RAW' ? 'active' : ''}`}
        >
            MANIFEST
        </button>
        <div className="tech-divider">/</div>
        {/* NUEVA PESTAÑA: CODEX */}
        <button 
            onClick={() => setActiveTab('PROTO')} 
            className={`tech-tab-btn ${activeTab === 'PROTO' ? 'active' : ''}`}
        >
            CODEX
        </button>
      </div>

      <div className="tech-content-area" style={{ display: 'grid', gridTemplateAreas: '"stack"', width: '100%', height: '100%', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                style={{ gridArea: 'stack', width: '100%', height: '100%', overflowY: 'auto', position: 'relative' }}
            >
                <div className="tech-panel-wrapper" style={{ height: '100%', width: '100%' }}>
                    {activeTab === 'SYSTEM' && <TechnicalDossier />}
                    {activeTab === 'BIO' && <AnalysisSliders />}
                    {activeTab === 'RAW' && <RawManifestView />}
                    {/* NUEVO RENDERIZADO */}
                    {activeTab === 'PROTO' && <RectificationProtocols />}
                </div>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};