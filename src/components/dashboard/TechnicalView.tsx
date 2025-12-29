'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TechnicalDossier } from '@/components/dashboard/TechnicalDossier';
import { AnalysisSliders } from '@/components/dashboard/AnalysisSliders';
import '@/styles/TechnicalView.css';

type TechTab = 'SYSTEM' | 'BIO';

export const TechnicalView = () => {
  const [activeTab, setActiveTab] = useState<TechTab>('SYSTEM');

  return (
    <div className="tech-view-container fade-in-panel">
      
      {/* HEADER */}
      <div className="tech-tabs-header">
        <button onClick={() => setActiveTab('SYSTEM')} className={`tech-tab-btn ${activeTab === 'SYSTEM' ? 'active' : ''}`}>
            SYSTEM METRICS
        </button>
        <div className="tech-divider">/</div>
        <button onClick={() => setActiveTab('BIO')} className={`tech-tab-btn ${activeTab === 'BIO' ? 'active' : ''}`}>
            BIO-RESONANCE
        </button>
      </div>

      {/* ÁREA DE CONTENIDO (Corrección de Altura) */}
      <div className="tech-content-area" style={{ position: 'relative', width: '100%', flex: 1, overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
            
            <motion.div 
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                /* CLAVE: Posición absoluta para garantizar height 100% sin romper flexbox */
                style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%' 
                }}
            >
                {activeTab === 'SYSTEM' ? <TechnicalDossier /> : <AnalysisSliders />}
            </motion.div>

        </AnimatePresence>
      </div>

    </div>
  );
};