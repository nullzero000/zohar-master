'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Importamos animación
import { TechnicalDossier } from '@/components/dashboard/TechnicalDossier';
import { AnalysisSliders } from '@/components/dashboard/AnalysisSliders';
import '@/styles/TechnicalView.css';

type TechTab = 'SYSTEM' | 'BIO';

export const TechnicalView = () => {
  const [activeTab, setActiveTab] = useState<TechTab>('SYSTEM');

  return (
    <div className="tech-view-container fade-in-panel">
      
      {/* 1. SUB-NAVBAR TÁCTICO */}
      <div className="tech-tabs-header">
        <button 
            onClick={() => setActiveTab('SYSTEM')}
            className={`tech-tab-btn ${activeTab === 'SYSTEM' ? 'active' : ''}`}
        >
            SYSTEM METRICS
        </button>
        
        <div className="tech-divider">/</div>
        
        <button 
            onClick={() => setActiveTab('BIO')}
            className={`tech-tab-btn ${activeTab === 'BIO' ? 'active' : ''}`}
        >
            BIO-RESONANCE
        </button>
      </div>

      {/* 2. ÁREA DE CONTENIDO (CON ANIMACIÓN SWIPE) */}
      <div className="tech-content-area" style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
            
            {activeTab === 'SYSTEM' ? (
                <motion.div 
                    key="system"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="tech-panel-wrapper"
                    style={{ width: '100%', height: '100%' }}
                >
                    <TechnicalDossier />
                </motion.div>
            ) : (
                <motion.div 
                    key="bio"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="tech-panel-wrapper"
                    style={{ width: '100%', height: '100%' }}
                >
                    <AnalysisSliders />
                </motion.div>
            )}

        </AnimatePresence>
      </div>

    </div>
  );
};